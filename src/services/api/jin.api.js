import { httpRequest } from "../";

const get = (url, params, port) => httpRequest({ method: 'get', url, params }, port);
const post = (url, data, params, port) => httpRequest({ method: 'post', url, data, params }, port);
const put = (url, data, params, port) => httpRequest({ method: 'put', url, data, params }, port);

// 预配置
export const getPreConfigColles = params => get(`/preConfiguration/getPreConfigurationList`, params);

// 升级任务
export const upgradeTask = params => get('/upgradeTask/getTR069UpgradeTaskList', params);//升级任务列表
export const createUpgradeTask = (data, params) => post('/upgradeTask', data, params);//创建升级任务
export const modifyUpgradeFile = (data, params) => put('/upgradeFile', data, params);//修改文件
export const modifyUpgradeRule = (data, params) => post('/upgradeRule', data, params);//修改规则
export const modifyUpgradeTask = (data, params) => put('/upgradeTask', data, params);//修改升级任务

