<template>
  <section class="sign-in">
    <div class="container">
      <div class="signin-content">
        <div class="signin-image">
          <figure>
            <img src="@/assets/images/signin-image.jpg" alt="sing up image" />
          </figure>
          <router-link to="/signup"
            ><a class="signup-image-link">Create an account</a></router-link
          >
          <router-link to="/"
            ><a class="signup-image-link">forget password!!</a></router-link
          >
        </div>

        <div class="signin-form">
          <h2 class="form-title">Sign In</h2>
          <form method="POST" class="register-form" id="login-form">
            <div class="form-group">
              <label for="your_name"
                ><i class="zmdi zmdi-account material-icons-name"></i
              ></label>
              <input
                type="text"
                name="your_name"
                id="your_name"
                placeholder="Your Name or Email"
                v-model.lazy="$v.formData.payload.$model"
              />
              <div
                v-if="!this.$v.formData.payload.required && errors"
                class="error"
              >
                <small>this filed is required</small>
              </div>
            </div>
            <div class="form-group">
              <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
              <input
                type="password"
                name="your_pass"
                id="your_pass"
                placeholder="Password"
                v-model.lazy="$v.formData.password.$model"
              />
              <div
                v-if="!$v.formData.password.required && errors"
                class="error"
              >
                <small>this filed is required</small>
              </div>
            </div>
            <div class="form-group">
              <input type="checkbox" name="remember-me" id="remember-me" />
              <label for="remember-me" class="label-agree-term"
                ><span><span></span></span>Remember me</label
              >
            </div>
            <div class="form-group form-button">
              <input
                type="submit"
                name="signin"
                id="signin"
                class="form-submit"
                value="Log in"
                @click.prevent="onSubmit"
              />
              <div class="error">
                <small v-if="badSignIn">username or password is wrong</small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";

import { required } from "vuelidate/lib/validators";
import { ISignInForm } from "../../types";
import { IServerError } from "@/models/ServerError";

const { mapActions } = createNamespacedHelpers("Auth");
export default Vue.extend({
  data: () => ({
    formData: {
      payload: "",
      password: ""
    } as ISignInForm,
    errors: false,
    badSignIn: false
  }),
  validations: {
    formData: {
      payload: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions(["signIn"]),
    onSubmit(): void {
      if (this.$v.formData) {
        this.errors = this.$v.formData.$invalid;
        if (!this.errors) {
          this.signIn(this.formData)
            .then(res => {
              this.$router.push("/dashboard");
            })
            .catch((err: IServerError) => {
              if (
                err.statusCode === 400 &&
                err.error === "Bad Request" &&
                err.message === "unable to login"
              ) {
                this.badSignIn = true;
              }
            });
        }
      }
    }
  }
});
</script>
<style scoped>
.sign-in {
  padding: 100px 0;
}
.error {
  color: red;
  font: inherit;
}

.error-input {
  border-color: red;
  color: red;
}
</style>
