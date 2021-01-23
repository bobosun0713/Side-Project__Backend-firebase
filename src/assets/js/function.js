// Timestamp時間轉換
export const GetTimeMixin = {
  computed: {
    getDate() {
      return (time) => {
        let year = new Date(time).getUTCFullYear();
        let Month = new Date(time).getMonth() + 1;
        let date = new Date(time).getDate();
        let Hours = new Date(time).getHours();
        let Min = new Date(time).getMinutes();
        let scs = new Date(time).getSeconds();
        return `${year}-${Month}-${date} | ${Hours}:${Min}:${scs}`;
      };
    },
  }
}

// 共用搜尋，需搭配外層資料
export const SearchMixin = {
  data() {
    return {
      mixinTitle: '',
      mixinAry: [],
    }
  },
  methods: {
    SearchMixin(Data, Type) {
      this.mixinAry = Data.filter((val) => val[Type].match(this.mixinTitle));
    },
  },
}

