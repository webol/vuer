<template>
  <v-row class="fill-height">
    <v-col style="height: 100%" cols="12" class="ma-2">
      <div v-html="content" />
      <!-- <DruxtEntity type="node--article" uuid="8439bb73-82eb-4755-b1d1-6d4d8b62f050" /> -->
      <!-- <DruxtEntityForm type="node--article" uuid="8439bb73-82eb-4755-b1d1-6d4d8b62f050" /> -->
      <!-- <DruxtEntity type="outline_entry--_DIR" uuid="ae46f356-888e-4666-b712-02ddffe1a4d1" /> -->
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

    
    // outline_entry--test_vuer_endpoint
    // outline--outline
    // outline_entry--_DIR
    /* 
      const { DruxtClient } = require('druxt')
      const druxt = new DruxtClient('http://webol.org')
      // const collection = druxt.getIndex() // gets all types
      const collection = druxt.getCollection('outline--outline')
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
