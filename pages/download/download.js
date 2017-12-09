var iscomplete = false
var original_queue_number = -2
var waiting_in_queue = true
var add_step = 0.5
var percent_sup = 0
var add_percent = false
var progress_percent = 5
var is_uploading = false
var attempt2download = false

Page({
  data: {
    src: '',
    imgsrc: "",
    result_src: "",
    getresult: false,
    waiting_num: -1,
    notification_text: "",
    progressPercent: 5
  },
  onLoad(option) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({ imgsrc: userInfo.avatarUrl })
      }
    })

    attempt2download = false
    iscomplete = false
    is_uploading = true
    that.setData({ notification_text: "正在上传图片" })
    add_percent = true
    percent_sup = 20
    //上传文件
    console.log("ready to upload file!")
    wx.uploadFile({
      url: "https://" + getApp().globalData.core_url + "/upload/",
      filePath: getApp().globalData.editedImgSrc,
      name: 'data',
      header: {
        'content-type': "Application/json"
      },
      formData: {
        id: getApp().globalData.user_ID,
        style: getApp().globalData.selectedStyle
      },
      success: function (res) {
        is_uploading = false
        //add_percent = false
        console.log("upload file done.")
        if (progress_percent < 20) {
          progress_percent = 20
          that.setData({ progressPercent: progress_percent })
        }
      },
      failure: function (res) {
        console.log("failure!")
        console.log(res)
        wx.showToast({
          title: "Error!无法连接到服务器",
          icon: "error",
          duration: 2000
        })
      }
    })

    wx.request({
      url: "https://" + getApp().globalData.core_url + "/query/",
      data: {
        id: getApp().globalData.user_ID
      },
      method: 'GET',
      success: function (res) {
        if (res.data == 0)
          that.setData({ progressPercent: 40 })
        progress_percent = 40
      }
    })

    setInterval(function () {
      if (add_percent && progress_percent <= percent_sup) {
        progress_percent = progress_percent + add_step
        that.setData({ progressPercent: progress_percent })
      }
    }, 100)

    setInterval(function () {
      console.log("status:")
      console.log(is_uploading)
      console.log(iscomplete)
      if (is_uploading) {
        that.setData({ notification_text: "正在上传图片" })
        percent_sup = 20
        add_percent = true
      }
      if (!iscomplete && !is_uploading) {
        wx.request({
          url: "https://" + getApp().globalData.core_url + "/query/",
          data: {
            id: getApp().globalData.user_ID
          },
          method: 'GET',
          success: function (res) {
            console.log("res.data = " + res.data)
            that.setData({ waiting_num: res.data })
            console.log("get queue info, " + res.data)
            if (original_queue_number == -2)
              original_queue_number = res.data
            if (res.data > 0)
              waiting_in_queue = true
            else
              waiting_in_queue = false
            if (waiting_in_queue) {
              if (res.data == 0) {
                that.setData({ progressPercent: 40 })
                progress_percent = 40
              }
              else
                if (original_queue_number > 0 && res.data > 0) {
                  var currentprecent = 40 - 20 * res.data / original_queue_number
                  that.setData({ progressPercent: currentprecent })
                  progress_percent = currentprecent
                }
            }
            if (res.data == 0) {
              that.setData({ notification_text: "二极管子正在努力为您作画，请稍候..." })
              if (progress_percent < 40) {
                progress_percent = 40
                that.setData({ progressPercent: progress_percent })
              }
              add_percent = true
              percent_sup = 85
            }
            else
              if (res.data > 0) {
                that.setData({ notification_text: "前面还有" + res.data + "人在排队，请耐心等候" })
                add_percent = false
                console.log("waiting in queue")
              }
              else if (res.data == -1) {
                add_percent = false
                that.setData({ notification_text: "处理完成，正在下载图片" })
                console.log("ready to download")
                if (progress_percent < 85) {
                  progress_percent = 85
                  that.setData({ progressPercent: progress_percent })
                }
                percent_sup = 100
                add_percent = true
                iscomplete = true
                if (!attempt2download) {
                  attempt2download = true
                  console.log("attempt to download")
                  wx.downloadFile({
                    url: "https://" + getApp().globalData.core_url + "/download/?id=" + getApp().globalData.user_ID,
                    success: function (res) {
                      that.setData({ result_src: res.tempFilePath })
                      that.setData({ progressPercent: 100 })
                      progress_percent = 100
                      getApp().globalData.result_Img = res.tempFilePath
                      console.log(res)
                      that.setData({ getresult: true })
                      /*wx.showModal({
                        title: '提示',
                        content: '图片处理成功，点击图片可进入预览，预览状态下长按图片可保存',
                        showCancel: false
                      })*/
                      wx.redirectTo({
                        url: '../endpage/endpage',
                      })
                      that.setData({ getresult: true })
                      console.log("finished!")
                    }
                  })
                }
              }
          },
          fail: function (res) {
            wx.showToast({
              title: '无法获取服务器状态！请检查网络连接。',
              duration: 2000
            })
          }
        })
      }
    }, 3000)
  },

  //从服务器获得排队信息
  getQueue: function (e) {
    console.log("current User ID: " + getApp().globalData.user_ID)
    wx.request({
      url: "https://" + getApp().globalData.core_url + "/query/",
      data: {
        id: getApp().globalData.user_ID
      },
      method: 'GET',
      success: function (res) {
        console.log("手动获取排队信息 - " + res.data)
        /*wx.showToast({
          title: '手动获取排队信息成功',
        })*/
      },
      fail: function (err) {
        //console.log("failed to get queue info")
        //console.log(err)
      }
    })
  },

  //从服务器获得处理完的图片
  getImage: function (e) {
    var that = this
    wx.downloadFile({
      url: "https://" + getApp().globalData.core_url + "/download/?id=" + getApp().globalData.user_ID,
      success: function (res) {
        console.log("download successfully")
        console.log(res)
        that.setData({ result_src: res.tempFilePath })
        getApp().globalData.result_Img = res.tempFilePath

        wx.showToast({
          title: '尝试手动从服务器获取图片',
          duration: 3000
        })
      },
      fail: function (err) {
        //console.log("download failed")
      }
    })
  },

  //预览图片
  preview_Image: function (e) {
    var that = this
    wx.previewImage({
      urls: [getApp().globalData.result_Img],
    })
  },

  lastPage: function (e) {
    wx.redirectTo({
      url: '../endpage/endpage',
    })
  }
})