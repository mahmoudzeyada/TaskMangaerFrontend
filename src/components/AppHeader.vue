<template>
  <div>
    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
        v-if="isAuthenticated"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Task</span>
        <span>Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="grey" v-if="isAuthenticated" @click="onLogOut">
        <span>Sign out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <div v-else>
        <v-btn text color="grey" to="/signup">
          <span>Sign Up</span>
          <v-icon right>account_circle</v-icon>
        </v-btn>
        <v-btn text color="grey" to="/signin">
          <span>Sign In</span>
          <v-icon right>face</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.route"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-list-item-icon>
              <v-icon class="white--text">{{
                link.icon
              }}</v-icon></v-list-item-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="white--text">{{ link.text }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
  <!-- <header id="header">
    <div class="logo">
      <router-link to="/"><h1>Task Manager</h1></router-link>
    </div>
    <nav>
      <div class="navigators">
        <div class="item" v-if="!isAuthenticated">
          <router-link to="/signup">Sign Up</router-link>
        </div>
        <div class="item" v-if="!isAuthenticated">
          <router-link to="/signin">Sign In</router-link>
        </div>
        <div class="item" v-if="isAuthenticated">
          <router-link to="/dashboard">Dashboard</router-link>
        </div>
        <div class="item" v-if="isAuthenticated" @click="onLogOut">
          <router-link to="#">Logout</router-link>
        </div>
      </div>
    </nav>
  </header> -->
</template>
<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("Auth");
export default Vue.extend({
  data: () => ({
    drawer: false,
    links: [
      { icon: "dashboard", text: "home", route: "/" },
      { icon: "folder", text: "Dashboard", route: "/dashboard" },
      { icon: "person", text: "Profile", route: "/profile" },
      { icon: "link", text: "Create Task", route: "/task" }
    ]
  }),

  computed: { ...mapGetters(["isAuthenticated"]) },

  methods: {
    ...mapActions(["logOut"]),
    onLogOut(): void {
      this.logOut()
        .then(res => this.$router.replace("/signin"))
        .catch(err => {
          console.log(err);
          this.$router.replace("/signin");
        });
    }
  }
});
</script>
<style scoped>
#header {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background-color: #ffc0cb;
  padding: 0 20px;
}
.logo {
  font-weight: bold;
  color: grey;
}
.logo a {
  text-decoration: none;
  color: grey;
}
nav {
  height: 100%;
}
.navigators {
  display: flex;
  flex-flow: row;
  align-items: center;
  height: 100%;
}
.item {
  margin: 0 16px;
}

.item a {
  text-decoration: none;
  color: grey;
}

.item a:hover,
.item a:active,
.item a.router-link-active {
  color: #750470;
}
</style>
