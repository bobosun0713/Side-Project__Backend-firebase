<template>
  <div class="admin-form">
    <validation-observer
      ref="form"
      class="admin-form__container"
      tag="form"
      @submit.prevent="addAdmin"
    >
      <validation-provider
        v-slot="{ errors }"
        class="admin-form__group"
        tag="div"
        rules="required"
        mode="lazy"
      >
        <label for="" class="admin-form__group__title">管理員名稱</label>
        <input
          v-model="adminData.name"
          type="text"
          class="admin-form__group__input bo-input"
          placeholder="請輸入名稱"
        />
        <transition name="error">
          <p v-if="errors[0]" class="error__message">
            {{ errors[0] }}
          </p>
        </transition>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        class="admin-form__group"
        tag="div"
        rules="required|email"
        mode="lazy"
      >
        <label for="" class="admin-form__group__title">管理員帳號</label>
        <input
          v-model="adminData.email"
          type="text"
          class="admin-form__group__input bo-input"
          placeholder="請輸入Email"
        />
        <transition name="error">
          <p v-if="errors[0]" class="error__message">
            {{ errors[0] }}
          </p>
        </transition>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        class="admin-form__group"
        tag="div"
        rules="required|password"
        mode="lazy"
      >
        <label for="" class="admin-form__group__title">管理員密碼</label>
        <input
          v-model="adminData.password"
          type="password"
          class="admin-form__group__input bo-input"
          placeholder="請輸入密碼"
        />
        <transition name="error">
          <p v-if="errors[0]" class="error__message">
            {{ errors[0] }}
          </p>
        </transition>
      </validation-provider>
      <!-- 按鈕 -->
      <button class="bo-button">新增</button>
    </validation-observer>
  </div>
</template>

<script>
import IsLoading from '@/assets/js/loading.js'
import MessageDialog from '@/assets/js/message.js'
import { User, UserCollection } from '@/db'
export default {
  name: 'AdminAdd',
  mixins: [IsLoading, MessageDialog],
  data() {
    return {
      adminData: {
        name: '',
        email: '',
        password: '',
        time: +new Date(),
      },
    }
  },
  methods: {
    // 新增帳戶
    addAdmin() {
      this.$refs.form.validate().then((success) => {
        if (!success) return
        this.IsLoading()
        User.createUserWithEmailAndPassword(
          this.adminData.email,
          this.adminData.password
        )
          .then(() => {
            this.addAdminDb()
            this.MessageDialog('success', '帳號新增成成功', true)
            this.loading.close()
            this.$router.push('/admin/list')
          })
          .catch((error) => {
            this.MessageDialog('error', error.message, true)
          })
      })
    },

    // 新增至DB資料
    addAdminDb() {
      UserCollection.add(this.adminData)
    },
  },
}
</script>

<style lang="scss" scoped>
.admin-form {
  padding: 30px 35px;
  &__container {
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.548);
    box-shadow: 0 0 7px rgb(206, 201, 201);
    border-radius: 15px;
  }
}

.admin-form__group {
  margin-bottom: 30px;
  position: relative;
  &__title {
    display: inline-block;
    margin-bottom: 10px;
  }
  &__input {
    width: 100%;
  }
}
</style>
