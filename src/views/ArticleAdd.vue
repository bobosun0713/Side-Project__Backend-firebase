<template>
  <div class="article-add">
    <div class="article-form">
      <div class="article-form__upload">s</div>
      <div class="article-form__content">s</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleAdd",
};
</script>

<style lang="scss" scoped>
.article-add {
  padding: 30px 35px;

  .article-form {
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 7px rgb(196, 192, 192);
    height: 600px;
    padding: 20px;

    display: flex;
    justify-content: space-between;

    &__upload {
      width: 49%;
      border: 1px solid blue;
    }

    &__content {
      width: 49%;
      border: 1px solid blue;
    }
  }
}
</style>