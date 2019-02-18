class Upload {

	/*
	 * 选择图片
	 * @uploadPics 上传图片数组
	 * @param maxUpload 最大上传数
	*/
	static chooseImg(uploadPics, maxUpload = 1) {
		const length = uploadPics.length;
		return new Promise(resolve => {
			wx.chooseImage({
				count: maxUpload - length,
				success: res => {
					resolve(res);
				}
			});
		});
	}

	/*
	 * 单图上传
	 * @param url  开发者服务器
	 * @param filePath 图片临时路径
	 * @param formData 传给后台的额外参数
	 * @param name 文件上传名
	*/
	static uploadOne(url, filePath, formData = null, name = "aaa") {
	  return new Promise((resolve, reject) => {
	    wx.uploadFile({
	      url, filePath, 
	      name,
	      header: {
	        'content-type': 'multipart/form-data'
	      },
	      formData,
	      success: res => {
	        resolve(res);
	      },
	      fail: err => {
	        reject(err);
	      },
	      complete: e => {
	      	wx.hideLoading();
	      }
	    })
	  });
	}

	/*
	 * 多图上传子过程
	 * @private
	 * @param url 开发者服务器
	 * @param tempFilePaths 上传图片列表
	 * @param callback 回调函数
	 * @param _index 开始上传的序号
	 * @param _successFiles 已上传成功的文件
	*/
	static _uploadMult(url, tempFilePaths, name, callback, _index = 0, _successFiles = []) {
		wx.showLoading({
	    	title: '上传中',
	    	mask: true
	    })
		wx.uploadFile({
		    url,
		    filePath: tempFilePaths[_index],
		    name,
		    header: {
		      "Content-Type": "multipart/form-data"
		    },
		    success: res => {
		    	if (res.data) {
			        const data = JSON.parse(res.data);
			        _successFiles.push(data);
			    }
		    },
		    complete: e => {
		      _index++; //下一张
		      if (_index === tempFilePaths.length) {
		        wx.hideLoading();
		        typeof callback === "function" && callback(_successFiles);
		      } else {
		        // 上传下一张
		        this._uploadMult(url, tempFilePaths, callback, _index, _successFiles);
		      }
		    }
		});
	}

	/*
	 * 多图上传
	 * @param url 开发者服务器
	 * @param uploadPics 上传图片列表
	 * @param maxUpload 最大上传数
	 * @param name 文件上传名
	 * @param callback 回调函数
	*/
	static uploadMult(url, uploadPics, maxUpload, name = "aaa", callback) {
	  	const length = uploadPics.length;
		if (length < maxUpload) {
			Upload.chooseImg(uploadPics, maxUpload)
				.then(res => {
					const tempFilePaths = res.tempFilePaths;
					Upload._uploadMult(url, tempFilePaths, name, callback);
				});
		} else {
			wx.showToast({
		      	title: `最多上传${maxUpload}张图片`,
		      	icon: 'none'
		    });
		}
		
	}

	/*
	 * 删除单图
	 * @param uploadPics 上传图片列表
	 * @param index 删除的索引位置
	*/
	static delImg(uploadPics, index) {
		uploadPics.splice(index, 1);
		return uploadPics;
	}
}

module.exports = Upload;