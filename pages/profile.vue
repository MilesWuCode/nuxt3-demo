<script setup lang="ts">
import ProfileForm from '~/components/ProfileForm.vue'
import PasswordForm from '~/components/PasswordForm.vue'

definePageMeta({
  middleware: 'auth',
})

// 使用以下方法取得auth相關資料
// const { data, status, getCsrfToken, getProviders } = useAuth()

// const providers = await getProviders()

// const csrfToken = await getCsrfToken()

// console.table(data.value)

// console.log(status.value, providers, csrfToken)

const currentTab = ref<'ProfileForm' | 'PasswordForm'>('ProfileForm')
</script>

<template>
  <div class="container m-2">
    <!-- 標題 -->
    <h1 class="flex justify-center text-2xl">Profile</h1>

    <!-- 區塊 -->
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <!-- 分頁 -->
        <div class="tabs my-2">
          <a
            class="tab tab-lifted"
            :class="currentTab === 'ProfileForm' && 'tab-active'"
            @click="currentTab = 'ProfileForm'"
          >
            Detail
          </a>
          <a
            class="tab tab-lifted"
            :class="currentTab === 'PasswordForm' && 'tab-active'"
            @click="currentTab = 'PasswordForm'"
          >
            Change Password
          </a>
        </div>

        <!-- 顯示分頁組件 -->
        <Component
          :is="currentTab === 'ProfileForm' ? ProfileForm : PasswordForm"
        />
      </div>
    </div>
  </div>
</template>
