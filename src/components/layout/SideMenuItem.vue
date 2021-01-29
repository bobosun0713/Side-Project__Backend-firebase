<template>
  <li class="menu-list__item">
    <!-- 一 -->
    <router-link
      v-if="!itemLen"
      :to="item.path"
      class="menu-list__item__link"
      active-class="active"
      :default-active="this.$route.path"
    >
      <font-awesome-icon
        :icon="item.icon"
        class="menu-icon"
      ></font-awesome-icon>
      {{ item.name }}
    </router-link>

    <!-- 二 -->
    <template v-else>
      <a
        class="menu-list__item__link"
        :class="{ 'sidebar-menu-item__link--active': isListOpen }"
        href="javascript:;"
        @click="toggleOpen"
      >
        <font-awesome-icon
          :icon="item.icon"
          class="menu-icon"
        ></font-awesome-icon>
        {{ item.name }}
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
  name: "SideMenuItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    active: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isListOpen: false,
      itemLen: this.item.children,
    };
  },
  computed: {
    nowPath() {
      return this.$route.fullPath;
    },

    childrenHight() {
      return this.isListOpen ? `${41 * this.itemLen.length}px` : "0px";
    },
  },

  mounted() {
    if (!this.itemLen) return;
    this.isListOpen = Boolean(
      this.itemLen.find((child) => child.path === this.nowPath)
    );
  },
  methods: {
    toggleOpen() {
      this.isListOpen = !this.isListOpen;
    },
  },
};
</script>

<style lang="scss">
.sidebar-menu-item__link--active {
  > .menu-arrow-down {
    transform: rotate(90deg);
  }
}
</style>
