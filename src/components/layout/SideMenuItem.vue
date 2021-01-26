<template>
  <li class="menu__item">
    <!-- 一 -->
    <router-link
      v-if="!menuChild"
      :to="item.path"
      class="menu__item__link"
    >
      <font-awesome-icon :icon="item.icon" class="menu-icon" />
      {{ item.name }}
    </router-link>

    <!-- 二 -->
    <template v-else>
      <a class="menu__item__link" href="javascript:;" @click="toggleOpen">
        <font-awesome-icon :icon="item.icon" class="menu-icon" />
        {{ item.name }}
        <font-awesome-icon
          icon="chevron-right"
          class="menu-drop-down"
          :style="{ transform: iconRotate }"
        />
      </a>
      <ul
        class="sub-menu"
        :style="{ height: ChildrenHight }"
        ref="subMenuHeight"
      >
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
      return this.item.children && this.item.children.length;
    },

    iconRotate() {
      return this.isListOpen ? "rotate(94deg)" : "rotate(0)";
    },

    // 動態給高度
    ChildrenHight() {
      return this.isListOpen ? `${45 * this.itemLen.length}px` : "0px";
    },
  },
};
</script>

<style></style>
