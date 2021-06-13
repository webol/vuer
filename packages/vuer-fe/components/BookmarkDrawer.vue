<template>
  <v-navigation-drawer
    app
    clipped
    mini-variant
    permanent
  >
    <v-list-item-group
      v-model="active"
      mandatory
      color="primary"
    >
      <v-tooltip right>
        <template #activator="{ on, attrs }">
          <v-list-item
            v-bind="attrs"
            v-on="on"
          >
            <v-list-item-icon>
              <v-icon>mdi-network-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content />
          </v-list-item>
        </template>
        <span>Outlines</span>
      </v-tooltip>

      <v-divider />

      <v-tooltip
        v-for="bm in bookmarks"
        :key="bm.title"
        right
      >
        <template #activator="{ on, attrs }">
          <v-list-item
            v-bind="attrs"
            v-on="on"
          >
            <v-list-item-icon>
              <v-icon v-text="bm.icon" />
            </v-list-item-icon>
            <v-list-item-content />
          </v-list-item>
        </template>
        <span>{{ bm.name }}</span>
      </v-tooltip>
    </v-list-item-group>

    <template #append>
      <v-divider />

      <bookmarks-dialog />
    </template>
  </v-navigation-drawer>
</template>

<script>
import pathify from '@/utils/pathify'
import { watch } from '@nuxtjs/composition-api'
import BookmarksDialog from './BookmarksDialog'

export default {
  name: 'AppDrawer',

  components: {
    BookmarksDialog,
  },

  setup (props, context) {
    const { sync } = pathify(context)
    const active = sync('bookmarks/active')
    const bookmarks = sync('bookmarks/bookmarks')
    const outlines = sync('bookmarks/outlines')

    watch(active, (val) => {
      const bookmarkInd = val - 1
      outlines.value = bookmarks?.value[bookmarkInd]?.outlines || []
    })

    return {
      active,
      bookmarks,
    }
  },
}
</script>
