import { make } from 'vuex-pathify'

export const state = () => ({
  show: false,
  edit: false,
  x: 0,
  y: 0,
})

export const mutations = make.mutations(state())

export const actions = {
  ...make.actions(state()),
  openMenu ({ commit, dispatch }, data) {
    data.e.preventDefault()
    commit('show', false)
    commit('x', data.e.clientX)
    commit('y', data.e.clientY)
    dispatch('treeview/setActive', [data.item.eid], { root: true })
    dispatch('treeview/setActiveItem', data.item, { root: true })
    commit('show', true)
  },
}

export const getters = make.getters(state())
