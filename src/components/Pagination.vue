<template>
  <div class="bo-pagination">
    <button class="bo-pagination__button" type="button" @click="prevPage">
      <font-awesome-icon
        icon="angle-left"
        class="pagination-icon"
      ></font-awesome-icon>
    </button>
    <!-- 左 -->

    <ul class="bo-pager">
      <!-- <li v-if="nowPage > viewPage" class="bo-pager__number">1</li> -->
      <li
        v-for="page in pagers"
        :key="page"
        class="bo-pager__number"
        :class="{ 'bo-pager__number--active': nowPage === page }"
        @click="clickPageNum(page)"
      >
        {{ page }}
      </li>
      <!-- <li v-if="nowPage !== totalPage" class="bo-pager__number">
        {{ totalPage }}
      </li> -->
    </ul>

    <!-- 右 -->
    <button class="bo-pagination__button" type="button" @click="nextPage">
      <font-awesome-icon
        icon="angle-right"
        class="pagination-icon"
      ></font-awesome-icon>
    </button>
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
    starPage() {
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
      console.log('endPage =>', this.starPage + this.viewPage - 1)
      return this.starPage + this.viewPage - 1
    },

    pagers() {
      let arrayNum = []
      for (let i = this.starPage; i <= this.endPage; i++) {
        arrayNum.push(i)
      }
      return arrayNum
    },
  },
  methods: {
    clickPageNum(num) {
      this.currentNum = num
      this.$emit('total-page-num', num)
    },
    prevPage() {
      this.$emit('total-page-num', this.nowPage - 1)
    },
    nextPage() {
      this.$emit('total-page-num', this.nowPage + 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.bo-pagination {
  margin: 20px auto 0;
  width: 300px;
  background-color: white;
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;

  &__button {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: relative;
    background-color: transparent;
    border: 0;
  }
}
.bo-pager {
  color: #343a4c;
  width: 55%;
  display: flex;
  justify-content: space-around;

  &__number {
    font-size: 1rem;
    cursor: pointer;
    &--active {
      color: map-get($theme-colors, error);
    }
  }
}
</style>
