//app.js
App({
    setConfig: {
        url: 'https://wx.sanshengshi.ltd',
        xcx: 34,
        appName: '第五人格通关攻略',
        shareTitle: '亲眼所见，亦非真实'
    }
    ,
    ajax: function (url, callback = function () { }) {
        wx.request({
            url: url,
            success: function (res) {
                callback(res)
            },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
    ,
    onLaunch: function () {
        var t = this;

    },
    globalData: {
        userInfo: null
    }
})