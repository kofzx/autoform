// components/mask/mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isMask: {         // 是否显示遮罩层
      type: Boolean,
      value: false
    },
    isClose: {        // 遮罩层是否可主动点击关闭
      type: Boolean,
      value: false
    }
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
    tapMask: function () {
      this.setData({
        isMask: false
      });
    }
  }
})
