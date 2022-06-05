import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import * as ContrastUtil from 'wcag-contrast-util'

createApp(App).use(createPinia()).mount('#app')

if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.ContrastUtil = ContrastUtil
}
