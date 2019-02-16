//index.js
const Request = require("../../utils/Request");
const api = require("../../api/api");

//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad: function () {
  	// 获取分类数据
    Request.get(api.data)
    	.then(res => {
        const { category, news } = res;
        
    		this.setData({ 
          category,  
          news
        });
    	});
  },

  onClick(data) {
    const id = data.detail;
  },
})
