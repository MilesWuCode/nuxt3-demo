<template>
  <picture class="w-full">
    <source
      srcset="http://localhost:3000/images/768x384.png"
      media="(min-width: 768px)"
    />
    <source
      srcset="http://localhost:3000/images/640x320.png"
      media="(min-width: 640px)"
    />
    <!-- 最小 -->
    <img src="http://localhost:3000/images/320x160.png" width="100%" />
  </picture>
</template>
