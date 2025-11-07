<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui'
import type { VxeGridProps } from '#/adapter/vxe-table'
import type { AihumanKeywordInfo } from '#/api/aihuman/aihumanKeyword/types'
import { useVbenDrawer } from '@vben/common-ui'
import { Modal, Popconfirm, Space } from 'ant-design-vue'
import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table'
import { aihumanKeywordExport, aihumanKeywordList, aihumanKeywordRemove } from '#/api/aihuman/aihumanKeyword'
import { commonDownloadExcel } from '#/utils/file/download'
import { getVxePopupContainer } from '@vben/utils'
import { columns, querySchema } from '../aihumanKeyword/data'
import aihumanKeywordModal from '../aihumanKeyword/aihumanKeyword-modal.vue'
import { emitter } from './mitt'
import { ref } from 'vue'

const currentAction = ref<{ id?: string | number; code?: string }>({})

const formOptions: VbenFormProps = {
  commonConfig: { labelWidth: 80, componentProps: { allowClear: true } },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  schema: querySchema(),
}

const equalColumns = columns.map((col: any) => {
  if (col?.type === 'checkbox' || col?.field === 'action') return col
  return { ...col, width: 150 }
})

const gridOptions: VxeGridProps = {
  checkboxConfig: { highlight: true, reserve: true },
  columns: equalColumns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        const params = { pageNum: page.currentPage, pageSize: page.pageSize, ...formValues } as any
        if (currentAction.value?.id) params.actionId = currentAction.value.id
        if (currentAction.value?.code) params.actionCode = currentAction.value.code
        return await aihumanKeywordList(params)
      },
    },
  },
  rowConfig: { keyField: 'id' },
  id: 'aihuman-keyword-panel',
}

const [BasicTable, tableApi] = useVbenVxeGrid({ formOptions, gridOptions })
const [KeywordDrawer, drawerApi] = useVbenDrawer({ connectedComponent: aihumanKeywordModal })

function handleAdd() {
  drawerApi.setData({ actionId: currentAction.value.id, actionCode: currentAction.value.code })
  drawerApi.open()
}

function handleEdit(row: AihumanKeywordInfo) {
  drawerApi.setData({ id: row.id, actionId: currentAction.value.id, actionCode: currentAction.value.code })
  drawerApi.open()
}

async function handleDelete(row: AihumanKeywordInfo) {
  await aihumanKeywordRemove([row.id])
  await tableApi.query()
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords()
  const ids = rows.map((row: AihumanKeywordInfo) => row.id)
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await aihumanKeywordRemove(ids)
      await tableApi.query()
    },
  })
}

function handleDownloadExcel() {
  const formValues = tableApi.formApi.form.values
  commonDownloadExcel(aihumanKeywordExport, '关键词管理子表数据', formValues)
}

emitter.on('actionSelect', async (value) => {
  currentAction.value = value
  await tableApi.query()
})
</script>

<template>
  <div>
    <BasicTable id="keyword" table-title="动作触发关键词">
      <template #toolbar-tools>
        <Space>
          <a-button @click="handleDownloadExcel">导出</a-button>
          <a-button :disabled="!vxeCheckboxChecked(tableApi)" danger type="primary" @click="handleMultiDelete">删除</a-button>
          <a-button :disabled="!currentAction.code && !currentAction.id" type="primary" @click="handleAdd">新增</a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <ghost-button @click.stop="handleEdit(row)">编辑</ghost-button>
          <Popconfirm :get-popup-container="(node) => getVxePopupContainer(node, 'keyword')" placement="left" title="确认删除？" @confirm="handleDelete(row)">
            <ghost-button danger @click.stop="">删除</ghost-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <KeywordDrawer @reload="tableApi.query()" />
  </div>
</template>
