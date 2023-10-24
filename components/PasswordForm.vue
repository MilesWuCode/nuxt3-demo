<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { zodI18nMap } from 'zod-i18n-map'
import * as i18next from 'i18next'
import * as zod from 'zod'
import ja from 'zod-i18n-map/locales/ja/zod.json'
import zhHant from 'zod-i18n-map/locales/zh-TW/zod.json'
import { useI18n } from '#imports'

// 語系
const { locale, t } = useI18n()

i18next.init({
  lng: locale.value,
  resources: {
    'zh-Hant': { zod: zhHant },
    ja: { zod: ja },
  },
})

watch(locale, (newVal) => {
  // 切換語系
  i18next.changeLanguage(newVal)

  // 1.立即更新錯誤提示語系,但會觸發驗證
  meta.value.dirty && validate()

  // 2.若有api回傳錯誤的欄位,建議重置表單
  // resetForm()

  // 3.不執行1或2,因為無法更新api回傳錯誤的欄位
})

zod.setErrorMap(zodI18nMap)

// schema
const validationSchema = toTypedSchema(
  zod
    .object({
      password: zod.string().nonempty().min(8),
      newPassword: zod.string().nonempty().min(8),
      confirmPassword: zod.string().nonempty().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('與密碼不一致'),
      path: ['confirmPassword'],
    }),
)

// form
const {
  errors,
  handleSubmit,
  meta,
  // resetForm,
  // setErrors,
  // setFieldError,
  validate,
} = useForm({
  validationSchema,
})

// field
const { value: password } = useField('password')
const { value: newPassword } = useField('newPassword')
const { value: confirmPassword } = useField('confirmPassword')

// submit
const onSubmit = handleSubmit(
  (values) => {
    console.log(values)
  },
  ({ values, errors, results }) => {
    // field-name
    const name = Object.keys(errors)[0]

    // focus
    document.getElementsByName(name)[0].focus()

    console.log(values) // current form values
    console.log(errors) // a map of field names and their first error message
    console.log(results) // a detailed map of field names and their validation results
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
        label="新密碼"
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
        label="確認密碼"
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
