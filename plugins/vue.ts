// vue 所有相关插件及属性声明都在这个文件进行安装
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '~/types/vue-property';
import requestTool from '~/plugins/lib/request';

Vue.use(ElementUI);
Vue.use(requestTool);