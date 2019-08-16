// pages/list/list.js
wx.cloud.init({
  env: 'happynewyear-fjkgu'
});

const db = wx.cloud.database();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    skip: 0,
    region: ['全部', '全部', '全部'],
    customItem: "全部"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // console.log(posts);

    db.collection("post").orderBy('createTime', 'desc').get().then(res => {
      // console.log(res.data);

      this.setData({
        postList: res.data
      })

      // console.log(this.data.postList);
    })

  },

  //选择图片方式
  bindtappost(e) {
    // console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      wx.showActionSheet({
        itemList: ['拍照', '相册'],
        success(res) {
          if (res.tapIndex == 0) {
            wx.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              sourceType: ['camera'],
              success: (res) => {
                app.globalData.picsrc = res.tempFilePaths[0];
                // console.log(app.globalData.picsrc);
                wx.navigateTo({
                  url: '../post/post',
                })
              },
              fail: (res) => {},
              complete: (res) => {},
            })
          } else if (res.tapIndex == 1) {
            wx.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              sourceType: ['album'],
              success: (res) => {
                // console.log(tempFilePaths);
                app.globalData.picsrc = res.tempFilePaths[0];
                // console.log(app.globalData.picsrc);
                wx.navigateTo({
                  url: '../post/post',
                })
              },
              fail: (res) => {},
              complete: (res) => {},
            })
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })

      // wx.navigateTo({
      //   url: '../test/test',
      //   success: function(res) {},
      //   fail: function(res) {},
      //   complete: function(res) {},
      // })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },

  //根据地区选择
  bindRegionChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      region: e.detail.value
    })
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.region[0] == '全部') {
      db.collection("post").orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '没有数据',
          })
        }
        console.log(res.data);
      })
    } else if (this.data.region[1] == '全部') {
      db.collection("post").where({
        'ad.province': this.data.region[0]
      }).orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '没有数据',
          })
        }
        console.log(res.data);
      })
    } else if (this.data.region[2] == '全部') {
      db.collection("post").where({
        'ad.province': this.data.region[0],
        'ad.city': this.data.region[1],
      }).orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '没有数据',
          })
        }
        console.log(res.data);
      })
    } else {
      db.collection("post").where({
        'ad.province': this.data.region[0],
        'ad.city': this.data.region[1],
        'ad.district': this.data.region[2]
      }).orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '没有数据',
          })
        }
        console.log(res.data);
      })
    }
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
    console.log("下拉更新");
    if (this.data.region[0] == '全部') {
      db.collection('post').orderBy('createTime', 'desc').get().then(res => {
        // console.log(res.data);
        this.setData({
          postList: res.data
        })
        // console.log(this.data.postList);
      })
      wx.stopPullDownRefresh();
    }else if(this.data.region[1]=='全部'){
      db.collection('post').where({
        'ad.province': this.data.region[0],
      }).orderBy('createTime', 'desc').get().then(res => {
        // console.log(res.data);
        this.setData({
          postList: res.data
        })
        // console.log(this.data.postList);
      })
      wx.stopPullDownRefresh();
    } else if (this.data.region[2] == '全部') {
      db.collection('post').where({
        'ad.province': this.data.region[0],
        'ad.city': this.data.region[1],
      }).orderBy('createTime', 'desc').get().then(res => {
        // console.log(res.data);
        this.setData({
          postList: res.data
        })
        // console.log(this.data.postList);
      })
      wx.stopPullDownRefresh();
    } else {
      db.collection('post').where({
        'ad.province': this.data.region[0],
        'ad.city': this.data.region[1],
        'ad.district': this.data.region[2],
      }).orderBy('createTime', 'desc').get().then(res => {
        // console.log(res.data);
        this.setData({
          postList: res.data
        })
        // console.log(this.data.postList);
      })
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉加载更多");
    // db.collection('post').count().then(res=>{
    //     console.log(res.total);
    //  })

    this.data.skip = this.data.skip + 20;
    // console.log(this.data.skip);
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.region[0] == '全部') {
      db.collection("post").skip(this.data.skip).orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '到底了',
            duration: 3000
          })
        }
        console.log(res.data);
      })
    } else if (this.data.region[1] == '全部') {
      db.collection("post").where({
        'ad.province': this.data.region[0]
      }).skip(this.data.skip).orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '到底了',
            duration: 3000
          })
        }
        console.log(res.data);
      })
    } else if (this.data.region[2] == '全部') {
      db.collection("post").where({
        'ad.province': this.data.region[0],
        'ad.city': this.data.region[1],
      }).skip(this.data.skip).orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '到底了',
            duration: 3000
          })
        }
        console.log(res.data);
      })
    } else {
      db.collection("post").where({
        'ad.province': this.data.region[0],
        'ad.city': this.data.region[1],
        'ad.district': this.data.region[2]
      }).skip(this.data.skip).orderBy('createTime', 'desc').get().then(res => {
        if (res.data.length) {
          this.setData({
            postList: res.data
          })
          wx.hideLoading();
        } else {
          wx.showToast({
            icon: 'none',
            title: '到底了',
            duration: 3000
          })
        }
        console.log(res.data);
      })
    }
    // db.collection('post').skip(this.data.skip).orderBy('createTime', 'desc').get().then(res => {
    //   // console.log(res.data.length);
    //   if (res.data.length) {
    //     // console.log(this.data.postList);
    //     this.setData({
    //       postList: this.data.postList.concat(res.data)
    //     })
    //     wx.hideLoading();
    //   }else{
    //     wx.showToast({
    //       icon:'none',
    //       title: '到底了',
    //       duration:3000
    //     })
    //   }
    // })


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})