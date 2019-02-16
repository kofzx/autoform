// components/scrollTabbar/index.js
Component({
  properties: {
    titleField: String,   // 标题字段
    idField: String,       // id字段
    // 分类数组
    category: {
      type: Array,
      observer(newVal) {
        if (newVal.length > 0) {
          this.setData({ 
            currentId: parseInt(newVal[0][this.data.idField])
          });
        }
      }
    },      
  },

  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  methods: {
    /*
     * 设置高亮项目
     * @private
     * @param id 点击的项目id
    */
    setActiveItem(id) {
      this.setData({ currentId: id });
    },

    tapItem(e) {
      const id = parseInt(e.currentTarget.id);
      this.setActiveItem(id);
      this.triggerEvent('click', id);
    }
  }
})
