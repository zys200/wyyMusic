import requset from '../../utils/request'
import pubsub from 'pubsub-js'
Page({
  data: {
    HotDetailsLists: [],
    title: '推荐歌曲',
    changeId: 0,
    indexmuc: 0
  },
  onLoad(options) {
    this.getHotDetails()
    //切换相关
    pubsub.subscribe('type', (name, type) => {
      let { HotDetailsLists, indexmuc } = this.data
      if (type === 'sy') {
        indexmuc -= 1
      } else {
        indexmuc += 1
      }
      this.setData({
        indexmuc
      })
      let newID = HotDetailsLists[indexmuc].id
      pubsub.publish('newID', newID)
    })
  },
  //获取推荐歌曲
  async getHotDetails() {
    let res = await requset('/recommend/songs')
    this.setData({
      HotDetailsLists: res.data.dailySongs.slice(0, 9)
    })
  },
  //去听歌
  toListen(e) {
    let { ids, indexmuc } = e.currentTarget.dataset
    this.setData({
      changeId: ids >>> 0,
      indexmuc: indexmuc >>> 0
    })
    wx.navigateTo({
      url: '/pages/player/player?songs=' + ids
    })
  },
})