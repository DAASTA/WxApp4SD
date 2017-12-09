// pages/endpage/endpage.js
Page({
  data: {
    resultimg: ""
  },

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
  }
})