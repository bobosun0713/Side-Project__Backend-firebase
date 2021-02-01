<template>
  <div class="search-form">
    <h2 class="search-form-title">{{ '搜尋' + title }}</h2>
    <div class="search-form-content">
      <input
        v-model="value"
        type="text"
        class="search-form-content__input bo-input"
        :placeholder="title + '名稱'"
      />
      <button class="bo-button bo-button--blue" @click="clickSubmit">
        搜尋
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    clickSubmit() {
      const loading = this.$loading({
        lock: true,
        text: '搜尋中 請稍後!',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        this.$emit('search-value', this.value)
        loading.close()
      }, 1500)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-form {
  width: 100%;
  background-color: map-get($theme-colors, 'white');
  border-radius: 10px;
  box-shadow: 0 0 7px map-get($theme-colors, shadow);
  margin-bottom: 30px;
  padding: 0 30px;

  &-title {
    font-size: 18px;
    padding: 15px 0;
    border-bottom: 1px solid map-get($theme-colors, shadow);
  }

  &-content {
    display: flex;
    padding: 15px 0;

    // 輸入框
    &__input {
      width: 100%;
      margin-right: 15px;
    }
  }
}
</style>
