<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { AihumanKeywordInfo } from '#/api/aihuman/aihumanKeyword/types';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { getVxePopupContainer } from '@vben/utils';

import {
  Dropdown,
  Menu,
  MenuItem,
  Modal,
  Popconfirm,
  Space,
} from 'ant-design-vue';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  aihumanKeywordExport,
  aihumanKeywordList,
  aihumanKeywordRemove,
} from '#/api/aihuman/aihumanKeyword';
import { commonDownloadExcel } from '#/utils/file/download';

import { columns, querySchema } from './data';
import aihumanKeywordModal from './aihumanKeyword-modal.vue';

defineOptions({
  name: 'AihumanAihumanKeyword',
});

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  schema: querySchema(),
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    highlight: true,
    reserve: true,
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await aihumanKeywordList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'id',
  },
  id: 'aihuman-aihumanKeyword-index',
};

const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [AihumanKeywordModal, drawerApi] = useVbenDrawer({
  connectedComponent: aihumanKeywordModal,
});

function handleAdd() {
  drawerApi.setData({});
  drawerApi.open();
}

function handleEdit(row: AihumanKeywordInfo) {
  drawerApi.setData({ id: row.id });
  drawerApi.open();
}

async function handleDelete(row: AihumanKeywordInfo) {
  await aihumanKeywordRemove([row.id]);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: AihumanKeywordInfo) => row.id);
  Modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await aihumanKeywordRemove(ids);
      await tableApi.query();
    },
  });
}

function handleDownloadExcel() {
  const formValues = tableApi.formApi.form.values;
  commonDownloadExcel(aihumanKeywordExport, '关键词管理子表数据', formValues, {
    fieldMappingTime: formOptions.fieldMappingTime,
  });
}
</script>

<template>
  <Page :auto-content-height="true">
    <div class="flex h-full gap-[8px]">
      <BasicTable class="overflow-hidden flex-1" table-title="关键词管理子表列表">
        <template #toolbar-tools>
          <Space>
            <a-button
              v-access:code="['aihuman:aihumanKeyword:export']"
              @click="handleDownloadExcel"
            >
              {{ $t('pages.common.export') }}
            </a-button>
            <a-button
              :disabled="!vxeCheckboxChecked(tableApi)"
              danger
              type="primary"
              v-access:code="['aihuman:aihumanKeyword:remove']"
              @click="handleMultiDelete"
            >
              {{ $t('pages.common.delete') }}
            </a-button>
            <a-button
              type="primary"
              v-access:code="['aihuman:aihumanKeyword:add']"
              @click="handleAdd"
            >
              {{ $t('pages.common.add') }}
            </a-button>
          </Space>
        </template>
        <template #action="{ row }">
          <Space>
            <ghost-button
              v-access:code="['aihuman:aihumanKeyword:edit']"
              @click.stop="handleEdit(row)"
            >
              {{ $t('pages.common.edit') }}
            </ghost-button>
            <Popconfirm
              :get-popup-container="getVxePopupContainer"
              placement="left"
              title="确认删除？"
              @confirm="handleDelete(row)"
            >
              <ghost-button
                danger
                v-access:code="['aihuman:aihumanKeyword:remove']"
                @click.stop=""
              >
                {{ $t('pages.common.delete') }}
              </ghost-button>
            </Popconfirm>
          </Space>
        </template>
      </BasicTable>
    </div>
    <AihumanKeywordModal @reload="tableApi.query()" />
  </Page>
</template>
