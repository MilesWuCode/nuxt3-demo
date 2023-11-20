<script setup lang="ts">
import type { Post } from '@/types/post'
const { $toast } = useNuxtApp()
const { status } = useAuth()

const loading = ref(false)

const { id, isFavorite: favorite } = defineProps<{
  id: Post['id']
  isFavorite: Boolean
}>()

const isFavorite = ref(favorite)

const onChange = () => {
  loading.value = true

  useApiFetch(`/api/favorite/${isFavorite.value ? 'add' : 'del'}`, {
    method: 'POST',
    body: {
      id,
      model: 'post',
    },
  }).finally(() => {
    loading.value = false
  })
}

const authAlert = () => {
  $toast.error('需要登入')
}
</script>

<template>
  <template v-if="status === 'authenticated'">
    <span v-if="loading" class="loading loading-spinner loading-sm"></span>

    <label v-else class="swap">
      <input v-model="isFavorite" type="checkbox" @change="onChange" />
      <div class="swap-off"><Icon name="IconHeartOutline" /></div>
      <div class="swap-on"><Icon name="IconHeartSolid" /></div>
    </label>
  </template>

  <label v-else>
    <Icon name="IconHeartOutline" class="cursor-pointer" @click="authAlert" />
  </label>
</template>
