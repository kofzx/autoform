// components/empty/empty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pic: { 
      type: String,
      value: '../common/images/search_no.png'
    },
    tips: { 
      type: String,
      value: '暂无内容~' 
    },
    color: { type: String }
  },

  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
