<template>
  <div class="container">
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <!-- 表單 -->
        <form>
          <!-- 欄位 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email address</span>
              <span class="label-text-alt"></span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered"
            />
            <label class="label">
              <span class="label-text-alt text-error">Bottom Left label</span>
              <span class="label-text-alt"></span>
            </label>
          </div>
          <!-- 欄位 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
              <span class="label-text-alt"></span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-error"
            />

            <label class="label">
              <span class="label-text-alt text-error">Bottom Left label</span>
              <span class="label-text-alt"></span>
            </label>
          </div>
          <!-- 按鈕 -->
          <div class="flex flex-col space-y-2">
            <button type="submit" class="btn btn-primary">Submit</button>

            <div class="flex justify-between space-x-2 text-sm">
              <NustLink to="/register" class="link-primary link no-underline"
                >Register Now</NustLink
              >
              <NustLink to="/forgot-password" class="link no-underline"
                >Forgot Password</NustLink
              >
            </div>
          </div>
        </form>

        <!-- 水平線 -->
        <div class="divider">OR</div>

        <!-- 其他登入 -->
        <div class="space-y-2">
          <button class="btn w-full"><NuxtIcon name="google" />Google</button>
          <button class="btn w-full"><NuxtIcon name="apple" />Apple</button>
        </div>
      </div>
    </div>
  </div>
</template>
