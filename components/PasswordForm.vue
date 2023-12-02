<script setup lang="ts">
import { defineRule, configure, useForm, useField } from 'vee-validate'
import { required } from '@vee-validate/rules'
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
})

defineRule('required', required)

type FormValue = {
  password: string
  newPassword: string
  confirmPassword: string
}

const { errors, handleSubmit } = useForm<FormValue>({
  initialValues: {
    password: '',
    newPassword: '',
    confirmPassword: '',
  },
})

// 欄位
const { value: password } = useField('password', 'required', {
  label: t('密碼'),
})
const { value: newPassword } = useField('newPassword', 'required', {
  label: t('新密碼'),
})
const { value: confirmPassword } = useField('confirmPassword', 'required', {
  label: t('確認密碼'),
})

// submit
const onSubmit = handleSubmit(
  (values, actions) => {
    console.log(values, actions)
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
        <span class="label-text" :class="errors.newPassword && 'text-error'">
          New Password
        </span>
        <span class="label-text-alt"></span>
      </label>

      <input
        v-model="newPassword"
        name="newPassword"
        type="password"
        class="input input-bordered"
        :class="errors.newPassword && 'input-error'"
      />

      <label class="label">
        <span class="label-text-alt text-error">{{ errors.newPassword }}</span>
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
    </div>
  </form>
</template>
