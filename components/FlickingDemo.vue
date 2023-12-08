<script setup lang="ts">
import Flicking, { type FlickingOptions } from '@egjs/vue3-flicking'
import { Arrow } from '@egjs/flicking-plugins'
import '@egjs/vue3-flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/arrow.css'
const list = ref([1, 2, 3, 4, 5, 6])

const flicking = ref<Flicking>()

const options: Partial<FlickingOptions> = {
  align: 'prev',
  circular: true,
}

const circular = () => {
  if (flicking.value) {
    // flicking.value.next()
    flicking.value.circular = !flicking.value.circular
  }
}

const plugins = [
  new Arrow({
    moveByViewportSize: true,
  }),
]
</script>

<template>
  <div>
    <Flicking ref="flicking" :options="options" :plugins="plugins">
      <div v-for="idx in list" :key="idx" class="pointer-events-none">
        <img :src="`https://fakeimg.pl/400x300/?text=${idx}`" />
      </div>
      <template #viewport>
        <span class="flicking-arrow-prev is-circle hidden md:block"></span>
        <span class="flicking-arrow-next is-circle hidden md:block"></span>
      </template>
    </Flicking>

    <button class="btn" @click="circular">circular</button>
  </div>
</template>
