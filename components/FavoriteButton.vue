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

const onClick = () => {
  loading.value = true

  const isToggle = !isFavorite.value

  useApiFetch(`/api/favorite/${isToggle ? 'add' : 'del'}`, {
    method: 'POST',
    body: {
      id,
      model: 'post',
    },
  })
    .then(() => {
      isFavorite.value = isToggle
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
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

    <button v-else @click="onClick">
      <Icon v-if="isFavorite" name="IconHeartSolid" />
      <Icon v-else name="IconHeartOutline" />
    </button>
  </template>

  <label v-else>
    <Icon name="IconHeartOutline" class="cursor-pointer" @click="authAlert" />
  </label>
</template>
