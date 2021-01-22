<template>
  <quill-editor v-model="getValue" :options="editorOption"> </quill-editor>
</template>

<script>
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    getValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  data() {
    return {
      editorOption: {
        placeholder: '請輸入內容...',
        theme: 'snow',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
/deep/ .ql-container {
  height: 200px;
}
</style>
