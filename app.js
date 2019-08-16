//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'happynewyear-fjkgu',
      traceUser: true
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    
    // 获取用户信息
    // wx.getSetting({
    //   success:res=>{
    //     wx.getUserInfo({
    //       success: res => {
    //         // 可以将 res 发送给后台解码出 unionId
    //         this.globalData.userInfo = res.userInfo
    //         console.log(res.userInfo);

    //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //         // 所以此处加入 callback 以防止这种情况
    //         if (this.userInfoReadyCallback) {
    //           this.userInfoReadyCallback(res)
    //         }
    //       },
    //       fail: res => {
    //         console.log(res);
    //       }
    //       , complete: res => {
    //         console.log(res);
    //       }
    //     })
    //   },
    //   fail:res=>{
    //     console.log(res);
    //   },
    //   complete:res=>{
    //     console.log(res);
    //   }
    // })      
  },
  globalData: {
    userInfo: null,
    picsrc: null,
    openid: '',
  }
})