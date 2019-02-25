// pages/authorize/authorize.js
const api = require("../../api/api");
const Request = require("../../utils/Request");
const Toast = require("../../utils/Toast");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    new Toast();
  },

  bindGetUserInfo(e) {
    try {
      const userInfo = e.detail.userInfo;
      const code = wx.getStorageSync('code');

      wx.setStorageSync('userInfo', userInfo);
      
      if (code) {
        Request.post(api.openid, {
          jscode: code
        })
          .then(res => {
            const { openid, unionid } = res;

            wx.setStorageSync('openid', openid);
            wx.setStorageSync('unionid', unionid);

            this.$toast("授权成功")
              .then(() => {
                wx.navigateTo({
                  url: "../index/index"
                });
              })
          })
      }
    } catch(e) {}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})