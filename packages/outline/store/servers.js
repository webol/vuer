import { make } from 'vuex-pathify'
import { keyBy } from 'lodash'

export const state = () => ({
  selected: undefined,
  servers: [
    { id: '1234', name: 'Server 1', uri: 'http://drupal-outline.lndo.site/outline-graphql', disabled: false },
  ],
  outlines: {},
})

export const mutations = make.mutations(state())

export const actions = {
  ...make.actions(state()),
  async genServer ({ commit, dispatch }, server) {
    const { id, uri } = server
    await dispatch('graphql/generateClient', { id, uri }, { root: true })
    const outlines = await dispatch('graphql/fetchOutlines', id, { root: true })
    const combinedOutlines = Object.assign({}, { ...state.outlines, [id]: Object.keys(keyBy(outlines, 'eid')) })
    commit('outlines', combinedOutlines)
  },
  async init ({ dispatch, state }) {
    for (const server of state.servers) {
      await dispatch('genServer', server)
    }
  },
}

export const getters = make.getters(state())
