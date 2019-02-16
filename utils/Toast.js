class Toast {
	constructor() {
		let pages = getCurrentPages();
        let curPage = pages[pages.length - 1];

        curPage.$toast = this.toast;
        curPage.$loading = this.loading;
        curPage.$unLoading = this.unLoading;
	}

	/*
	 * 消息提示
	 * @param title 标题
	 * @param flag '打钩' 还是 '无'
	 * @param duration 持续时间
	 * @return Promise(仅resolve)
	*/
	toast(title, flag = true, duration = 1500) {
		return new Promise(resolve => {
			let icon;
			if (flag) {
				icon = 'success';
			} else {
				icon = 'none';
			}
			wx.showToast({
		      	title: title,
		      	icon: icon
		    });
		    // 定时器
		    setTimeout(() => {
		    	resolve();
		    }, duration);
		});
	}

	/*
	 * 加载中
	 * @param title 标题
	 * @param isMask 是否开启遮罩
	 * @param duration 持续时间
	 * @return Promise(仅resolve)
	*/
	loading(title, isMask = true, duration = 1500) {
		return new Promise(resolve => {
			wx.showLoading({
				title: title,
				mask: isMask
			});
			// 定时器
		    setTimeout(() => {
		    	resolve();
		    }, duration);
		});
	}

	/*
	 * 取消加载
	*/
	unLoading() {
		wx.hideLoading();
	}
}

module.exports = Toast;