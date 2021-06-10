<template>
  <v-dialog
    v-model="edit"
    persistent
  >
    <v-card height="600px">
      <v-card-title>
        {{ src }}
        <v-spacer />
        <v-btn
          icon
          @click="edit = !edit"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-0 px-5 pt-5">
        <iframe :src="src" style="width: 100%; height: 500px" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import pathify from '@/utils/pathify'

export default {
  setup (props, context) {
    const { get, sync } = pathify(context)
    const activeItem = get('treeview/activeItem')
    const edit = sync('context-menu/edit')

    const src = computed(() => {
      const eid = activeItem && activeItem.value ? activeItem.value.eid : ''
      // const url = 'http://localhost:32770'
      const url = 'http://drupal-outline.lndo.site'
      return eid ? `${url}/outline/entry/${eid}/edit` : ''
    })

    const onLoad = () => {
      console.log('loaded')
    }

    return {
      edit,
      onLoad,
      src,
    }
  },
}
</script>
