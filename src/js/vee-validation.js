import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('email', {
  ...rules.email,
  message: 'Email格式錯誤',
})

extend('password', (value) => {
  let reg = /^([a-zA-Z]+\d+|\d+[a-zA-Z]+)[a-zA-Z0-9]*$/
  return !reg.test(value) ? '密碼格式必須含有英文及數字' : true
})

extend('required', {
  ...rules.required,
  message: '欄位不能為空',
})

extend('image', {
  ...rules.required,
  message: '至少上傳一張圖片',
})
