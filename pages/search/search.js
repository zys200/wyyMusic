import request from '../../utils/request'
let isSend = false
Page({
  data: {
    hotList: [],
    inpText: '',
    yusousuo: [],
    searchList: []
  },
  onLoad(options) {
    this.getHotList()
  },
  inpsearch(e) {
    let inpText = e.detail.value
    this.setData({
      inpText
    })
    if (!this.data.inpText || isSend) return
    isSend = true
    this.getSearchList(inpText)
    //节流
    setTimeout(() => {
      isSend = false
    }, 300)
  },
  //预搜索
  async getSearchList(kw) {
    let res = await request('/cloudsearch', { keywords: kw })
    // console.log(res.result.songs);
    this.setData({
      yusousuo: res.result.songs
    })
  },
  //热搜榜单列表
  async getHotList() {
    let res = await request('/search/hot/detail')
    // console.log(res.data);
    this.setData({
      hotList: res.data
    })
  },
  //点击按钮搜索
  toSearch() {
    this.setData({
      searchList: this.getSearchList(this.data.inpText),
      inpText: ''
    })
    // console.log(this.data.searchList);
  }
})