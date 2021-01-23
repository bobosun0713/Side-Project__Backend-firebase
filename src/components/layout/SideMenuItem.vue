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
    <ul class="sidebar__nav sidebar__nav__child" :style="{ height: getHight }">
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
      itemLen: "",
    };
  },
  methods: {
    toggleOpen() {
      this.isListOpen = !this.isListOpen;
    },
  },
  computed: {
    menuChild() {
      return this.item.children && this.item.children.length ? true : false;
    },
    getHight() {
      return this.isListOpen ? `${80 * this.itemLen.length}px` : "0px";
    },
  },
  mounted() {
    // 每個item 渲染玩，把props的children資料存在變數裡
    // 在取得length 直接取得會報警告訊息
    this.itemLen = this.item.children;
  },
};
</script>

<style></style>
