// rank_index.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  
  data: {
    allPeople: {
      userId1: {
        userID: 'userId1',
        avatar: '/pages/images/mn1.jpg',
        userName: 'yeyuguo',
        nickName: '小叶',
        latest_receive_num: 1,
        // rank_num:38,
        // receive_length: 3, // 接收到谁的随机奖励
        // create_length: 2, // 自己点了哪几个随机奖励
        receive_random: [
          {
            userID: 'userId2',
            create_time: '2017-07-25 12:24:22'
          },
          {
            userID: 'userId1',
            create_time: '2017-07-25 13:24:22'
          }
        ],
        create_random: [
          {
            userID: 'userId2',
            create_time: '2017-07-25 11:24:22'
          },
          {
            userID: 'userId3',
            create_time: '2017-07-25 12:24:32'
          },
          {
            userID: 'userId1',
            create_time: '2017-07-25 13:24:22'
          }
        ]
      },
      userId2: {
        userID: 'userId2',
        avatar: '/pages/images/mn2.jpg',
        userName: 'yeyuguo2',
        nickName: '小叶2',
        receive_random: [
          {
            userID: 'userId3',
            create_time: '2017-07-25 12:24:32'
          },
          {
            userID: 'userId1',
            create_time: '2017-07-25 13:24:22'
          }
        ],
        create_random: [
          {
            userID: 'userId1',
            create_time: '2017-07-25 13:24:22'
          },
          {
            userID: 'userId3',
            create_time: '2017-07-25 12:24:32'
          }
        ]
      },
      userId3: {
        userID: 'userId3',
        avatar: '/pages/images/mn3.jpg',
        userName: 'yeyuguo3',
        nickName: '小叶3',
        receive_random: [
          {
            userID: 'userId2',
            create_time: '2017-07-25 12:24:22'
          }
        ],
        create_random: [
          {
            userID: 'userId2',
            create_time: '2017-07-25 11:24:22'
          },
          {
            userID: 'userId3',
            create_time: '2017-07-25 12:24:32'
          },
          {
            userID: 'userId1',
            create_time: '2017-07-25 13:24:22'
          }
        ]
      }
    },
    rank:[],
    creater:null,
    receiver:null,
    inputContent:{

    }
  },
  setDataLocal:function(key,value){
    wx.setStorageSync(key, value ||{
      users: this.data.allPeople,
      rank:this.data.rank
    })
  },
  rankHandle: function (data) {
    // object to array
    var data_array, rankID, rank_data
    data_array = Object.keys(data).map(function (d) { return data[d] }) // array
    // 排序收到的 随机个数
    rank_data = Object.keys(data).map(function (d) { return data[d] }).sort(function (a, b) {
      return -(a['receive_random'].length - b['receive_random'].length)
    })
    rankID = rank_data.map(function (d) {
      // return d['receive_random'].length
      return d['userID']
    })
    return rankID
  },
  link: function (e) {
    // 设置连接的用户
    console.log({e:e})
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
  bindBlur:function(e){
    console.log('input value:', e.detail.value)
    this.setData({
      // inputContent:`{${e.currentTarget.id}:${e.detail.value}}`
      inputContent:{
        create_random:e.detail.value
      },
      creater: e.detail.value
    })
  },
  create_random:function(){
    console.log({this:this})
    // debugger
    // 数据源
    var data = this.data.allPeople  // 此处使用引用，data改变， this.data.appPeople 也会改变
    // 当前时间
    var format_time = util.formatTime(new Date())
    var dataLength = Object.keys(data).length
    // 随机选中的人
    var receiver = this.data.rank[Math.ceil(Math.random() * dataLength) - 1]
    // console.log({ receiver })
    this.setData({
      receiver
    })
    var creater = this.data.creater
    var receiver_obj = {
      userID: receiver,
      create_time: format_time
    }
    
    creater && data[receiver]['receive_random'].push(receiver_obj)
    creater && data[creater]['create_random'].push(receiver_obj)
    // console.log({ 'check this.data:': data})
    var latestUserInfo = {
      allPeople: data,
      rank: this.rankHandle(data) // 自动刷新 排行榜
    }
    this.setDataLocal('latestUsers', latestUserInfo)
    
    this.setData(latestUserInfo) // 自动刷新 排行榜
    return receiver
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 初次渲染 rank 排行
    this.setData({
      rank:this.rankHandle(this.data.allPeople)
    })
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