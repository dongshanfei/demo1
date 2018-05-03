const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.ajax('?action=getSends', {}, function(res) {
      console.log('getSends',res.data.data);
      that.setData({
        list: res.data.data
      });     
    });
  },
  navigator: function (e) {
    var zhufu_id = e.currentTarget.id;
    var itemid = e.target.dataset.itemid;
    wx.navigateTo({
      url: `/pages/show/show?zhufu_id=${zhufu_id}&status=share&itemid=${itemid}&sendName=${app.globalData.userInfo.nickName}`,
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