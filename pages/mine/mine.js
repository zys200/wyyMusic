import request from '../../utils/request'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    firw: 0,
    isLogin: false,
    userinfo: {},
    zj: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getZJ()
  },
  //获取最近播放
  async getZJ() {
    let res = await request("/record/recent/song")
    this.setData({
      zj: res.data
    })
  },
  bts(e) {
  },
  btm(a) {
    let acc = a.changedTouches[0].clientY
    if (acc > 330) return
    this.setData({
      firw: acc - 250
    })
  },
  bte(c) {
    this.setData({
      firw: 0
    })
  },
  //去登陆
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let result = wx.getStorageSync('userInfo')
    if (result) {
      let res = JSON.parse(wx.getStorageSync('userInfo'))
      this.setData({
        isLogin: true,
        userinfo: res
      })
    }
  }
})