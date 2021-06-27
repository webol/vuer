<template>
  <v-app-bar
    app
    color="blue-grey darken-3"
    clipped-left
    height="56"
    dark
  >
    <v-toolbar-title>
      <h1 class="text-h6">
        {{ title }}
      </h1>
    </v-toolbar-title>
    <v-spacer />
      
    <v-spacer />

    <DrupalDialog />

    <ServerDialog />

    <AboutDialog />
  </v-app-bar>
</template>

<script>
import AboutDialog from '@/components/default-layout/about-dialog'
import DrupalDialog from '@/components/default-layout/drupal-dialog'
import ServerDialog from '@/components/default-layout/server-dialog'

export default {
  name: 'AppBar',

  components: {
    AboutDialog,
    DrupalDialog,
    ServerDialog,
  },

  setup (props, context) {
    const title = 'Vuer'

    return {
      title,
    }
  },

}
</script>