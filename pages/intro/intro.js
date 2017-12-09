var app = getApp()

const device = wx.getSystemInfoSync()
const scnWidth = device.windowWidth
const scnHeight = device.windowHeight
const ratio = 0.75

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperimg:[
      {url: "../../images/intro/swiper_0.jpg"},
      {url: "../../images/intro/swiper_1.jpg"},
      {url: "../../images/intro/swiper_2.jpg"}
    ],
    imgWidth: 0,
    imgHeight: 0
  },

  /**
   * 自定义函数--跳转到下一页
   */
  nextPage: function(e) {
    //console.log(e)
    wx.navigateTo({
      url: "../login/login",
      success: function (res) {
        //console.log(res)
      },
      fail: function (res) {
        //console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({ imgWidth: scnWidth })
    that.setData({ imgHeight: ratio * scnWidth })
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