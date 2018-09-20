// pages/index/newsDetail.js

var WxParse = require("../../wxParse/wxParse.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
  contentId:""
  },

  /**
   * 拉取新闻详情
   */

  fetchNewsDetailRequest: function () {
    var that = this;
    wx.request({
      url: 'http://appapi2.gamersky.com/v2/TwoArticle',
      method: "POST",
      header: {"Content-Type" : "multipart/form-data; charset=utf-8"},
      data: {
        "deviceType": "iPhone7,2", 
        "deviceId": "58B8646F-0263-4676-82A1-216AF6D609B0", 
        "os": "iOS", 
        "osVersion": "12.0", 
        "app": "GSApp", 
        "appVersion": "4.3.0",
        "request": { contentId: that.data.contentId, pageIndex: 1 }
      },
      success: function(res) {
        var mainbody = res.data.result.mainBody;
        console.log("-----------%@", res)
        WxParse.wxParse('article', 'html', mainbody, that, 5);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "contentId" : options.id
    });

    this.fetchNewsDetailRequest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})