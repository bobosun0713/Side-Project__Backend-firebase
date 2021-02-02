<template>
  <div class="bo-pagination">
    <button class="bo-pagination__button" type="button" @click="changePage(-1)">
      <font-awesome-icon
        icon="angle-left"
        class="pagination-icon"
      ></font-awesome-icon>
    </button>
    <!-- 左 -->

    <ul class="bo-pager">
      <li
        v-for="page in pagers"
        :key="page"
        class="bo-pager__number"
        :class="{ 'bo-pager__number--active': nowPage === page }"
        @click="test(page)"
      >
        {{ page }}
      </li>
    </ul>

    <!-- 右 -->
    <button class="bo-pagination__button" type="button" @click="changePage(1)">
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
    parPage: {
      type: Number,
      default: 4,
    },
    pageData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentNum: 1,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.pageData.length / this.parPage)
    },

    pagers() {
      // v1 版本 待改良
      const arrayNum = []
      if (this.nowPage > 3) {
        for (let i = 4; i <= this.totalPage; i++) {
          arrayNum.push(i)
        }
      } else {
        for (let i = 1; i <= this.totalPage - 3; i++) {
          arrayNum.push(i)
        }
      }

      // v2 版本 即將量產

      return arrayNum
    },
  },
  methods: {
    test(num) {
      this.currentNum = num
      this.$emit('total-page-num', num)
    },
    changePage(num) {
      let pageNum = this.currentNum + num
      if (pageNum < 1) {
        this.currentNum = 1
      } else if (pageNum > this.totalPage) {
        this.currentNum = this.totalPage
      } else {
        this.currentNum = pageNum
      }

      this.$emit('total-page-num', this.currentNum)
    },
  },
}
</script>

<style lang="scss" scoped>
.bo-pagination {
  margin: 0 auto;
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
