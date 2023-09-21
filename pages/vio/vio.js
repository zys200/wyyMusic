import request from '../../utils/request'
Page({
  data: {
    videoCategoryLists: [],
    idList:'a0',
    vDataList:{}
  },
  onLoad(options) {
    this.getVideoCategoryLists()
  },
  handleChange(e) {
    this.setData({
      idList: e.currentTarget.id
    })
    let aa = e.currentTarget.dataset.ids
    this.getVideoCategoryInfo(aa)
  },
  //获取视频分类
  async getVideoCategoryLists() {
    let res = await request('/video/group/list')
    this.setData({
      videoCategoryLists: res.data.slice(0, 9)
    })
  },
  //获取对应分类下的视频
  async getVideoCategoryInfo(id){
    let  res = await request('/video/group',{id})
    // console.log(res.datas);
    this.setData({
      vDataList:res.datas
    })
  },
  //获取对应分类下的视频的URL
  // getVideoCategoryURL(id){
  //   let res = request('/mv/url',{id})
  //   console.log(res);
  // }
})