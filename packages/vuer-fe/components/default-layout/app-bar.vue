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

    <DrupalDialog v-if="false" />

    <ServerDialog />

    <AboutDialog />
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',

  setup (props, context) {
    const title = 'Vuer'

    return {
      title,
    }
  },

}
</script>