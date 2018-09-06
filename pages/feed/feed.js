// pages/feed/feed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //社区列表
    clubsListData: [],
    //动态列表
    topicsListData: [],
    //动态pageIndex
    pageIndex: 1
  },

  /**
   * 获取顶部社区列表
   */
  fetchClubsList() {
    var that = this;
    wx: wx.request({
      url: 'http://i.gamersky.com/appapi/v2/getClubsList',
      data: {
        "deviceType": "iPhone7,2",
        "deviceId": "58B8646F-0263-4676-82A1-216AF6D609B0",
        "os": "iOS",
        "osVersion": "11.2",
        "app": "GSApp",
        "appVersion": "4.1.5",
        "request": {
          "type": "tuiJian",
          "pageIndex": 1,
          "elementsPerPage": 6
        }
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var list = res.data["result"];
        console.log("list=====%@", list);
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          item.thumbnailURL = "https://images.weserv.nl/?url=" + item.thumbnailURL;
          item.des = item.usersCount + '人参与 ' + item.topicsCount + '条主题';
        };
        that.setData({
          "clubsListData": list
        });
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 
   */
  fetchTopicsRequest() {
    var that = this;
    wx: wx.request({
      url: 'http://i.gamersky.com/appapi/v2/getTopicsList',
      data: {
        "deviceType": "iPhone7,2",
        "deviceId": "58B8646F-0263-4676-82A1-216AF6D609B0",
        "os": "iOS",
        "osVersion": "11.2",
        "app": "GSApp",
        "appVersion": "4.1.5",
        "request": {
          "clubIds": [],
          "subjectId": "0",
          "topicType": "quanBu",
          "filterType": "quanBu",
          "orderType": "faBuShiJian",
          "maxRepliesCount": 0,
          "elementsPerPage": 20,
          "pageIndex": that.data.pageIndex
        }
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var list = res['data']['result'];
        for (var i = 0;i < list.length; i++) {
          var item = list[i];
          item.userHeadImageURL = "https://images.weserv.nl/?url=" + item.userHeadImageURL;
          if (item.imageURLs.length > 0) {
            var url = item.imageURLs[0].url;
            if (url != null) {
              item.contentImg = "https://images.weserv.nl/?url=" + url;
            }
          }
        }
        if (that.data.pageIndex > 1) {
          var tempList = new Array;
          tempList.push(that.data.topicsListData);
          tempList.push(list);
          list = tempList;
        }
        console.log('error=%@', list);
        that.setData({
          "pageIndex" : that.data.pageIndex++,
          "topicsListData" :  list
        })
      },
      fail: function (res) { 
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchClubsList();
    this.fetchTopicsRequest();
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
    this.setData({
      "pageIndex" : 0
    });
    this.fetchTopicsRequest();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.fetchTopicsRequest();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})