<template>
  <v-navigation-drawer permanent expand-on-hover app dark>
    <v-list>
      <a href="https://github.com/samueljosh/globo-interview-project">
        <v-list-item class="px-2" v-if="isLoggedIn">
          <v-list-item-avatar>
            <v-img src="https://github.com/samueljosh.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link v-if="isLoggedIn">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Samuel Joshua de Oliveira
            </v-list-item-title>
            <v-list-item-subtitle>samueljoshua@live.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </a>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item to="/monitor" link>
        <v-list-item-icon>
          <v-icon>mdi-desktop-tower-monitor</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Monitor</v-list-item-title>
      </v-list-item>
      <v-list-item to="/login" v-if="!isLoggedIn" link>
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>
      <v-list-item to="/register" link v-if="isAdmin">
        <v-list-item-icon>
          <v-icon>mdi-account-supervisor-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Gerenciamento de usuários</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="isLoggedIn">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title> <a @click="logout">Sair</a></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
    isAdmin: function () {
      return this.$store.getters.levelAccess === "Administrador";
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

a:hover {
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
