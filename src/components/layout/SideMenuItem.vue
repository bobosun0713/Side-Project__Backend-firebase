<template>
  <li class="menu-list__item">
    <!-- 一 -->
    <router-link v-if="!itemLen" :to="item.path" class="menu-list__item__link">
      <font-awesome-icon
        :icon="item.icon"
        class="menu-icon"
      ></font-awesome-icon>
      <span>{{ item.name }}</span>
    </router-link>

    <!-- 二 -->
    <template v-else>
      <a
        class="menu-list__item__link"
        :class="{ 'menu-list__item__link--active': isListOpen }"
        href="javascript:;"
        @click="toggleOpen"
      >
        <font-awesome-icon
          :icon="item.icon"
          class="menu-icon"
        ></font-awesome-icon>
        <span>{{ item.name }}</span>
        <font-awesome-icon
          icon="chevron-right"
          class="menu-arrow-down"
        ></font-awesome-icon>
      </a>
      <ul class="menu-list--sub" :style="{ height: childrenHight }">
        <side-menu-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        ></side-menu-item>
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    active: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isListOpen: false,
      itemLen: this.item.children,
    }
  },
  computed: {
    nowPath() {
      return this.$route.fullPath
    },

    childrenHight() {
      return this.isListOpen ? `${41 * this.itemLen.length}px` : '0px'
    },
  },

  mounted() {
    if (!this.itemLen) return
    this.isListOpen = Boolean(
      this.itemLen.find((child) => child.path === this.nowPath)
    )
  },
  methods: {
    toggleOpen() {
      this.isListOpen = !this.isListOpen
    },
  },
}
</script>

<style lang="scss">
// menu
.menu-list {
  &__item {
    overflow: hidden;
    &__link {
      padding: 10px 30px;
      display: block;
      font-size: 16px;
      transition: all 1s;
      color: map-get($theme-colors, light-white);
      &--active {
        > .menu-arrow-down {
          transform: rotate(90deg);
        }
      }
    }
  }

  // 下拉選單
  &--sub {
    background-color: map-get($theme-colors, light-blue);
    transition: all 0.5s;
  }
}
</style>
