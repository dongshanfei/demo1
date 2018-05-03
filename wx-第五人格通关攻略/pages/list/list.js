// pages/list/list.js
const app = getApp()
let url = app.setConfig.url;
let page = 1;
let index = 9;
Page({

  /**
   */
  data: {
    data: [],
    ifLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '疯狂加载中',
    })
    let that = this;
    wx.request({
      url: `${url}/index/article/list.html?xcx=${app.setConfig.xcx}&type=2`,
      success: function (res) {
        console.log(res)
        that.setData({
          data: res.data
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'loading'
        })
      },
      complete: function (res) { wx.hideLoading() },
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
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${url}/index/article/list.html?xcx=${app.setConfig.xcx}&type=2`,
      success: function (res) {
        console.log(res)
        that.setData({
          data: res.data
        })
        wx.showToast({
          title: '加载完毕',
          icon: 'success'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'loading'
        })
      },
      complete: function (res) {
        wx.hideLoading();
        setTimeout(function () {
          wx.stopPullDownRefresh()
        }, 300)
      },
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.setData({
      ifLoading: true
    })
    wx.showLoading({
      title: '疯狂加载中',
    })
    page += 1;
    console.log(page)
    wx.request({
      url: `${url}/index/article/list.html?xcx=${app.setConfig.xcx}&type=2&page=${page}`,
      success: function (res) {
        console.log('res', res.data.status)
        if (res.data.status == '0') {
          wx.showToast({
            title: '加载完毕',
            icon: 'success',
            success: function () {
              that.setData({
                ifLoading: false
              })
            }
          })
          return;
        }
        let newList = res.data;
        let oldList = that.data.data;
        for (let i in newList) {
          index++;
          oldList[index] = newList[i]
        }
        that.setData({
          data: oldList,
          ifLoading: false
        })
        wx.hideLoading();
      },
      fail: function (res) {
        wx.showToast({
          title: '加载失败',
          icon: 'loading',
          success: function () {
            wx.hideLoading();
            that.setData({
              ifLoading: false
            })
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: app.setConfig.appName,
      path: '/pages/list/list',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  navigateTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../article/article?id=${e.currentTarget.dataset.id}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
    })
  }
})