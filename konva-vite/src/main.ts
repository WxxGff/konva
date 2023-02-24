import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//引入naive库
import naive from 'naive-ui'
const app = createApp(App);



app.mount('#app')




app.use(naive)


