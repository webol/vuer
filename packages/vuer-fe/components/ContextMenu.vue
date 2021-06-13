<template>
  <v-menu
    v-model="show"
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
  >
    <v-list>
      <v-list-item
        :disabled="disabledClose"
        @click="closeOutline"
      >
        <v-list-item-title>Close</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item
        :disabled="disabled"
        @click="addEntry"
      >
        <v-list-item-title>Add</v-list-item-title>
      </v-list-item>

      <v-list-item
        :disabled="disabled"
        @click="editEntry"
      >
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>

      <v-list-item
        disabled
        @click="renameEntry"
      >
        <v-list-item-title>Rename</v-list-item-title>
      </v-list-item>

      <v-list-item
        :disabled="disabled"
        @click="deleteEntry"
      >
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>

      <v-list-item
        :disabled="disabled"
        @click="cutEntry"
      >
        <v-list-item-title>Cut</v-list-item-title>
      </v-list-item>

      <v-list-item
        disabled
        @click="copyEntry"
      >
        <v-list-item-title>Copy</v-list-item-title>
      </v-list-item>

      <v-list-item
        :disabled="disabledPaste"
        @click="pasteEntry"
      >
        <v-list-item-title>Paste</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { getMenuActions } from '@/utils/menu-actions'

export default {
  setup (props, context) {
    return {
      ...getMenuActions(context),
    }
  },
}
</script>
