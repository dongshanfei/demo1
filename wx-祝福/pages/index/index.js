//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    items: [],
    itoolintro: '选择祝福卡片分享给群和好友，对方就能收到祝福哦~',
    selectid: '',
  },
  onLoad: function () {
   let that = this;
   wx.request({
     url: 'https://wxapi.sanshengshi.co/api/zhufu.php?action=lists',
     success: function (res) {
       util.infoData = res.data.data;
       that.setData({
         items: util.infoData
       })

     },
     fail: function () {
       wx.showToast({
         title: '网速不给力',
       })
     }
   })
    that.setData({
      items: util.infoData
    })
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    app.globalData.userInfo = that.data.userInfo;
  },
  onShow: function () {
    wx.clearStorage();
    wx.getStorage({
      key: 'token',
      success: function(res) {
      },
    })
    let that = this;
  
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  navigator: function (e) {
    // 传输id值
    this.setData({
      selectid: e.currentTarget.id
    })
    // 跳转
    wx.navigateTo({
      url: `/pages/show/show?itemid=${this.data.selectid}`,
    })
  },
  onPullDownRefresh: function () {
    let that = this;
    wx.request({
      url: 'https://wxapi.sanshengshi.co/api/zhufu.php', 
      success: function (res) {
        util.infoData = res.data.data;
        that.setData({
          items: util.infoData
        })
        setTimeout(function(){
          wx.stopPullDownRefresh()
        },300)
      }
    })
  },
  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
    }
    return {
      title: '祝福语助手',
      desc: "你也可以制作祝福话送给TA哟！",
      path: `/pages/index/index`,
      imageUrl: `https://wxapi.sanshengshi.co/images/share.png`,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
