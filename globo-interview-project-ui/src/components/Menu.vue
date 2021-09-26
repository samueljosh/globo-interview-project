<template lang="html">
    <a class="menu" id="header-globo" v-if="menu">
        <h1 class="menu__title">{{menu.title}}</h1>
        <p  class="menu__body"> {{menu.body}} </p>
        <p  class="menu__id">   {{menu.id}} </p>
    </a>
</template>

 <<script>
import axios from'axios'
 export default {
     props:['id'],
     data() {
         return{
             menu:null,
             endpoint: ''
         }
     },
     methods: {
         getMenu(id) {
                 this.menu = [{id:0,body:'',title:'Tela de Login'}]
         }
     },
     created(){
         this.getMenu(this.id)
     },
     watch:{
         '$route'() {
             this.getMenu(this.id)
         }
     }
 }
 </script>

 <style lang="scss" scoped>
.menu {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  padding: 50px 20px 70px;
  &__title {
    position: relative;
    text-transform: uppercase;
    z-index: 1;
  }
  &__body {
    position: relative;
    z-index: 1;
  }
  &__id {
    position: absolute;
    font-size: 280px;
    bottom: -50px;
    margin: 0;
    color: #eeeeee;
    right: -20px;
    line-height: 1;
    font-weight: 900;
    z-index: 0;
  }
}
</style>