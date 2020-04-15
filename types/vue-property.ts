import {AxiosRequestConfig, AxiosPromise} from 'axios';

// 定义 $requestToolType 请求方法类的接口
interface $requestType {
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}

// 添加 vue 属性类型声明
declare module 'vue/types/vue' {
    interface Vue {
        $request: $requestType;
    }
}