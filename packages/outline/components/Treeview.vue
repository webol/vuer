<template>
  <v-treeview
    activatable
    item-key="eid"
    item-text="name"
    item-children="children"
    transition
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #label="{ item, open }">
      <div
        @click="treeViewLabelClick(item)"
        @contextmenu="openMenu($event, item)"
      >
        <v-icon v-if="item.parentEid">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          $outline
        </v-icon>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </v-treeview>
</template>
<script>
export default {

  name: 'Treeview',
  props: {
    openMenu: {
      type: Function,
      default: () => {},
    },
    treeViewLabelClick: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
