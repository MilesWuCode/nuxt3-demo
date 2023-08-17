<script setup lang="ts">
import { InvalidSubmissionContext, useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { zodI18nMap } from 'zod-i18n-map'
import * as i18next from 'i18next'
import * as zod from 'zod'
import translation from 'zod-i18n-map/locales/zh-TW/zod.json'

// i18n
i18next.init({
  lng: 'zhTW',
  resources: {
    zhTW: { zod: translation },
  },
})

zod.setErrorMap(zodI18nMap)

// schema
const validationSchema = toTypedSchema(
  zod.object({
    password: zod.string().nonempty().min(8),
    newPassword: zod.string().nonempty().min(8),
    confirmPassword: zod.string().nonempty().min(8),
  }),
)

// form
const { handleSubmit, errors, setFieldError, setErrors } = useForm({
  validationSchema,
})

// field
const { value: password } = useField('password')
const { value: newPassword } = useField('newPassword')
const { value: confirmPassword } = useField('confirmPassword')

// submit
const onSubmit = handleSubmit((values) => {
  console.log(values)
}, onInvalidSubmit)

// error
function onInvalidSubmit({
  values,
  errors,
  results,
}: InvalidSubmissionContext) {
  // field-name
  const name = Object.keys(errors)[0]

  // focus
  document.getElementsByName(name)[0].focus()

  console.log(values) // current form values
  console.log(errors) // a map of field names and their first error message
  console.log(results) // a detailed map of field names and their validation results
}
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
        label="名稱"
        name="password"
        type="text"
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
        label="名稱"
        name="newPassword"
        type="text"
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
        label="名稱"
        name="confirmPassword"
        type="text"
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
