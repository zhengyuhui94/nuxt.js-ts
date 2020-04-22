// vue 所有相关插件及属性声明都在这个文件进行安装
import Vue from 'vue';
import ElementUI from 'element-ui';
import '~/types/vue-property';
import Request from '~/plugins/lib/Request';

// 单例模式实现的 Request 类，只能通过 Request.getInstance 方法生成实例，且只能生成一个 request 实例
const request = Request.getInstance();

Vue.use(ElementUI);
Vue.use(request);