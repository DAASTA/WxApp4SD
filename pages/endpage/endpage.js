// pages/endpage/endpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultimg: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({ resultimg: getApp().globalData.result_Img})
    wx.showModal({
      title: '提示',
      content: '图片处理成功，点击图片可进入预览，预览状态下长按图片可保存',
      showCancel: false
    })
  },

  preview_Image: function (e) {
    var that = this
    wx.previewImage({
      urls: [getApp().globalData.result_Img],
    })
  },

  preview_QR: function(e) {
    wx.previewImage({
      urls: ['../../images/endpage/normal_QR_withtext.jpg'],
    })
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