//app.js
var util = require('utils/util.js');
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    //启动小程序时就初始化数据库
    const db = wx.cloud.database();

    wx.cloud.callFunction({
      name: 'isReg',
      complete: res => {

        if( res.result == 0 ){
          db.collection('user').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              description: "learn cloud database",
              regTime: util.formatTime(new Date()),
              tags: [
                "cloud",
                "database"
              ],
              location: new db.Geo.Point(113, 23),
              done: false
            }
          })
          .then(res => {
            console.log(res)
          })
          .catch(console.error)
        
        }else{
          console.log(res.result);
          wx.setStorageSync('openid', res.result._openid)
        }
      }
    })



    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })


  },
  globalData: {
    userInfo: null
  }


})
