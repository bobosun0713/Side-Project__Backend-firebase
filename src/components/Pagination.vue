<template>
  <div class="bo-pagination">
    <button
      class="bo-pagination__button"
      type="button"
      @click="prevPage"
    ></button>
    <!-- 左 -->

    <ul class="bo-pager">
      <template v-if="nowPage >= viewPage">
        <li class="bo-pager__number" @click="clickPageNum(1)">1</li>
        <li class="bo-pager__number bo-pager__number--quickprev"></li>
      </template>

      <li
        v-for="page in pages"
        :key="page"
        class="bo-pager__number"
        :class="{ 'bo-pager__number--active': nowPage === page }"
        @click="clickPageNum(page)"
      >
        {{ page }}
      </li>

      <template v-if="nowPage >= 1 && nowPage < totalPage - 1">
        <li class="bo-pager__number bo-pager__number--quicknext"></li>
        <li class="bo-pager__number" @click="clickPageNum(totalPage)">
          {{ totalPage }}
        </li>
      </template>
    </ul>

    <!-- 右 -->
    <button
      class="bo-pagination__button "
      type="button"
      @click="nextPage"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    nowPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 0,
    },
    viewPage: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentNum: 1,
    }
  },
  computed: {
    // 判斷起始值
    startPage() {
      if (this.nowPage === 1) {
        // 當等於1時，避免顯示出現0，跟判斷else有相互關西。
        return 1
      } else if (this.nowPage === this.totalPage) {
        // 當nowPage等於總頁數時，把起始值 - 預設顯示值，再加上+1 是為了跑pager迴圈讓畫面固定在範圍內
        return this.nowPage - this.viewPage + 1
      } else {
        // -1 讓active 固定在中間
        return this.nowPage - 1
      }
    },

    endPage() {
      //   console.log('endPage =>', this.startPage + this.viewPage - 1)
      return this.startPage + this.viewPage - 1
    },

    pages() {
      let arrayNum = []
      for (let i = this.startPage; i <= this.endPage; i++) {
        arrayNum.push(i)
      }
      return this.totalPage === 1 ? 1 : this.totalPage === 0 ? 0 : arrayNum
    },
  },
  methods: {
    clickPageNum(num) {
      this.currentNum = num
      this.$emit('total-page-num', num)
    },
    prevPage() {
      if (this.nowPage <= 1) return
      this.$emit('total-page-num', this.nowPage - 1)
    },
    nextPage() {
      if (this.nowPage >= this.totalPage) return
      this.$emit('total-page-num', this.nowPage + 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.bo-pagination {
  margin: 20px auto 0;
  width: 300px;
  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &__button {
    cursor: pointer;
    background-color: transparent;
    border: 0;

    &:nth-of-type(1):before {
      font-family: element-icons;
      content: '\e6de';
      display: block;
    }
    &:nth-of-type(2):before {
      font-family: element-icons;
      content: '\e6e0';
      display: block;
    }

    &:hover {
      color: map-get($theme-colors, light-blue);
    }
  }
}
.bo-pager {
  color: #343a4c;
  width: 70%;
  display: flex;
  justify-content: center;

  &__number {
    width: 20px;
    height: 20px;
    margin: 0 5px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &--active,
    &:hover {
      color: map-get($theme-colors, light-blue);
    }

    // 快速上下頁
    &--quickprev,
    &--quicknext {
      cursor: no-drop;
      position: relative;
      &::before {
        font-family: element-icons;
        content: '\e794';
        position: absolute;
        width: 100%;
        margin: 0 auto;
        display: block;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
}
</style>
