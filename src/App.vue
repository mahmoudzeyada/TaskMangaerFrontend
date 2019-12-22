<template>
  <v-app class="grey lighten-4">
    <app-header />
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppHeader from "@/components/AppHeader.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppHeader
  },
  data: () => ({
    //
  })
});
</script>
