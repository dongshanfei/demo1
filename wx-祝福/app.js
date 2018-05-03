//app.js
App({
  setConfig: {
    url: 'https://wxapi.sanshengshi.co/api/zhufu.php',
    user_token:'',
    logining: true,
  },
  denglu: function (name, imgsrc) {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${that.setConfig.url}?action=login`,
          data: {
            code: res.code,
            user_name: name,
            head_img: imgsrc
          },
          success: res => {
            if (res.data.ret==-1) {
              wx.showToast({
                title: res.data.msg,
                icon: 'loading',
                mask: true,
                duration: 1500
              });
              return false;
            };
            that.setConfig.user_token = res.data.data.token;
            wx.hideLoading();
            that.setConfig.logining = false
          }
        })
      }
    })
  },
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录

    // 获取用户信息
    wx.showLoading({
      title: '努力加载中~',
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.denglu(res.userInfo.nickName, res.userInfo.avatarUrl)
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.getUserInfo({
            success: res => {
              // wx.hideLoading();
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              that.denglu(res.userInfo.nickName, res.userInfo.avatarUrl)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  ajax: function (postUrl, data, callback = function () { }){
    var that = this;
    if (that.setConfig.logining===true) {
      var ajaxTimer = setInterval(function() {
        if (that.setConfig.logining===true) {
          return;
        } else{
          if (data.token === '' || typeof data.token =='undefined') {
            data.token=that.setConfig.user_token;
          }
          clearInterval(ajaxTimer);
          wx.request({
            url: that.setConfig.url + postUrl ,
            data: data ,
            dataType: 'json',
            success: function(res) {
              callback(res)
            },
            fail: function(res) {
            },
            complete: function(res) {
            },
          })
        };
      }, 100);
    } else{
      data.token = that.setConfig.user_token;
      wx.request({
        url: that.setConfig.url + postUrl ,
        data: data ,
        success: function(res) {
          
          callback(res)
        },
        fail: function(res) {
        },
        complete: function(res) {
        },
      })
    };
  },//上传文件
  upload: function (postUrl,filePath,name,callback=function(){}){
    let that = this;
      wx.uploadFile({
        url: that.setConfig.url + postUrl,
        filePath: filePath,
        name: name,
        formData:{
          token: that.setConfig.user_token
        },
        success: function(res) {
          callback(JSON.parse(res.data));
        },
        fail: function(res) {
        }
      
      })
  }

})