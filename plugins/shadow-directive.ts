import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('shadow-html', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const linkElem = document.createElement('link')
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute('href', 'ckeditor.css')

      let shadow: ShadowRoot | null = el.shadowRoot

      if (shadow == null) {
        shadow = el.attachShadow({ mode: 'open' })
      }

      shadow.innerHTML = binding.value

      shadow.appendChild(linkElem)
    },
    updated: (el: HTMLElement, binding: DirectiveBinding) => {
      const linkElem = document.createElement('link')
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute('href', 'ckeditor.css')

      let shadow: ShadowRoot | null = el.shadowRoot

      if (shadow == null) {
        shadow = el.attachShadow({ mode: 'open' })
      }

      shadow.innerHTML = binding.value

      shadow.appendChild(linkElem)
    },
  })
})
