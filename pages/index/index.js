//index.js
const Request = require("../../utils/Request");
const api = require("../../api/api");
const Route = require("../../utils/Route");

//获取应用实例
const app = getApp()

Page({
  data: {
    weima_url: app.globalData.weima_url,
    activities: [],
    isReachLastPage: false,
    isReachBottom: false,
    curPage: 1,
    catActive: 0,
    isLoading: false,
    showNoMore: false
  },

  onLoad: function (options) {
  	// 获取分类数据
    Request.get(api.category)
    	.then(res => {
        console.log(res);

        const id = res[0].id;

        this.getActivities(id)
          .then(res => {

            this.setData({
              activities: res,
              catActive: id
            });
          });

        this.setData({
          category: res
        });
    	});
  },

  /*
   * 获取活动列表
  */
  getActivities(cid, page = 1) {
    return new Promise((resolve, reject) => {
      Request.post(api.activities, {
        cate: cid,
        p: page
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /*
   * 点击分类事件
  */
  cateClick(data) {
    const id = data.detail;

    this.getActivities(id)
      .then(res => {
        console.log(res);

        this.setData({
          activities: res,
          catActive: id,
          curPage: 1
        });
      });
  },

  /*
   * 跳转方法
  */
  routeTo(e) {
    const { url, query } = e.currentTarget.dataset;

    Route.routeTo(url, query);
  },

  onReachBottom () {
    this.setData({ 
      isLoading: true,
      isReachBottom: true
    });
    let curPage = this.data.curPage;

    if (!this.data.isReachLastPage) {   // 当前不是最后一页
      curPage++;

      this.getActivities(this.data.catActive, curPage)
        .then(res => {
          if (res == null || res == 'undefined') {
            this.setData({ 
              isReachLastPage: true,
              isLoading: false
            });

            if (this.data.isReachBottom) {
              this.setData({ showNoMore: true });
            }

            this.setData({ isReachBottom: false });

          } else {
            const activities = this.data.activities.concat(res);

            console.log(activities);
            this.setData({ activities });
          }
        });

      this.setData({ curPage });
    }
    this.setData({ isLoading: false });
  }
})
