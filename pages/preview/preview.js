// pages/preview/preview.js
var app = getApp()
var userID

const device = wx.getSystemInfoSync()
const scnWidth = device.windowWidth
const scnHeight = device.windowHeight
const ratio = 1

Page({

  /**
   * 页面的初始数据
   */
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({ imgHeight: scnWidth * ratio })
    that.setData({ imageSelected: getApp().globalData.editedImgSrc})
  },

  radioChange: function(e) {
    console.log(e.detail.value)
    var that = this
    that.setData({selectedRadio: true})
    getApp().globalData.selectedStyle = e.detail.value
  },

  //提交图片
  submit: function(e) {
    console.log("ready to upload file, file path=")
    console.log(getApp().globalData.editedImgSrc)
    var avatar_url = getApp().globalData.userInfo.avatarUrl
    var url_arr = avatar_url.split("/")
    console.log(url_arr[5])
    var username = getApp().globalData.userInfo.nickName
    //var u_id = username + url_arr[5]
    var u_id = url_arr[5]
    var that = this
    that.setData({userID: u_id})
    getApp().globalData.user_ID = u_id
    console.log(u_id)

    that.setData({ debuginfo1: "start to request" })

    //获取用户当前是否在排队中
    var inQueue
    wx.request({
      //url: "http://daasta.cn:5000/query/",
      url: "https://" + getApp().globalData.core_url + "/query/",
      data: {
        id: u_id
      },
      method: 'GET',
      success: function (res) {
        inQueue = res.data
        that.setData({debuginfo1: "queue result:" + res.data})
      }
    })

    if(inQueue >= 0) {
      wx.showToast({
        title: '当前已经上传了图片！无法重复上传',
        duration: 2000,
        mask: true
      })
    }
    else {
    // begin to upload!
    that.setData({debuginfo2: "start to upload"})
    var upload_success = false
    wx.navigateTo({
      url: '../download/download'
    })
    /*wx.uploadFile({
      //url: 'http://daasta.cn:5000/upload/', //url should be changed
      url: "https://" + getApp().globalData.core_url + "/upload/",
      filePath: getApp().globalData.editedImgSrc,
      name: 'data',
      header: {
        'content-type': "Application/json"
      },
      formData: {
        id: u_id,
        //request: 'post_image',
        //data: 'wtf'//getApp().globalData.editedImgSrc,
        style: getApp().globalData.selectedStyle
      },
      success: function(res) {
        console.log(res)
        console.log("successfully uploaded!")
        that.setData({debuginfo2: "uploaded successfully"})
        upload_success = true
        wx.navigateTo({
          url: '../download/download',
        })
      },
      failure: function(res) {
        console.log("failure!")
        console.log(res)
        wx.showToast({
          title: "Error!无法连接到服务器",
          icon: "error",
          duration: 2000
        })
      }
    })*/
    }
  },
  gobackTap() {
    wx.navigateBack({})
  },

  //从服务器获得排队信息
  getQueue: function(e) {
    wx.request({
      //url: "daasta.cn:5000",
      url: "https://" + getApp().globalData.core_url + "/query/",
      data: "data", //data should be here
      method: 'GET',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log("test: get queue")
        console.log(res.data)
        wx.showToast({
          title: 'Get queue!',
        })
      },
      fail: function(err) {
        //console.log(err)
      }
    })
  },

  //从服务器获得处理完的图片
  getResultImg: function(e) {
    wx.downloadFile({
      url: "daasta.cn:5000",
      type: "123", //type should be here
      success: function(res) {

      },
      fail: function(err) {
        
      }
    })
  }
})