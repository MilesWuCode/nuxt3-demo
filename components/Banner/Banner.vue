<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export type Banner = {
  id: string | number
  name: string
  link: string
  cover: string
}

const modules = [Autoplay, Navigation, Pagination]

const { pending, data: banners } = useApiFetch<Banner[]>('/api/banner', {
  query: {
    limit: 10,
  },
  transform: (data: any) => {
    return data.data
  },
})
</script>

<template>
  <div>
    <div v-if="pending">Loading...</div>
    <template v-else>
      <Swiper
        v-if="banners && banners.length > 0"
        :slides-per-view="'auto'"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :auto-height="false"
        :space-between="0"
        :modules="modules"
        :navigation="true"
        :pagination="{
          clickable: true,
        }"
      >
        <SwiperSlide
          v-for="banner of banners"
          :key="banner.id"
          class="!w-full md:!w-auto"
        >
          <BannerItem :banner="banner" />
        </SwiperSlide>
      </Swiper>
    </template>
  </div>
</template>

<style lang="css" scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* @media (min-width: 768px) {
  .swiper-slide {
    width: auto;
  }
} */
</style>
