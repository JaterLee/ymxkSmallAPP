Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  refreshList: function (res) {
    // console.log("--6666666666!-res---%@-----------", res);  
    this.setData({
      "list": res
    })
  },


  fetchDataListFun: function (){
    var that = this;
    wx.request({
      url: 'http://appapi2.gamersky.com/v2/AllChannelList ',
      header: {
        'content-type': 'application/json'
      },
      data: { "deviceType": "iPhone7,2", "deviceId": "58B8646F-0263-4676-82A1-216AF6D609B0", "os": "iOS", "osVersion": "11.2", "app": "GSApp", "appVersion": "4.1.5", "request": { "parentNodeId": "news", "nodeIds": "0", "pageIndex": "1", "elementsCountPerPage": "20" } },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var dataSource = res.data["result"];
        for (var i = 0; i < dataSource.length; i++) {
          var item = dataSource[i];
          var imageUrls = item.thumbnailURLs;
          if (imageUrls != null) {
            for (var a = 0; a < imageUrls.length; a++) {
              var imageurl = imageUrls[a];
              // console.log("----imageurl-----%s-----------", imageurl);
              if (imageurl != null) {
                var temp = imageurl.slice(8);
                // console.log("---temp---%s-----------", temp);
                imageurl = "https://images.weserv.nl/?url="+temp;
                // console.log("--!!!!!!!-imageurl---%s-----------", imageurl);
              }
            }
            item.thumbnailURLs = imageUrls;
            //  console.log("--6666666666!-res---%@-----------", dataSource);  
          }
        }   
        that.refreshList(dataSource);   
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchDataListFun();
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