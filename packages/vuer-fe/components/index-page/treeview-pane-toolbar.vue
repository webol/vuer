<template>
  <v-toolbar color="grey darken-4" dense>
    <template v-for="(action, name) in actions">
      <OutlineDialog
        v-if="action === 'outline-dialog'"
        :key="`action-${name}`"
      />

      <v-tooltip
        v-else
        :key="`action-${name}`"
        bottom
      >
        <template #activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            :disabled="action.disabled"
            icon
            v-on="{
              ...on,
              click: action.click
            }"
          >
            <v-icon v-text="action.icon" />
          </v-btn>
        </template>
        <span class="text-capitalize">{{ name }}</span>
      </v-tooltip>
    </template>
  </v-toolbar>
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
import { getMenuActions } from '@/utils/menu-actions'
import OutlineDialog from '@/components/index-page/outline-dialog'

export default {
  name: 'TreeviewPaneToolbar',

  components: {
    OutlineDialog,
  },

  setup (props, context) {
    const {
      closeOutline,
      disabledClose,
    } = getMenuActions(context)

    const actions = reactive({
      open: 'outline-dialog',
      close: { click: closeOutline, disabled: disabledClose, icon: 'mdi-book-remove' },
    })

    return {
      actions,
    }
  },
}
</script>
