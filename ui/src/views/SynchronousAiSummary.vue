<script lang="ts" setup>
import type { ListedPost } from '@halo-dev/api-client'
import { computed, toRefs } from 'vue'
import { VEntityField } from '@halo-dev/components'
import { hasWrittenAiSummary } from '@/utils/summary-status'
import StreamlineAiEditRobot from '~icons/streamline-plump-color/ai-edit-robot?width=1.2em&height=1.2em'

const props = withDefaults(
  defineProps<{
    post: ListedPost
  }>(),
  {},
)

const { post } = toRefs(props)

const summaryUpdated = computed(() => {
  return hasWrittenAiSummary(post.value.post)
})
</script>

<template>
  <VEntityField v-if="summaryUpdated" v-tooltip="'智阅AI摘要已回写到文章'">
    <template #description>
      <StreamlineAiEditRobot class=":uno: cursor-pointer text-sm" />
    </template>
  </VEntityField>
</template>
