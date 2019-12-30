<template>
  <div class="dashboard">
    <h1 class="subtitle-1	grey--text">this is dashboard</h1>
    <v-container class="my-5">
      <app-task v-for="task in getTasks" :key="task.id" :task="task" />
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import AppTask from "./AppTask.vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("Tasks");

export default Vue.extend({
  components: {
    AppTask
  },
  methods: {
    ...mapActions(["fetchTasks"])
  },
  computed: {
    ...mapGetters(["getTasks"])
  },
  created() {
    const tasks = this.getTasks;
    if (!tasks.length) {
      this.fetchTasks().catch(err => console.log(err));
    }
  }
});
</script>
