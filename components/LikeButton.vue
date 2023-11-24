<script setup lang="ts">
import type { Post } from '@/types/post'

const { $toast } = useNuxtApp()

const { status } = useAuth()

const loading = ref(false)

const { id } = defineProps<{
  id: Post['id']
}>()

const onLike = () => {}
const onDislike = () => {}

const authAlert = () => {
  $toast.error('需要登入')
}
</script>

<template>
  <span v-if="loading" class="loading loading-spinner loading-sm"></span>

  <div class="join">
    <button class="btn join-item" @click="onLike">
      <Icon name="icon-park-outline:thumbs-up" class="h-6 w-6" />
      <div class="badge">123</div>
    </button>

    <button class="btn join-item" @click="onDislike">
      <Icon name="icon-park-outline:thumbs-down" class="h-6 w-6" />
    </button>
  </div>
</template>
