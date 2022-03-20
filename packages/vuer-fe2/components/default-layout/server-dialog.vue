<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500px"
  >
    <template #activator="{ on, attrs }">
       <ToolbarBtn
        v-on="on"
        v-bind="attrs"
        icon="mdi-cog"
        tooltip="Drupal Servers"
      />
    </template>

    <v-card height="400px">
      <v-card-title class="py-2">
        Drupal Servers
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
          <ToolbarBtn
            v-for="(sAction, sa) in serverActions"
            :key="`sa-${sa}`"
            v-bind="sAction"
            :disabled="sa !== 'add' && selected === undefined"
            :tooltip="sa"
          />
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
          <ToolbarBtn
            v-for="(eAction, ea) in editActions"
            :key="`ea-${ea}`"
            :disabled="ea === 'save' && !form.valid"
            v-bind="eAction"
            :tooltip="ea"
          />
        </v-toolbar>

        <v-form v-model="form.valid" class="pa-6">
          <v-text-field
            v-model="editItem.name"
            label="Name"
            outlined
          />
          <v-text-field
            v-model="editItem.uri"
            label="Uri"
            outlined
            :error="!!form.error"
            :error-messages="form.error"
            :disabled="!isNew"
            @input="validate"
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
import { debounce } from 'lodash'

export default {
  name: 'ServerDialog',

  setup (props, context) {
    const dialog = ref(false)
    const edit = ref(false)
    const isNew = ref(false)
    const { call, sync } = pathify(context)
    const selected = sync('servers/selected')
    const servers = sync('servers/servers')

    const editDefault = {
      disabled: false,
      id: null,
      name: '',
      uri: '',
    }
    let editItem = reactive({
      disabled: false,
      id: null,
      name: '',
      uri: '',
    })

    const formDefault = {
      error: 'Uri required',
      valid: false,
    }
    let form = reactive({
      error: 'Uri required',
      valid: false,
    })

    const addServer = () => {
      isNew.value = true
      edit.value = true
    }

    const cancel = () => {
      edit.value = false
      editItem = Object.assign(editItem, editDefault)
      form = Object.assign(form, formDefault)
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

    const validate = debounce(async (val) => {
      const results = await call('graphql/fetchServerUuid', val)
      console.log('validates', results)
      if (results?.error) {
        form.error = results?.error
      } else {
        form.error = null
        editItem.id = results.uuid
      }
    }, 1000)

    const editActions = {
      save: { clickAction: save, icon: 'mdi-content-save' },
      cancel: { clickAction: cancel, icon: 'mdi-cancel' },
    }

    const serverActions = {
      add: { clickAction: addServer, icon: 'mdi-plus' },
      edit: { clickAction: editServer, icon: 'mdi-pencil' },
      delete: { clickAction: deleteServer, icon: 'mdi-delete' },
      disable: { clickAction: disableServer, icon: 'mdi-cancel' },
      enable: { clickAction: enableServer, icon: 'mdi-check' },
    }

    return {
      close,
      dialog,
      edit,
      editActions,
      editItem,
      form,
      isNew,
      serverActions,
      servers,
      selected,
      validate,
    }
  },
}
</script>
