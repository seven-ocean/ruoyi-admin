<template>
  <BasicDrawer :close-on-click-modal="false" :title="title" class="w-[600px]">
    <BasicForm />
  </BasicDrawer>
</template>

<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { aihumanActionPresetAdd, aihumanActionPresetInfo, aihumanActionPresetUpdate } from '#/api/aihuman/aihumanActionPreset';

import { modalSchema } from './data';

const emit = defineEmits<{ reload: [] }>();

const isUpdate = ref(false);
const title = computed(() => {
  return isUpdate.value ? $t('pages.common.edit') : $t('pages.common.add');
});

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onCancel: handleCancel,
  onConfirm: handleConfirm,
  async onOpenChange(isOpen) {
    if (!isOpen) {
      return null;
    }
    drawerApi.drawerLoading(true);

    const { id } = drawerApi.getData() as { id?: number | string };
    isUpdate.value = !!id;

    if (isUpdate.value && id) {
      const record = await aihumanActionPresetInfo(id);
      const normalized = { ...record } as any;
      if (normalized.paramsSchema) {
        try {
          const obj = typeof normalized.paramsSchema === 'string'
            ? JSON.parse(normalized.paramsSchema)
            : normalized.paramsSchema;
          normalized.paramsSchema = JSON.stringify(obj, null, 2);
        } catch {
          // keep original
        }
      }
      formApi.setValues(normalized);
    } else {
      formApi.resetForm();
    }

    drawerApi.drawerLoading(false);
  },
});

const [BasicForm, formApi] = useVbenForm({
  schema: modalSchema(),
  commonConfig: {
    componentProps: {
      allowClear: true,
    },
  },
  wrapperClass: 'grid-cols-1',
  showDefaultActions: false,
} as VbenFormProps);

async function handleConfirm() {
  try {
    drawerApi.drawerLoading(true);
    const values = await formApi.submitForm();
    await (isUpdate.value ? aihumanActionPresetUpdate(values) : aihumanActionPresetAdd(values));
    emit('reload');
    await handleCancel();
  } catch (error) {
    console.error(error);
  } finally {
    drawerApi.drawerLoading(false);
  }
}

async function handleCancel() {
  await drawerApi.close();
  formApi.resetForm();
}
</script>
