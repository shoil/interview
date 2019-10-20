const md5 = require('/utils/md5.js')

App({
    globalData: {
        userInfo: null,
        key: "xxxxxx",
        server: 'xxxxx',
        openid: '',
        accountInfoId: '',
        hx_index: 0,
        shopList: []
    },
    onLaunch: function () {
        // 获取用户信息
        wx.getSetting({
            success: res => {
            if(res.authSetting['scope.userInfo'])
        {
            this.getUserInfo();
        }
    else
        {
            wx.redirectTo({
                url: '/pages/index/index',
            })
        }
    }
    })
    },
    /* 获取用户信息 */
    getUserInfo(fn) {
        if (this.globalData.userInfo != null) {
            fn && fn(this.globalData.userInfo)

            if (this.globalData.userInfo.openId != null && this.globalData.userInfo.openId != '' && this.globalData.userInfo.openId != undefined) {
                console.log("openid已经有了")
                //是否已经登录
                this.httpOn()
            }
            return
        } //已经有用户信息了
        else {
            wx.getStorage({
                key: 'userInfo',
                success: (res) => {
                this.globalData.userInfo = res.data
                fn && fn(this.globalData.userInfo)
            return
        },
            fail: () =>{
                this.reloadUserInfo(fn)
            }
        })
        }
    },

    reloadUserInfo(fn) {
        //重新获取
        wx.login({
            success: (res) => {
            var code = res.code

            wx.getUserInfo({
                success: (resInfo) => {
                var url = this.globalData.server + "/doq/wxuser/login.json"
                var t = Date.parse(new Date()) / 1000
                var sign = this.getSign(t)
                wx.request({
                    url: url,
                    method: "POST",
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        code: code,
                        iv: resInfo.iv,
                        encryptedData: resInfo.encryptedData,
                        t: t,
                        status: 0,
                        sign: sign
                    },
                    success: (data) => {

                    if(data.data.ok)
        {
            resInfo.userInfo = data.data.data
            resInfo.userInfo.openId = data.data.data.openid
            this.globalData.userInfo = resInfo.userInfo

            wx.setStorage({
                key: 'userInfo',
                data: this.globalData.userInfo
            })

            fn && fn(this.globalData.userInfo);
        }
    else
        {
            wx.showToast({
                title: '个人接口异常',
                icon: "none"
            })
        }

    },
        fail: () =>
        {
            wx.showToast({
                title: '网络错误！',
                icon: "none"
            })
        }
    })

    },
        fail: () =>
        {
            wx.getSetting({
                success: (res) => {
                if(
            !res.authSetting['scope.userInfo']
        )
            {
                wx.redirectTo({
                    url: '/pages/index/index',
                })
            }
        else
            {

            }
        },
            fail: () =>
            {
                wx.showToast({
                    title: '网络错误！',
                    icon: "none"
                })
            }
        })
        }
    })
    }
    })
    },
    getSign(t) {
        var key = this.globalData.key
        var sign = md5.hexMD5(t + key)
        return sign
    },
    // 是否注册账户
    httpOn: function () {
        var t = new Date().getTime();
        var key1 = this.globalData.key
        var key2 = t + key1
        var openid = this.globalData.userInfo.openId
        var sign = this.getSign(t)
        var url = this.globalData.server
        var that = this

        wx.request({
            url: url + '/doq/wxuser/exist/' + openid + '.json',
            data: {
                t: t,
                sign: sign,

            },
            method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            }, // 设置请求的 header
            success: (res) => {
            console.log(res)
            var ok = res.data.ok

            if(ok) {
                var accountInfoId = res.data.data[0].accontInfoList[0].id;
                wx.setStorageSync('accountInfoId', accountInfoId);
                this.globalData.accountInfoId = res.data.data[0].accontInfoList[0].id;
            } else {}
        }
    })
    },
})