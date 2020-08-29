/*对象管理*/
/**
 * 全景图
 * @returns {{filename: string, filelength: string, groupid: string, panoname: string, id: string}}
 */
function newPanoPo() {
  return {
    id: "",
    panoname: "",//场景名称
    filename: "",//文件名称
    groupid: "",//组id
    filelength: "",//文件长度
  }
}

/**
 * 热点
 * @returns {{filename: string, filelength: string, groupid: string, panoname: string, id: string}}
 */
function newHostpotPo() {
  return {
    id: "",
    panoid: "",//场景id

  }
}

exports.newPanoPo = newPanoPo;

/*function newZTDataCustom(key, value) {
  return {key: key, value: value};
}

exports.newZTDataCustom = newZTDataCustom;

function newZTFormtData(ztdatacustomArray) {
  let formdata = new FormData();
  formdata.append("ds_id", webconfig.qhxc_datasource_id);
  if (ztdatacustomArray instanceof Array) {

  }
}
exports.newZTFormtData = newZTFormtData;*/

function newZTSQLFormtData(sql) {
  let formData = new FormData();
  formData.append("ds_id", webconfig.qhxc_datasource_id);
  formData.append("sql", sql);
  return formData;
}
exports.newZTSQLFormtData = newZTSQLFormtData;

