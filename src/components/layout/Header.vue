<template>
  <header class="header">
    <div class="header-content">
      <!-- sidebar -->
      <button class="side-menu-control" @click="switchBtn">
        <span class="side-menu-control__line"></span>
      </button>
      <!-- logout -->
      <button class="bo-button bo-button--logout">
        Sing Out
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
      switchMenu: false,
    }
  },
  methods: {
    SignOut() {
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
    switchBtn() {
      this.switchMenu = !this.switchMenu
      this.$emit('switch-btn')
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  background-color: white;

  &-content {
    padding: 15px 0;
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;

    // button
    .side-menu-control {
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
        background-color: $main-color;
        border-radius: 10px;
        position: relative;

        &::before,
        &::after {
          content: '';
          display: block;
          height: 3px;
          width: 100%;
          background-color: $main-color;
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

    // logout
    .bo-button--logout {
      margin-right: 25px;
      cursor: pointer;
      background-color: $main-color;
      border: 0;
      padding: 5px 10px;
      border-radius: 5px;
      color: white;
      font-weight: 600;
      box-shadow: 1px 1px 2px #5f5e5e;
      transition: transform, box-shadow 0.3s;

      &:active {
        transform: translateY(0.5px);
        box-shadow: 0 0 0;
      }
    }
  }

  // // breadcrumb
  // .breadcrumb {
  //   display: flex;
  //   padding: 5px 25px;
  //   border-top: 1px solid rgb(226, 220, 220);
  //   border-bottom: 1px solid rgb(226, 220, 220);
  //   flex-basis: 100%;

  //   &__links {
  //     position: relative;
  //     font-size: 12px;

  //     &:not(:first-child) {
  //       margin-left: 15px;
  //       &:before {
  //         content: '\276F';
  //         position: absolute;
  //         left: -10px;
  //         font-size: 10px;
  //         top: 0px;
  //       }
  //     }
  //   }
  // }
}
</style>
