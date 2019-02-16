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
    isCancel: {         // 是否显示取消按钮
      type: Boolean,
      value: false
    },    
    cancelText: {       // 取消按钮文案，最多4个字符
      type: String,
      value: '取消',
      observer: function (cancelText) {    // 截取4个字符
        cancelText = cancelText.substring(0, 4);
        this.setData({ cancelText });
      }
    },
    confirmText: {      // 确认按钮文案，最多4个字符
      type: String,
      value: '确定',
      observer: function (confirmText) {    // 截取4个字符
        confirmText = confirmText.substring(0, 4);
        this.setData({ confirmText });
      }
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
    // 确认事件
    onConfirm () {
      this.triggerEvent('success');
    },
    // 取消事件
    onCancel () {
      this.triggerEvent('fail');
    }
  }
})
