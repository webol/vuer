<template>
  <v-app>
    <BookmarkDrawer />

    <v-app-bar
      app
      color="blue-grey darken-3"
      clipped-left
      height="56"
      dark
    >
      <v-toolbar-title>
        <h1 class="text-h6">
          Vuer
        </h1>
      </v-toolbar-title>
      <v-spacer />
       
      <v-spacer />

      <v-dialog
        v-model="serverDialog"
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

      <ServerDialog />

      <v-dialog
        v-model="aboutDialog"
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
              >
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </template>
            <span>About</span>
          </v-tooltip>
        </template>
        <v-card height="300px">
          <div class="d-flex flex-column justify-space-between fill-height pa-4">
            <div>{{ aboutText }}</div>
            <div>{{ tmText }}</div>
          </div>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main>
      <Outline />
    </v-main>
  </v-app>
</template>

<script>

import pathify from '@/utils/pathify'
import BookmarkDrawer from '@/components/bookmark-drawer'
import Outline from '@/components/outline'
import ServerDialog from '@/components/server-dialog'

export default {
  name: 'IndexPage',

  components: {
    BookmarkDrawer,
    Outline,
    ServerDialog,
  },

  setup (props, context) {
    const { call, get } = pathify(context)
    const aboutDialog = false
    const aboutText = `
      This app provides an improved UI for Drupal.
      Built using Vue.js, Vuetify and Druxt.`
    const tmText = `Drupal is a registered trademark of Dries Buytaert.`
    const serverDialog = false
    const drupalText = get('socket-io/data')
    const getPageData = async function () {
      const page = await call('socket-io/getPage')
      return page
    }
    const loading = get('socket-io/loading')

    // initialize server outlines
    call('servers/init')

    return {
      aboutDialog,
      aboutText,
      tmText,
      serverDialog,
      drupalText,
      getPageData,
      loading,
    }
  },

}
</script>

<style lang="sass">
  .splitpanes--vertical > .splitpanes__splitter
    min-width: 4px
    background: rgba(0,0,0,.2)

  .splitpanes--horizontal > .splitpanes__splitter
    min-height: 4px
    background: rgba(0,0,0,.2)
</style>
