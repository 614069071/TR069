import request from "../";

const get = (url, params) => request({ method: 'get', url, params });
const post = (url, data, params) => request({ method: 'post', url, data, params });

export const getPreConfigColles = params => get('/preConfiguration/getPreConfigurationList', params);