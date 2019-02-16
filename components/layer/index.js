// components/mask/mask.js
Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,         // 是否显示遮罩层
    isClose: {        // 遮罩层是否可主动点击关闭
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickLayer () {
      if (this.data.isClose) {
        this.triggerEvent('close');
      }
    }
  }
})
