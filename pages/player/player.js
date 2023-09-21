import request from '../../utils/request'
import pubsub from 'pubsub-js'
import moment from 'moment';
let backgroundAudioManager = wx.getBackgroundAudioManager()
let instance = getApp()
Page({
  data: {
    isPlay: false,
    ids: 0,
    SongDetails: {},
    MuiscInfo: {},
    time1: '00:00',
    time2: '00:00',
    nowWidth: 0
  },
  onLoad(options) {
    //监听对应音乐是否在播放且切换动画
    setTimeout(() => {
      if (this.data.SongDetails.id === instance.globalData.isMusicID >>> 0 && instance.globalData.isMusicPlay) {
        //时时时间
        backgroundAudioManager.onTimeUpdate(() => {
          let time1 = moment(backgroundAudioManager.currentTime * 1000).format('mm:ss')
          let nowWidth = backgroundAudioManager.currentTime * 400 / backgroundAudioManager.duration
          this.setData({
            time1,
            nowWidth
          })
        });
        this.setData({
          isPlay: true
        })
      }
    }, 400)
    this.setData({
      ids: options.songs >> 0
    })
    this.getSongDetails(this.data.ids)
    this.getMuiscInfo(this.data.ids)
    //监听音乐状态
    setTimeout(() => {
      backgroundAudioManager.onPlay(() => {
        this.setData({
          isPlay: true
        })
      })
      backgroundAudioManager.onPause(() => {
        this.setData({
          isPlay: false
        })
      })
      //自然结束
      backgroundAudioManager.onEnded(() => {
        this.setData({
          isPlay: false
        })
      })
    }, 50)
  },
  //获取对应ID歌曲
  async getSongDetails(ids) {
    let res = await request('/song/detail', { ids })
    let t2 = moment(res.songs[0].dt).format('mm:ss')
    this.setData({
      SongDetails: res.songs[0],
      time2: t2
    })
    wx.setNavigationBarTitle({
      title: res.songs[0].name
    })
  },
  //获取歌曲信息
  async getMuiscInfo(id) {
    let res = await request('/song/url', { id })
    this.setData({
      MuiscInfo: res.data[0]
    })
  },
  //发送切换歌曲类型
  sendType(e) {
    pubsub.publish('type', e.currentTarget.id)
    pubsub.subscribe('newID', (name, newID) => {
      this.setData({
        ids: newID
      })
      this.getSongDetails(newID)
      this.getMuiscInfo(newID)
      this.newStart()
      pubsub.unsubscribe('newID')
    })
  },
  //点击开始播放音乐
  start() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    instance.globalData.isMusicPlay = this.data.isPlay
    instance.globalData.isMusicID = this.data.ids
    if (this.data.isPlay) {
      backgroundAudioManager.src = this.data.MuiscInfo.url
      backgroundAudioManager.title = this.data.SongDetails.name
      backgroundAudioManager.play()
    } else {
      backgroundAudioManager.pause()
    }
  },
  //切换时
  newStart() {
    backgroundAudioManager.src = this.data.MuiscInfo.url
    backgroundAudioManager.title = this.data.SongDetails.name
    backgroundAudioManager.play()
  }
})