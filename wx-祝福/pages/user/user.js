const app = getApp();
const utils = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(app.globalData.userInfo);
    that.setData({
      useInfo: app.globalData.userInfo
    })
    // console.log(that.data.us)
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
        console.log(userInfo)
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  goSend:function(){
    wx.navigateTo({
      url: '../send/send',
    })
  },
  goReceive:function(){
    wx.navigateTo({
      url: '../receive/receive',
    })
  }
})