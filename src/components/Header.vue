<template>
  <header id="header">
    <div class="logo">
      <router-link to="/"><h1>Task Manager</h1></router-link>
    </div>
    <nav>
      <div class="navigators">
        <div class="item">
          <router-link to="/signup">Sign Up</router-link>
        </div>
        <div class="item">
          <router-link to="/signin">Sign In</router-link>
        </div>
        <div class="item">
          <router-link to="/dashboard">Dashboard</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
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
