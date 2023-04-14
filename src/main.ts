import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

// 完整导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
// 剪贴板
import VueClipboard from 'vue3-clipboard'
// 格式化时间用
import moment from 'moment'

const app = createApp(App)

// 配置请求根路径
axios.defaults.baseURL = 'http://localhost:2334' //本地
// axios.defaults.baseURL = 'http://api.kiriya.top' //服务器
// 将axios作为全局的自定义属性，每个组件可以在内部直接访问(vue3)


// 请求拦截器，每次请求都会先执行这里的代码
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        // console.log("请求拦截器 token:"+token)
        // 请求头携带token
        typeof config.headers.set === 'function' && config.headers.set('Authorization', `${token}`)
        //   config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    },
    function (err) {
        // 对请求错误做些什么
        console.log("请求拦截器报错")
    }
)
axios.defaults.withCredentials = true;
//   定入到原型链，使用this可以找到使用
//   Vue.prototype.$http = axios
app.config.globalProperties.$http = axios
// 绑定moment
app.config.globalProperties.$moment = moment

app.use(ElementPlus)
app.use(router)
app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
})
app.mount('#app')

//登录拦截
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {//requireAuth若为true则该路由需要判断是否登录
        let token = localStorage.getItem("token")
        // console.log("登录拦截 当前本地token:" + token)
        if (token != null) {//判断token是否存在
            axios.get("/admin/verifyToken"
            ).then((respones) => {
                console.log(respones.data)
                next();
            }).catch(function () {
                console.log("token校验失败")
            })
        }
        else {
            next({//返回登录页面
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    }
    else {
        next();
    }

})
