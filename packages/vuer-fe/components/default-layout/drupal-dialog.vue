<template>
  <v-dialog
    v-model="dialog"
    max-width="400px"
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
            @click="getPageData"
          >
            <v-icon>mdi-server</v-icon>
          </v-btn>
        </template>
        <span>Get Drupal Details</span>
      </v-tooltip>
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