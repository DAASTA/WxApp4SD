//登录页面
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgurl: "",
    imgHeight: 0
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          //console.log(res) //============================
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //console.log(app.globalData.userInfo)
  },
  getUserInfo: function (e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //获取用户信息
  getAllUserInfo: function (e) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo //用户基本信息
        var nickName = userInfo.nickName //用户名
        var avatarUrl = userInfo.avatarUrl //头像链接
        //console.log(nickName)
        //console.log(userInfo)
        //console.log(avatarUrl)
        that.setData({imgurl: avatarUrl})
      }
    })
  },
  lastPage: function(e) {
    wx.navigateTo({
      url: '../intro/intro'
    })
  },
  nextPage: function(e) {
    wx.navigateTo({
      url: '../normal/normal'
    })
  },
  uploadImg() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        getApp().globalData.selectedImgSrc = res.tempFilePaths[0]
        wx.navigateTo({
          url: '../normal/normal'
        })
        that.setData({imgurl: res.tempFilePaths[0]})
      }
    })
  },
  useMyAvatar() {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        //selectedImgSrc = userInfo.avatarUrl
        getApp().globalData.selectedImgSrc = userInfo.avatarUrl
        //console.log("use Avatar!")
        //console.log(userInfo.avatarUrl)
        wx.navigateTo({
          url: '../normal/normal'
        })
        that.setData({ imgurl: userInfo.avatarUrl })
      }
    })
  },
  takephoto() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        var src = res.tempFilePaths[0]
        getApp().globalData.selectedImgSrc = src
        console.log("get the photo taken just now!")
        wx.navigateTo({
          url: '../normal/normal',
        })
        that.setData({imgurl: src})
      }
    })
  }
})
