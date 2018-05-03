const app = getApp();
let userInfo = {};
let timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameXstatue:true,
    otherX:false,
    textArea:true,
    userImgsrc:[],
    recordStatue:0,
    recordTime:0,
    recordEnd:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.bless){
      that.setData({
        bless: options.bless
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    that.setData({
      userImgsrc: app.globalData.userInfo.avatarUrl,
      userName: app.globalData.userInfo.nickName
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    //获取语音授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            }
          })
        }
      }
    })
    wx.getStorage({
      key: 'belss',
      success: function (res) {
        that.setData({
          bless: res.data
        })
      },
    })
  
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
  nameFoucus:function(){
    this.setData({
      nameFoucus:true
    })
  },
  nameBlur:function(){
    this.setData({
      nameFoucus: false
    })
  },
  otherFoucus:function(){
    this.setData({
      otherX: true
    })
  },
  areaFoucus:function(){
    this.setData({
      textArea: true
    })
  }
  ,//清除用户的名字
  clearusername:function(){

  }, 
  formSubmit: function (e) {
    let that = this;
    let changeInfo = e.detail.value;
    if (that.data.userImgsrc[0]!='h'){
      changeInfo.userImg=that.data.userImgsrc[0];
    }else{
      // 未编辑图像
      changeInfo.userImg =app.globalData.userInfo.avatarUrl
    }
    if (that.data.tempFilePath){
      changeInfo.recordPath = that.data.tempFilePath
    }
    changeInfo.recordTime = that.data.recordTime;
    wx.setStorage({
      key: 'changeInfo',
      data: changeInfo,
      success:function(){
        wx.navigateBack({})
      },
      fail:function(){
        wx.showToast({
          title: '存储信息失败',
          icon: 'none',
        })
      }
    })
   
  },
  golist:function(){
    wx.navigateTo({
      url: '../blessingList/blessingList',
    })
  }
  ,
  changeuserImg:function(){
    let that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        that.setData({
          userImgsrc:res.tempFilePaths
        })
        
      },
      complete:function(){
        
      }
    })
  }
,
  tartRecord:function(){
    let that = this;
    that.setData({
      recordStatue: true
    })
    clearInterval(timer)
    timer = setInterval(function () {
      that.setData({
        recordTime: that.data.recordTime + 1
      })
      if (that.data.recordTime>=60){
        wx.showToast({
          title: '录音最长60秒',
        })
        that.stopRecord();
      }
    }, 1000)
    wx.startRecord({
      success:function(res){//录音成功
          that.setData({
            recordEnd:true,//成功的状态
            tempFilePath: res.tempFilePath
          })
      },
      fail:function(){
      }
    })
  }
  ,
  stopRecord:function(){
    clearInterval(timer)
    wx.stopRecord();
    let that = this;
    that.setData({
      recordStatue: false
    })
    
  },
  playRecord:function(){
    let that = this;
    wx.playVoice({
      filePath: that.data.tempFilePath,
      complete: function () {
      }
    })
  },
  deleteRecord:function(){
    //删除录音并初始化数据
    this.setData({
      tempFilePath:'',
      recordStatue: 0,
      recordTime: 0,
      recordEnd: false
    })
  }
})