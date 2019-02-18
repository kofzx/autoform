const local_url = "http://127.0.0.1:3000";
const weima_base_url = "http://dalu50.6mo.cc";
const weima_url = "http://dalu50.6mo.cc/api/index.php";

const api = {
	"data":  local_url + "/data",	// 本地数据
	// 微马数据
	"weima_url": weima_base_url,
	"category": weima_url + "/api_cate",
	"activities": weima_url + "/api_match",
	"upload": weima_url + "/api_upload",
	"form": weima_url + "/api_form",
	"form_submit": weima_url + "/api_submit"
};

module.exports = api;