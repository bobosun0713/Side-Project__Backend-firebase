<template>
  <div class="search-form">
    <h2 class="search-form__title">{{ '搜尋' + title }}</h2>
    <div class="search-form__content">
      <input
        type="text"
        class="search-form__content__input bo-input "
        v-model="value"
        :placeholder="title + '名稱'"
      />
      <button class="search-form__content__submit" @click="clickSubmit">
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
      fullscreenLoading: false,
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
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 7px rgb(206, 201, 201);
  margin-bottom: 30px;
  padding: 0 30px;

  &__title {
    font-size: 18px;
    padding: 15px 0;
    border-bottom: 1px solid rgb(202, 201, 201);
  }

  &__content {
    display: flex;
    padding: 15px 0;

    // 輸入框
    &__input {
      width: 100%;
    }

    // 按鈕
    &__submit {
      cursor: pointer;
      padding: 5px 10px;
      width: 100px;
      margin-left: 15px;
      border-radius: 5px;
      border: 0;
      background-color: $sub-color-blue;
      color: white;
    }
  }
}
</style>
