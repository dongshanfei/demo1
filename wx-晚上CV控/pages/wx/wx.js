// pages/wx/wx.js
const app = getApp()
let url = app.setConfig.url;
let appArr = [];
let page = 1;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        publicName: '',
        ifCopy: false,
        publicIntro: [],
        tipImg: '',
        restShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // that.setData({
        //     cText: that.data.chickenSoup[that.rand(0, that.data.chickenSoup.length)]
        // })
        wx.request({
            url: `${url}/index/wechatsite/xcx.html?xcx=${app.setConfig.appName}`,
            success: res => {
                console.log(res)
                if (res.data.status == 0) {

                    return false;
                }
                let introArr = res.data.content.split(",");
                that.setData({
                    publicName: res.data.wechat_name,
                    tipImg: res.data.image,
                    publicIntro: introArr,
                    focus: '关注公众号',
                    restShow: true
                })
                that.getAppInfo();
            }
        })

    },
    rand: function (min, max) {
        return parseInt(Math.random() * (max - min) + min)
    }
    ,
    getAppInfo: function () {
        let that = this;
        console.log(`${url}/index/xcxsite/list.html`)
        wx.request({
            url: `${url}/index/xcxsite/list.html?page=${page}&xcx=${app.setConfig.xcx}`,
            success: res => {
                console.log('app', res.data)
                if (res.data.status == '0' || res.data.length == 0) {
                    wx.showToast({
                        title: '加载完毕',
                        icon: 'success'
                    })
                    return;
                }
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].xcx_name != app.globalData.appName) {
                        appArr.push(res.data[i])
                    }
                }
                that.setData({
                    appArr: appArr
                })
                page++;
            }
        })
    },
    onReachBottom: function () {
        this.getAppInfo();
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
            title: app.setConfig.appName,
            path: '/pages/wx/wx',
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
    focus: function () {
        let that = this;
        wx.setClipboardData({
            data: that.data.publicName,
            success: function () {
                wx.showToast({
                    title: '复制成功',
                    icon: 'successs'
                })
                if (!that.data.ifCopy) {
                    that.setData({
                        ifCopy: true
                    })
                }
            }
        })
    },
    tapMask: function () {
        let that = this;
        that.setData({
            ifCopy: false
        })
    },
    goApp(e) {
        console.log(e.currentTarget.dataset.appid)
        wx.navigateToMiniProgram({
            appId: e.currentTarget.dataset.appid,
        })
    }
})