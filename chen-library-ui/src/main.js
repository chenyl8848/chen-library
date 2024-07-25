import { createApp } from 'vue'
import App from './App.vue'

// 全局样式
import './styles/index.scss'

// 路由
import router from './router'
// ElementUI Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// pinia
import store from './store'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(store)

// 全局导入Element UI Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
