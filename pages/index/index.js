//index.js
const Page = require("../../common/page");
const Request = require("../../utils/Request");
const api = require("../../api/api");
const Route = require("../../utils/Route");

//获取应用实例
const app = getApp()

let loadMoreView, curPage;

Page({
  data: {
    weima_url: app.globalData.weima_url,
    activities: [],
    cat_active: 0,  // 激活分类id
  },

  onLoad: function (options) {
    curPage = 0;

    loadMoreView = this.selectComponent("#loadMoreView");

  	this.getCategories();
  },

  /*
   * 获取分类数据
  */
  getCategories() {
    Request.get(api.category, {
      secret: app.globalData.secret
    })
      .then(res => {
        const cid = res[0].id;

        this.loadActivities(cid);

        this.setData({
          category: res
        });
      });
  },

  /*
   * 加载活动列表
   * @param cid 分类id
  */
  loadActivities(cid) {
    Request.post(api.activities, {
      cate: cid,
      p: curPage,
      secret: app.globalData.secret
    })
      .then(res => {
        let activities = this.data.activities;

        if (curPage === 0) {
          activities = res;
        } else {
          activities = activities.concat(res);
        }

        this.setData({
          activities,
          cat_active: cid
        });

        loadMoreView.loadMoreComplete(res);
      })
      .catch(err => {
        if(curPage != 0) {
          loadMoreView.loadMoreFail();
        }
      });
  },

  /*
   * 切换分类事件
  */
  cateSwitch(data) {
    const cid = data.detail;

    curPage = 0;

    this.loadActivities(cid);
  },

  /*
   * 跳转方法
  */
  routeTo(e) {
    const { url, query } = e.currentTarget.dataset;

    Route.routeTo(url, query);
  },

  onReachBottom () {
    loadMoreView.loadMore();
  },

  loadMoreListener() {
    curPage++;
    this.loadActivities(this.data.cat_active);
  }
})
