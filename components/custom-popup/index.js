// components/popup/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPopup: {
      type: Boolean,    // 是否显示弹窗
      value: false
    },
    title: {            // 提示标题
      type: String,
      value: '提示'
    },       
    scrollView: {       // 是否开启滚动视图
      type: Boolean,
      value: false
    }
  },

  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  options: {
    multipleSlots: true   // 开启多slot
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
    // 关闭事件
    onClose () {
      this.triggerEvent('close');
    }
  }
})
