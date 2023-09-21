import request from '../../utils/request'
Page({
  data: {
    email: '',
    password: ''
  },
  //表单
  handleInput(e) {
    let type = e.target.id
    this.setData({
      [type]: e.detail.value
    })
  },
  //登录
  async touches() {
    //前端验证
    if (!this.data.email) {
      wx.showToast({
        title: '请输入邮箱地址',
        icon: 'error'
      })
      return
    }
    let emailNum = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (!emailNum.test(this.data.email)) {
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'error'
      })
      return
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'error'
      })
      return
    }
    //后端验证
    let res = await request('/login', {
      email: this.data.email,
      password: this.data.password
    })
    if (res.code === 200) {
      wx.showToast({
        title: '登录成功',
      })
      wx.setStorageSync('userInfo', JSON.stringify(res.profile))
      wx.navigateBack("/pages/mine/mine")
    } else if (res.code !== 200) {
      wx.showToast({
        title: '账户或者密码错误',
        icon: 'error'
      })
    }
  }
})