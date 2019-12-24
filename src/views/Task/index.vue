<template>
  <div class="task">
    <h1 class="subtitle-1	grey--text">create a task</h1>
    <v-container class="my-5">
      <v-form>
        <v-row>
          <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
            <v-text-field
              label="Description*"
              :counter="30"
              v-model="$v.description.$model"
              :error-messages="descriptionErrors"
            ></v-text-field>
            <v-textarea
              auto-grow
              outlined
              rows="3"
              row-height="25"
              label="Content*"
              class="mt-5"
              :counter="200"
              v-model="$v.content.$model"
              :error-messages="contentErrors"
            ></v-textarea>
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="computedDateFormattedMomentjs"
                  clearable
                  label="DueBy"
                  readonly
                  v-on="on"
                  @click:clear="date = null"
                  :error-messages="dateError"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @change="menu1 = false"
              ></v-date-picker>
            </v-menu>
            <br /><br />
            <v-row justify="center"
              ><v-btn
                class="primary mx-4"
                :disabled="$v.$invalid || !$v.$dirty || !!dateError"
                large
                text
                >Create</v-btn
              >
              <v-btn class="green white--text" large>
                <v-icon left>add</v-icon>
                Upload Image
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { required, maxLength } from "vuelidate/lib/validators";

export default Vue.extend({
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    content: "",
    description: "",
    dateError: ""
  }),
  validations: {
    content: { required, maxLength: maxLength(200) },
    description: { required, maxLength: maxLength(30) }
  },
  watch: {
    date(val) {
      console.log(val);
      if (!val) {
        this.dateError = "date is required";
      } else {
        this.dateError = "";
      }
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
    descriptionErrors() {
      const errors: string[] = [];
      if (this.$v.description) {
        if (!this.$v.description.$dirty) return errors;
        !this.$v.description.maxLength &&
          errors.push("description must be at most 30 characters long");
        !this.$v.description.required && errors.push("description is required");
      }
      return errors;
    },
    contentErrors() {
      const errors: string[] = [];
      if (this.$v.content) {
        if (!this.$v.content.$dirty) return errors;
        !this.$v.content.maxLength &&
          errors.push("description must be at most 200 characters long");
        !this.$v.content.required && errors.push("description is required");
      }
      return errors;
    }
  }
});
</script>
