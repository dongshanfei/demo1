let newTime;
let allTime;
let time = 1;
const app = getApp();
Page({
    data: {
        current: {
            poster: '',
            author: '',
            src: '',
            name: '',
            id: ''
        },
        audioAction: {
            method: 'pause'
        },
        value: 0,
        newTime: '00:00',
        allTime: '00:00',
        ifPlay: false,
        touchLeave: true,
        time: 1
    },
    onLoad: function (options) {
        time = 1;
        console.log("is player", options)
        let data = {
            name: options.name,
            id: options.id,
            src: options.src,
            listId: options.itmeId,
            header: options.header
        }
        console.log(`playRecord${options.id}`)
        wx.setStorage({
            key: `playRecord${options.id}`,
            data: data,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
        wx.getStorage({
            key: `playRecord${options.id}`,
            success: function (res) {
                console.log(res)
            },
        })
        this.setData({
            current: data
        })

    },
    audioPlayed: function (e) {
        console.log('audio is played')
        console.log(e)
    },
    sChangeM: function (value) {
        var theTime = parseInt(value);// 秒 
        var theTime1 = 0;// 分 
        var theTime2 = 0;// 小时 
        // alert(theTime); 
        if (theTime >= 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);

            // alert(theTime1+"-"+theTime); 
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + parseInt(theTime);
        if (theTime <= 9) {
            result = `0${theTime}`
        }
        if (theTime1 > 0) {
            theTime1 = parseInt(theTime1);
            result = "" + theTime1 + ":" + result;
            if (theTime1 <= 9) {
                result = "" + `0${theTime1}` + ":" + theTime;
            } if (theTime <= 9 && theTime1 > 9) {
                result = "" + theTime1 + ":" + `0${theTime}`;
            } if (theTime <= 9 && theTime1 <= 9) {
                result = "" + `0${theTime1}` + ":" + `0${theTime}`;
            }
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    },
    audioTimeUpdated: function (e) {
        if (!this.data.ifPlay && this.data.audioAction.method == 'play') {
            wx.hideLoading();
            time++;
            this.setData({
                ifPlay: true
            })
        }
        if (this.data.touchLeave) {
            if (!this.duration) {
                this.duration = e.detail.duration;
            }
            newTime = parseInt(e.detail.currentTime);
            if (allTime != parseInt(e.detail.duration)) {
                allTime = parseInt(e.detail.duration);
            }
            if (newTime <= 9) {
                this.setData({
                    newTime: `00:${this.sChangeM(newTime)}`,
                    allTime: this.sChangeM(allTime)
                })
            }
            if (newTime <= 59 && newTime > 9) {
                this.setData({
                    newTime: `00:${this.sChangeM(newTime)}`,
                    allTime: this.sChangeM(allTime)
                })
            }
            if (newTime > 59) {
                this.setData({
                    newTime: this.sChangeM(newTime),
                    allTime: this.sChangeM(allTime)
                })
            }
            this.setData({
                value: parseInt(100 * e.detail.currentTime / e.detail.duration)
            })

        }
    },

    timeSliderChanged: function (e) {
        console.log(this.duration)
        if (!this.duration)
            return;
        var time = this.duration * e.detail.value / 100;
        console.log(time)
        this.setData({
            audioAction: {
                method: 'setCurrentTime',
                data: time
            }
        });
    },
    playAudio: function () {
        let that = this;
        console.log(that.data.ifPlay)
        if (that.data.ifPlay == false) { //播放
            if (time == 1) {
                wx.showLoading({
                    title: '加载中',
                })
            }

            that.setData({
                audioAction: {
                    method: 'play'
                }
            })
        } else {
            that.setData({
                audioAction: {
                    method: 'pause'
                },
                ifPlay: false
            });
        }
    },
    pauseAudio: function () {
        this.setData({
            audioAction: {
                method: 'pause'
            }
        });
    },
    audioEnd: function () {
        wx.showToast({
            title: '播放完毕',
        })
        this.setData({
            audioAction: {
                method: 'pause'
            },
            avalue: 0,
            value: 0,
            newTime: '00:00',
            ifPlay: false
        });
    },
    start: function () {
        this.setData({
            touchLeave: false
        })
    },
    end: function () {
        this.setData({
            touchLeave: true
        })
    },
    onShareAppMessage: function (res) {
        let that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: that.data.current.name,
            path: `/pages/index/index?from=player&id=${that.data.current.id}&listId=${that.data.current.listId}&name=${that.data.current.name}&src=${that.data.current.src}&header=${that.data.current.header}`,
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
})