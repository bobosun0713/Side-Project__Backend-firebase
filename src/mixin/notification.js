export const NotifiCation = {
  methods: {
    // 提次訊息;
    NotifiCation(title, type, Meg, action) {
      this.$notify({
        title: title,
        showClose: action,
        message: Meg,
        type: type,
      })
    },
  },
}
export default NotifiCation
