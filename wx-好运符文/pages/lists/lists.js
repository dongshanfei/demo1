// pages/lists/lists.js
let listArr = [];
const app = getApp();
let page = 1;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list_one: [],
        list_two: []
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        let that = this;
        that.list_one = [];
        that.list_two = [];
        page = 1;
        that.ajax();
    },
    ajax: function () {
        let that = this
        wx.request({
            url: `${app.globalData.url}/index/compose/list.html?page=${page}`,
            success: res => {
                console.log(res)
                if (res.data.status == '0' || res.data.length == 0) {
                    wx.showToast({
                        title: '加载完毕',
                        icon: 'success'
                    })
                    return;
                }
                if (typeof (res.data) == 'object') {
                    listArr = res.data;
                    for (let i = 0; i < listArr.length; i++) {
                        if (i % 2 == 0) {
                            that.list_one.push(listArr[i])
                        } else {
                            that.list_two.push(listArr[i])
                        }
                    }
                    that.setData({
                        list_one: that.list_one,
                        list_two: that.list_two
                    })
                    page++;
                    console.log(that.data.list_one, that.data.list_two)
                }
            },
            fail: function () {
                wx.showToast({
                    title: '加载失败',
                    icon: 'none'
                })
            }
        })
    },
    getData: function (e) {
        console.log(e)
        let _this = this;
        let index = e.currentTarget.id;
        for (let i = 0; i < _this.data.list_one.length; i++) {
            if (_this.data.list_one[i].id == e.currentTarget.id) {
                console.log(_this.data.list_one[i].image.slice(0, 5))
                if (_this.data.list_one[i].image.slice(0, 5) == "https") {
                    wx.showLoading({
                        title: '加载中',
                    })
                    wx.downloadFile({
                        url: _this.data.list_one[i].image,
                        success: res => {
                            console.log(res)
                            _this.data.list_one[i].image = res.tempFilePath;

                            console.log(_this.data.list_one[i])

                            app.globalData.listData = _this.data.list_one[i];
                            wx.hideLoading();
                            wx.navigateBack({
                                delta: 1,
                            })
                        }
                    })
                } else {
                    app.globalData.listData = _this.data.list_one[i];
                    wx.navigateBack({
                        delta: 1,
                    })
                }

                // wx.navigateBack({
                //     delta: 1,
                // })

            }
        }
        for (let j = 0; j < _this.data.list_two.length; j++) {
            if (_this.data.list_two[j].id == e.currentTarget.id) {
                if (_this.data.list_two[j].image.slice(0, 5) == "https") {
                    wx.showLoading({
                        title: '加载中',
                    })
                    wx.downloadFile({
                        url: _this.data.list_two[j].image,
                        success: res => {
                            console.log(res)
                            _this.data.list_two[j].image = res.tempFilePath;

                            console.log(_this.data.list_two[j])

                            app.globalData.listData = _this.data.list_two[j];
                            wx.hideLoading();
                            wx.navigateBack({
                                delta: 1,
                            })
                        }
                    })
                } else {
                    app.globalData.listData = _this.data.list_two[j];
                    wx.navigateBack({
                        delta: 1,
                    })
                }
            }
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.ajax();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: `${app.globalData.itemInfo.nickName}${app.globalData.shareTitle}`,
            imageUrl: "../../images/share.png",
            path: '/pages/diy/diy',
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: '转发成功',
                    icon: 'success'
                })
            },
            fail: function (res) {
                // 转发失败
                console.log(res)
            }
        }
    },
})