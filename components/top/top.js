Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    name: {
      type: String
    }
  },
  data: {
  },
  methods: {
    onChange(e) {
      if (e.detail.name === '音乐馆') {
        wx.switchTab({
          url: "/pages/index/index"
        })
      } else if (e.detail.name === '我的') {
        wx.switchTab({
          url: '/pages/mine/mine'
        })
      } else {
        wx.switchTab({
          url: "/pages/vio/vio"
        })
      }
    },
    tosearch(){
      wx.reLaunch({
        url: '/pages/search/search',
      })
    },
  }
})