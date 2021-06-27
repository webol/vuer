<template>
  <v-chip-group
    v-if="show"
    class="px-2 py-1"
    column
  >
    <v-chip
      v-for="(child, ind) in activeItem.children || []"
      :key="`node-chip-${ind}`"
      @click="setActive(child)"
    >
      {{ child.name }}
    </v-chip>
  </v-chip-group>
</template>

<script>
import pathify from '@/utils/pathify'
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'ChipPane',

  setup (props, context) {
    const { call, get } = pathify(context)

    /*
      const { DruxtClient } = require('druxt')
      const druxt = new DruxtClient('http://webol.org')
      const collection = druxt.getCollection('node--article')
      console.log('test', collection)
    */

    const activeItem = get('treeview/activeItem')

    const show = computed(() => {
      return !!activeItem?.value?.children
    })

    const setActive = async (item) => {
      await call('treeview/setActive', [item.eid])
      await call('treeview/setActiveItem', item)
    }

    return {
      activeItem,
      setActive,
      show,
    }
  },
}
</script>
