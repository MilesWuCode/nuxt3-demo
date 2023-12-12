<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaNode, emblaApi] = emblaCarouselVue(
  {
    loop: !true,
    dragFree: true,
    align: 'start',
    // slidesToScroll: 2,
  },
  [
    /* Autoplay({ delay: 3000 }) */
  ],
)

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const dots = ref<number[]>([])

const canPrev = ref(false)

const canNext = ref(false)

const scrollIndex = ref<number>(0)

watchEffect(() => {
  if (emblaApi.value) {
    emblaApi.value.on('select', onSelect)
    emblaApi.value.on('resize', onSelect)

    onSelect()
  }
})

const onSelect = () => {
  if (emblaApi.value) {
    dots.value = emblaApi.value?.scrollSnapList()
    scrollIndex.value = emblaApi.value.selectedScrollSnap()
    canPrev.value = emblaApi.value?.canScrollPrev() || false
    canNext.value = emblaApi.value?.canScrollNext() || false
  }
}

const onScrollTo = (index: number) => {
  emblaApi.value && emblaApi.value.scrollTo(index)
}

const onPrev = () => {
  emblaApi.value && emblaApi.value.scrollPrev()
}
const onNext = () => {
  emblaApi.value && emblaApi.value.scrollNext()
}
</script>

<template>
  <div class="relative">
    <div ref="emblaNode" class="embla">
      <div class="embla__container">
        <div v-for="idx of list" :key="idx" class="embla__slide">
          <img :src="`https://fakeimg.pl/400x300/?text=${idx}`" />
        </div>
      </div>
    </div>
    <div class="absolute left-[100px] top-[100px]">
      <button class="btn btn-lg z-[1]" :disabled="!canPrev" @click="onPrev">
        Prev
      </button>
      <button class="btn btn-lg z-[1]" :disabled="!canNext" @click="onNext">
        Next
      </button>
    </div>
    <div class="space-x-4">
      <button
        v-for="(_, idx) of dots"
        :key="idx"
        class="btn btn-xs"
        :class="{ 'btn-info': idx === scrollIndex }"
        @click="onScrollTo(idx)"
      >
        {{ idx + 1 }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
  /* width: 400px; */
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 400px;
  min-width: 0;
}
</style>
