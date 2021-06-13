import { make } from 'vuex-pathify'

export const state = () => ({
  active: [],
  activeItem: null,
  cutItem: null,
})

export const mutations = make.mutations(state())

export const actions = make.actions(state())

export const getters = make.getters(state())
