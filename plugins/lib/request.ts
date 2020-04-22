import Vue from 'vue';
import ElementUI from 'element-ui';
import axios, {
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance
} from 'axios';
Vue.use(ElementUI);

// 创建一个新的 axios 实例
const axiosInstance: AxiosInstance = axios.create({
    // 设置请求的基础路径：
    // 1.当在浏览器通过 axios 请求且 baseURL 为 '' 的时候，
    // 会默认取当前的域名端口为基础路径【该项目是 3000 端口】
    // 2.当在服务端通过 axios 请求的时候，请求的默认端口是 80，
    // 但服务端启动的服务是 3000 端口，即没有启动 80 端口【会报错】，所以需要根据不同环境设置 baseURL
    baseURL: process.server ? 'http://127.0.0.1:3000' : '',
    // 设置请求超时的最大时长
    timeout: 10000
});

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
    private static instance: Request | null = null;

    private constructor(){

    }

    // 实现单例模式获取 axios 实例方法
    public static getInstance(): Request{
        if(!Request.instance){
            Request.instance = new Request();
        }
        return Request.instance;
    }

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

export default Request;
