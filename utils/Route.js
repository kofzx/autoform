class Route {
	/*
	 * 编码数据
	 * @param json_data json数据
	 */
	static encodeData(json_data) {
	  return encodeURIComponent(JSON.stringify(json_data));
	}

	/*
	 * 解码数据
	 * @param stringify_data 序列化过的json数据
	 */
	static decodeData(stringify_data) {
	  return JSON.parse(decodeURIComponent(stringify_data));
	}

	/*
	 * 跳转页面
	 * @param url 跳转地址
	 * @param query 可带参数
	*/
	static routeTo(url, query = null) {
		const queryStr = Route.encodeData(query);

		wx.navigateTo({
			url: `${url}?data=${queryStr}`
		});
	}
}

module.exports = Route;