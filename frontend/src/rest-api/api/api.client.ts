import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosHeaders,
} from 'axios';

import qs from 'qs';

import config from './api.config';
import ApiError from './api.error';

const throwApiError = (
  { data = {}, status = 500 }: { data: AxiosResponse | object, status: number },
) => {
  throw new ApiError(data, status);
};

const generalError = {
  _global: ['Unexpected error occured.'],
};

const isObject = (target: object): boolean => Object.prototype.toString.call(target).slice(8, -1).toLowerCase() === 'object';

const convertSnakeToCamel = (target: any): void => {  // eslint-disable-line
  if (Array.isArray(target)) {
    target.forEach((t) => convertSnakeToCamel(t));
  }

  if (isObject(target)) {
    Object.keys(target).forEach((key: string) => {
      if (isObject(target[key]) || Array.isArray(target[key])) {
        convertSnakeToCamel(target[key]);
      }

      if (key.includes('_')) {
        const camelCaseKey = key.replace(/([-_][\dA-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

        target[camelCaseKey] = target[key];   // eslint-disable-line
        delete target[key];   // eslint-disable-line
      }
    });
  }
};

const httpRequest = (method: string) => async (
  url: string,
  payload: object = {},
  contentType = 'json',
): Promise<any> => {  // eslint-disable-line
  let urlWithSlash = url;

  if (urlWithSlash[0] !== '/') {
    urlWithSlash = `/${urlWithSlash}`;
  }

  if (urlWithSlash[urlWithSlash.length - 1] !== '/') {
    urlWithSlash = `${urlWithSlash}/`;
  }

  const options: AxiosRequestConfig = {
    method,
    url: `${config.url}${urlWithSlash}`,
    headers: {},
    maxRedirects: 0,
  };

  const token = localStorage.getItem('access-token');

  if (token) {
    (options.headers as AxiosHeaders).Authorization = `Bearer ${token}`;
  }

  if (payload) {
    if (method === 'get') {
      options.params = payload;
    } else if (method === 'post') {
      options.data = payload;
    }
  }

  if (contentType === 'form') {
    (options.headers as AxiosHeaders)['content-type'] = 'application/x-www-form-urlencoded';
    options.data = qs.stringify(options.data);
  }

  let response;

  try {
    response = await axios(options);
  } catch (error) {
    const err = error as AxiosError;
    if (!err.response) {
      throwApiError({
        data: { errors: generalError },
        status: 500,
      });
      return null;
    }

    response = err.response as AxiosResponse;
    response.data = response.data || {};
    response.status = response.status || 500;

    if (response.status === 401) {
      localStorage.setItem('access-token', '');
      window.location.reload();
      return response.data;
    }

    throwApiError(response);
  }

  response.data = response.data || {};
  response.status = response.status || 500;

  if (response.status >= 200 && response.status < 300) {
    convertSnakeToCamel(response.data);
    return response.data;
  }

  response.data.errors = response.data.errors || generalError;
  throwApiError(response);
  return null;
};

export const getRequest = httpRequest('get');
export const postRequest = httpRequest('post');

const apiClient = {
  get: getRequest,
  post: postRequest,
};

export default apiClient;
