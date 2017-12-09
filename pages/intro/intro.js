// pages/intro/intro.js
var app = getApp()

Page({
  data: {
    swiper_current: 0
  },

  pageDown: function (e) {
    this.setData({swiper_current: 1})
  },

  nextPage: function(e) {
    wx.navigateTo({
      url: "../login/login",
    })
  }
})