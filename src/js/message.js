export const MessageDialog = {
  methods: {
    // 提次訊息;
    MessageDialog(type, Meg, action) {
      this.$message({
        showClose: action,
        message: Meg,
        type: type,
      })
    },
  },
}
export default MessageDialog
