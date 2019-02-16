// components/uploader/index.js
const Upload = require("./Upload");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    uploadPics: Array   // 上传图片列表
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 多图上传
    uploadFiles() {
      this.triggerEvent("upload");
    },
    // 删除图片
    delImg(e) {
      const index = e.currentTarget.dataset.index;

      this.triggerEvent("delete", index);
    }
  }
})
