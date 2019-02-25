// pages/form/victory/victory.js
const Page = require("../../common/page");

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  routeTo (e) {
    const url = e.currentTarget.dataset.url;

    wx.navigateTo({
      url: `${url}`
    });
  },
})