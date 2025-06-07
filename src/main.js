import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios';



// 设置 axios 的全局配置
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // 设置基础 URL
axios.defaults.headers.common['Authorization'] = 'Bearer token'; // 设置公共请求头

// createApp(App).mount('#app')
const app = createApp(App)

app.use(router)

// 将 axios 实例挂载到全局属性中
app.config.globalProperties.$http = axios;
app.use(router).use(ElementPlus, { locale }).mount("#app");
