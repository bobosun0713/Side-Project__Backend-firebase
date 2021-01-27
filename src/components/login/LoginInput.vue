<template>
  <validation-provider
    class="login-form__item login-form__margin"
    v-slot="{ failed, errors }"
    tag="div"
    :rules="type.rules"
    mode="lazy"
  >
    <input
      class="login-form__input"
      :class="{ 'error-input': failed }"
      :type="type.type"
      v-model="getValue"
      :placeholder="type.name"
    />
    <p class="login-form__input__error">{{ errors[0] }}</p>
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

<style ></style>
