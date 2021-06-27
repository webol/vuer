<template>
  <v-app>
    <AppBar />
    
    <NavigationDrawer />

    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import pathify from '@/utils/pathify'

export default {
  name: 'IndexPage',

  setup (props, context) {
    const { call } = pathify(context)

    // initialize server outlines
    call('servers/init')
    return {}
  }
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
