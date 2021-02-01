import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') =>
  moment(dataStr).format(pattern)
)
