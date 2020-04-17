import Vue from 'vue';
import ElementUI from 'element-ui';
import axios, {
    AxiosPromise,
    AxiosRequestConfig,
    Canceler,
    AxiosResponse,
    AxiosInstance
} from 'axios';
Vue.use(ElementUI);

// 创建一个新的 axios 实例
const axiosInstance: AxiosInstance = axios.create({
    // 设置请求的基础路径
    baseURL: 'http://localhost:3000',
    // 设置请求超时的最大时长
    timeout: 10000
});

// 发送请求之前添加取消请求配置
// 并将每个请求的取消方法添加到 vuex 中的 requestCancels 用于存放取消请求函数的数组里
// // 用于之后，路由跳转时，取消请求
// axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
//     config.cancelToken = new axios.CancelToken((cancel: Canceler) => {
//         store.commit('addRequestCancels', cancel);
//     });
//     return config;
// });

// 在接口接收到响应数据之后，返回给客户端之前进行的响应拦截处理
axiosInstance.interceptors.response.use((response: AxiosResponse): any => {
    const data = response.data;
    if (data.error === 'NotLogin') {
        window.location.href = `${data.url}${window.location}`;
    } else if (data.error === 'NotPower' || data.code === 403) { // 没有访问权限
        window.location.href = `${window.location.protocol}//${window.location.host}/#/err`;
    }
    return response;
});

// 请求类
class Request {
    // Request 中间件的安装调用方法
    public install(): void {
        Vue.prototype.$request = {
            get: this.get,
            post: this.post
        };
    }

    // get 请求，config 跟 axios 参数配置一致
    private get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return new Promise((resolve, reject) => {
            axiosInstance.get(url, config).then((res) => {
                const data = res.data;
                if (data.code === 0 || data.result === '1') {
                    resolve(data);
                } else {
                    Vue.prototype.$message.error('获取数据失败');
                    reject();
                }
            }).catch((e) => { // 500 默认走 catch
                reject(e);
            });
        });
    }

    // post 请求，requestData、config 跟 axios 参数配置一致
    private post(url: string, requestData?: any, config?: AxiosRequestConfig): AxiosPromise {
        return new Promise((resolve, reject) => {
            axiosInstance.post(url, requestData, config).then((res) => {
                const data = res.data;
                if (data.code === 0 || data.result === '1') {
                    resolve(data);
                } else {
                    Vue.prototype.$message.error('获取数据失败');
                    reject();
                }
            }).catch((e) => { // 500 默认走 catch
                reject(e);
            });
        });
    }
}

const request = new Request();

export default request;
