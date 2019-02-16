// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pic: {
      type: String
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    phone: {
      type: String
    },
    color: {
      type: String
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
    makePhone (e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone,
      })
    },
    previewImg (e) {
      wx.previewImage({
        urls: [e.currentTarget.dataset.img],
      })
    }
  }
})
