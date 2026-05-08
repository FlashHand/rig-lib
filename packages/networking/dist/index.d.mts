import { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

interface IReqInterceptor {
    fullfilled: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
    rejected: (error: any) => void;
}
interface IResInterceptor {
    fullfilled: (config: AxiosResponse) => Promise<AxiosResponse>;
    rejected: (error: any) => void;
}
declare class BasicClient {
    private axiosClient;
    defaultConfig: AxiosRequestConfig;
    constructor(config?: AxiosRequestConfig, interceptors?: {
        requestInterceptors: IReqInterceptor[];
        responseInterceptors: IResInterceptor[];
    });
    /**
     * 设置baseURL
     * @param baseURL
     */
    setBaseURL: (baseURL: string) => void;
    /**
     * 设置适配器
     * @param adapter
     */
    setAdapter: (adapter: any) => void;
    /**
     * 创建一个post请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    postBody: <B, P>(url: string, body: B, params?: P, config?: AxiosRequestConfig) => Promise<any>;
    /**
     * 创建一个post请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    post: <P>(url: string, params?: P, config?: AxiosRequestConfig) => Promise<any>;
    /**
     * put,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    put: <P>(url: string, body: P, params?: P, config?: AxiosRequestConfig) => Promise<any>;
    /**
     * delete,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    delete: <P>(url: string, params?: P, config?: AxiosRequestConfig) => Promise<any>;
    /**
     * 创建一个patch请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param body
     * @param params
     * @param config
     */
    patch: <P>(url: string, body: P, params?: P, config?: AxiosRequestConfig) => Promise<any>;
    /**
     * 创建一个post请求函数,使用x-www-form-urlencoded
     * @param url
     * @param params
     * @param config
     */
    postForm: <P>(url: string, params: P, config?: AxiosRequestConfig) => Promise<any>;
    /**
     * 创建一个get请求函数,支持自定义AxiosRequestConfig
     * @param url
     * @param params
     * @param config
     */
    get: <P>(url: string, params?: P, config?: AxiosRequestConfig) => Promise<any>;
    appendRequestInterceptor: (interceptor: IReqInterceptor) => void;
    appendResponseInterceptor: (interceptor: IResInterceptor) => void;
    setRequestInterceptors: (interceptors: IReqInterceptor[]) => void;
    setResponseInterceptors: (interceptors: IResInterceptor[]) => void;
}

declare const rClient: BasicClient;

export { BasicClient, type IReqInterceptor, type IResInterceptor, rClient };
