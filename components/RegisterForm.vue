<script setup lang="ts">
import { InvalidSubmissionContext, useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { zodI18nMap } from 'zod-i18n-map'
import * as i18next from 'i18next'
import * as zod from 'zod'
import translation from 'zod-i18n-map/locales/zh-TW/zod.json'

const router = useRouter()

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
    name: zod.string(),
    email: zod.string().nonempty().email(),
    password: zod.string().nonempty().min(8),
    confirmPassword: zod.string().nonempty().min(8),
  }),
)

// form
const { handleSubmit, errors, setErrors } = useForm({
  validationSchema,
  initialValues: {
    name: 'jack',
    email: 'jack@email.com',
    password: 'password',
    confirmPassword: 'password',
  },
})

// field
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: confirmPassword } = useField('confirmPassword')

// submit
const onSubmit = handleSubmit((values) => {
  // console.log(values)

  useFetch('/laravel-api/auth/register', {
    method: 'post',
    body: {
      name: values.name,
      email: values.email,
      password: values.password,
      comfirm_password: values.confirmPassword,
    },
    onRequest({ request, options }) {
      // Set the request headers
      console.log(request, options)
    },
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log(request, options, error)
    },
    onResponse({ request, response, options }) {
      // Process the response data
      console.log(request, response, options)

      if (response.status === 200) {
        // 成功
        router.push('/login')
      }
    },
    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log(request, response, options)

      if (response.status === 422) {
        console.log(response._data)

        setErrors(response._data.errors)
      }
    },
  })
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
        label="信箱"
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

      <NuxtLink to="/login" class="link-primary link text-sm no-underline">
        Back To Login
      </NuxtLink>
    </div>
  </form>
</template>
