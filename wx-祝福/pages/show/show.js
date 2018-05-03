const app = getApp();
const utils = require('../../utils/util');
let userInfo = userInfo;
let info = {};
const GETZHUFU_ID = 1;
const UPLOAD_ZHUFU_DATA = 2;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    statu: 0,
    canvasStatue: false,
    ShareBox: false,
    otherName: "您",
    recordPath: '',
    playStatue: false,
    zhufu_id: '',
    options_zhufu_id: '',
    isShare: false,
    zanNum: 0,
    addZanNum: 0,
    zhufu_receive:0,
    getZanNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.setConfig.user_token) {//判断是否有user_token
      //重新登录
      app.onLaunch();
    }
    let that = this;
    userInfo = app.globalData.userInfo || [];
    that.setData({
      options_zhufu_id: options.zhufu_id
    })
    if (options.status == "share" && options.sendName != userInfo.nickName) {
      //设置为分享状态
      that.setData({
        isShare: true
      })
      //进入了分享页
      let data = {
        zhufu_id: options.zhufu_id
      }
      app.ajax("?action=getZhuFuInfo", data, function (res) {
        let userinfo_1 = res.data.data;
        //去download语音
        if (userinfo_1.yuyin) {
          wx.downloadFile({
            url: userinfo_1.yuyin,
            success: function (res) {
              that.setData({
                recordPath: res.tempFilePath
              })
            },
            fail: function (res) {
            },
            complete: function (res) { },
          })
        }
        options.itemid = userinfo_1.item_id;
        app.ajax('?action=getOneOfList', { itemid: options.itemid }, function (res) {
          that.setData({
            item: res.data.data,
            bgImgStaute: true
          })
      
          that.setData({
            ["userinfo.nickName"]: userinfo_1.call_send,
            ["item.itemid"]: userinfo_1.item_id,
            ["item.txt"]: userinfo_1.content,
            ["userinfo.avatarUrl"]: userinfo_1.send_img,
            otherName: userinfo_1.call_recv,
            canvasbg: `https://wxapi.sanshengshi.co/api/zhufu/zhufu${options.itemid}/screenshots.png`,
            statu: 2,
            zanNum: parseInt(userinfo_1.dianzan)
          })

          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: that.data.item.bgcolor,
            animation: {
              duration: 500,
              timingFunc: 'easeIn'
            }
          })
          wx.hideLoading();
        })
      
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              pixeRatio: res.pixelRatio,
              windowWidth: res.windowWidth,
              windowHeight: res.windowHeight
            })
          },
        })
       
        app.ajax('?action=addRecv', { zhufu_id: options.zhufu_id }, function (res) {
        })
      })
    } else {
      that.setData({
        userinfo: userInfo,
        canvasbg: `https://wxapi.sanshengshi.co/api/zhufu/zhufu${options.itemid}/screenshots.png`,
        statu: 0,
      })
      if (options.zhufu_id) {
        // 有zhufu_id的下载数据
        let data = {
          zhufu_id: options.zhufu_id
        }
        app.ajax("?action=getZhuFuInfo", data, function (res) {
          let userinfo_1 = res.data.data;
          //去download语音
          if (typeof (userinfo_1.yuyin) != "undefined") {
            wx.downloadFile({
              url: userinfo_1.yuyin,
              success: function (res) {
                that.setData({
                  recordPath: res.tempFilePath
                })
              },
              fail: function (res) {
              },
              complete: function (res) { },
            })
          }
          options.itemid = userinfo_1.item_id;
          app.ajax('?action=getOneOfList', { itemid: options.itemid }, function (res) {
            that.setData({
              item: res.data.data,
              bgImgStaute: true
            })

            that.setData({
              ["userinfo.nickName"]: userinfo_1.call_send,
              ["item.itemid"]: userinfo_1.item_id,
              ["item.txt"]: userinfo_1.content,
              ["userinfo.avatarUrl"]: userinfo_1.send_img,
              otherName: userinfo_1.call_recv,
              canvasbg: `https://wxapi.sanshengshi.co/api/zhufu/zhufu${options.itemid}/screenshots.png`,
              statu: 0,//自己进去的状态
              zhufu_receive: userinfo_1.recv_count, //接收得人数
              getZanNum: userinfo_1.dianzan_renshu,//点赞的人数
            
            })
            wx.hideLoading();
            if (userinfo_1.recv_img_list){
              if (userinfo_1.recv_img_list.length >=5 ){
                userinfo_1.recv_img_list = userinfo_1.recv_img_list.slice(0, 5);//截取前五个
               
              }
              that.setData({
                receiveList: userinfo_1.recv_img_list//接收人的头像
              })
            }

            wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: that.data.item.bgcolor,
              animation: {
                duration: 500,
                timingFunc: 'easeIn'
              }
            })
          })
          app.ajax('?action=addRecv', { zhufu_id: options.zhufu_id }, function (res) {
          })
        })
      }
  

      app.ajax('?action=getOneOfList', { itemid: options.itemid }, function (res) {
        that.setData({
          item: res.data.data,
          bgImgStaute: true
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: that.data.item.bgcolor,
          animation: {
            duration: 500,
            timingFunc: 'easeIn'
          }
        })
        let data1 = {
          itemid: that.data.item.itemid,
          type: GETZHUFU_ID//1
        }
        app.ajax("?action=sendZhuFu", data1, function (res) {
          that.setData({
            zhufu_id: res.data.data.zhufu_id
          })
        })
      })
      wx.downloadFile({
        url: that.data.canvasbg,
        success: function (res) {
          that.setData({
            canvasbg: res.tempFilePath
          })
        }
      })
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            pixeRatio: res.pixelRatio,
            windowWidth: res.windowWidth,
            windowHeight: res.windowHeight
          })
        },
      })
      wx.downloadFile({
        url: that.data.userinfo.avatarUrl,
        success: function (res) {
          that.setData({
            imgsrc: res.tempFilePath
          })
        }
      })
    }
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
    let that = this;
    // 如果有改变信息则获取改变的信息
    wx.getStorage({
      key: 'changeInfo',
      success: function (res) {
        let changeName = res.data.username
        let otherName = res.data.othername;
        let changeBless = res.data.textarea;
        let userImg;
        let recordTime = res.data.recordTime;
        if (res.data.userImg != 'h') {
          userImg = res.data.userImg;
        }
        let recordPath;
        if (res.data.recordPath) {
          recordPath = res.data.recordPath;
        }
        that.setData({
          ["userinfo.nickName"]: changeName,
          ["userinfo.avatarUrl"]: userImg,
          otherName: otherName,
          ["item.txt"]: changeBless,
          recordPath: recordPath,
          recordTime: recordTime
        })
      },
    })
    wx.getUserInfo({
      success: function (res) {
        info = res.userInfo;
      }
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
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 300)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  getZhufuID: function () {
    let that = this;
    let data1 = {
      itemid: that.data.item.itemid,
      type: GETZHUFU_ID//1
    }
    app.ajax("?action=sendZhuFu", data1, function (res) {
      that.setData({
        zhufu_id: res.data.data.zhufu_id
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
     
    }
    return {
      title: that.data.userinfo.nickName + '送来一段祝福...',
      desc: "你也可以制作祝福话送给TA哟！",
      // path: `/pages/show/show?itemid=${that.data.item.itemid}&status=2&imgSrc=${userInfo.avatarUrl}&username=${userInfo.nickName}`
      path: `/pages/show/show?zhufu_id=${that.data.zhufu_id}&status=share&sendName=${app.globalData.userInfo.nickName}&itemid=${that.data.item.itemid}`,
      imageUrl: `https://wxapi.sanshengshi.co/api/zhufu/zhufu${that.data.item.itemid}/1.png`,
      success: function (res) {
        that.setData({
          ShareBox: false,

        })
        that.screenshots();

        let data = {    //数据
          itemid: that.data.item.itemid,
          content: that.data.item.txt,
          call_send: that.data.userinfo.nickName,
          call_recv: that.data.otherName,
          img_url: that.data.userinfo.avatarUrl,
          type: UPLOAD_ZHUFU_DATA,
          zhufu_id: that.data.zhufu_id
        }
        if (that.data.recordPath) {
          data.voice_url = that.data.recordPath;
        }

        let hasupLoadImg = that.data.userinfo.avatarUrl != app.globalData.userInfo.avatarUrl;
        let hasRecord = that.data.recordPath;

        if (hasupLoadImg && hasRecord) {
          app.upload('?action=uploadHeadImg', data.img_url, 'head_img', function (res) {//上传头像 
            data.img_url = res.data.img_url;//头像地址赋值
            app.upload('?action=uploadVoice', that.data.recordPath, 'voice', function (res) {//上传语音
              data.voice_url = res.data.voice_url;//语音地址赋值
              //上传数据
              app.ajax("?action=sendZhuFu", data, function (res) {
                //获取新的祝福id
                that.getZhufuID();
                wx.showToast({
                  title: '转发成功',
                })
              })
            })
          })
        }
        if (hasupLoadImg && !hasRecord) {
          app.upload('?action=uploadHeadImg', data.img_url, 'head_img', function (res) {//上传头像
            data.img_url = res.data.img_url;//头像地址赋值
            //上传数据
            app.ajax("?action=sendZhuFu", data, function (res) {
              //获取新的祝福id
              that.getZhufuID();
              wx.showToast({
                title: '转发成功',
              })
            })
          })
        }
        if (!hasupLoadImg && hasRecord) {
          app.upload('?action=uploadVoice', that.data.recordPath, 'voice', function (res) {//上传语音
            data.voice_url = res.data.voice_url;//语音地址赋值
            //上传数据
            app.ajax("?action=sendZhuFu", data, function (res) {
              //获取新的祝福id
              that.getZhufuID();
              wx.showToast({
                title: '转发成功',
              })
            })
          })
        }
        if (!hasupLoadImg && !hasRecord) {
          //上传数据
          app.ajax("?action=sendZhuFu", data, function (res) {
            //获取新的祝福id
            that.getZhufuID();
            wx.showToast({
              title: '转发成功',
            })
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          icon: 'none'
        })
        that.setData({
          ShareBox: false
        })
      }
    }
  },
  screenshots: function () {
    let that = this;
    that.setData({
      ShareBox: false
    })
    wx.showLoading({
      title: '加载中',
      // icon: 'success',
      // duration: 2000
      success: function () {
        var context = wx.createCanvasContext('myCanvas');
        //绘制用户图片
        context.drawImage(that.data.imgsrc, that.data.windowWidth * 0.76 * 0.5 - that.data.windowWidth * 0.76 * 0.082, that.data.windowHeight * 0.6754 * 0.76, that.data.windowWidth * 0.76 * 0.16, that.data.windowWidth * 0.76 * 0.17);
        // 绘制背景图片
        context.drawImage(that.data.canvasbg, 0, 0, that.data.windowWidth * 0.76, that.data.windowHeight * 0.70);
        // context.drawImage(that.data.canvasbg, 0, 0, that.data.windowWidth * 0.76, that.data.windowWidth * 0.76);
        let usename = `${that.data.userinfo.nickName}  送来一段祝福`;
        let txt = '【长按识别，查看详情】';
        //绘制文字
        context.setFontSize(30 / that.data.pixeRatio)
        context.setFillStyle('#ffffff')
        context.setTextAlign("center")
        context.fillText(usename, that.data.windowWidth * 0.76 * 0.5, that.data.windowHeight * 0.6754 * 0.6);
        // 绘制文字2
        context.setFillStyle('#ffffff');
        context.setTextAlign("center");
        context.setFontSize(30 / that.data.pixeRatio)
        context.fillText(txt, that.data.windowWidth * 0.76 * 0.5, that.data.windowHeight * 0.6754 * 0.65)
        wx.drawCanvas({
          canvasId: "myCanvas",
          actions: context.getActions()
        })
      }
    })
    that.setData({//打开canvans
      canvasStatue: true
    })
    wx.hideLoading()
  },
  canvasIdErrorCallback: function (e) {
  },
  knoe: function () {
    let that = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        let png = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              that.setData({
                canvasStatue: false
              })
            }, 1000)
          },
          fail(res) {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 2000
            })
          }
        })

      },
      fail: function () {
      }
    })
  },
  bindwrapcanvas: function () {
    this.setData({
      canvasStatue: false
    })
  },
  goindex: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  goToRank: function () {
    wx.switchTab({
      url: '../ranking/ranking'
    })
  },
  showShareBox: function () {
    let that = this;
   
    that.setData({
      ShareBox: !that.data.ShareBox
    })
  },
  gochangePage: function () {
    let that = this;
    // 初始化本地缓存
    wx.getStorage({
      key: 'belss',
      success: function (res) {
        wx.setStorage({
          key: 'belss',
          data: that.data.item.txt,
        })
      },
    })
    wx.navigateTo({
      url: `../changeInfo/changeInfo?bless=${that.data.item.txt}`,
    })
  },
  gocheckUp: function () {
    var that = this;
    wx.navigateTo({
      url: '../checkUp/checkUp?zhufu_id=' + that.data.options_zhufu_id,
    })
  },
  playRecord: function () {
    let that = this;
    that.setData({
      playStatue: true
    })

    wx.playVoice({
      filePath: that.data.recordPath,
      success: function () {
        setTimeout(function () {
          that.setData({
            playStatue: false
          })
        }, that.data.recordTime * 1000)
      }
    })
  },
  plusZan: function () {//点赞函数
    let that = this;
    if (that.data.zanNum < 88) {
      that.setData({
        zanNum: that.data.zanNum + 1,
        addZanNum: that.data.addZanNum + 1
      })
    }
    let data = {
      zanNum: 1,
      zhufu_id: that.data.options_zhufu_id
    };
    if (that.data.options_zhufu_id) {
      app.ajax('?action=addLikes', data, function (res) {
        that.setData({
          addZanNum: 0
        })
      })
    };

  },
  creatCode: function () {//生成二维码
    let that = this;
    //canvas二维码
    that.setData({
      canvasStatue: true,
      ShareBox: false
    })
    wx.showLoading({
      title: '加载中',
      success: function () {
        var context = wx.createCanvasContext('myCanvas');
        // 绘制二维码
        context.drawImage('../images/code.jpg', 0, that.data.windowHeight * 0.14, that.data.windowWidth * 0.76, that.data.windowWidth * 0.76);
        // context.drawImage(that.data.canvasbg, 0, 0, that.data.windowWidth * 0.76, that.data.windowWidth * 0.76);
        let usename = `${that.data.userinfo.nickName}  送来一段祝福`;
        let txt = '【长按识别，查看详情】';
        wx.drawCanvas({
          canvasId: "myCanvas",
          actions: context.getActions()
        })
      }
    })
    that.setData({//打开canvans
      canvasStatue: true
    })
    wx.hideLoading()
  },
  goRanking: function () {
    wx.switchTab({
      url: '../ranking/ranking',
    })
  }
})
const alter = function (res) {
  wx.showToast({
    title: '提交成功',
  })
}