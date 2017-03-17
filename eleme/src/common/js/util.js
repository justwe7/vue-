/**
 * 解析url参数
 *  ?id=12345&a=b
 * Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search;
  let _obj = {};
  let reg =  /[?&][^?&]+=[^?&]+/g; //匹配 ?或者&  +  非?或者&一个或多个 +  =  +  非?或者&一个或多个 + 全局
  let arr = url.match(reg);  //切割为两个数组  ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      _obj[key] = val;
    });
  }
  return _obj;
}
