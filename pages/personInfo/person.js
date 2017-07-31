// person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  setDataLocal: function (key, value) {
    wx.setStorageSync(key, value || {
      users: this.data.allPeople,
      rank: this.data.rank
    })
  },
  link: function (e) {
    // 设置连接的用户
    console.log({ e: e })
    var linkInfo = {
      toUser: e.target.dataset.user,
      fromUser: this.data.creater
    }
    // query.select('')
    this.setDataLocal('linkInfo', linkInfo)

    // 跳转页面
    wx.navigateTo({
      url: '../personInfo/person'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data ={}
    var latestUser = wx.getStorageSync("latestUsers")
    var linkInfo = wx.getStorageSync("linkInfo")
    Object.assign(data, latestUser, linkInfo )
    // var aa = {...data,}
    // this.setData({aa})
    // debugger
    // console.log(this.data)
    // debugger
    this.setData({
      allPeople: latestUser && latestUser.allPeople,
      rank: latestUser && latestUser.rank,
      current_user: linkInfo && linkInfo.toUser, // 点击后连接过来的当前用户
      fromUser :linkInfo && linkInfo.fromUser
    })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})