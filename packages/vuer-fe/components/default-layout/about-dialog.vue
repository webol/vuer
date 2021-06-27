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
</template>

<script>
export default {
  name: 'AboutDialog',

  setup (props, context) {
    const dialog = false
    const aboutText = `
      This app provides an improved UI for Drupal.
      Built using Vue.js, Vuetify and Druxt.`
    const tmText = `Drupal is a registered trademark of Dries Buytaert.`

    return {
      dialog,
      aboutText,
      tmText,
    }
  },

}
</script>