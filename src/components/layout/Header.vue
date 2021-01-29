<template>
  <header class="header">
    <div class="header-control">
      <!-- sidebar -->
      <button class="header-control-button" @click="toggleOpen">
        <span class="header-control-button__line"></span>
      </button>
      <!-- logout -->
      <button class="bo-button bo-button--logout" @click="signOut">
        Sign Out
      </button>
    </div>
    <bread-crumb></bread-crumb>
  </header>
</template>

<script>
import BreadCrumb from '@/components/layout/BreadCrumbs.vue'
import { User } from '@/db'

export default {
  name: 'Header',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      isOpenSideBar: false,
    }
  },
  methods: {
    signOut() {
      this.$confirm(`確定登出?`, '登出', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          User.signOut().then(() => {
            this.$store.dispatch('removeUid')
            this.MessageDialog('success', '已登出', false)
            this.$router.push('/login')
          })
        })
        .catch(() => {
          this.MessageDialog('warning', '已取消登出', false)
        })
    },
    toggleOpen() {
      this.isOpenSideBar = !this.isOpenSideBar
      this.$emit('open-menu')
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  position: sticky;
  top: 0;

  &-control {
    padding: 15px 0;
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    // button
    &-button {
      margin-left: 25px;
      padding: 10px 0;
      height: 30px;
      cursor: pointer;
      background-color: transparent;
      border: 0;
      &__line {
        display: block;
        height: 3px;
        width: 30px;
        background-color: map-get($theme-colors,dark-blue);
        border-radius: 10px;
        position: relative;

        &::before,
        &::after {
          content: '';
          display: block;
          height: 3px;
          width: 100%;
          background-color: map-get($theme-colors,dark-blue);
          border-radius: 10px;
          position: absolute;
        }

        &::before {
          top: 8px;
        }

        &::after {
          top: -8px;
        }
      }
    }
  }
}
</style>
