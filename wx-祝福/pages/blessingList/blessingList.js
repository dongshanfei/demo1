// pages/blessingList/blessingList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num: 0,
    // infoList: [{ festival: '春节' }, { festival: '情人节' }, { festival: '小年' }, { festival: '除夕' }, { festival: '元宵节' }, { festival: '周末' }, { festival: '生日' }, { festival: '冬季' }, { festival: '元旦' }, { festival: '春节' }],
    // itemList: [{ text: '春节来临祝福你，祝你新年喜连连；身体健康和睦，事业顺风福禄全；天天开心天天乐，保准升值又加钱！春节快乐!' }, { text: '春节来临祝福你，祝你新年喜连连；身体健康和睦，事业顺风福禄全；天天开心天天乐，保准升值又加钱！春节快乐!' }, { text: '春节来临祝福你，祝你新年喜连连；身体健康和睦，事业顺风福禄全；天天开心天天乐，保准升值又加钱！春节快乐!' }],
    infoList: [],
    itemList: [],
    allList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.ajax('?action=getZhuFuLists', {}, function(res) {
      var infoList = [];
      var allList = [];
      for(let i=0; i<res.data.data.length; i++) {
        var loopData = res.data.data[i];
        infoList[i] = { festival : loopData.tab_name };
        var itemList = [];
        for (var j = loopData.tab_list.length - 1; j >= 0; j--) {
          itemList[j] = { text: loopData.tab_list[j] };
        }
        if (i==0) {
          that.setData({
            itemList: itemList
          })
        }
        allList[i] = itemList;
      }
      that.setData({
        allList: allList,
        infoList: infoList
      })
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

  },
  changeClass: function (e) {
    var that=this;
    console.log(e.target.dataset.num)
    console.log(that.data);
    this.setData({
      _num: e.target.dataset.num,
      itemList: that.data.allList[e.target.dataset.num]
    })
  },
  selectItem: function (e) {
    let that = this;
    console.log(e.currentTarget.dataset.text)
    wx.setStorage({
      key: 'belss',
      data: e.currentTarget.dataset.text,
      success: function () {
        wx.navigateBack({
          delta: 1
        })
      
      }
    })

  }
})