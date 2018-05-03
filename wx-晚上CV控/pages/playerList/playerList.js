// pages/player/player.js
const app = getApp();
let url = app.setConfig.url;
let arr = [];
let page = 1;
let value;
let obj;
let valueArr = [];
let stroge = {};
let timer;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        ifshow: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('listplayer', options)
        let that = this;
        that.slider = false;
        that.setData({
            id: options.id,
        })
        wx.request({
            url: `${url}/index/audio/audios.html?audio=${options.id}&xcx=${app.setConfig.xcx}`,
            success: function (res) {
                console.log(res.data)
                res.data.words = res.data.words.split(",");
                that.setData({
                    init: res.data,
                })
                console.log(res.data)
                that.getAuidoList(`${url}/index/audio.html?audio=${options.id}&xcx=1&page=${page}`)
            },
            fail: function (res) { },
            complete: function (res) { },
        })
        page = 1;
        arr = [];

        if (options.go == 'player') {
            wx.navigateTo({
                url: `/pages/player/player?name=${options.name}&header=${options.header}&id=${options.id}&itemId=${options.itemId}&from=sharePlayer&src=${options.src}`,
            })
        }

    },
    onShow() {
        let that = this;
        console.log(`playRecord${this.data.id}`)
        wx.getStorage({
            key: `playRecord${this.data.id}`,
            success: function (res) {
                console.log(res)
                stroge = res.data
            },
            fail: function (res) {
                //设置初始缓存
                console.log(arr)
                timer = setInterval(function () {
                    if (arr.length  != 0) {
                        console.log(arr)
                        clearInterval(timer)
                        stroge = {
                            id: arr[0].id,
                            src: arr[0].audio,
                            name: arr[0].title,
                            header: that.data.init.header
                        }
                        console.log(stroge)
                        return false;
                    }
                }, 30)
                setTimeout(function(){
                    clearInterval(timer)
                },3000)

            },
            complete: function (res) { },
        })
    }
    ,
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        page++;
        that.getAuidoList(`${url}/index/audio.html?audio=${that.data.id}&xcx=1&page=${page}`)
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
            path: `/pages/index/index?from=list&id=${that.data.id}`,
            success: function (res) {
                // 转发成功
                console.log(`/pages/index/index?from=list&id=${that.data.id}`)
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
    getAuidoList: function (url) {
        console.log(url)
        let that = this;
        wx.request({
            url: url,
            success: function (res) {
                console.log(res.data)
                if (res.data.status == 0) {
                    wx.showToast({
                        title: '加载完毕',
                        icon: 'success'
                    })
                    return false;
                }
                for (let i in res.data) {
                    if (typeof res.data[i] != 'number') {
                        arr.push(res.data[i])
                    }
                }
                if (arr.length)
                    that.setData({
                        audioArr: arr,
                        ifshow: true,
                        max: res.data.count
                    })
                console.log(arr[0])


            },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
    ,
    goDetail: function () {
        console.log(`/pages/player/player?src=${stroge.src}&name=${stroge.name}&itemId=${stroge.id}&header=${stroge.header}`)
        wx.navigateTo({
            url: `/pages/player/player?src=${stroge.src}&name=${stroge.name}&id=${stroge.id}&header=${stroge.header}`,
        })

    }
})