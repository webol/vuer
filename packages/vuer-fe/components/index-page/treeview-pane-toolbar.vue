<template>
  <v-toolbar color="grey darken-4" dense>
    <component
      v-for="(action, name) in actions"
      :key="`action-${name}`"
      :is="action.is"
      v-bind="{ ...action }"
    />
      
  </v-toolbar>
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
import { getMenuActions } from '@/utils/menu-actions'

export default {
  name: 'TreeviewPaneToolbar',

  setup (props, context) {
    const {
      closeOutline,
      disabledClose,
    } = getMenuActions(context)

    const actions = reactive({
      open: { is: 'outline-dialog' },
      close: { is: 'toolbar-btn', clickAction: closeOutline, disabled: disabledClose, icon: 'mdi-book-remove', tooltip: 'Close Outline' },
      expandAll: { is: 'toolbar-btn', icon: 'mdi-expand-all', tooltip: 'Expand All' },
      collapseAll: { is: 'toolbar-btn', icon: 'mdi-collapse-all', tooltip: 'Collapse All' },
    })

    return {
      actions,
    }
  },
}
</script>
