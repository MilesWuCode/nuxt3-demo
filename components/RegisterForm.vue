<script setup lang="ts">
import { defineRule, configure, useForm, useField } from 'vee-validate'
import { confirmed, email as Email, min, required } from '@vee-validate/rules'
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

  !meta.value.valid && validate()
})

defineRule('confirmed', confirmed)
defineRule('email', Email)
defineRule('min', min)
defineRule('required', required)

type FormValue = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const { errors, handleSubmit, meta, setErrors, validate } = useForm<FormValue>({
  // initialValues: {
  //   name: user?.name,
  // },
})

// 欄位
const { value: name } = useField<string>('name', 'required', {
  label: computed(() => t('名稱')),
})

const { value: email } = useField<string>('email', 'required|email', {
  label: computed(() => t('信箱')),
})

const { value: password } = useField<string>('password', 'required|min:8', {
  label: computed(() => t('密碼')),
})

const { value: confirmPassword } = useField<string>(
  'confirmPassword',
  'required|confirmed:@password',
  {
    label: computed(() => t('確認密碼')),
  },
)

const { $toast } = useNuxtApp()

// submit
const onSubmit = handleSubmit(
  async (values) => {
    console.log(values)
    await useApiFetch('/api/auth/register', {
      method: 'post',
      body: {
        name: values.name,
        email: values.email,
        password: values.password,
        confirm_password: values.confirmPassword,
      },
      onResponse({ request, response, options }) {
        // Process the response data
        console.log(request, response, options)

        if (response.ok) {
          // 成功
          $toast.success('Success')
        }
      },
      onResponseError({ request, response, options }) {
        // Handle the response errors
        console.log(request, response, options)

        if (response.status === 422) {
          console.log(response._data)

          setErrors(response._data.errors)
        } else {
          $toast.error('Error')
        }
      },
    })
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
        <span class="label-text" :class="errors.name && 'text-error'">
          Name
        </span>
        <span class="label-text-alt"></span>
      </label>

      <input
        v-model="name"
        name="name"
        type="text"
        class="input input-bordered"
        :class="errors.name && 'input-error'"
      />

      <label class="label">
        <span class="label-text-alt text-error">{{ errors.name }}</span>
        <span class="label-text-alt"></span>
      </label>
    </div>

    <!-- 欄位 -->
    <div class="form-control">
      <label class="label">
        <span class="label-text" :class="errors.email && 'text-error'">
          Email address
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

    <!-- 欄位 -->
    <div class="form-control">
      <label class="label">
        <span
          class="label-text"
          :class="errors.confirmPassword && 'text-error'"
        >
          Confirm Password
        </span>
        <span class="label-text-alt"></span>
      </label>

      <input
        v-model="confirmPassword"
        name="confirmPassword"
        type="password"
        class="input input-bordered"
        :class="errors.confirmPassword && 'input-error'"
      />

      <label class="label">
        <span class="label-text-alt text-error">
          {{ errors.confirmPassword }}
        </span>
        <span class="label-text-alt"></span>
      </label>
    </div>

    <!-- 按鈕 -->
    <div class="flex flex-col space-y-2">
      <button type="submit" class="btn btn-primary">Submit</button>

      <NuxtLink to="/login" class="link link-primary text-sm no-underline">
        Back To Login
      </NuxtLink>
    </div>
  </form>
</template>
