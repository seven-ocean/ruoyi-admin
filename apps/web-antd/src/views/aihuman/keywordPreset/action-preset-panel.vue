<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui'
import type { VxeGridProps } from '#/adapter/vxe-table'
import type { AihumanActionPresetInfo } from '#/api/aihuman/AihumanActionPreset/types'
import { useVbenDrawer } from '@vben/common-ui'
import { h } from 'vue'
import { Modal, Popconfirm, Space } from 'ant-design-vue'
import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table'
import { aihumanActionPresetExport, aihumanActionPresetList, aihumanActionPresetRemove } from '#/api/aihuman/AihumanActionPreset'
import { commonDownloadExcel } from '#/utils/file/download'
import { getVxePopupContainer } from '@vben/utils'
import { columns, querySchema } from '../aihumanActionPreset/data'
import aihumanActionPresetModal from '../aihumanActionPreset/aihumanActionPreset-modal.vue'
import AsrDialog from './asr-dialog.vue'
import { emitter } from './mitt'

const formOptions: VbenFormProps = {
  commonConfig: { labelWidth: 80, componentProps: { allowClear: true } },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  schema: querySchema(),
}

const tunedColumns = (columns as any[]).map((col: any) => {
  if (col?.field === 'paramsSchema') {
    return {
      ...col,
      width: 120 ,
      showOverflow: true,
      slots: {
        ...(col.slots || {}),
        header: () =>
          h('div', { class: 'leading-tight' }, [
            h('div', null, 'ASR接口参数'),
            h('div', { class: 'text-xs opacity-70' }, '(JSON Schema)')
          ]),
      },
    }
  }
  if (col?.field === 'description') {
    return {
      ...col,
      width: 200,
    }
  }
  if (col?.type === 'checkbox' || col?.field === 'action') {
    return col
  }
  return { ...col, width: 100 }
})

const gridOptions: VxeGridProps = {
  checkboxConfig: { highlight: true, reserve: true },
  columns: tunedColumns as any,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await aihumanActionPresetList({ pageNum: page.currentPage, pageSize: page.pageSize, ...formValues })
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'aihuman-action-preset-panel',
}

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    cellClick: ({ row }) => {
      emitter.emit('actionSelect', { id: row.id, code: row.actionCode })
    },
  },
})

const [ActionPresetDrawer, drawerApi] = useVbenDrawer({ connectedComponent: aihumanActionPresetModal })
const [AsrDrawer, asrDrawerApi] = useVbenDrawer({ connectedComponent: AsrDialog })

function handleAdd() {
  drawerApi.setData({})
  drawerApi.open()
}

function handleEdit(row: AihumanActionPresetInfo) {
  drawerApi.setData({ id: row.id })
  drawerApi.open()
}

function handleAsr(row: AihumanActionPresetInfo) {
  asrDrawerApi.setData({ id: row.id, actionCode: row.actionCode })
  asrDrawerApi.open()
}

async function handleDelete(row: AihumanActionPresetInfo) {
  await aihumanActionPresetRemove([row.id])
  await tableApi.query()
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords()
  const ids = rows.map((row: AihumanActionPresetInfo) => row.id)
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await aihumanActionPresetRemove(ids)
      await tableApi.query()
    },
  })
}

function handleDownloadExcel() {
  const formValues = tableApi.formApi.form.values
  commonDownloadExcel(aihumanActionPresetExport, '动作预设数据', formValues)
}
</script>

<template>
  <div>
    <BasicTable id="action-preset" table-title="动作列表">
      <template #toolbar-tools>
        <Space>
          <a-button @click="handleDownloadExcel">导出</a-button>
          <a-button :disabled="!vxeCheckboxChecked(tableApi)" danger type="primary" @click="handleMultiDelete">删除</a-button>
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button @click.stop="handleAsr(row)">ASR 识别</ghost-button>
          <ghost-button @click.stop="handleEdit(row)">编辑</ghost-button>
          <Popconfirm :get-popup-container="(node) => getVxePopupContainer(node, 'action-preset')" placement="left" title="确认删除？" @confirm="handleDelete(row)">
            <ghost-button danger @click.stop="">删除</ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <ActionPresetDrawer @reload="tableApi.query()" />
    <AsrDrawer />
  </div>
</template>
