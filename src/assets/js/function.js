// Timestamp時間轉換
export const GetTimeMixin = {
  computed: {
    getDate() {
      return (time) => {
        let year = new Date(time).getUTCFullYear()
        let Month = new Date(time).getMonth() + 1
        let date = new Date(time).getDate()
        let Hours = new Date(time).getHours()
        let Min = new Date(time).getMinutes()
        let scs = new Date(time).getSeconds()
        return `${year}-${Month}-${date} -- ${Hours}:${Min}:${scs}`
      }
    },
  },
}

// 讀取時
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
