import { httpRequest } from "../";

const get = (url, params, port) => httpRequest({ method: 'get', url, params }, port);
const post = (url, data, params, port) => httpRequest({ method: 'post', url, data, params }, port);
const put = (url, data, params, port) => httpRequest({ method: 'put', url, data, params }, port);
const dele = (url, data, params, port) => httpRequest({ method: 'delete', url, data, params }, port);

/* 公共 */
export const getAllProfiles = params => get('/profile/allProfiles', params);//获取业务模板

/* 预配置 */
export const getPreConfigColles = params => get(`/preConfiguration/getPreConfigurationList`, params);//预配置列表
export const delPreConfigItem = id => dele(`/preConfiguration/${id}`);//删除配置
export const addPreConfigItem = data => post(`/preConfiguration/add`, data);//添加配置
export const delCheckPreConfigItems = data => dele(`/preConfiguration`, data);//批量删除
export const filterPreConfigColles = params => get(`/preConfiguration/filterGetPreConfigurationList`, params);//筛选

/* 升级任务 */
export const upgradeTask = params => get('/upgradeTask/getTR069UpgradeTaskList', params);//升级任务列表
export const createUpgradeTask = (data, params) => post('/upgradeTask', data, params);//创建升级任务
export const modifyUpgradeFile = (data, params) => put('/upgradeFile', data, params);//修改文件
export const modifyUpgradeRule = (data, params) => post('/upgradeRule', data, params);//修改规则
export const modifyUpgradeTask = (data, params) => put('/upgradeTask', data, params);//修改升级任务

export const getUpgradeFiles = params => get(`/upgradeFile/getTR069UpgradeFileList`, params);//获取配置文件列表
export const uploadUpgradeFile = (data, params) => post(`/upgradeFile/uploadUpgradeFile`, data, params);//上传文件包
export const delUpgradeFile = id => dele(`/upgradeFile/${id}`);//删除上传包


