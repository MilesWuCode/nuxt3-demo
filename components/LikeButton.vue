<script setup lang="ts">
import type { Post, Reaction } from '@/types/post'
import { formatCompactNumber } from '@/libs/formater'

const { $toast } = useNuxtApp()

const { status } = useAuth()

const props = defineProps<{
  id: Post['id']
  reaction: Reaction
}>()

const id = props.id

const loading = ref(false)

const originReaction = reactive<Reaction>({
  like_count: props.reaction.like_count || 0,
  dislike_count: props.reaction.dislike_count || 0,
  like_state: props.reaction.like_state || '',
  favorite_state: props.reaction.favorite_state || false,
})

const reaction = reactive<Reaction>({
  like_count: props.reaction.like_count || 0,
  dislike_count: props.reaction.dislike_count || 0,
  like_state: props.reaction.like_state || '',
  favorite_state: props.reaction.favorite_state || false,
})

const likeCount = computed(() => {
  let count = 0

  if (originReaction.like_state === 'Like' && reaction.like_state !== 'Like') {
    count = -1
  } else if (
    originReaction.like_state !== 'Like' &&
    reaction.like_state === 'Like'
  ) {
    count = +1
  }

  return reaction.like_count + count
})

const dislikeCount = computed(() => {
  let count = 0

  if (
    originReaction.like_state === 'Dislike' &&
    reaction.like_state !== 'Dislike'
  ) {
    count = -1
  } else if (
    originReaction.like_state !== 'Dislike' &&
    reaction.like_state === 'Dislike'
  ) {
    count = +1
  }

  return reaction.dislike_count + count
})

function onLike() {
  sendLikeState(reaction.like_state === 'Like' ? 'unlike' : 'like')
}

const onDislike = () => {
  sendLikeState(reaction.like_state === 'Dislike' ? 'undislike' : 'dislike')
}

const likeStateMap = new Map<string, Reaction['like_state']>([
  ['like', 'Like'],
  ['unlike', ''],
  ['dislike', 'Dislike'],
  ['undislike', ''],
])

function sendLikeState(likeState: string) {
  if (loading.value) {
    return
  }

  if (status.value !== 'authenticated') {
    $toast.error('需要登入')

    return
  }

  loading.value = true

  useApiFetch(`/api/like/${likeState}`, {
    method: 'POST',
    body: {
      id,
      model: 'post',
    },
  })
    .then(() => {
      reaction.like_state = likeStateMap.get(likeState) || ''
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="join">
    <button
      class="btn join-item"
      :class="{ 'btn-active': reaction.like_state === 'Like' }"
      :disabled="loading"
      @click="onLike"
    >
      <Icon name="icon-park-outline:thumbs-up" class="h-4 w-4" />
      <div class="badge">{{ formatCompactNumber(likeCount) }}</div>
    </button>

    <button
      class="btn join-item"
      :class="{ 'btn-active': reaction.like_state === 'Dislike' }"
      :disabled="loading"
      @click="onDislike"
    >
      <Icon name="icon-park-outline:thumbs-down" class="h-4 w-4" />
      <div class="badge">{{ formatCompactNumber(dislikeCount) }}</div>
    </button>
  </div>
</template>
