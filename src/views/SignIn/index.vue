<template>
  <div class="signin">
    <h1 class="subtitle-1 grey--text">Sign In</h1>
    <v-container class="my-5">
      content
    </v-container>
  </div>

  <!-- <section class="sign-in">
    <div class="container">
      <div class="signin-content">
        <component :is="selectedComponent"></component>
        <div class="signin-image">
          <figure>
            <img src="@/assets/images/signin-image.jpg" alt="sing up image" />
          </figure>
          <router-link to="/signup"
            ><a class="signup-image-link">Create an account</a></router-link
          >
          <a
            href="#"
            class="signup-image-link"
            @click="selectedComponent = 'forget-password-form'"
            v-if="selectedComponent === 'sign-in-form'"
            >forget password!!</a
          >
          <a
            href="#"
            class="signup-image-link"
            @click="selectedComponent = 'sign-in-form'"
            v-else
            >sign in</a
          >
        </div>
      </div>
    </div>
  </section> -->
</template>
<script lang="ts">
import Vue from "vue";
import SignInForm from "./SignInForm.vue";
import ForgetPasswordForm from "./ForgetPasswordForm.vue";

export default Vue.extend({
  data: () => ({
    selectedComponent: "sign-in-form"
  }),
  // components: {
  //   SignInForm,
  //   ForgetPasswordForm
  // },
  created() {
    this.selectedComponent = "sign-in-form";
  }
});
</script>

<style scoped>
.sign-in {
  padding: 100px 0;
}
</style>
