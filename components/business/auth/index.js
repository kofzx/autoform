
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {                    // 标题提示语
      type: String,
      value: '暂未授权o(╥﹏╥)o' 
    },
    authPic: {                  // 配套标题的语义图片
      type: String,
      value: '../../common/images/cry.png'
    },
    authText: {                 // 授权按钮文案
      type: String,
      value: '点我授权'
    },
    isScope: {                  // 是否显示授权弹窗
      type: Boolean,
      value: true 
    }
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
    onGotUserInfo (e) {
      this.triggerEvent('getUserInfo', e);
    }
  }
})
