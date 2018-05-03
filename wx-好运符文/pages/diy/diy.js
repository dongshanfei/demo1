// pages/diy/diy.js
const app = getApp()


/***********2018-4-26新版**************/
let bgHeigth = 1170;
let bottomSelect = [];
let select_index = 2;

let maskCanvas = wx.createCanvasContext('maskCanvas');

//移动前坐标
let x;
let y;
//新坐标
let _x;
let _y;

let tx;
let ty;
let _tx;
let _ty;

let anglePre;//移动前角度
let angleNext;//新角度
let new_rotate;//旋转角度
let rotate = 0;//合角度
let dx = 0;//x方向的差值
let dy = 0;//y方向的差值
let scale = 0;//缩放比例
let disPtoO = 0;//触摸点到圆心的距离
let items = [];
let index = 0;
let itemId = 5;
let tpdata = {}; //新创建的组件的信息

let hCw = 1.7781; //宽高比

let num = 0.77;//canvas内的图片占总canvas的百分比;

let bgList = [];

let timer; //定时器
// let idata = {};
let yy = 0;
let speed = 10;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: {
            // avatarUrl: "../../images/code.png",
            // nickName: "全村人的希望"
        },
        /***********2018-4-26新版************/
        //底部按钮数据
        bottomSelect: [
            { id: 0, image: '../../images/circle.png', selectImage: '../../images/circle_select.png', text: '', haveBorder: true, isSelect: false },
            { id: 1, image: '../../images/picture.png', selectImage: '../../images/picture_select.png', text: '背景', haveBorder: true, isSelect: false },
            { id: 2, image: '../../images/accessories.png', selectImage: '../../images/accessories_select.png', text: '配件', haveBorder: true, isSelect: true },
            { id: 3, image: '../../images/text.png', selectImage: '../../images/text_select.png', text: '文字', haveBorder: true, isSelect: false },
            { id: 4, image: '../../images/heart.png', selectImage: '../../images/heart_select.png', text: '', haveBorder: false, isSelect: false }
        ],
        isShowCom: true, //配件上下滑动
        showPj: 2,
        tplist: [],
        tplist_1: [],
        tplist_2: [],
        tplg1: 0,
        tplg2: 0,
        itemList: [],//组件列表
        canvasWidth: 79,//canvas占整个mask的宽度百分比
        ifShow: false,
        showHand: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    setBg: function (data) {
        console.log(data)
        this.setData({
            'item.id': data.id,
            'item.bgImg': data.image,
            'item.fontsize': data.fontsize * 0.65,
            'item.color': data.color,
            'item.userTop': data.image_y / bgHeigth * 100,
            'item.titleTop': data.font_y / bgHeigth * 100,
        })
        console.log('item', this.data.item)
        wx.hideLoading();
        bgList.push(data)
    }
    ,
    onLoad: function (options) {
        let _this = this;
        // wx.showLoading({
        //     title: "资源加载中",
        //     mask: true,
        //     fail: function () {
        //         _this.requseFali()
        //     }
        // });
        items = this.data.itemList;
        bottomSelect = _this.data.bottomSelect;//赋值bottomSelect



        wx.getStorage({
            key: 'nickName',
            success: function (res) {
                console.log(res);
                _this.setData({
                    'item.nickName': res.data,
                })
                app.globalData.itemInfo.nickName = res.data;
                wx.getStorage({
                    key: 'avatarUrl',
                    success: function (res1) {
                        console.log(res1)
                        clearTimeout(timer)
                        _this.setData({
                            showHand: false
                        })
                        wx.downloadFile({
                            url: res1.data,
                            success: res3 => {
                                _this.setData({
                                    'item.avatarUrl': res3.tempFilePath,
                                    showHand: false
                                })
                            }
                        })

                    },
                })
            },
            fail: res => {
                let data = {
                    avatarUrl: "../../images/code.png",
                    nickName: "全村人的希望"
                }
                _this.setData({
                    'item.nickName': data.nickName,
                    'item.avatarUrl': data.avatarUrl,
                })
            }
        })

        wx.getSystemInfo({
            success: sysData => {
                console.log('sysData', sysData)
                _this.sysData = sysData;
                _this.setData({
                    cHeight: sysData.screenWidth * 0.75 * hCw
                })
                wx.request({
                    url: `${app.globalData.url}/index/compose.html`,
                    success: res => {
                        console.log(app.globalData.itemInfo)
                        console.log(res.data)
                        _this.setData({
                            ifShow: true
                        })
                        wx.downloadFile({
                            url: res.data.image,
                            success: res1 => {
                                res.data.image = res1.tempFilePath;
                                _this.setBg(res.data)

                                wx.request({
                                    url: `${app.globalData.url}/index/compose/part.html?type=2`,//背景
                                    success: res => {
                                        console.log(res)
                                        _this.setData({
                                            tplist_1: res.data,
                                            tplg1: res.data.length,
                                        })
                                    },
                                    fail: res => {
                                        _this.requseFali();
                                    }

                                })

                                timer = setTimeout(function () {
                                    _this.setData({
                                        showHand: false
                                    })
                                }, 5000)
                            }
                        })
                    },
                    fail: res => {
                        _this.requseFali()
                    }
                })
            },
        })


        // wx.getUserInfo({
        //     success: res => {
        //         console.log(res)
        //         _this.setData({
        //             'item.nickName': res.userInfo.nickName
        //         })
        //         wx.downloadFile({
        //             url: res.userInfo.avatarUrl,
        //             success: res => {
        //                 console.log(res)
        //                 _this.setData({
        //                     'item.avatarUrl': res.tempFilePath
        //                 })
        //             }
        //         })
        //     }
        // })



    },
    /************2018-4-26新版**************/
    bottomSelect: function (e) {
        let _this = this;
        select_index = e.currentTarget.dataset.id;

        if (select_index == 0) {
            wx.navigateTo({
                url: '/pages/lists/lists',
            })
        }
        if (select_index == 1 || select_index == 2 || select_index == 3) {
            for (let i = 0; i < bottomSelect.length; i++) {
                if (select_index == bottomSelect[i].id) {
                    bottomSelect[i].isSelect = true
                } else {
                    bottomSelect[i].isSelect = false;
                }
            }
            if (select_index == 1) {
                _this.setData({//按住配件的时候
                    showPj: 1,
                })
                wx.request({
                    url: `${app.globalData.url}/index/compose/part.html?type=1`,//背景
                    success: res => {
                        _this.setData({
                            tplist: res.data,
                            tplg: res.data.length,

                        })
                    },
                    fail: res => {
                        _this.requseFali()
                    }
                })

                console.log(222)
            }
            if (select_index == 2) {//配件
                bottomSelect[1].haveBorder = false;
                // if (_this.data.tplg1 == 0) {
                //     wx.request({
                //         url: `${app.globalData.url}/index/compose/part.html?type=2`,//配件
                //         success: res1 => {
                //             console.log('配件', res1)
                //             _this.setData({
                //                 tplist_1: res1.data,
                //                 tplg1: res1.data.length,

                //             })
                //         },
                //         fail: res => {
                //             _this.requseFali()
                //         }
                //     })
                // }

                _this.setData({//按住配件的时候
                    showPj: 2,
                })
            } if (select_index == 3) { //文字
                bottomSelect[1].haveBorder = true;
                if (_this.data.tplg2 == 0) {
                    wx.request({
                        url: `${app.globalData.url}/index/compose/part.html?type=3`,//文字
                        success: res2 => {
                            _this.setData({
                                tplist_2: res2.data,
                                tplg2: res2.data.length
                            })
                        },
                        fail: res => {
                            _this.requseFali()
                        }
                    })
                }
                _this.setData({//按住字体的时候
                    showPj: 3
                })
            }
            _this.setData({
                isShowCom: true,//开启配件；栏
            })

        }
        if (select_index == 4) {
            wx.navigateTo({
                url: '/pages/user/user',
            })
        }
        _this.setData({
            bottomSelect: bottomSelect,
        })
    },
    selectSwitch: function () {
        this.setData({
            isShowCom: !this.data.isShowCom,
        })
        console.log('this.data.isShowCom', this.data.isShowCom, select_index, bottomSelect)
        if (this.data.isShowCom == false) {
            console.log(select_index, bottomSelect[select_index - 1])
            bottomSelect[select_index].isSelect = false;

        } else {
            bottomSelect[select_index].isSelect = true;

        }
        this.setData({
            bottomSelect: bottomSelect,
        })
    },


    getBg: function (e) {
        let _this = this;
        wx.showLoading({
            title: "资源加载中",
            mask: true,
            fail: function () {
                _this.requseFali()
            }
        });
        console.log(e)
        for (let j = 0; j < bgList.length; j++) {
            if (e.currentTarget.dataset.id == bgList[j].id) {
                console.log('背景有了不用下载')
                _this.setBg(bgList[j])
                return false;
            }
        }
        for (let i = 0; i < _this.data.tplist.length; i++) {
            if (e.currentTarget.dataset.id == _this.data.tplist[i].id) {

                wx.downloadFile({//下载背景图
                    url: _this.data.tplist[i].image,
                    success: res => {
                        _this.data.tplist[i].image = res.tempFilePath
                        _this.setBg(_this.data.tplist[i])
                    }
                })
                return false;

            }
        }
    },
    /**
        * 生命周期函数--监听页面初次渲染完成
        */
    loadImg: function (e) {
        console.log('loadImg', e)

        console.log(items[items.length - 1])
        //宽高比 圆心坐标
        items[items.length - 1].hdw = e.detail.height / e.detail.width;
        items[items.length - 1].height = items[items.length - 1].width * items[items.length - 1].hdw;
        items[items.length - 1].x = items[items.length - 1].left + items[items.length - 1].width / 2;
        items[items.length - 1].y = items[items.length - 1].top + items[items.length - 1].height / 2;
        console.log(items[items.length - 1])

        this.setData({
            itemList: items
        })
    },



    // 触摸开始事件  
    touchStart: function (e) {
        //获取作为移动前角度的坐标
        console.log(e.currentTarget.dataset.id, items)
        for (let i = 0; i < items.length; i++) {
            items[i].active = false;

            if (e.currentTarget.dataset.id == items[i].id) {
                console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)
                index = i;
                console.log(items[index])
                items[index].active = true;
            }
        }
        this.target = true;
        items[index].tx = e.touches[0].clientX;
        items[index].ty = e.touches[0].clientY;
        //移动前的角度
        console.log(items[index].x, items[index].y, items[index].tx, items[index].ty)
        items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)

        //获取图片半径
        console.log(items[index].x, items[index].y, items[index].left, items[index].top)
        items[index].r = this.getDistancs(items[index].x, items[index].y, items[index].left, items[index].top)
        console.log('半径', items[index].r, items)
    },
    // 触摸移动事件  
    touchMove: function (e) {
        //记录移动后的位置
        items[index]._tx = e.touches[0].clientX;
        items[index]._ty = e.touches[0].clientY;
        items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx - this.sysData.windowWidth * 0.125, items[index]._ty - 10)
        console.log('disPtoO点到半径:', items[index].disPtoO)
        console.log('缩放比例:', items[index].disPtoO / items[index].r)
        items[index].scale = items[index].disPtoO / items[index].r; //赋值半径
        items[index].oScale = 1 / items[index].scale;

        //移动后位置的角度
        console.log(items[index].x, items[index].y, items[index]._tx, items[index]._ty)
        items[index].angleNext = this.countDeg(items[index].x, items[index].y, items[index]._tx, items[index]._ty)
        //角度差
        items[index].new_rotate = items[index].angleNext - items[index].anglePre;

        //叠加的角度差
        console.log(items[index].angleNext, items[index].anglePre, items[index].new_rotate)
        items[index].rotate += items[index].new_rotate;
        console.log('rotate', items[index].rotate)
        items[index].angle = items[index].rotate; //赋值

        //用过移动后的坐标赋值为移动前坐标
        items[index].tx = e.touches[0].clientX;
        items[index].ty = e.touches[0].clientY;
        items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)


        //赋值
        this.setData({
            itemList: items
        })


    },
    // 触摸结束事件  
    touchEnd: function (e) {
        this.target = false;

    }
    ,
    WraptouchStart: function (e) {
        for (let i = 0; i < items.length; i++) {
            items[i].active = false;
            if (e.currentTarget.dataset.id == items[i].id) {
                index = i;
                items[index].active = true;
            }
        }
        this.setData({
            itemList: items
        })

        items[index].lx = e.touches[0].clientX;
        items[index].ly = e.touches[0].clientY;

        console.log(items[index])
    }
    , WraptouchMove: function (e) {
        // console.log('WraptouchMove', e)

        items[index]._lx = e.touches[0].clientX;
        items[index]._ly = e.touches[0].clientY;

        items[index].left += items[index]._lx - items[index].lx;
        items[index].top += items[index]._ly - items[index].ly;
        items[index].x += items[index]._lx - items[index].lx;
        items[index].y += items[index]._ly - items[index].ly;

        items[index].lx = e.touches[0].clientX;
        items[index].ly = e.touches[0].clientY;
        console.log(items)
        this.setData({
            itemList: items
        })

    }
    , WraptouchEnd: function () {

    },
    /*获取坐标点到圆心的角度
     *参数1和2为圆心点坐标
     *参数3和4为点击的坐标
     */
    countDeg: function (cx, cy, pointer_x, pointer_y) {
        var ox = pointer_x - cx;
        var oy = pointer_y - cy;
        var to = Math.abs(ox / oy);
        var angle = Math.atan(to) / (2 * Math.PI) * 360;//鼠标相对于旋转中心的角度
        console.log("ox.oy:", ox, oy)
        if (ox < 0 && oy < 0)//相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
        {
            angle = -angle;
        } else if (ox <= 0 && oy >= 0)//左下角,3象限  
        {
            angle = -(180 - angle)
        } else if (ox > 0 && oy < 0)//右上角，1象限  
        {
            angle = angle;
        } else if (ox > 0 && oy > 0)//右下角，2象限  
        {
            angle = 180 - angle;
        }

        return angle;
    },

    getDistancs(cx, cy, pointer_x, pointer_y) {
        var ox = pointer_x - cx;
        var oy = pointer_y - cy;
        return Math.sqrt(
            ox * ox + oy * oy
        );

    },
    deleteItem: function (e) {
        console.log(e)
        let newList = [];
        for (let i = 0; i < items.length; i++) {
            console.log(items[i])
            if (e.currentTarget.dataset.id != items[i].id) {
                console.log(items[i])
                newList.push(items[i])
            }

        }
        if (newList.length > 0) {
            newList[newList.length - 1].active = true;
        }
        items = newList;
        console.log(items, newList)
        this.setData({
            itemList: items
        })
    },
    creatItem: function () {
        itemId++;
        console.log(id)
        let data = {
            id: itemId,
            image: '1.png',
            top: 100,
            left: 100,
            x: 155,
            y: 155,
            scale: 1,
            angle: 0,
            active: false
        }
        items.push(data);
        this.setData({
            itemList: items
        })
    }
    ,
    getSrc: function (e) {
        itemId++;
        let _this = this;
        console.log(e)
        wx.showLoading({
            title: "资源加载中",
            mask: true,
            fail: function () {
                _this.requseFali();
            }
        });
        if (e.currentTarget.dataset.from == "2") { //生成配件
            console.log(_this.data.tplist_1)
            for (let i = 0; i < _this.data.tplist_1.length; i++) {
                console.log('dataset.id', e.currentTarget.dataset.id);
                console.log('tplist_1[i].id', _this.data.tplist_1[i].id)
                if (e.currentTarget.dataset.id == _this.data.tplist_1[i].id) {
                    for (let j = 0; j < items.length; j++) {
                        if (e.currentTarget.dataset.id == items[j].itemid) {
                            console.log('items[j]', items[j]);
                            let idata = {};
                            idata.id = itemId;
                            idata.image = items[j].image;
                            idata.itemid = _this.data.tplist_1[i].id;
                            console.log(idata)

                            _this.tpDownload(idata, false)
                            return false;
                        }
                    }
                    console.log("_this.data.tplist_1[i]", _this.data.tplist_1[i])
                    // idata = _this.data.tplist_1[i];
                    let idata = {};
                    idata.id = itemId;
                    idata.image = _this.data.tplist_1[i].image;
                    idata.itemid = _this.data.tplist_1[i].id;
                    _this.tpDownload(idata, true)
                    return false;
                }
            }
        }
        if (e.currentTarget.dataset.from == "3") {//生成文字

            for (let i = 0; i < _this.data.tplist_2.length; i++) {
                console.log('dataset.id', e.currentTarget.dataset.id);
                console.log('tplist_2[i].id', _this.data.tplist_2[i].id)
                if (e.currentTarget.dataset.id == _this.data.tplist_2[i].id) {
                    for (let j = 0; j < items.length; j++) {
                        if (e.currentTarget.dataset.id == items[j].itemid) {
                            console.log('items[j]', items[j]);
                            let idata = {};
                            idata.id = itemId;
                            idata.image = items[j].image;
                            idata.itemid = _this.data.tplist_2[i].id;
                            console.log(idata)
                            _this.tpDownload(idata, false)
                            return false;
                        }
                    }
                    console.log("_this.data.tplist_2[i]", _this.data.tplist_2[i])
                    // idata = _this.data.tplist_2[i];
                    let idata = {};
                    idata.id = itemId;
                    idata.image = _this.data.tplist_2[i].image;
                    idata.itemid = _this.data.tplist_2[i].id;
                    _this.tpDownload(idata, true)
                    return false;
                }
            }
        }
    },
    tpDownload: function (data, isDownload) {
        if (yy < 0) {
            speed = -speed
        } if (yy > 300) {
            speed = -speed
        }
        yy += speed;
        console.log(yy)
        console.log('data', data)
        let _this = this;
        let newTpdata = {};
        if (isDownload) {
            wx.downloadFile({
                url: data.image,
                success: res => {
                    newTpdata.image = res.tempFilePath;
                    newTpdata.id = data.id;
                    newTpdata.itemid = data.itemid;
                    newTpdata.top = 100 + yy;
                    newTpdata.left = 100;
                    newTpdata.width = _this.sysData.windowWidth / 4;
                    newTpdata.scale = 1;
                    newTpdata.angle = 0;
                    newTpdata.rotate = 0;
                    newTpdata.active = true;
                    console.log(newTpdata);//没有给原点坐标
                    console.log(items)
                    for (let i = 0; i < items.length; i++) {
                        items[i].active = false;
                    }
                    items.push(newTpdata);

                    _this.setData({
                        itemList: items
                    })
                    wx.hideLoading();
                }
            })
        } else {
            newTpdata.image = data.image;
            newTpdata.id = data.id;
            newTpdata.itemid = data.itemid;
            console.log(_this.data.tplist_1)
            newTpdata.top = 100 + yy;
            newTpdata.left = 100;
            newTpdata.width = _this.sysData.windowWidth / 4;
            newTpdata.scale = 1;
            newTpdata.angle = 0;
            newTpdata.rotate = 0;
            newTpdata.active = true;
            for (let i = 0; i < items.length; i++) {
                items[i].active = false;
            }
            console.log(newTpdata);//没有给原点坐标
            items.push(newTpdata);
            console.log(items)
            _this.setData({
                itemList: items
            })
            wx.hideLoading();
        }

    },
    save: function () {
        this.setData({
            showCanvas: true,
            canvasHeight: this.sysData.windowHeight * 0.85
        })
        console.log('this.data.item', this.data.item)
        console.log('items', items)
        let obj = this.data.item;
        let picW = this.sysData.windowWidth * this.data.canvasWidth / 100;
        let prop = (picW * num) / (this.sysData.windowWidth * 0.75);
        console.log(picW, num, this.sysData.windowWidth)

        console.log('prop', prop)


        maskCanvas.save();

        maskCanvas.beginPath();
        //图一张白图
        maskCanvas.setFillStyle('#fff');
        maskCanvas.fillRect(0, 0, this.sysData.windowWidth, this.data.canvasHeight)
        maskCanvas.closePath();
        maskCanvas.stroke() //调用此方法才会去画圆

        // maskCanvas.fillRect(0, 0, this.sysData.windowWidth, this.data.canvasHeight)
        //图头像

        console.log(this.sysData.windowWidth * this.data.canvasWidth / 100)
        console.log(this.sysData.windowWidth * this.data.canvasWidth / 100 * hCw)

        let image = {
            w: picW * num * 0.287,
            h: picW * num * 0.287,
            r: picW * num * 0.287 / 2
        };

        //画背景
        maskCanvas.drawImage(obj.bgImg, picW * (1 - num) / 2, 10, picW * num, picW * num * hCw)
        //画底图
        maskCanvas.drawImage('../../images/xcx.png', picW * (1 - num) / 2, picW * num * hCw + 15, picW * num, this.data.canvasHeight * 0.15)

        //画原
        maskCanvas.save();
        maskCanvas.beginPath();
        maskCanvas.arc(picW / 2, picW * num * hCw * obj.userTop / 100 + 15 + image.w / 2, image.r, 0, Math.PI * 2, false);
        // maskCanvas.stroke()
        maskCanvas.clip();//截取







        //画头像
        maskCanvas.drawImage(obj.avatarUrl, (picW - image.w) / 2, picW * num * hCw * obj.userTop / 100 + 15, image.w, image.h)
        maskCanvas.closePath();
        //maskCanvas.stroke()

        maskCanvas.restore();

        //绘制文字
        maskCanvas.save();
        maskCanvas.beginPath();
        let fontSize = obj.fontsize || 30;
        let textColor = obj.color || '#000';
        maskCanvas.setFontSize(parseInt(fontSize) * prop / 2)
        maskCanvas.setFillStyle(textColor)
        maskCanvas.setTextAlign('center')
        maskCanvas.fillText(obj.nickName, picW / 2, obj.titleTop / 100 * picW * num * hCw + 10 + parseInt(fontSize) * prop / 2);
        maskCanvas.closePath();
        maskCanvas.stroke() //调用此方法才会去画圆
        let data = items[0]
        /** 
         * x
         * y
         * scale
         * prop
         * width
         * height
         * 
         */
        //画组件
        for (let i = 0; i < items.length; i++) {
            maskCanvas.save();
            maskCanvas.translate(picW * (1 - num) / 2, 15);
            maskCanvas.beginPath();
            maskCanvas.translate(items[i].x * prop, items[i].y * prop); //圆心坐标
            maskCanvas.rotate(items[i].angle * Math.PI / 180); // 旋转值
            // contex.fillRect(0, 0, 100, 100);
            maskCanvas.translate(-(items[i].width * items[i].scale * prop / 2), -(items[i].height * items[i].scale * prop / 2))  //再平移图片宽高的一半 
            // ctx.fillRect(-50, -50, 300, 300);
            maskCanvas.drawImage(items[i].image, 0, 0, items[i].width * items[i].scale * prop, items[i].height * items[i].scale * prop); // 推进去图片

            maskCanvas.restore();
        }
        //maskCanvas.restore();

        let _this = this;
        maskCanvas.draw(false, function (e) {
            wx.canvasToTempFilePath({
                canvasId: 'maskCanvas',
                success: res => {
                    console.log(res)
                    _this.setData({
                        canvasTemImg: res.tempFilePath
                    })
                    console.log(_this.data.canvasTemImg)
                }
            }, this)
        }
        )



    },
    disappearCanvas: function () {
        this.setData({
            showCanvas: false
        })
    },
    saveImg: function () {
        let _this = this;
        wx.saveImageToPhotosAlbum({
            filePath: _this.data.canvasTemImg,
            success: res => {
                wx.showToast({
                    title: '保存成功',
                    icon: "success"
                })
            }
        })

    },
    onShow: function () {
        console.log('app.globalData.listData', app.globalData.listData)
        if (JSON.stringify(app.globalData.listData) == "{}") {
            return false;

        } else {
            this.setBg(app.globalData.listData)
            app.globalData.listData = {}
        }

    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: `${this.data.item.nickName}${app.globalData.shareTitle}`,
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
    getuserinfo: function (e) {
        console.log(e)
        if (e.detail.userInfo) {
            console.log(e.detail.userInfo)
            app.globalData.itemInfo = e.detail.userInfo;
            let _this = this;
            wx.downloadFile({
                url: e.detail.userInfo.avatarUrl,
                success: res => {
                    wx.setStorageSync("nickName", e.detail.userInfo.nickName)
                    wx.setStorageSync("avatarUrl", e.detail.userInfo.avatarUrl)
                    clearTimeout(timer)
                    console.log(res.tempFilePath)
                    _this.setData({
                        'item.nickName': e.detail.userInfo.nickName,
                        'item.avatarUrl': res.tempFilePath,
                        showHand: false
                    })

                }
            })
        }
    },
    onReady: function () {
        let _this = this;
    }
    , requseFali: function (res) {
        wx.hideLoading();
        wx.showToast({
            title: '请求失败',
            icon: "none"
        })
    }

    /************2018-4-26新版*************/

})