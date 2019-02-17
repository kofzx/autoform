// pages/form/form.js
const Upload = require("../../utils/Upload");
const NextLevel = require("../../utils/NextLevel");
const pgjUrl = "https://www.puguanjiacn.com/api_uploadimage";
const pgjOss = "https://pguanjiacn-3.oss-cn-qingdao.aliyuncs.com/";

Page({
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const formElements = wx.getStorageSync("formElements");

        if (formElements) {
            this.setData({ formElements });

            let [upload_data, select_data, address_data] = [[], [], []];

            formElements.forEach((element, index) => {
                const { type, id, name } = element;
                if (type === "file") {
                    let obj = {};
                    obj.name = name; // 动态数据名
                    obj[name] = []; // 动态设置数据

                    // 将有用信息写入 保存动态数据的数组
                    upload_data.push(obj);
                } else if (type === "select") {
                    let obj = {};
                    obj.name = name;
                    obj.index = 0;
                    obj[name] = element.value;

                    select_data.push(obj);
                } else if (type === "address") {
                    let obj = {};
                    obj.name = name;

                    let newRegion = NextLevel.regionInit(element.value, "child", 0);

                    obj[name] = newRegion;
                    obj[name + '_value'] = [0,0,0];

                    address_data.push(obj);
                }
            });

            this.setData({
                upload_data,
                select_data,
                address_data
            });

        }
    },

    /*
     * 上传图片
     */
    uploadFiles(e) {
        const id = parseInt(e.currentTarget.id); // 当前点击的upload_data索引
        const upload_data = this.data.upload_data;

        upload_data.forEach((value, index) => {
            const name = value.name;
            let dataArray = value[name];

            // 判断点击的个体
            if (index === id) {
                Upload.uploadMult(pgjUrl, dataArray, 9, res => {
                    let newArr = res.map(v => {
                        return pgjOss + v.pic_path;
                    });
                    // 合并上传图片
                    newArr = value[name].concat(newArr);

                    // 将newArr写入upload_data
                    upload_data[id][name] = newArr;

                    this.setData({ upload_data });

                    console.log(this.data.upload_data);
                });
            }
        });
    },

    /*
     * 删除图片
     */
    delImg(e) {
        const del_index = e.detail;
        const id = parseInt(e.currentTarget.id); // 当前点击的upload_data索引
        const upload_data = this.data.upload_data;

        upload_data.forEach((value, index) => {
            const name = value.name;

            // 判断点击的个体
            if (index === id) {
                const uploadPics = Upload.delImg(value[name], del_index);

                upload_data[id][name] = uploadPics;

                this.setData({ upload_data });
            }
        });
    },

    /*
     * 单列picker事件
     */
    selectChange(e) {
        const id = parseInt(e.currentTarget.id); // 当前点击的select_data索引
        const value_index = parseInt(e.detail.value);
        const select_data = this.data.select_data;

        select_data.forEach((value, index) => {

            // 判断点击的个体
            if (index === id) {
                select_data[id].index = value_index;

                this.setData({ select_data });
            }
        });
    },

    multiChange(e) {
      const id = parseInt(e.currentTarget.id); // 当前点击的adress_data索引
      const value = e.detail.value;
      const address_data = this.data.address_data;

      address_data.forEach((v, index) => {
          const name = v.name;

          // 判断点击的个体
          if (index === id) {
              address_data[id][name + '_value'] = value;

              this.setData({ address_data });
          }
      });
    },

    /*
     * 多列picker选择事件
     */
    multiColumnChange(e) {
        const id = parseInt(e.currentTarget.id); // 当前点击的adress_data索引
        const { column, value } = e.detail;
        const address_data = this.data.address_data;
        console.log(address_data);

        address_data.forEach((v, index) => {
            const name = v.name;

            // 判断点击的个体
            if (index === id) {
                const data = address_data[id][name];

                let newRegion = NextLevel.nextLevel(data, 'child', column, value);

                if (newRegion) {
                    address_data[id][name] = newRegion;

                    this.setData({ address_data });
                }
            }
        });
    },

    formSubmit(e) {
        // console.log(e);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})