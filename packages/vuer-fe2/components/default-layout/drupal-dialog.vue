<template>
  <v-dialog
    v-model="dialog"
    max-width="400px"
  >   
    <template #activator="{ on, attrs }">
      <ToolbarBtn
        v-on="on"
        v-bind="attrs"
        icon="mdi-server"
        tooltip="Get Drupal Details"
      />
    </template>
    <v-card
      height="300px"
      :loading="loading"
    >
      {{ drupalText }}
    </v-card>
  </v-dialog>
</template>

<script>
import pathify from '@/utils/pathify'

export default {
  name: 'DrupalDialog',

  setup (props, context) {
    const { call, get } = pathify(context)
    const dialog = false
    const drupalText = get('socket-io/data')
    const getPageData = async function () {
      const page = await call('socket-io/getPage')
      return page
    }
    const loading = get('socket-io/loading')

    return {
      dialog,
      drupalText,
      getPageData,
      loading,
    }
  },
}
</script>