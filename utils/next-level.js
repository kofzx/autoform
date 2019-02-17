function nextLevel(array, name, col, val) {
  let obj = array[col][val];
  if (typeof obj == 'object') {
    if (name in obj) {  // 当子字段存在于obj
      if (obj[name]) {
        array[++col] = obj[name];
        nextLevel(array, name, col, 0);
        return array;
      }
    }
  }
  return false;
}

module.exports = nextLevel;