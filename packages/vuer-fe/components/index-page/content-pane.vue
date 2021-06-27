<template>
  <v-row class="fill-height">
    <v-col style="height: 100%" cols="12" class="ma-2">
      <span>{{ content }}</span>
      <!-- <DruxtEntity type="node--article" uuid="8439bb73-82eb-4755-b1d1-6d4d8b62f050" /> -->
      <!-- <DruxtEntityForm type="node--article" uuid="8439bb73-82eb-4755-b1d1-6d4d8b62f050" /> -->
    </v-col>
  </v-row>
</template>

<script>
import pathify from '@/utils/pathify'
import { computed } from '@nuxtjs/composition-api'

export default {
  name: 'ContentPane',

  setup (props, context) {
    const { get } = pathify(context)

    /*
      const { DruxtClient } = require('druxt')
      const druxt = new DruxtClient('http://webol.org')
      const collection = druxt.getCollection('node--article')
      console.log('test', collection)
    */

    // treeview props
    const active = get('treeview/activeItem')

    const content = computed(() => {
      return active?.value?.rendered || ''
    })

    return {
      content,
    }
  },
}
</script>
