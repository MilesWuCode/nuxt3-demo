<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
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
    name: zod.string().nonempty(),
  }),
)

const { data: userData } = await useApiFetch('/api/me')

// form
const { handleSubmit, errors, setFieldError, setErrors } = useForm({
  validationSchema,
  initialValues: {
    name: userData.value?.data.name || '',
  },
})

// field
const { value: name } = useField('name')
const { $toast } = useNuxtApp()

// submit
const onSubmit = handleSubmit(
  async (values) => {
    await useApiFetch('/api/me', {
      method: 'put',
      body: {
        name: values.name,
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
        <span class="label-text" :class="errors.name && 'text-error'">
          Name
        </span>
        <span class="label-text-alt"></span>
      </label>

      <input
        v-model="name"
        label="名稱"
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

    <!-- 按鈕 -->
    <div class="flex flex-col space-y-2">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>
