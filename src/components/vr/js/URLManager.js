

/* url地址管理 */
function baseHost() {
  return "http://127.0.0.1:3333/";
}
exports.baseHost = baseHost;


function saveEdit() {
  return baseHost()+"pano/saveEditById";
}

function findKrPanoById() {
  return baseHost()+"saveedit";
}
exports.saveEdit = saveEdit;

function findDataBySql () {
  return webconfig.gateway_url+"/api/database/sql";
}
exports.findDataBySql = findDataBySql;


function findvrurlbyid () {
  return baseHost()+"pano/findvrurlbyid?id=";
}
exports.findvrurlbyid = findvrurlbyid;
