<template>
  <v-toolbar color="transparent" dense>
    <template v-for="(laItem, la) in leftActions">
      <v-divider
        v-if="laItem === 'divider'"
        :key="`ld-${la}`"
        vertical
      />

      <outline-dialog
        v-else-if="laItem === 'outline-dialog'"
        :key="`ld-${la}`"
      />

      <v-tooltip
        v-else
        :key="`la-${la}`"
        bottom
      >
        <template #activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            :disabled="laItem.disabled"
            icon
            v-on="{
              ...on,
              click: laItem.click
            }"
          >
            <v-icon v-text="laItem.icon" />
          </v-btn>
        </template>
        <span class="text-capitalize">{{ la }}</span>
      </v-tooltip>
    </template>

    <v-spacer />

    <v-tooltip
      v-for="(raItem, ra) in rightActions"
      :key="`ra-${ra}`"
      bottom
    >
      <template #activator="{ attrs, on }">
        <v-btn
          v-bind="attrs"
          :disabled="raItem.disabled"
          icon
          v-on="{
            ...on,
            click: raItem.click
          }"
        >
          <v-icon v-text="raItem.icon" />
        </v-btn>
      </template>
      <span class="text-capitalize">{{ ra }}</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
import { reactive } from '@nuxtjs/composition-api'
import { getMenuActions } from '@/utils/menu-actions'
import OutlineDialog from './OutlineDialog'

export default {
  name: 'Toolbar',

  components: {
    OutlineDialog,
  },

  setup (props, context) {
    const {
      addEntry,
      closeOutline,
      copyEntry,
      cutEntry,
      deleteEntry,
      disabled,
      disabledClose,
      disabledPaste,
      editEntry,
      pasteEntry,
      renameEntry,
    } = getMenuActions(context)

    const leftActions = reactive({
      open: 'outline-dialog',
      close: { click: closeOutline, disabled: disabledClose, icon: 'mdi-book-remove' },
      d1: 'divider',
      addEntry: { click: addEntry, disabled, icon: 'mdi-plus' },
      edit: { click: editEntry, disabled, icon: 'mdi-pencil' },
      rename: { click: renameEntry, disabled: true, icon: 'mdi-form-textbox' },
      delete: { click: deleteEntry, disabled, icon: 'mdi-delete' },
      cut: { click: cutEntry, disabled, icon: 'mdi-content-cut' },
      copy: { click: copyEntry, disabled: true, icon: 'mdi-content-copy' },
      paste: { click: pasteEntry, disabled: disabledPaste, icon: 'mdi-content-paste' },
    })
    const rightActions = reactive({})

    return {
      disabled,
      leftActions,
      rightActions,
      disabledPaste,
    }
  },
}
</script>
