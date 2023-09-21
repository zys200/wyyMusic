function request(url,data={},method= 'GET') {
  return new Promise((resolve,rejects)=>{
    wx.request({
      url: 'http://localhost:3000' + url,
      data,
      method,
      timeout: 5000,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        rejects(err)
        new Promise()
      }
    })
  })
}

export default request