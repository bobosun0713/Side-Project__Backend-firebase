<template>
  <li class="sidebar__nav__item">
    <a
      href="javascript:;"
      class="sidebar__nav__item__link"
      v-if="!item.path"
      @click="toggleOpen"
    >
      <font-awesome-icon :icon="item.icon" class="icon" />
      {{ item.name }}
    </a>
    <router-link v-else :to="item.path" class="sidebar__nav__item__link">
      <font-awesome-icon :icon="item.icon" class="icon" />
      {{ item.name }}
    </router-link>
    <ul
      class="sidebar__nav sidebar__nav__child"
      :style="{ height: ChildrenHight }"
    >
      <side-menu-item
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></side-menu-item>
    </ul>
    <!-- <ul
      class="sidebar__nav sidebar__nav__child"
      v-show="menuChild && isListOpen"
      :style="{ height: getHight }"
    >
      <side-menu-item
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></side-menu-item>
    </ul> -->
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
  },
  data() {
    return {
      isListOpen: false,
      itemLen: this.item.children,
    };
  },
  methods: {
    toggleOpen() {
      this.isListOpen = !this.isListOpen;
    },
  },
  computed: {
    // 使用這個開關，過渡效果不是特別優化。
    menuChild() {
      return this.item.children && this.item.children.length ? true : false;
    },

    // 動態給高度。
    ChildrenHight() {
      return this.isListOpen ? `${84 * this.itemLen.length}px` : "0px";
    },
  },
};
</script>

<style></style>
