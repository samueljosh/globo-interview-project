
<template>
  <v-app> 
    <v-app-bar app color="#c4170c">
      <div id="header-globo">Globo SPA Interview Project</div>
    </v-app-bar>
    <NavBar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>


<style>
@font-face {
  font-family: "rede-globo-bold";
  src: local("rede-globo-bold"),
    url("./assets/rede-globo-bold.ttf") format("truetype");
}
a {
  text-decoration: none;
},
header {
  display: flex;
  margin-top: 10px;
  width: 100%;
  border-bottom: 1px solid #110;
  text-align: center;
  background: #c4170c;
}
#header-globo {
  margin-left: 30px;
  font-size: 1.5em;
  font-family: "rede-globo-bold", Arial, Helvetica, sans-serif;
  color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

