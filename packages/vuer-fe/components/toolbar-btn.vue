<template>
  <v-tooltip bottom>
    <template #activator="{ attrs, on }">
      <v-btn
        v-bind="attrs"
        :disabled="disabled"
        icon
        v-on="{
          ...on,
          click: clickAction
        }"
      >
        <v-icon v-text="icon" />
      </v-btn>
    </template>
    <span class="text-capitalize">{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ToolbarBtn',

  props: {
    clickAction: {
      type: Function,
      default: () => { return null },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
}
</script>