import { make } from 'vuex-pathify'
import graphqlClient from '../apollo/client'

// queries
import outlinesQuery from '../apollo/queries/outlines.query.gql'
import entryQuery from '../apollo/queries/entry.query.gql'

// mutations
import addEntryMutation from '../apollo/mutations/addEntry.mutation.gql'
import collapseMutation from '../apollo/mutations/collapse.mutation.gql'
import deleteEntryMutation from '../apollo/mutations/deleteEntry.mutation.gql'
import expandMutation from '../apollo/mutations/expand.mutation.gql'
import renameEntryMutation from '../apollo/mutations/renameEntry.mutation.gql'
import setParentMutation from '../apollo/mutations/setParentEntry.mutation.gql'

export const state = () => ({
  activeOutlines: [1, 5014],
  clients: {},
  commands: {
    query: {
      outlinesQuery,
      entryQuery,
    },
    mutate: {
      addEntryMutation,
      collapseMutation,
      deleteEntryMutation,
      expandMutation,
      renameEntryMutation,
      setParentMutation,
    },
  },
  entries: [],
  entryIds: [],
  isFetchingEntries: false,
  isFetchingOutlines: false,
  opened: [],
  outlines: [],
  outlineIds: [],
})

export const mutations = make.mutations(state())

export const actions = {
  ...make.actions(state()),
  async addEntry ({ dispatch }, { parentEid, server }) {
    console.log('Adding', parentEid, 'server:', server)
    return await dispatch('executeGraphql', {
      command: 'addEntryMutation',
      server,
      type: 'mutate',
      variables: { parentEid },
    })
  },
  async collapseEntry ({ dispatch }, { eid, server }) {
    console.log('Collapse', eid)
    const collapse = await dispatch('executeGraphql', {
      command: 'collapseMutation',
      server,
      type: 'mutate',
      variables: { eid },
    })
    return collapse
  },
  async deleteEntry ({ dispatch }, { eid, server }) {
    console.log('Delete:', eid, 'server:', server)
    return await dispatch('executeGraphql', {
      command: 'deleteEntryMutation',
      server,
      type: 'mutate',
      variables: { eid },
    })
  },
  async executeGraphql ({ state }, { command, server, type, variables }) {
    console.log('execute:', type, command, server)
    const client = this.app.apolloProvider.clients[server] || this.app.apolloProvider.defaultClient
    const action = state.commands[type][command]

    const { data } = await client[type]({
      [type === 'mutate' ? 'mutation' : type]: action,
      variables,
    })
    return data
  },
  async expandEntry ({ dispatch }, { eid, server }) {
    console.log('Expand:', eid, 'server:', server)
    const expand = await dispatch('executeGraphql', {
      command: 'expandMutation',
      server,
      type: 'mutate',
      variables: { eid },
    })
    return expand
  },
  async fetchOutlines ({ commit, dispatch, state }, server) {
    commit('isFetchingOutlines', true)
    const { outlines: { outlines } } = await dispatch('executeGraphql', {
      command: 'outlinesQuery',
      server,
      type: 'query',
    })
    const ids = []
    const items = []
    const openIds = []
    for (const outline of outlines) {
      const { rootEntry } = outline
      let children = rootEntry.childCount > 0 ? [] : undefined
      if (rootEntry.expanded && rootEntry.childCount > 0) {
        const entry = await dispatch('fetchEntry', { eid: rootEntry.eid, server })
        children = entry.children
        openIds.push(rootEntry.eid)
      }
      ids.push(rootEntry.eid)
      items.push({ ...rootEntry, children, server, isOutline: true })
    }
    commit('opened', [...state.opened, ...openIds])
    commit('outlineIds', [...state.outlineIds, ...ids])
    commit('outlines', [...state.outlines, ...items])
    commit('isFetchingOutlines', false)
    return items
  },
  async fetchEntry ({ commit, dispatch, state }, { eid, server }) {
    commit('isFetchingOutlines', true)
    const { entry } = await dispatch('executeGraphql', {
      command: 'entryQuery',
      server,
      type: 'query',
      variables: { eid, server },
    })
    const newEntry = { ...entry, server, isOutline: false }
    commit('entryIds', [...state.entryIds, eid])
    commit('entries', [...state.entries, newEntry])
    commit('isFetchingOutlines', false)
    return newEntry
  },
  generateClient ({ commit, state }, server) {
    const { id, uri } = server
    this.app.apolloProvider.clients[id] = graphqlClient(uri)
    commit('clients', Object.assign(state.clients, { [id]: uri }))
    return state.clients[id]
  },
  async renameEntry ({ dispatch }, { parentEid, server }) {
    console.log('Rename:', parentEid, 'server:', server)
    return await dispatch('executeGraphql', {
      command: 'renameEntryMutation',
      server,
      type: 'mutate',
      variables: { parentEid },
    })
  },
  async setParentEntry ({ dispatch }, { eid, parentEid, server }) {
    console.log('SetParent:', eid, parentEid, 'server:', server)
    return await dispatch('executeGraphql', {
      command: 'setParentMutation',
      server,
      type: 'mutate',
      variables: { eid, parentEid },
    })
  },
}

export const getters = make.getters(state())
