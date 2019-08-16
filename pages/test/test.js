// pages/test/test.js
// wx.cloud.init({
//   env: 'happynewyear-fjkgu'

// });

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    region: ['广东省', '广州市', '海珠区'],
    customItem: "全部"
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  addtestPost(e) {
    console.log('测试');

    const db = wx.cloud.database();
    db.collection('post').add({
      data: {
        picsrc: 'res.fileID',
        address: 'this.data.address',
        context: 'this.data.context',
        avatarurl: 'app.globalData.userInfo.avatarUrl',
        nickname: 'app.globalData.userInfo.nickName'
      },
      success: function() {
        console.log('上传成功');
        
        // wx.hideLoading();
        wx.redirectTo({
          url: '../list/list',
        })
      },
      fail: function() {
       
        console.error;
      }
    });
},


uploadimg() {
  console.log(app.globalData.picsrc);
  wx.cloud.uploadFile({
    cloudPath: 'happynewyear-fjkgu.6861-happynewyear-fjkgu-1259783920/1.png',
    filePath: '../../image/9.png',

    // 文件路径
    success: res => {
      // get resource ID
      console.log(res.fileID);
      // console.log(app.globalData.picsrc);
    },
    fail: err => {
      console.error;
      // handle error
    }
  })
},

chooseImage(from) {
  wx.chooseImage({
    count: 1,
    sizeType: ["original", "compressed"],
    sourceType: [from.target.dataset.way],
    success: (res) => {
      var tempFilePaths = res.tempFilePaths;
      // console.log(tempFilePaths);
      app.globalData.picsrc = tempFilePaths;
      console.log(app.globalData.picsrc);

      const couldpath = 'example.png';
      const filepath = app.globalData.picsrc;
      wx.cloud.uploadFile({
        cloudPath: couldpath,
        filePath: filepath,

        // 文件路径
        success: res => {
          // get resource ID
          console.log(res.fileID);
          console.log(app.globalData.picsrc);
        },
        fail: err => {
          console.error;
          // handle error
        }
      })


    },
    fail: (res) => {

    },
    complete: (res) => {

    },
  })
},


/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {

  this.getOpenid();
  // wx.getSetting({
  //   success(res) {
  //     if (res.authSetting['scope.userInfo']) {
  //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //       wx.getUserInfo({
  //         success: function (res) {
  //           console.log(res.userInfo)
  //         }
  //       })
  //     }
  //   }
  // })


  // wx.chooseImage({
  //   count: 1,
  //   sizeType: ["original", "compressed"],

  //   success: res => {
  //     var tempFilePaths = res.tempFilePaths;
  //     // console.log(tempFilePaths);
  //     app.globalData.picsrc = tempFilePaths;
  //     console.log(app.globalData.picsrc);

  //     const couldpath = 'example.png';
  //     const filepath = res.tempFilePaths[0];
  //     wx.cloud.uploadFile({
  //       cloudPath: couldpath,
  //       filePath: filepath,

  //       // 文件路径
  //       success: res => {
  //         // get resource ID
  //         console.log(res.fileID);

  //       },
  //     })
  //   },
  // })

  // wx.chooseImage({
  //   success: chooseResult => {
  //     // 将图片上传至云存储空间
  //     wx.cloud.uploadFile({
  //       // 指定上传到的云路径
  //       cloudPath: 'my-photo.png',
  //       // 指定要上传的文件的小程序临时文件路径
  //       filePath: chooseResult.tempFilePaths[0],
  //       // 成功回调
  //       success: res => {
  //         console.log('上传成功', res)
  //       },
  //     })
  //   },
  // })

},

getOpenid() {
  let that = this;
  wx.cloud.callFunction({
    name: 'getOpenid',
    complete: res => {
      console.log('云函数获取到的openid: ', res.result.openid);
      var openid = res.result.openId;
      that.setData({
        openid: openid
      })
    }
  })
},

bindGetUserInfo(e) {
  console.log(e.detail.userInfo)

},

getUserInfo: function(e) {
  console.log(e)
  app.globalData.userInfo = e.detail.userInfo
  this.setData({
    userInfo: e.detail.userInfo,
    hasUserInfo: true
  })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})