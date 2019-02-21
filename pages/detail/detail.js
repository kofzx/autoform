// pages/detail/detail.js
const Route = require("../../utils/Route");
const WxParse = require("../../libs/wxParse/wxParse");

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
    const detail = Route.decodeData(options.data);

    console.log(detail);

    WxParse.wxParse('content', 'html', detail.body, this, 5);

    this.setData({ detail });
  },

  goForm(e) {
    const { url, aid } = e.currentTarget.dataset;

    wx.navigateTo({
      url: `${url}?aid=${aid}`
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})