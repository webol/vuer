<template>
  <v-toolbar color="grey darken-4" dense>
    <template v-for="(action, name) in actions">
    
    <v-spacer
      v-if="action.is === 'v-spacer'"
      :key="`action-${name}`"
    />

    <component
      v-else
      :key="`action-${name}`"
      :is="action.is"
      v-bind="action"
    />
    </template>
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
      spacer: { is: 'v-spacer' },
      expandAll: { is: 'toolbar-btn', icon: 'mdi-expand-all', tooltip: 'Expand All' },
      collapseAll: { is: 'toolbar-btn', icon: 'mdi-collapse-all', tooltip: 'Collapse All' },
    })

    return {
      actions,
    }
  },
}
</script>
