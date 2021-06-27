<template>
  <v-toolbar color="grey darken-4" dense>
    <template v-for="(action, name) in actions">
      <OutlineDialog
        v-if="action === 'outline-dialog'"
        :key="`action-${name}`"
      />

      <ToolbarBtn
        v-else
        :key="`action-${name}`"
        v-bind="{ ...action }"
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
      open: 'outline-dialog',
      close: { clickAction: closeOutline, disabled: disabledClose, icon: 'mdi-book-remove', tooltip: 'Close Outline' },
    })

    return {
      actions,
    }
  },
}
</script>
