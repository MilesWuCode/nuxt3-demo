import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: new Notyf(),
    },
  }
})
