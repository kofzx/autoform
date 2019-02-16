// components/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {         // 动画类型，可选： line, fade, rotate, rotate3d, doubleFade
      type: String,
      value: 'line'
    },
    isLoad: {       // 是否加载中
      type: Boolean,
      value: true
    },
    noMore: {       // 是否显示 “没有更多了”
      type: Boolean,
      value: false,
      observer: function (noMore) {
        if (noMore) {     // 当 “没有更多了”时，不再加载
          this.setData({
            isLoad: false
          });
        }
      }
    }
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
