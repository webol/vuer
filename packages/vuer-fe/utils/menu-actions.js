import { computed } from '@nuxtjs/composition-api'
import pathify from '@/utils/pathify'

export function getMenuActions (context) {
  const { call, get, sync } = pathify(context)
  const activeOutlines = sync('graphql/activeOutlines')
  const show = sync('context-menu/show')
  const x = get('context-menu/x')
  const y = get('context-menu/y')
  const cutItem = sync('treeview/cutItem')
  const edit = sync('context-menu/edit')
  const activeItem = sync('treeview/activeItem')

  const addEntry = () => {
    const { eid: parentEid, server } = activeItem.value
    return call('graphql/addEntry', { parentEid, server })
  }

  const closeOutline = () => {
    const aOutlines = activeOutlines?.value || []
    const eid = activeItem?.value?.eid || null
    const index = aOutlines.indexOf(eid)
    if (index > -1) {
      aOutlines.splice(index, 1)
    }
    activeItem.value = null

    return true
  }

  const copyEntry = () => {
    console.log('Copy', activeItem)
  }

  const cutEntry = () => {
    console.log('Cut', activeItem)
    cutItem.value = activeItem.value
  }

  const deleteEntry = () => {
    // replace with vue/vuetify dialog
    const { eid, server } = activeItem.value
    const confirm = window.confirm(`Are you sure you want to delete ${eid} on server ${server}`)
    if (confirm && eid) {
      call('graphql/deleteEntry', { eid, server })
    }
  }

  const editEntry = () => {
    edit.value = true
  }

  const renameEntry = () => {
    const { eid, server } = activeItem.value
    return call('graphql/renameEntry', { eid, server })
  }

  const pasteEntry = () => {
    const { eid } = cutItem.value
    const { eid: parentEid, server } = activeItem.value
    console.log('Paste', eid, parentEid)
    if (!eid || !parentEid) { return }
    setParentEntry(eid, parentEid, server)
  }

  const setParentEntry = (eid, parentEid, server) => {
    call('graphql/setParentEntry', { eid, parentEid, server })
  }

  const disabled = computed(() => {
    return activeItem && !activeItem.value
  })

  const disabledClose = computed(() => {
    return !activeItem?.value?.isOutline
  })

  const disabledPaste = computed(() => {
    return !cutItem?.value
  })

  return {
    addEntry,
    closeOutline,
    copyEntry,
    cutItem,
    cutEntry,
    deleteEntry,
    disabled,
    disabledClose,
    disabledPaste,
    edit,
    editEntry,
    pasteEntry,
    renameEntry,
    show,
    x,
    y,
  }
}
