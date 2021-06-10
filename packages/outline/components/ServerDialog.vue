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
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Outline Servers</span>
      </v-tooltip>
    </template>

    <v-card height="400px">
      <v-card-title class="py-2">
        Outline Servers
        <v-spacer />
        <v-btn
          fab
          icon
          small
          @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text v-if="!edit" class="pa-0">
        <v-toolbar
          class="px-2"
          dense
        >
          <v-tooltip
            v-for="(sAction, sa) in serverActions"
            :key="`sa-${sa}`"
            bottom
          >
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                :disabled="sa !== 'add' && selected === undefined"
                icon
                fab
                small
                v-on="{
                  ...on,
                  click: sAction.click
                }"
              >
                <v-icon v-text="sAction.icon" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{ sa }} Server</span>
          </v-tooltip>
        </v-toolbar>

        <v-list
          height="294px"
          style="overflow-y: auto"
        >
          <v-list-item-group v-model="selected">
            <v-list-item
              v-for="(server, si) in servers"
              :key="`oi-${si}`"
            >
              <v-list-item-content>
                <v-list-item-title>{{ server.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon
                  v-if="server.disabled"
                  color="error"
                >
                  mdi-cancel
                </v-icon>
                <v-icon
                  v-if="!server.disabled"
                  color="success"
                >
                  mdi-check
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <v-card-text
        v-if="edit"
        class="pa-0"
      >
        <v-toolbar
          class="px-2"
          dense
        >
          <v-tooltip
            v-for="(eAction, ea) in editActions"
            :key="`ea-${ea}`"
            bottom
          >
            <template #activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                icon
                fab
                small
                v-on="{
                  ...on,
                  click: eAction.click
                }"
              >
                <v-icon v-text="eAction.icon" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{ ea }}</span>
          </v-tooltip>
        </v-toolbar>

        <v-form class="pa-6">
          <v-text-field
            v-model="editItem.name"
            label="Name"
            outlined
          />
          <v-text-field
            v-model="editItem.uri"
            label="Uri"
            outlined
          />
          <v-checkbox
            v-model="editItem.disabled"
            label="Disabled"
          />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import pathify from '@/utils/pathify'
import { reactive, ref } from '@nuxtjs/composition-api'

export default {
  name: 'ServerDialog',

  setup (props, context) {
    const dialog = ref(false)
    const edit = ref(false)
    const isNew = ref(false)
    const { sync } = pathify(context)
    const selected = sync('servers/selected')
    const servers = sync('servers/servers')

    const editDefault = {
      name: '',
      uri: '',
      disabled: false,
    }

    let editItem = reactive({
      name: '',
      uri: '',
      disabled: false,
    })

    const addServer = () => {
      isNew.value = true
      edit.value = true
    }

    const cancel = () => {
      edit.value = false
      editItem = Object.assign(editItem, editDefault)
    }

    const close = () => {
      edit.value = false
      dialog.value = false
      selected.value = undefined
    }

    const editServer = () => {
      const server = servers.value[selected.value]
      editItem = Object.assign(editItem, server)
      edit.value = true
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

    const save = () => {
      const saveItem = Object.assign({}, editItem)
      if (isNew.value) {
        servers.value.push(saveItem)
        isNew.value = false
        selected.value = undefined
      } else {
        servers.value.splice(selected.value, 1, saveItem)
      }
      cancel()
    }

    const editActions = {
      save: { click: save, icon: 'mdi-content-save' },
      cancel: { click: cancel, icon: 'mdi-cancel' },
    }

    const serverActions = {
      add: { click: addServer, icon: 'mdi-plus' },
      edit: { click: editServer, icon: 'mdi-pencil' },
      delete: { click: deleteServer, icon: 'mdi-delete' },
      disable: { click: disableServer, icon: 'mdi-cancel' },
      enable: { click: enableServer, icon: 'mdi-check' },
    }

    return {
      close,
      dialog,
      edit,
      editActions,
      editItem,
      isNew,
      serverActions,
      servers,
      selected,
    }
  },
}
</script>
