<template>
  <li class="menu__item">
    <!-- 一 -->
    <router-link
      v-if="!menuChild"
      :to="item.path"
      class="menu__item__link"
      active-class="active"
      :default-active="this.$route.path"
    >
      <font-awesome-icon :icon="item.icon" class="menu-icon" />
      {{ item.name }}
    </router-link>

    <!-- 二 -->
    <template v-else>
      <a
        class="menu__item__link"
        :class="{ 'menu__item__link--active': isListOpen }"
        href="javascript:;"
        @click="toggleOpen"
      >
        <font-awesome-icon :icon="item.icon" class="menu-icon" />
        {{ item.name }}
        <font-awesome-icon icon="chevron-right" class="menu-arrow-down" />
      </a>
      <ul class="sub-menu" ref="test" :style="{ height: ChildrenHight }">
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
      activeLink: '',
    }
  },
  methods: {
    toggleOpen() {
      this.isListOpen = !this.isListOpen
    },
  },
  computed: {
    nowPath() {
      return this.$route.fullPath
    },

    // 使用這個開關，過渡效果不是特別優化。
    menuChild() {
      return this.item.children && this.item.children.length
    },

    // 動態給高度
    ChildrenHight() {
      return this.isListOpen ? `${45 * this.itemLen.length}px` : '0px'
    },
  },

  mounted() {
    if (!this.item.children) return
    this.isListOpen = Boolean(
      this.item.children.find((child) => child.path === this.nowPath)
    )
  },
}
</script>

<style lang="scss">
.menu__item__link--active {
  > .menu-arrow-down {
    transform: rotate(90deg);
  }
}
</style>
