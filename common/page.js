module.exports = function(options = {}) {
	return Page({
		onShareAppMessage() {},
		...options
	});
}