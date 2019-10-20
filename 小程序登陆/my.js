const app = getApp()
import {
    hexMD5
} from '../../utils/md5.js';

Page({

    data: {
        userInfo: {},
        authorized: false,
        shopAccount: [],
        add: '',
        noPhone: true,
        session_key: null,
        openid: '',
        ac_index: 0,
        accountInfoId: '',
        showInvite: true
    },
    onLoad: function (options) {
        app.getUserInfo(userInfo => {
            this.setData({
                userInfo: userInfo,
                authorized: true,
                add: userInfo.city,
                openid: userInfo.openid
            })
            this.httpUser()
        }
    )

        var that = this
        var setMy = setInterval(function () {
            that.setData({
                accountInfoId: app.globalData.accountInfoId
            })
            if (app.globalData.userInfo.city == that.data.userInfo.city) {
                clearInterval(setMy)
            }

        }, 1000)
        var accountInfoId = app.globalData.accountInfoId


    },
    onShow() {
        var that = this
        app.getUserInfo(userInfo => {
            this.httpUser()
            if(this.data.session_key == null
    )
        {
            this.reLoadSessionKey()
            this.httpUser()
        }
    else
        {
            wx.checkSession({
                fail: () => {
                this.reLoadSessionKey()
            }
        })
        }
        if (userInfo.phone != null && userInfo.phone != "" && userInfo.phone != undefined) {
            this.setData({
                noPhone: false
            })
        }
        var setshow = setInterval(function () {
            that.setData({
                accountInfoId: app.globalData.accountInfoId
            })

            if (that.data.accountInfoId == app.globalData.accountInfoId && that.data.accountInfoId != '') {
                that.setData({
                    showInvite: false
                })
                clearInterval(setshow)
            }
        }, 10)
    })
    },
    // 获取商户账户
    httpUser() {
        var t = new Date().getTime();
        var key1 = "NvomuLJhsn871ouPMGWM2K4nP2rJwKhc"
        var key2 = t + key1
        var openid = this.data.userInfo.openid
        var sign = hexMD5(key2)
        var that = this
        wx.request({
            url: 'https://api.wx.doqtech.com.cn/doq/wxuser/find/' + openid + '.json',
            data: {
                t: t,
                sign: sign,
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                if (res.data.data.length > 0) {
                    that.setData({
                        shopAccount: res.data.data[0].accontInfoList
                    })
                }

                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    //点击切换账户
    selectAccount(e) {

        this.setData({
            ac_index: e.detail.value, //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
        });
        var index = e.detail.value;
        var accountInfoId = this.data.shopAccount[index].id
        wx.setStorageSync('accountInfoId', accountInfoId);
    },

    reLoadSessionKey() {
        wx.login({
            success: (res) => {
            var code = res.code
            var t = Date.parse(new Date()) / 1000
            var sign = app.getSign(t)

            var url = app.globalData.server + "/doq/wxuser/sessionKey.json"
            wx.request({
                url: url,
                method: "POST",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    code: code,
                    t: t,
                    sign: sign,
                    status: 0
                },
                success: (res) => {
                if(res.data.ok)
        {
            this.setData({
                session_key: res.data.data
            })
        }
    else
        {
            wx.showToast({
                title: '网络繁忙~',
                icon: "none"
            })
        }
    },
        fail: () =>
        {
            wx.showToast({
                title: '网络繁忙~',
                icon: "none"
            })
        }
    })
    }
    })
    },

    getUserAccounts() {
        // wx.showLoading({})
        app.getUserInfo(userInfo => {
            var openId = userInfo.openId

            //根据openId 来获取用户的 accounts
            //获取到了之后 关闭loading
            //wx.hideLoading()
        }
    )
    },
    getPhoneNumber(e) {
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
            wx.showToast({
                title: '请及时绑定手机号~',
                icon: "none"
            })
        } else if (e.detail.errMsg == 'getPhoneNumber:ok') {
            var iv = e.detail.iv
            var encryptedData = e.detail.encryptedData
            var url = app.globalData.server + "/doq/wxuser/bindPhone.json"
            var t = Date.parse(new Date()) / 1000
            var sign = app.getSign(t)

            wx.request({
                url: url,
                method: "POST",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    openId: app.globalData.userInfo.openId,
                    iv: iv,
                    encryptedData: encryptedData,
                    t: t,
                    sign: sign,
                    sessionKey: this.data.session_key
                },
                success: (res) => {
                app.globalData.userInfo.phone = res.data.data
                wx.setStorage({
                    key: 'userInfo',
                    data: app.globalData.userInfo
                })

                this.setData({
                    userInfo: app.globalData.userInfo,
                    noPhone: false
                })

                if(res.data.ok)
            {
                wx.showToast({
                    title: '绑定成功！',
                    icon: "none"
                })


            }
        else
            {
                wx.showToast({
                    title: '网络繁忙~',
                    icon: "none"
                })
            }
        },
            fail: () =>
            {
                wx.showToast({
                    title: '网络繁忙~',
                    icon: "none"
                })
            }
        })
        }
    }

})