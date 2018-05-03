const app = getApp();
const RANK_TYPE = {
  "1": 'today',
  "2": 'yesterday',
  "3": 'total'
};
Page({

  /**
   * 页面的初始数据
   */
  // ranklingList1: [{ userImg: '../images/my.png', username: '宋朋', zan: 789 }]
  data: {
    _num: 1,
    ranklingList1: [],
    ranklingList2: [],
    ruleStatue: false, //定义规则框的初始状态console
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    var postData = {
      token: app.setConfig.user_token,
      type: RANK_TYPE[that.data._num],
    };
    app.ajax('?action=getRank', postData, function(res) {
      let ranklingList2 = res.data.data;
      let ranklingList1 = ranklingList2.splice(0, 3);
      that.setData({
        ranklingList1: ranklingList1,
        ranklingList2: ranklingList2,
      })
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '祝福语助手',
      path: '../ranking/ranking',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  changeClass: function(e) {
    var that = this;
    this.setData({
      _num: e.target.dataset.num
    })
    var postData = {
      token: app.setConfig.user_token,
      type: RANK_TYPE[e.target.dataset.num],
    };
    app.ajax('?action=getRank', postData, function(res) {
      let ranklingList2 = res.data.data||[];
      let ranklingList1 = ranklingList2.splice(0, 3);
      console.log('前3名', JSON.stringify(ranklingList1));
      console.log('3名往后', ranklingList2);
      that.setData({
        ranklingList1: ranklingList1,
        ranklingList2: ranklingList2,
      })
    });
  },
  showrule: function() {
    this.setData({
      ruleStatue: true
    })
  },
  closeRule: function() {
    this.setData({
      ruleStatue: false
    })
  },
  goIndex: function() {
    this.setData({
      ruleStatue: false
    })
    wx.switchTab({
      url: '../index/index'
    })
  }
})

function share() {

}