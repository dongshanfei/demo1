// pages/article/article.js
const app = getApp()
let url = app.setConfig.url;
const R_htmlToWxml = require('../../utils/htmlToWxml.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsData: {},
    data: {},
    imgArr: [],
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id: options.id
    })
    wx.request({
      url: `${url}/index/article.html?id=${options.id}&xcx=${app.setConfig.xcx}`,
      success: function (res) {
        console.log(res)
        wx.setNavigationBarTitle({
          title: res.data.title,

        })
        let re = res.data.content
        re = res.data.content.replace(/&nbsp;/ig, '');
        let content = R_htmlToWxml.html2json(re)
        console.log(content)
        that.setData({
          ["data.content"]: content,
          ["data.thum_img"]: res.data.thum_img,
          ["data.title"]: res.data.title,
          ["data.description"]: res.data.description
        })
        let imgArr = [];
        for (let o in content) {
          console.log(content[o])
          if (content[o].type == 'img') {
            imgArr.push(content[o].attr.src)
          }

        }
        console.log(imgArr)
        that.setData({
          imgArr: imgArr
        })

      },
      fail: function (res) { },
      complete: function (res) { },
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
      st
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
      title: that.data.data.title,
      path: `/pages/index/index?id=${that.data.id}&from=share`,
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
  // 跳转
  navigateTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `../article/article?xcx=1&id=${e.currentTarget.dataset.id}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showImg: function (e) {
    let that = this;
    console.log(e.currentTarget.dataset.src)
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: that.data.imgArr // 需要预览的图片http链接列表
    })
  }
})