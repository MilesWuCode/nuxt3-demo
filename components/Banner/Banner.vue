<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

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

const modules = [Navigation, Pagination]

const { data: banners } = useApiFetch<Banner[]>('/api/banner', {
  query: {
    limit: 10,
  },
  transform: (data: any) => {
    return data.data
  },
})
</script>

<template>
  <Swiper :modules="modules" :navigation="true" :pagination="true">
    <SwiperSlide v-for="banner of banners" :key="banner.id">
      <BannerItem :banner="banner" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
