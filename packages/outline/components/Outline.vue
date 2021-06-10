<template>
  <v-container fluid class="main-container">
    <context-menu />

    <edit-dialog />

    <toolbar />

    <splitpanes>
      <pane size="15" min-size="15" style="overflow-y: auto;">
        <v-progress-linear
          :active="loading"
          indeterminate
        />

        <!-- gwc-menu
          branding = "Decoupled Menu Test"
          baseUrl = "http://decoupled-menus.jsonapi.dev"
          menuId = "account"
          ></gwc-menu -->

        <treeview
          :active.sync="active"
          :items="items"
          :load-children="loadChildren"
          :open.sync="open"
          v-bind="{ openMenu, treeViewLabelClick }"
        />
      </pane>
      <pane>
        <splitpanes horizontal>
          <pane :size="activeItem && activeItem.children && activeItem.children.length ? 20 : 0" style="overflow-y: auto">
            <v-chip-group
              v-if="activeItem && activeItem.children"
              class="px-2 py-1"
              column
            >
              <v-chip
                v-for="(child, ind) in activeItem.children || []"
                :key="`node-chip-${ind}`"
                @click="treeViewLabelClick(child, true)"
              >
                {{ child.name }}
              </v-chip>
            </v-chip-group>
          </pane>
          <pane>
            <v-row class="fill-height">
              <v-col style="height: 100%" cols="12">
                {{ active }}
                <span>{{ renderedContent.content }}</span>
              </v-col>
            </v-row>
          </pane>
        </splitpanes>
      </pane>
    </splitpanes>
  </v-container>
</template>

<script>
// utilities
import { computed, reactive, watch } from '@nuxtjs/composition-api'
import { difference, find } from 'lodash'
import pathify from '@/utils/pathify'
// import { GdwcMenu } from '@gdwc/components/menu';

// components
import { Pane, Splitpanes } from 'splitpanes'
import Toolbar from './Toolbar'
import ContextMenu from './ContextMenu'
import EditDialog from './EditDialog'
import Treeview from './Treeview'
import 'splitpanes/dist/splitpanes.css'

export default {

  name: 'Outline',

  components: {
    ContextMenu,
    EditDialog,
    Pane,
    Splitpanes,
    Toolbar,
    Treeview,
  },
  setup (props, context) {
    const { call, get, sync } = pathify(context)

    // drawer getters
    const selectedOutlines = get('bookmarks/outlines')
    const isBookmark = get('bookmarks/active')
    const open = sync('graphql/opened')

    // loading getters
    const isFetchingEntries = get('graphql/isFetchingEntries')
    const isFetchingOutlines = get('graphql/isFetchingOutlines')
    const loading = computed(() => {
      return isFetchingOutlines.value || isFetchingEntries.value
    })

    // treeview props
    const active = sync('treeview/active')
    const activeItem = get('treeview/activeItem')

    // outline getters
    const toutlines = get('graphql/outlines')
    const aOutlines = get('graphql/activeOutlines')
    const entries = get('graphql/entries')

    // actions
    const openMenu = (e, item) => {
      return call('context-menu/openMenu', { e, item })
    }

    // init outline fetch
    const items = computed(() => {
      const bookmark = !!isBookmark?.value || 0
      const outlines = bookmark
        ? selectedOutlines?.value || []
        : aOutlines?.value || []

      return toutlines.value.filter(item => outlines.includes(item.eid))
    })

    const renderedContent = reactive({ content: '' })
    const treeViewLabelClick = async (item, chip) => {
      renderedContent.content = item.rendered
      if (chip) {
        await call('treeview/setActive', [item.eid])
      }
      await call('treeview/setActiveItem', item)
    }

    const loadChildren = async (entry) => {
      const { eid, server } = entry
      console.log('loading children for:', eid, 'server', server)
      const { children } = await call('graphql/fetchEntry', { eid, server })
      children.forEach((child) => {
        child.server = server
      })
      entry.children = children
      return children
    }

    watch(open, (val, prevVal) => {
      // may need to add debounce
      const expandItems = difference(val, prevVal)
      const collapseItems = difference(prevVal, val)
      console.log('diff', expandItems, collapseItems)
      if (expandItems.length) {
        for (const item of expandItems) {
          const entry = find(entries.value, { eid: item })
          if (entry) {
            console.log('open', entry)
            call('graphql/expandEntry', entry)
          }
        }
      }

      if (collapseItems.length) {
        for (const item of collapseItems) {
          const entry = find(entries.value, { eid: item })
          if (entry) {
            console.log('close', entry)
            call('graphql/collapseEntry', entry)
          }
        }
      }
    })

    return {
      active,
      activeItem,
      items,
      loading,
      loadChildren,
      open,
      openMenu,
      renderedContent,
      treeViewLabelClick,
    }
  },
}
</script>

<style lang="sass">
  .main-container
    padding: 0px
    height: calc(100vh - 48px - 56px)
</style>
