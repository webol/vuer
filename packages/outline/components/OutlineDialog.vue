<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <template #activator="{ on: don, attrs: dattrs }">
      <v-tooltip bottom>
        <template #activator="{ on: tton, attrs: ttattrs }">
          <v-btn
            icon
            v-bind="{
              ...dattrs,
              ...ttattrs
            }"
            v-on="{
              ...don,
              ...tton
            }"
          >
            <v-icon>mdi-book-plus</v-icon>
          </v-btn>
        </template>
        <span>Open Outline</span>
      </v-tooltip>
    </template>
    <v-card height="600px">
      <v-card-title class="py-2">
        Outlines
        <v-spacer />
        <v-btn
          fab
          icon
          small
          @click="dialog = !dialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-0">
        <v-treeview
          v-model="activeOutlines"
          item-key="id"
          :items="items"
          selectable
          open-all
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import pathify from '@/utils/pathify'
// import Treeview from './Treeview'
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'OutlineDialog',

  // components: { Treeview },

  setup (props, context) {
    const dialog = false
    const { get, sync } = pathify(context)
    const selected = sync('servers/selected')
    const servers = sync('servers/servers')
    const activeOutlines = sync('graphql/activeOutlines')
    const outlines = get('graphql/outlines')
    const serverOutlines = get('servers/outlines')

    const addServer = () => {
      servers.value.push({ name: 'Server 1', uri: '', disabled: false })
      selected.value = undefined
    }

    const deleteServer = () => {
      servers.value.splice(selected.value, 1)
      selected.value = undefined
    }

    const disableServer = () => {
      servers.value[selected.value].disabled = true
    }

    const enableServer = () => {
      servers.value[selected.value].disabled = false
    }

    const items = computed(() => {
      const treeItems = []
      for (const server of servers.value) {
        if (!serverOutlines.value[server.id]) { return }
        treeItems.push({
          ...server,
          children: [
            ...outlines.value.reduce((acc, val) => {
              if (serverOutlines.value[server.id].includes(val.eid.toString())) {
                acc.push({
                  id: val.eid,
                  name: val.name,
                })
              }
              return acc
            }, []),
          ],
        })
      }
      return treeItems
    })

    const actions = {
      add: { click: addServer, icon: 'mdi-plus' },
      edit: { click: () => {}, icon: 'mdi-pencil' },
      delete: { click: deleteServer, icon: 'mdi-delete' },
      disable: { click: disableServer, icon: 'mdi-cancel' },
      enable: { click: enableServer, icon: 'mdi-check' },
    }

    return {
      actions,
      activeOutlines,
      dialog,
      items,
      servers,
      selected,
    }
  },
}
</script>
