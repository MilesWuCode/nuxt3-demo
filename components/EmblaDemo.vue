<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'

const [emblaNode, emblaApi] = emblaCarouselVue({ loop: false })

watchEffect(() => {
  if (emblaApi.value) {
    console.log(emblaApi.value.slideNodes()) // Access API
  }
})

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
</script>

<template>
  <div ref="emblaNode" class="embla">
    <div class="embla__container">
      <div v-for="idx of list" :key="idx" class="embla__slide">
        <img :src="`https://fakeimg.pl/400x300/?text=${idx}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}
</style>
