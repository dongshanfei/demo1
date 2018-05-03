// pages/audio/audio.js
const app = getApp();
let url = app.setConfig.url;
var touchDot = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
var interval = "";// 记录/清理时间记录 
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        that.dataArr = [];
        that.page = 1;
        that.getList()
        if(options.from == 'list'){
            wx.navigateTo({
                url: `/pages/playerList/playerList?id=${options.id}`,
            })
        }
        if (options.from == 'player'){
            console.log('indexplayer',options)
            wx.navigateTo({
                url: `/pages/playerList/playerList?id=${options.id}&itemId=${options.listId}&go=player&name=${options.name}&header=${options.header}&src=${options.src}`,
            })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

        this.dataArr = [];
        this.page = 1;
        this.getList("PullDown")

        console.log(1)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.getList()
    },
    getList(action) {
        let that = this;
        wx.request({
            url: `${url}/index/audio/list.html?xcx=${app.setConfig.xcx}&page=${that.page}`,
            success: function (res) {
                if (res.data.status == 0) {
                    wx.showToast({
                        title: '加载完毕',
                        icon: 'success'
                    })
                    return false;
                }
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].words = res.data[i].words.split(",");
                    that.dataArr.push(res.data[i])
                   
                }
                that.setData({
                    data: that.dataArr
                })
                that.page++;
                if (action == 'PullDown') {
                    wx.showToast({
                        title: '刷新成功',
                        icon: 'success'
                    })
                    wx.stopPullDownRefresh();
                }
            },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
    ,
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        let that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            // console.log(res.target)
        }
        return {
            title: app.setConfig.appName,
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
        if (touchMove - touchDot <= -80 && time < 10) {
            console.log('向左滑动');
            wx.switchTab({
                url: '/pages/wx/wx'
            });
        }
        // 向右滑动  
        if (touchMove - touchDot >= 80 && time < 10) {
            console.log('向右滑动');

        }
    },
    // 触摸结束事件  
    touchEnd: function (e) {
        clearInterval(interval); // 清除setInterval  
        time = 0;
    }
})