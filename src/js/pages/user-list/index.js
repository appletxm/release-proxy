import html from './template.html'
import models from './models'
import columns from './columns'

export default {
  template: html,
  data() {
    return {
      currentPageNum: 0,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0,
      userList: [],
      loadingObj: null,
      msgObj: null,
      columns: columns,
      optRowData: {}
    }
  },
  created() {
    models.listUserInfo(this.pageSize, this.currentPageNum, this)
  },
  mounted() {},
  methods: {
    changeCurrentPage(pageNum) {
      this.currentPageNum = pageNum
      models.listUserInfo(this.pageSize, this.currentPageNum, this)
    },

    tableCellClick(rowData, cellObj, cellDom, event) {
      console.info(cellDom.className, cellDom.className === 'el-table_1_column_1  el-table__expand-column')
      this.optRowData = rowData
    },

    $showLoading() {
      this.loadingObj = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      })
    },

    $showMsg(type, msg) {
      this.msgObj = this.$message({
        message: msg,
        showClose: true,
        type: type,
        duration: 2000
      })
    },

    $closeLoading() {
      if (this.loadingObj) {
        this.loadingObj.close()
      }
    }
  },
  components: {}
}
