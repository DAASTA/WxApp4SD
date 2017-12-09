// pages/intro/intro.js
var app = getApp()


Page({
  data: {
    swiper_current: 0
  },

  /**
  * Go to next page in swiper
  */
  pageDown: function (e) {
    this.setData({swiper_current: 1})
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