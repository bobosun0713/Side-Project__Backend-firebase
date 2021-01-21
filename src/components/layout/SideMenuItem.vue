<template>
  <li class="sidebar-content__nav__item">
    <a @click="toggleOpen" href="javascript:;">
      <font-awesome-icon :icon="item.icon" class="icon" />
      {{ item.name }}
    </a>
    <transition name="slide">
      <ul class="sidebar-content__nav" v-show="menuChild && isListOpen">
        <side-menu-item
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        ></side-menu-item>
      </ul>
    </transition>
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
  },
  data() {
    return {
      isListOpen: false,
    }
  },
  methods: {
    toggleOpen() {
      this.isListOpen = !this.isListOpen
    },
  },
  computed: {
    menuChild() {
      return this.item.children && this.item.children.length ? true : false
    },
  },
}
</script>

<style></style>
