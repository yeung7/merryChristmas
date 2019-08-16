//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bgPic:null,
    picChoosed:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo(e){
    console.log(e.detail.userInfo);
  },

  assignPicChoosed(){
    if(this.data.bgPic){
      this.setData({
        picChoosed:true
      })
    }else{
      this.setData({
        picChoosed:false
      })
    }
  },

  getAvatar(){
    console.log("获取头像");
    if(app.globalData.userInfo){
      this.setData({
        bgPic:app.globalData.userInfo.avatarUrl,
      });
      this.assignPicChoosed();
    }else{
      wx.getUserInfo({
        success:res=>{
          app.globalData.userInfo=res.userInfo;
          this.setData({
            userInfo:res.userInfo,
            bgPic:res.userInfo.avatarUrl
          });
          this.assignPicChoosed();
        }
      })
    }
  },

  chooseImage(from){
    wx.chooseImage({
      count:1,
      sizeType:["original","compressed"],
      sourceType:[from.target.dataset.way],
      success: (res)=>{
        var tempFilePaths=res.tempFilePaths;
        this.setData({
          bgPic:res.tempFilePaths[0]
        });
        this.assignPicChoosed();
      },
      fail:(res)=>{
        this.assignPicChoosed();
      },
      complete:(res)=>{
        this.assignPicChoosed();
      },
    })
  },

  nextPage(){
    app.globalData.bgPic=this.data.bgPic;
    console.log(app.globalData.bgPic);
    wx.navigateTo({
      url: '../imageeditor/imageeditor',
    })
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
