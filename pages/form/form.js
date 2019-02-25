// pages/form/form.js
const Page = require("../../common/page");
const util = require("../../utils/util");
const Request = require("../../utils/Request");
const api = require("../../api/api");
const Upload = require("../../utils/Upload");
const Toast = require("../../utils/Toast");
const NextLevel = require("../../utils/NextLevel");
const Route = require("../../utils/Route");
const pgjUrl = "https://www.puguanjiacn.com/api_uploadimage";
const pgjOss = "https://pguanjiacn-3.oss-cn-qingdao.aliyuncs.com/";

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        weima_url: app.globalData.weima_url
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const aid = options.aid;

        new Toast();

        this.getFormElements(aid);
    },

    /*
     * 获取表单控件
    */
    getFormElements(activity_id) {
        Request.post(api.form, {
            id: activity_id,
            secret: app.globalData.secret
        }).then(res => {
            console.log(res);
            const formElements = res;

            if (formElements) {
                let [upload_data, multi_upload_data, select_data, address_data, date_data] = [[], [], [], [], []];

                formElements.forEach((element, index) => {
                    let { type, name } = element;
                    // 处理基础文本控件
                    if (type === "phone") {
                        element.type = "number";
                    } else if (type === "email" || type === "url") {
                        element.type = "text";
                    }
                    // 处理高级控件
                    else if (type === "file") {
                        let obj = {};
                        obj.name = name; // 动态数据名
                        obj[name] = ""; // 动态设置数据

                        // 将有用信息写入 保存动态数据的数组
                        upload_data.push(obj);
                    } else if (type === "files") {
                        let obj = {};
                        obj.name = name;
                        obj[name] = [];

                        multi_upload_data.push(obj);
                    } else if (type === "select") {
                        let obj = {};
                        obj.name = name;
                        obj.index = 0;
                        obj[name] = element.value;

                        select_data.push(obj);
                    } else if (type === "address") {
                        let obj = {};
                        obj.name = name;

                        let newRegion = NextLevel.regionInit(element.area, "children", 0);

                        obj[name] = newRegion;
                        obj[name + '_value'] = [0,0,0];

                        address_data.push(obj);
                    } else if (type === "time") {
                        let obj = {};
                        obj.name = name;

                        // 获取当前日期
                        const date = util.formatTime2(new Date());
                        
                        obj.value = date;

                        date_data.push(obj);
                    }
                });

                this.setData({
                    formElements,
                    upload_data,
                    multi_upload_data,
                    select_data,
                    address_data,
                    date_data
                });

            }
        });
    },

    /*
     * 单图上传
     */
    uploadFile(e) {
        const id = parseInt(e.currentTarget.id); // 当前点击的upload_data索引
        const upload_data = this.data.upload_data;

        upload_data.forEach((value, index) => {
            const name = value.name;
            let dataArray = value[name];

            // 判断点击的个体
            if (index === id) {
                Upload.chooseImg(dataArray)
                    .then(res => {
                        this.$loading("上传中");
                        const tempFilePath = res.tempFilePaths[0];

                        Upload.uploadOne(api.upload, tempFilePath, {
                            secret: app.globalData.secret
                        }, "file")
                            .then(res => {
                                const pic_path = this.data.weima_url + JSON.parse(res.data).data;

                                upload_data[id][name] = pic_path;

                                this.setData({ upload_data });
                            });
                    });
            }
        });
    },

    /*
     * 多图上传
     */
    uploadFiles(e) {
        const id = parseInt(e.currentTarget.id); // 当前点击的multi_upload_data索引
        const multi_upload_data = this.data.multi_upload_data;

        multi_upload_data.forEach((value, index) => {
            const name = value.name;
            let dataArray = value[name];

            // 判断点击的个体
            if (index === id) {
                Upload.uploadMult(pgjUrl, dataArray, 9, "file", res => {
                    let newArr = res.map(v => {
                        return pgjOss + v.pic_path;
                    });
                    // 合并上传图片
                    newArr = value[name].concat(newArr);

                    // 将newArr写入multi_upload_data
                    multi_upload_data[id][name] = newArr;

                    this.setData({ multi_upload_data });
                });
            }
        });
    },

    /*
     * 删除图片
     */
    delImg(e) {
        const del_index = e.detail;
        const id = parseInt(e.currentTarget.id); // 当前点击的multi_upload_data索引
        const multi_upload_data = this.data.multi_upload_data;

        multi_upload_data.forEach((value, index) => {
            const name = value.name;

            // 判断点击的个体
            if (index === id) {
                const uploadPics = Upload.delImg(value[name], del_index);

                multi_upload_data[id][name] = uploadPics;

                this.setData({ multi_upload_data });
            }
        });
    },

    /*
     * 单列picker确认事件
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

    /*
     * 多列picker确认事件
    */
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

        address_data.forEach((v, index) => {
            const name = v.name;

            // 判断点击的个体
            if (index === id) {
                const data = address_data[id][name];

                let newRegion = NextLevel.nextLevel(data, "children", column, value);

                if (newRegion) {
                    address_data[id][name] = newRegion;

                    this.setData({ address_data });
                }
            }
        });
    },

    /*
     * 日期确认事件
    */
    dateChange(e) {
        const id = parseInt(e.currentTarget.id); // 当前点击的date_data索引
        const date = e.detail.value;
        const date_data = this.data.date_data;

        date_data.forEach((value, index) => {
            const name = value.name;

            // 判断点击的个体
            if (index === id) {
                date_data[id].value = date;

                this.setData({ date_data });
            }
        });
    },

    checkForm(checkArray) {
        const formElements = this.data.formElements;
        const validateArr = formElements.filter(element => !element.isnull);

        for (let i = 0; i < validateArr.length; i++) {
            const element = validateArr[i];

            if (!checkArray[element.name] || checkArray[element.name] === "请选择") {
                this.$toast(`${element.title}不为空`, false);
                return true;
            }
        }  

        return false;
    },

    formSubmit(e) {
        const formElements = this.data.formElements;
        const {upload_data, select_data, address_data, date_data} = 
            this.data;

        let submit_obj = {};    // 高级组件的表单提交

        // 文件提交
        upload_data.forEach(element => {
            const name = element.name;

            submit_obj[name] = element[name];
        });
        // 下拉框提交
        select_data.forEach(element => {
            const { name, index } = element;

            submit_obj[name] = element[name][index];
        });
        // 地区提交
        address_data.forEach(element => {
            const name = element.name;
            const _value = element[name + '_value'];

            submit_obj[name] = [
                element[name][0][_value[0]].id, 
                element[name][1][_value[1]].id,
                element[name][2][_value[2]].id
            ]
        });
        // 日期提交
        date_data.forEach(element => {
            const { name, value } = element;

            submit_obj[name] = value;
        });

        const openid = wx.getStorageSync("openid");
        const unionid = wx.getStorageSync("unionid");

        const necessary_submit = {
            secret: app.globalData.secret,
            openid: openid,
            unionid: unionid
        };

        const submit_data = Object.assign(e.detail.value, submit_obj, necessary_submit);
        if (this.checkForm(submit_data)) {
            return;
        }

        Request.post(api.form_submit, submit_data)
            .then(res => {
                const { code, msg } = res;

                if (res.code === 1) {
                    this.$toast(msg, true, 1000)
                        .then(() => {
                            // 跳转
                            wx.navigateTo({
                              url: "../victory/victory"
                            });
                        });
                } else {
                    this.$toast(msg, false);
                }
            });
    },
})