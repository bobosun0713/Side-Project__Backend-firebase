<template>
  <validation-provider
    class="login-form__body-group"
    :name="type.name"
    v-slot="{ failed, errors }"
    tag="div"
    :rules="type.rules"
    mode="lazy"
  >
    <label class="login-form__body-group__title" for=""
      >{{ type.name }}
    </label>
    <input
      class="login-form__body-group__input"
      :class="{ 'error-input': failed }"
      :type="type.type"
      v-model="getValue"
      placeholder="請輸入密碼"
    />
    <p class="login-form__body-group__error">{{ errors[0] }}</p>
  </validation-provider>
</template>

<script>
export default {
  name: "LoginInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style></style>
