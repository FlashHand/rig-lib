import axios from 'axios';
import qs from 'qs';

// src/networking.helper.ts
var BasicClient = class {
  constructor(config, interceptors) {
    this.defaultConfig = {
      timeout: 2e4,
      headers: { "Content-Type": "application/json" }
    };
    /**
     * 设置baseURL
     * @param baseURL
     */
    this.setBaseURL = (baseURL) => {
      this.defaultConfig.baseURL = baseURL;
      this.axiosClient.defaults.baseURL = baseURL;
    };
    /**
     * 设置适配器
     * @param adapter
     */
    this.setAdapter = (adapter) => {
      this.defaultConfig.adapter = adapter;
      this.axiosClient.defaults.adapter = adapter;
    };
    /**
     * 创建一个post请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    this.postBody = async (url, body, params, config) => {
      let postConfig = Object.assign({}, this.defaultConfig, config);
      if (params) {
        postConfig.params = params;
        postConfig.paramsSerializer = ((params2) => {
          return qs.stringify(params2, { arrayFormat: "indices" });
        });
      }
      const res = await this.axiosClient.post(url, body, postConfig);
      return res.data;
    };
    /**
     * 创建一个post请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    this.post = async (url, params, config) => {
      let postConfig = Object.assign({}, this.defaultConfig, config);
      const res = await this.axiosClient.post(url, params, postConfig);
      return res.data;
    };
    /**
     * put,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    this.put = async (url, body, params, config) => {
      let postConfig = Object.assign({}, this.defaultConfig, config);
      if (params) {
        postConfig.params = params;
        postConfig.paramsSerializer = ((params2) => {
          return qs.stringify(params2, { arrayFormat: "indices" });
        });
      }
      const res = await this.axiosClient.put(url, body, postConfig);
      return res.data;
    };
    /**
     * delete,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    this.delete = async (url, params, config) => {
      const getConfig = {
        params,
        paramsSerializer: ((params2) => {
          return qs.stringify(params2, { arrayFormat: "indices" });
        })
      };
      const currentConfig = Object.assign(getConfig, this.defaultConfig);
      const res = await this.axiosClient.delete(url, currentConfig);
      return res.data;
    };
    /**
     * 创建一个patch请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    this.patch = async (url, body, params, config) => {
      let postConfig = Object.assign({}, this.defaultConfig, config);
      if (params) {
        postConfig.params = params;
        postConfig.paramsSerializer = ((params2) => {
          return qs.stringify(params2, { arrayFormat: "indices" });
        });
      }
      const res = await this.axiosClient.patch(url, body, postConfig);
      return res.data;
    };
    /**
     * 创建一个post请求函数,使用x-www-form-urlencoded
     * @param url
     * @param params
     * @param config
     */
    this.postForm = async (url, params, config) => {
      const postConfig = Object.assign({}, this.defaultConfig, config);
      const res = await this.axiosClient.post(url, qs.stringify(params), postConfig);
      return res.data;
    };
    /**
     * 创建一个get请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    this.get = async (url, params, config) => {
      const getConfig = {
        params,
        paramsSerializer: ((params2) => {
          return qs.stringify(params2, { arrayFormat: "indices" });
        })
      };
      const currentConfig = Object.assign(getConfig, this.defaultConfig);
      const res = await this.axiosClient.get(url, currentConfig);
      return res.data;
    };
    this.appendRequestInterceptor = (interceptor) => {
      this.axiosClient.interceptors.request.use(interceptor.fullfilled, interceptor.rejected);
    };
    this.appendResponseInterceptor = (interceptor) => {
      this.axiosClient.interceptors.response.use(interceptor.fullfilled, interceptor.rejected);
    };
    this.setRequestInterceptors = (interceptors) => {
      interceptors.forEach((interceptor) => {
        this.axiosClient.interceptors.request.use(
          interceptor.fullfilled,
          interceptor.rejected
        );
      });
    };
    this.setResponseInterceptors = (interceptors) => {
      interceptors.forEach((interceptor) => {
        this.axiosClient.interceptors.response.use(
          interceptor.fullfilled,
          interceptor.rejected
        );
      });
    };
    this.defaultConfig = Object.assign(this.defaultConfig, config);
    this.axiosClient = axios.create(config);
    interceptors?.requestInterceptors?.forEach((interceptor) => {
      this.axiosClient.interceptors.request.use(
        interceptor.fullfilled,
        interceptor.rejected
      );
    });
    interceptors?.responseInterceptors?.forEach((interceptor) => {
      this.axiosClient.interceptors.response.use(
        interceptor.fullfilled,
        interceptor.rejected
      );
    });
  }
};

// src/index.ts
var rClient = new BasicClient();

export { BasicClient, rClient };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map