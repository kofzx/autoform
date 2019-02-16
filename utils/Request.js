class Request {
	/**
	 * 接口请求基类方法
	 * @param method 请求方法 必填
	 * @param url 请求路径 必填
	 * @param data 请求参数
	 * @param header 请求头 选填
	 * @returns {Promise}
	 */
	static request(method, url, data, header = {'Content-Type': 'application/json'}) {
		return new Promise((resolve, reject) => {
			const response = {};	// 响应数据
			wx.request({
				url, 
				method, 
				data, 
				header,
				success: (res) => response.success = res.data,
				fail: (error) => response.fail = error,
				complete() {
					if (response.success) {
						// console.info('请求成功：', response.success);
						resolve(response.success);
					} else {
						console.info('请求失败：', response.fail);
						reject(response.fail);
					}
					console.groupEnd();
				},
			});
		});
	}
	
	/**
	 * 发起get请求
	 * @param url 请求路径 必填
	 * @param data 请求参数 get请求的参数会自动拼到地址后面
	 * @param headers 请求头 选填
	 * @returns {Promise}
	 */
	static get(url, data, headers) {
		return Request.request('GET', url, data, headers);
	}
	
	/**
	 * 发起post请求
	 * @param url 请求路径 必填
	 * @param data 请求参数
	 * @param headers 请求头 选填
	 * @returns {Promise}
	 */
	static post(url, data, headers) {
		return Request.request('POST', url, data, headers);
	}
}

module.exports = Request;