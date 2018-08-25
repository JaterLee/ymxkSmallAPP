// pages/feed/feed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //社区列表
    clubsListData:[]
  },

  /**
   * 获取顶部社区列表
   */
  fetchClubsList () {
    var that = this;
    wx:wx.request({
      url: 'http://i.gamersky.com/appapi/v2/getClubsList',
      data: {"deviceType":"iPhone7,2","deviceId":"58B8646F-0263-4676-82A1-216AF6D609B0","os":"iOS","osVersion":"11.2","app":"GSApp","appVersion":"4.1.5","request":{"type":"tuiJian", "pageIndex":1, "elementsPerPage":6}},
      header: { 'content-type': 'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var list = res.data["result"];
        console.log("list=====%@",list);
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          item.thumbnailURL = "https://images.weserv.nl/?url=" + item.thumbnailURL;
          item.des = item.usersCount+'人参与 '+item.topicsCount+'条主题';
        };
        that.setData({
          "clubsListData" : list
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchClubsList();
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