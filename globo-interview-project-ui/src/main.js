import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Monitor from './screens/Perfomance/Monitor.vue'
import Menu from './components/Menu.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

Vue.use(Vuetify)
Vue.use(Router)

const router = new Router({
 routes: [

   {
     path: '/menu/:id',
     name:'menu',
     component: Menu,
     props: true,
   },
   {
    path: '/',
    name:'monitor',
    component:Monitor
  },
 ]
})

new Vue({
 el: '#app',
 render: h => h(App),
 router
})