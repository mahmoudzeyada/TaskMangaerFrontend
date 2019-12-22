<template>
  <v-card flat class="pa-4 my-4">
    <v-app-bar flat class="deep-purple lighten-4">
      <v-toolbar-title class="text-uppercase grey--text">
        Task Card
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="show = !show">
        <v-icon> {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row>
      <v-col cols="12" md="6">
        <div class="caption grey--text">
          Task
        </div>
        <span> {{ task.description }}</span>
      </v-col>
      <v-col cols="6" sm="4" md="2">
        <div class="caption grey--text">
          Image
        </div>
        <v-img
          :src="'http://127.0.0.1:3000/' + task.image"
          lazy-src="https://picsum.photos/id/11/10/6"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="500"
          max-height="50"
        ></v-img>
      </v-col>
      <v-col cols="6" sm="4" md="2">
        <div class="caption grey--text">
          Due by
        </div>
        <span>{{ task.dueBy }}</span>
      </v-col>
      <v-col cols="6" sm="4" md="2">
        <div class="caption grey--text">
          Status
        </div>
        <span v-if="task.completed" class="green--text">{{ "Completed" }}</span>
        <span v-else class="red--text">{{ "Not Completed" }}</span>
      </v-col>
    </v-row>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-row justify="center">
          <v-col cols="12">
            <p>
              {{ task.content }}
            </p>
          </v-col>
          <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
            <v-btn class="mx-2" dark large outlined color="cyan">
              <v-icon dark left>mdi-pencil</v-icon>
              edit
            </v-btn>
            <v-btn class="mx-2" outlined dark large color="red">
              <v-icon dark left>mdi-minus</v-icon>
              delete
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import ITask from "@/models/Task";
export default Vue.extend({
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    show: false
  })
});
</script>
