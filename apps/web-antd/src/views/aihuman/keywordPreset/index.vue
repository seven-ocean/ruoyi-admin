<script setup lang="ts">
import { onUnmounted } from 'vue'
import { Page } from '@vben/common-ui'
import KeywordPanel from './keyword-panel.vue'
import ActionPresetPanel from './action-preset-panel.vue'
import { emitter } from './mitt'
onUnmounted(() => emitter.all.clear())
</script>

<template>
  <Page :auto-content-height="true" content-class="flex flex-col lg:flex-row gap-4">
    <ActionPresetPanel class="flex-1 overflow-hidden" />
    <KeywordPanel class="flex-1 overflow-hidden" />
  </Page>
</template>
