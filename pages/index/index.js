Page({
  /**
   * 页面的初始数据
   */
  data: {
    /**
     * banner
     * bannerData :banner object list [{img: imgurl, des: item.title}]
     * bannerDes  :banner bottom description
     */
    bannerData:[],
    bannerDes:"",
    //content
    contentListData:[],

    dataSource:[],
    imageList:[]
  },

  /**
   * banner事件
   */
  bindchange(e){
    console.log("-------bindchange--%@----", e);
    var changeEvent = e;
    let currentIndex = changeEvent.detail.current;
    console.log("-------currentIndex--%@----", currentIndex);
    var that = this;
    var bannerItem = that.data.bannerData[currentIndex];
    this.setData({
      "bannerDes":bannerItem.des
    });
  },

  /**
   * 拉取首页数据
   */
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
        if (dataSource.length == 0) {
          console.log("dataSource 居然是空的");
          return;
        }
        var bannerItem = dataSource[0];
        var childElements = bannerItem.childElements;
        var bannerListTemp = new Array;
        console.log("childElements=====%@", childElements);
        for (var i=0; i < childElements.length; i++) {
          var item = childElements[i];
          console.log("item=====%@", item);
          var imgurl = item.thumbnailURLs[0];
          imgurl = "https://images.weserv.nl/?url=" + imgurl;
          var bannerItem = { img: imgurl, des: item.title};
          bannerListTemp.push(bannerItem);
        }
        that.setData({
          "bannerData":bannerListTemp,
          "bannerDes": bannerListTemp[0].des
        });
        return;




        var imageList = new Array;
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
                imageList.push(imageurl);
              }
            }
            // imageList.push(imageUrls[0])
            console.log("--6666666666!-imageList---%@-----------", imageList);  
          }
        }   
        that.setData({
          "imageList":imageList
        });
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