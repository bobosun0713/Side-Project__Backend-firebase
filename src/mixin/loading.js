export const IsLoading = {
  data() {
    return {
      loading: null,
    }
  },
  methods: {
    IsLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    },
  },
}

export default IsLoading
