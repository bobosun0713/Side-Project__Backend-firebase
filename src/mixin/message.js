export const MessageDialog = {
  methods: {
    // 提次訊息;
    MessageDialog(title, type, Meg, action) {
      this.$notify({
        title: title,
        showClose: action,
        message: Meg,
        type: type,
      })
    },
  },
}
export default MessageDialog
