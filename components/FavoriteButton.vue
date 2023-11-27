<script setup lang="ts">
import type { Post } from '@/types/post'

const { $toast } = useNuxtApp()

const { status } = useAuth()

const loading = ref(false)

const { id, isFavorite: favorite = false } = defineProps<{
  id: Post['id']
  isFavorite: boolean | undefined
}>()

const isFavorite = ref(favorite)

const onClick = () => {
  if (loading.value) {
    return
  }

  if (status.value !== 'authenticated') {
    $toast.error('需要登入')

    return
  }

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
  <button
    v-if="status === 'authenticated'"
    class="btn"
    :disabled="loading"
    @click="onClick"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
    <template v-else>
      <Icon v-if="isFavorite" name="IconHeartSolid" class="h-4 w-4" />
      <Icon v-else name="IconHeartOutline" class="h-4 w-4" />
    </template>
  </button>
  <button v-else class="btn" @click="authAlert">
    <Icon name="IconHeartOutline" class="h-4 w-4" />
  </button>
</template>
