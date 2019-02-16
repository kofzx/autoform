// components/custom-picker/index.js
Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],
  
  /**
   * 组件的属性列表
   */
  properties: {
    pickerShow: {
      type: Boolean,
      value: false
    },
    value: Array,
    data: Array,
    fieldName: String,
  },

  /**
   * 生命周期
   */
  lifetimes: {
    attached() {
      this.setPickerStorage();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePicker () {
      this.setData({
        pickerShow: false
      });
    },
    pickerChange (e) {
      this.triggerEvent('pickerChange', e.detail);
    },
    // 需要实现的方法 (将value设入缓存)
    setPickerStorage () {
      this.triggerEvent('setPickerStorage');
    }
  }
})
