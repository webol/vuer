import { make } from 'vuex-pathify'

export const state = () => ({
  data: null,
  loading: false,
})

export const mutations = make.mutations(state())

export const actions = {
  ...make.actions(state),
  getPage ({ commit }, data) {
    commit('loading', true)
    commit('data', null)
    this._vm.$socket.client.emit('get-page', data)
  },
  socket_returnPage ({ commit }, data) {
    commit('loading', false)
    commit('data', data.results)
    return data
  },
}

export const getters = make.getters(state())
