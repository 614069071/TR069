import request from "../";

const get = (url, params) => request({ method: 'get', url, params });
const post = (url, data, params) => request({ method: 'post', url, data, params });

// 预配置
export const getPreConfigColles = params => get('/preConfiguration/getPreConfigurationList', params);

// 升级任务
export const upgradeTask = params => get('/upgradeTask/getUpgradeTaskList', params);