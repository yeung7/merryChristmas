// pages/post/post.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
wx.cloud.init({
  env: 'happynewyear-fjkgu'
});



const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: null,
    address: '',
    context: '',
    focus: false,
    nation:'',
    province:'',
    city:'',
    district:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pic: app.globalData.picsrc
    });
    // console.log(app.globalData.userInfo);
    // console.log(app.globalData.userInfo.nickName);
    // console.log(app.globalData.userInfo.avatarUrl);
    this.getAddress();
  },

//获取地址
  getAddress() {
    var _this = this;
    qqmapsdk = new QQMapWX({
      key: 'NKXBZ-XGMLD-UAI4O-HRW7U-KJQAJ-EYFJ3'
    });
    wx.getLocation({
      success: function(res) {
        // console.log(res);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(addressRes) {
            console.log(addressRes);
            _this.setData({
              address: addressRes.result.formatted_addresses.recommend
            });
            _this.data.nation = addressRes.result.address_component.nation;
            _this.data.province = addressRes.result.address_component.province;
            _this.data.city = addressRes.result.address_component.city;
            _this.data.district=addressRes.result.address_component.district;
            // _this.data.address = addressRes.result.formatted_addresses.recommend;       
          }
        })
      }
    })
  },

//获取内容
  bindTextAreaBlur: function(e) {
    this.data.context = e.detail.value;
    // console.log("aaa"+this.data.context);
  },



//上传
  addPost(e) {
    console.log(this.data.nation);
    this.setData({
      focus: 'false',
    });
    const name = Math.random() * 1000000;
    wx.showLoading({
      title: '发布中',
    })
    wx.cloud.uploadFile({
      cloudPath: name+app.globalData.picsrc.match(/\.[^.]+?$/)[0],
      filePath: app.globalData.picsrc, // 文件路径
      success: res => {
        // console.log(res.fileID);  
        const db = wx.cloud.database();
        db.collection('post').add({
          data: {
            picsrc: res.fileID,
            address: this.data.address,
            context: this.data.context,
            avatarurl: app.globalData.userInfo.avatarUrl,
            nickname: app.globalData.userInfo.nickName,
            ad:{
              nation:this.data.nation,
              province:this.data.province,
              city:this.data.city,
              district:this.data.district,
            },
            createTime: db.serverDate()
          },
          success: res => {
            console.log(res);
            wx.redirectTo({
              url: '../list/list',
            })
            wx.showToast({
              title: '发布成功',
              duration: 3000
            });
          },
          fail: res => {
            wx.showToast({
              title: '发布失败',
              duration: 3000
            });
            console.log("db fail");
          },
          complete: res => {
            console.log(res);
          }
        });   
        console.log('上传成功', res);
      },
      fail:res=>{
        console.log('upload fail',res);
      },complete: res => {
        console.log(res);
        wx.hideLoading();
      }
      
    });
   

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