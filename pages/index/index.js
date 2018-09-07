Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 数据源
     */
    dataSource:[],

    /**
     * banner
     * bannerData :banner object list [{img: imgurl, des: item.title}]
     * bannerDes  :banner bottom description
     */
    bannerData:[],
    bannerDes:"",
    
    /**
     * 新闻列表
     */
    newsListData:[],
    newsPageIndex:1,
  },

  /**
   * banner事件
   */
  bindchange(e){
    var changeEvent = e;
    let currentIndex = changeEvent.detail.current;
    var that  = this;
    var bannerItem =that.data.bannerData[currentIndex];
    that.setData({
      "bannerDes":bannerItem.des
    });
  },

  /**
   * 拉取首页数据
   */
  fetchDataListFun: function (){
    var that = this;
    console.log('res----------------');
    wx.request({
      url: 'http://appapi2.gamersky.com/v2/AllChannelList ',
      header: {
        'content-type': 'application/json'
      },
      data: { "deviceType": "iPhone7,2", "deviceId": "58B8646F-0263-4676-82A1-216AF6D609B0", "os": "iOS", "osVersion": "11.2", "app": "GSApp", "appVersion": "4.1.5", "request": { "parentNodeId": "news", "nodeIds": "0", "pageIndex": that.data.newsPageIndex, "elementsCountPerPage": "20" } },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var dataSource = res.data["result"];
        if (dataSource.length == 0) {
          console.log("dataSource 居然是空的");
          return;
        }
        if (that.data.newsPageIndex == 1) {
          var bannerItem = dataSource[0];
          var childElements = bannerItem.childElements;
          var bannerListTemp = new Array;
          for (var i = 0; i < childElements.length; i++) {
            var item = childElements[i];
            var imgurl = item.thumbnailURLs[0];
            imgurl = "https://images.weserv.nl/?url=" + imgurl;
            var bannerItem = { img: imgurl, des: item.title };
            bannerListTemp.push(bannerItem);
          }
          that.setData({
            "bannerData": bannerListTemp,
            "bannerDes": bannerListTemp[0].des
          });
        }
        var newsItemList = new Array;
        for (var i=1; i < dataSource.length; i++) {
          var dataItem = dataSource[i];
          var imgTemp = "https://images.weserv.nl/?url=" + dataItem.thumbnailURLs[0];
          imgTemp = imgTemp;
          var newItem = { title: dataItem.title, img: imgTemp,commentsCount: dataItem.commentsCount, time: dataItem.updateTime};
          newsItemList.push(newItem);
        }
        // console.log("----------------------%@",newsItemList);
        if (that.data.newsPageIndex > 1) {
          newsItemList = that.data.newsListData.concat(newsItemList);
        }
        var index = that.data.newsPageIndex+1;
        that.setData({
          "newsPageIndex": index,
          "newsListData":newsItemList
        });
      }
    })
  },
/**
 * image load fail
 */
  onImageLoadFail(e) {
    // console.log('图片加载失败~~~~~%@', e);
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
    this.setData({
      "newsPageIndex": 1
    });
    this.fetchDataListFun();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetchDataListFun();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})