// components/code/code.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCode: { type: Boolean, value: true },     // 可否发送验证码
    time:   { type: Number, value: 60 },        // 倒计时时间
    bkc:    { type: String },                   // 按钮背景
  },

  /**
   * 组件的初始数据
   */
  data: {
    init: true      // 是否显示初始化文本
  },

  ready () {
    this.setData({
      t: this.data.time
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 倒计时
     */
    setTimer (time) {
      let timer = setInterval(() => {
        if (time > 1) {
          time--;
          this.setData({
            t: time
          });
        } else {
          // 时间到，可选重发
          this.setData({
            isCode: true,
            init: true,
            t: this.data.time
          });
          // 传值给父组件
          this.triggerEvent('getIsCode', this.data.isCode);
          clearInterval(timer);
        }
      }, 1000);
    },
    /**
     * 获取验证码
     */
    getCode () {
      if (this.data.isCode) {
        // 发起请求
        this.triggerEvent('fetchCode');
        // 禁止连点
        this.setData({
          isCode: false,
          init: false
        });
        // 传isCode给父组件
        this.triggerEvent('getIsCode', this.data.isCode);
        this.setTimer(this.data.time);
      }
    }
  }
})
