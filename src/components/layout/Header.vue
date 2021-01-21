<template>
  <header class="header">
    <div class="header-nav">
      <div class="header-nav__search" style="display:none">
        <font-awesome-icon icon="search" class="icon" />
        <input
          type="text"
          name=""
          id=""
          class="header-nav__search__input"
          placeholder="請輸入關鍵字"
        />
      </div>
      <div class="header-nav__title">BOBO-SUN</div>
      <div class="header-nav__user">
        <div class="header-nav__user__path"></div>
        <button class="header-nav__user__login">
          Sign out
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  background-color: #ffffffff;
  display: flex;
  flex-wrap: wrap;

  // 上導覽
  &-nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 0 40px;

    // 搜尋
    &__search {
      width: 180px;
      // border: 1px solid red;
      box-shadow: 0 0 5px rgb(168, 166, 166);
      padding: 10px 16px;
      border-radius: 25px;
      background-color: #e5e5e5;
      display: flex;
      align-items: center;

      &__input {
        background-color: transparent;
        border: 0;
        //   border: 1px solid blue;
      }
    }

    // 中間
    &__title {
      font-size: 1.25rem;
      letter-spacing: 2px;
      font-weight: bold;
      margin: 0 auto;
      color: #35495e;
      // border: 1px solid;
    }

    // 登入
    &__user {
      width: 180px;
      // border: 1px solid red;
      display: flex;

      // 大頭貼
      &__path {
        //   border: 1px solid;
        box-shadow: 0 0 7px rgb(105, 101, 101);
        height: 50px;
        width: 50px;
        border-radius: 100%;
        background: url('https://picsum.photos/id/1058/600/400') no-repeat
          center center;

        background-size: cover;
      }

      // 登入按鈕
      &__login {
        border: 0;
        cursor: pointer;
        background-color: transparent;
        font-weight: bold;
        align-self: center;
        margin-left: 25px;
        font-size: 1.25rem;
        color: #35495e;
      }
    }
  }
}
</style>
