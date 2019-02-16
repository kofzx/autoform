// components/noticeBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noticeList: Array,  // 消息列表
    fieldName: String,
    isLink: {           // 是否开启链接跳转
      type: Boolean,
      value: false
    },
    url: String,
    query: null
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    routeTo (e) {
      let { url, query } = e.currentTarget.dataset;
      if (this.data.isLink) {
        let queryStr = encodeURIComponent(JSON.stringify(query));
        wx.navigateTo({
          url: `${url}?data=${queryStr}`
        });
      }
    }
  }
})
