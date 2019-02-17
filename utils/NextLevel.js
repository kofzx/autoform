class NextLevel {
	/*
	 * 初始化地区数组，使数组格式为： [[], [], []]
	 * @param array 待初始数组
	 * @param fieldname 业务字段名
	 * @param index 待初始索引
	 * @return 完成数组
	*/
    static regionInit(array, fieldname, index) {
        let newArray = [];

        newArray.push(array);
        newArray.push(array[index][fieldname]);
        newArray.push(array[index][fieldname][index][fieldname]);

        return newArray;
    }

    /*
     * 找出两个索引数组的不同项，并返回相关数据     
     * 索引数组： 小程序picker的value，如： [0,0,0]
     * @param source 源数组
     * @param destination 目标数组
     * @return 目标数组的index跟changeValue 或 false
     */
    static compareValue(source, destination) {
        if (!source) {
            return false;
        }
        if (!destination) {
            return false;
        }
        if (source.length != destination.length) {
            return false;
        }
        for (let i = 0, l = source.length; i < l; i++) {
            if (source[i] != destination[i]) {
                return {
                    index: i,
                    changeValue: destination[i]
                };
            }
        }
        return false;
    }

    /*
     * 获取下一级方法，支持的数组格式为： [[], [], []]
     * @param array 目标数组
     * @param fieldname 递归字段名
     * @param index 索引 （第几数组）
     * @param changeValue 改变项的索引
     * @return 结果数组 或 false
     */
    static nextLevel(array, fieldname, index, changeValue) {
        let obj = array[index][changeValue];
        if (typeof obj == 'object') {
            if (fieldname in obj) { // 当递归字段存在于obj
                if (obj[fieldname]) { // 非空
                    array[++index] = obj[fieldname];
                    NextLevel.nextLevel(array, fieldname, index, 0);
                    return array;
                }
            }
        }
        return false;
    }
}

module.exports = NextLevel;