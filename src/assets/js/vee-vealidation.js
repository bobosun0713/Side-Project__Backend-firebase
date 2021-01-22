import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 帳號
extend('email', (value) => {
  let reg = /[a-zA-Z0-9]+@[a-zA-Z0-9.]+$/
  console.log(reg.test(value))
  return reg.test(value) ? true : 'Email格式錯誤'
})
// 密碼
extend('password', (value) => {
  let reg = /^(?![^a-zA-Z] $)(?!\D $)/
  console.log(reg.test(value))
  return reg.test(value) ? true : '密碼不能為空'
})
