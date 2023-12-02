<script setup lang="ts">
import { defineRule, configure, useForm, useField } from 'vee-validate'
import { email as Email, required, min } from '@vee-validate/rules'
import { setLocale, localize } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import zhHant from '@vee-validate/i18n/dist/locale/zh_TW.json'

configure({
  generateMessage: localize({
    'zh-Hant': zhHant,
    ja,
  }),
  // 預設值
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
})

// 語系
const { locale, t } = useI18n()

// 預設語系
setLocale(locale.value)

// 切換語系
watch(locale, (newVal) => {
  setLocale(newVal)

  // 1.立即更新錯誤提示語系,需要重新驗證
  // meta.value.dirty && validate()

  // 2.若有api回傳錯誤的欄位,無翻譯建議重置表單
  // resetForm()

  // 3.建議不執行1或2,因為無法更新api回傳錯誤的欄位
})

defineRule('email', Email)
defineRule('required', required)
defineRule('min', min)

type FormValue = {
  email: string
  password: string
}

const { errors, handleSubmit, setFieldError } = useForm<FormValue>({
  initialValues: {
    email: 'test@email.com',
    password: 'password',
  },
})

// 欄位
const { value: email } = useField('email', 'required|email', {
  label: t('信箱'),
})

const { value: password } = useField('password', 'required|min:8', {
  label: t('密碼'),
})

// auth
const { signIn } = useAuth()

// router
const route = useRoute()

const runtimeConfig = useRuntimeConfig()

const callbackUrl = new URL(
  route.query.callbackUrl?.toString() || runtimeConfig.public.appUrl,
)

// 送出/送出發生錯誤
const onSubmit = handleSubmit(
  async (values, actions) => {
    console.log(values, actions)

    const { error, url } = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    if (error) {
      // Do your custom error handling here

      setFieldError('email', t('帳號或密碼錯誤'))
    } else {
      // No error, continue with the sign in, e.g., by following the returned redirect:

      // return navigateTo(url, { external: true })
      return navigateTo(callbackUrl.pathname)
    }
  },
  ({ values, errors, results }) => {
    console.log(values, errors, results)

    const name = Object.keys(errors)[0]

    document.getElementsByName(name)[0].focus()
  },
)
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!-- 欄位 -->
    <div class="form-control">
      <label class="label">
        <span class="label-text" :class="errors.email && 'text-error'">
          Email
        </span>
        <span class="label-text-alt"></span>
      </label>

      <input
        v-model="email"
        name="email"
        type="text"
        class="input input-bordered"
        :class="errors.email && 'input-error'"
      />

      <label class="label">
        <span class="label-text-alt text-error">{{ errors.email }}</span>
        <span class="label-text-alt"></span>
      </label>
    </div>

    <!-- 欄位 -->
    <div class="form-control">
      <label class="label">
        <span class="label-text" :class="errors.password && 'text-error'">
          Password
        </span>
        <span class="label-text-alt"></span>
      </label>

      <input
        v-model="password"
        label="密碼"
        name="password"
        type="password"
        class="input input-bordered"
        :class="errors.password && 'input-error'"
      />

      <label class="label">
        <span class="label-text-alt text-error">{{ errors.password }}</span>
        <span class="label-text-alt"></span>
      </label>
    </div>

    <!-- 按鈕 -->
    <div class="flex flex-col space-y-2">
      <button type="submit" class="btn btn-primary">Submit</button>

      <div class="flex justify-between space-x-2 text-sm">
        <NuxtLink to="/register" class="link link-primary no-underline">
          Register Now
        </NuxtLink>
        <NuxtLink to="/?forgot-password" class="link link-primary no-underline">
          Forgot Password ?
        </NuxtLink>
      </div>
    </div>
  </form>
</template>
