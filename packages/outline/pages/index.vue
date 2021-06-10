<template>
  <v-app>
    <bookmark-drawer />

    <v-app-bar
      app
      clipped-left
      color="primary"
      height="56"
      dark
    >
      <v-toolbar-title>
        <h1 class="text-h6">
          Vue Outline
        </h1>
      </v-toolbar-title>
      <v-spacer />
      
      <!-- <DruxtEntity type="node--article" uuid="2df755ce-a8a1-4df7-882e-cf1e36b5b610" /> -->
      
      <v-spacer />

      <v-dialog
        v-model="drupalDialog"
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

      <server-dialog />

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
          {{ aboutText }}
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main>
      <outline />
    </v-main>
  </v-app>
</template>

<script>
import pathify from '@/utils/pathify'

import BookmarkDrawer from '@/components/BookmarkDrawer'
import Outline from '@/components/Outline'
import ServerDialog from '@/components/ServerDialog'

export default {
  name: 'App',

  components: {
    BookmarkDrawer,
    Outline,
    ServerDialog,
  },

  setup (props, context) {
    const { call, get } = pathify(context)
    const aboutDialog = false
    const aboutText = 'About Text'
    const drupalDialog = false
    const drupalText = get('socket-io/data')
    const loading = get('socket-io/loading')

    const getPageData = async function () {
      const page = await call('socket-io/getPage')
      return page
    }

    /*
    const { DruxtClient } = require('druxt')
    const druxt = new DruxtClient('http://drupal-outline.lndo.site/')
    const collection = druxt.getCollection('node--article')
    console.log('test', collection)
    */

    // initialize server outlines
    call('servers/init')

    return {
      aboutDialog,
      aboutText,
      drupalDialog,
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
