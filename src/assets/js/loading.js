export const isLoading = {
  data() {
    return {
      loading: null,
    }
  },
  methods: {
    isLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    },
  },
}
