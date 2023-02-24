import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueKonva from 'vue-konva';
//引入naive库
import naive from 'naive-ui'
const app = createApp(App);



app.mount('#app')


app.use(VueKonva)

app.use(naive)


