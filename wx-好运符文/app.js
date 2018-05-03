//app.js
App({
    globalData: {
        url: 'https://wx.sanshengshi.ltd',
        userInfo: {},
        listArr: [],
        itemInfo: {
            nickName: '全村人的希望',
            avatarUrl: "../../images/code.png"
        },
        itemArr: [],
        listData: {},
        appName: '水逆转运符',
        shareTitle: '刚刚领取了一张好运符，你也快来定制吧~'
    }
    ,
    onLaunch: function () {
        let that = this;
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId

            }
        })

    }
})