// pages/preview/preview.js
var app = getApp()
var userID

const device = wx.getSystemInfoSync()
const scnWidth = device.windowWidth
const scnHeight = device.windowHeight
const ratio = 1

Page({
  data: {
    swiperimg: [
      { url: "../../images/preview/style0.jpg" },
      { url: "../../images/preview/style1.jpg" },
      { url: "../../images/preview/style2.jpg" }
    ],
    styleNames: [
      { name: "风格1    ", index: "0" },
      { name: "风格2    ", index: "1" },
      { name: "风格3    ", index: "2" }
    ],
    imgHeight: 0,
    selectedRadio: false,
    selectedStyle: "0",
    imageSelected: ""
  },
  onLoad: function (options) {
    var that = this
    that.setData({ imgHeight: scnWidth * ratio })
    that.setData({ imageSelected: getApp().globalData.editedImgSrc })
  },

  radioChange: function (e) {
    console.log(e.detail.value)
    var that = this
    that.setData({ selectedRadio: true })
    getApp().globalData.selectedStyle = e.detail.value
  },

  //提交图片
  submit: function (e) {
    var avatar_url = getApp().globalData.userInfo.avatarUrl
    var url_arr = avatar_url.split("/")
    var username = getApp().globalData.userInfo.nickName
    var u_id = url_arr[5]
    var that = this
    that.setData({ userID: u_id })
    getApp().globalData.user_ID = u_id

    that.setData({ debuginfo1: "start to request" })

    //获取用户当前是否在排队中
    var inQueue
    wx.request({
      url: "https://" + getApp().globalData.core_url + "/query/",
      data: {
        id: u_id
      },
      method: 'GET',
      success: function (res) {
        inQueue = res.data
        that.setData({ debuginfo1: "queue result:" + res.data })
      }
    })

    if (inQueue >= 0) {
      wx.showToast({
        title: '当前已经上传了图片！无法重复上传',
        duration: 2000,
        mask: true
      })
    }
    else {
      that.setData({ debuginfo2: "start to upload" })
      var upload_success = false
      wx.navigateTo({
        url: '../download/download'
      })
    }
  },
  gobackTap() {
    wx.navigateBack({})
  },
})