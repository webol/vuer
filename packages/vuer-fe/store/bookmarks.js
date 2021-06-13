import { make } from 'vuex-pathify'

export const state = () => ({
  active: 0,
  outlines: [],
  selected: undefined,
  bookmarks: [
    { icon: 'mdi-file', name: 'Bookmark 1', outlines: [1] },
    { icon: 'mdi-file-alert', name: 'Bookmark 2', outlines: [2] },
    { icon: 'mdi-file-chart', name: 'Bookmark 3', outlines: [3] },
  ],
})

export const mutations = make.mutations(state())

export const actions = make.actions(state())

export const getters = make.getters(state())
