import requset from '../../utils/request'
Page({
  data: {
    bannerData: [],
    RecommendedPlaylist: [],
    ids: 'a0',
    LeaderboardPlaylist: []
  },
  onLoad() {
    this.getBannerData()
    this.getRecommendedPlaylist()
    this.getLeaderboardPlaylist()
  },
  //轮播图数据
  async getBannerData() {
    let res = await requset('/banner')
    this.setData({
      bannerData: res.banners
    })
  },
  //获取推荐歌单
  async getRecommendedPlaylist() {
    let res = await requset('/personalized')
    this.setData({
      RecommendedPlaylist: res.result
    })
  },
  viewInto(e) {
    this.setData({
      ids: e.currentTarget.id
    })
  },
  //获取排行榜歌单
  async getLeaderboardPlaylist() {
    let parmass = ["轻音乐", "夜晚", "学习", "流行", "校园"]
    let idex = 0
    let newArr = []
    while (idex < 5) {
      let res = await requset('/top/playlist', { cat: parmass[idex], limit: 3 })
      idex += 1
      newArr.push(res)
    }
    this.setData({
      LeaderboardPlaylist: newArr
    })
  },
  //toMusicLists
  toMusicLists(){
    wx.reLaunch({
      url: '/pages/music/music',
    })
  }
})