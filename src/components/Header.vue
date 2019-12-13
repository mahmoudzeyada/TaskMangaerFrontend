<template>
  <header id="header">
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
          <router-link to="/dashboard">Logout</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("Auth");
export default Vue.extend({
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
li a.router-link-active {
  color: #750470;
}
</style>
