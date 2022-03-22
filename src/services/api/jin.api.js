import { httpRequest } from "../";

const get = (url, params, port) => httpRequest({ method: 'get', url, params }, port);
const post = (url, data, params, port) => httpRequest({ method: 'post', url, data, params }, port);

// 预配置
export const getPreConfigColles = params => get(`/preConfiguration/getPreConfigurationList`, params);

// 升级任务
export const upgradeTask = params => get(`/upgradeTask/getTR069UpgradeTaskList`, params);