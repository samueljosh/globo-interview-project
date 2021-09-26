
<template>
  <div class="app">
    <header>
      <h1 id="header-globo">Globo SPA Interview Project</h1>
    </header>
    <main>
      <aside class="sidebar">
        <router-link
          v-for="item in menu"
          active-class="is-active"
          class="link"
          :to="{ name: 'menu', params: { id: item.id } }"
        >
          {{ item.title }}
        </router-link>
      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
      endpoint: null,
    };
  },
  created() {
    this.getAllMenu();
  },
  methods: {
    getAllMenu() {
      this.menu = [
        { id: 0, body: "", title: "Tela de Login" },
        { id: 1, body: "", title: "Tela principal " },
        { id: 2, body: "", title: "Tela de gerenciamento de usuários" },
      ];
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "rede-globo-bold";
  src: local("rede-globo-bold"),
    url("./assets/rede-globo-bold.ttf") format("truetype");
}
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: space-between;
}
.content {
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
  flex-direction: row;


}
header {
  display: flex;
  margin-top:10px;
  width: 100%;
  border-bottom: 1px solid #110;
  text-align: center;
  background: #C4170C;
}
#header-globo {
  margin-left:30px;
  font-size: 1.5em;
  font-family: "rede-globo-bold", Arial, Helvetica, sans-serif;
  color:#fff;
}
.sidebar {
  display: flex;
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
  overflow: auto;
}
.link {
  display: flex;
  text-decoration: none;
  margin-bottom: 10px;
  color: #2c3e50;
  &--home {
    text-transform: uppercase;
    margin-bottom: 30px;
  }
  &.is-active {
    color: #42b983;
  }
}

/* Links on mouse-over */
.sidebar .link:hover:not(.active) {
  background-color: #555;
  color: white;
}

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar .link {
    float: left;
  }
  div.content {
    margin-left: 0;
  }
}

@media screen and (max-width: 400px) {
  .sidebar link {
    text-align: center;
    float: none;
  }
}

h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
