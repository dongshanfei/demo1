//index.js
//获取应用实例
const app = getApp()
let url = app.setConfig.url;
let page = 1;
let index = 3;
var touchDot = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
var interval = "";// 记录/清理时间记录 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    init: {
      swiper: [],
    },
    data: [],
    shareTitle: '',
    shareImgSrc: '',
    ifLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '疯狂加载中',
      mask: true
    })
    wx.request({
        url: `${url}/index/article/list.html?xcx=${app.setConfig.xcx}&type=1`,
      success: function (res) {
        console.log(res.data)
        that.setData({
          data: res.data
        })
        let num;
        for (let i in that.data.data) {
          if (i != 'status') {

            index = i;
          }
        }

        console.log(index)
        wx.request({
          url: `${url}/index/article/banner.html?xcx=${app.setConfig.xcx}`,
          success: function (res) {
            that.setData({
              ['init.swiper']: res.data
            })
            wx.hideLoading();
            if (options.from == 'share') {
              wx.navigateTo({
                url: `/pages/article/article?id=${options.id}`,
              })
            }
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon: 'loading'
        })
      },
      complete: function (res) {
      },
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
        url: `${url}/index/article/list.html?xcx=${app.setConfig.xcx}&type=1`,
      success: function (res) {
        that.setData({
          data: res.data
        })
        wx.request({
          url: `${url}/index/article/banner.html?xcx=${app.setConfig.xcx}`,
          success: function (res) {
            that.setData({
              ['init.swiper']: res.data
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
        page = 1;
      },
      fail: function (res) {
        that.showTxt('加载失败')
      },
      complete: function (res) {
        setTimeout(function () {
          wx.stopPullDownRefresh()
        }, 300)
        wx.hideLoading()
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
    that.showTxt('疯狂加载中')
    page += 1;
    wx.request({
      url: `${url}/index/article/list.html?xcx=${app.setConfig.xcx}&page=${page}&type=1`,
      success: function (res) {
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
        console.log(newList)
        let oldList = that.data.data;
        // for(let o in )
        for (let i in newList) {
          index++;
          oldList[index] = newList[i]
        }
        that.setData({
          data: oldList,
          ifLoading: false
        })
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
      title: app.setConfig.shareTitle,
      path: '/pages/index/index',
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
  }
  ,
  navigateTo: function (e) {
    wx.navigateTo({
      url: `../article/article?id=${e.currentTarget.dataset.id}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showTxt: function (txt) {
    wx.showToast({
      title: txt,
    })
  },
  // 触摸开始事件  
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点  
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件  
  touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动    
    if (touchMove - touchDot <= -50 && time < 10) {
      console.log("左")
      wx.switchTab({
        url: '/pages/wx/wx'
      });
    }
    // 向右滑动  
    if (touchMove - touchDot >= 50 && time < 10) {
      console.log('向右滑动');

    }
  },
  // 触摸结束事件  
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval  
    time = 0;
  }
})