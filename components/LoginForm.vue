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
    email: zod.string().nonempty().email(),
    password: zod.string().nonempty().min(8),
  }),
)

// form
const { handleSubmit, errors, setFieldError, setErrors } = useForm({
  validationSchema,
  initialValues: {
    email: 'test@email.com',
    password: 'password',
  },
})

// field
const { value: email } = useField('email')
const { value: password } = useField('password')

// auth
const { signIn } = useAuth()

// submit
const onSubmit = handleSubmit((values) => {
  signIn('credentials', {
    email: values.email,
    password: values.password,
    // redirect: false,
  })

  // console.log(signInResponse)
  // 若redirect為false時不會重新刷新頁面到目的頁
  // 可以使用回傳判別
  // switch (signInResponse?.status) {
  //   case 200:
  //     // const url = new URL(signInResponse?.url || '/')

  //     // router.push(url.searchParams.get('callbackUrl') || '/')
  //     alert(200)

  //     break
  //   case 422:
  //     alert(422)

  //     break
  //   default:
  //     alert('unknow error')
  // }
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

    <!-- 按鈕 -->
    <div class="flex flex-col space-y-2">
      <button type="submit" class="btn btn-primary">Submit</button>

      <div class="flex justify-between space-x-2 text-sm">
        <NuxtLink to="/?register" class="link-primary link no-underline">
          Register Now
        </NuxtLink>
        <NuxtLink to="/?forgot-password" class="link no-underline">
          Forgot Password
        </NuxtLink>
      </div>
    </div>
  </form>
</template>
