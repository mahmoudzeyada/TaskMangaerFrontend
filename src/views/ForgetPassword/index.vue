<template>
  <div class="main">
    <section class="signup">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class="form-title">Reset Password</h2>
            <form method="POST" class="register-form" id="register-form">
              <div class="form-group">
                <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  placeholder="Password *"
                  v-model.lazy="$v.formData.password.$model"
                  :class="{
                    'input-error': $v.formData.password.$error && errors
                  }"
                />
                <div v-if="errors">
                  <div class="error" v-if="!$v.formData.password.required">
                    password filed is required
                  </div>
                  <div class="error" v-if="!$v.formData.password.minLength">
                    password filed must at least
                    {{ $v.formData.password.$params.minLength.min }}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="re-pass"
                  ><i class="zmdi zmdi-lock-outline"></i
                ></label>
                <input
                  type="password"
                  name="re_pass"
                  id="re_pass"
                  placeholder="Repeat your password *"
                  v-model.lazy="$v.formData.confirmPassword.$model"
                  :class="{
                    'error-input': $v.formData.confirmPassword.$error && errors
                  }"
                />
                <div
                  class="error"
                  v-if="!$v.formData.confirmPassword.sameAsPassword && errors"
                >
                  Passwords must be identical.
                </div>
              </div>
              <div class="form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  class="form-submit"
                  value="Register"
                  @click.prevent="onSubmit"
                />
              </div>
              <div class="success" v-if="confirmed">
                the password is updated successfully pls
                <router-link to="/signin"><a>again</a></router-link>
              </div>
              <div class="warning" v-if="errorMessage">
                pls insure that you copy the url correct or make another
                password reset request from
                <a href="#" @click="$router.replace('/signin')">here</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { IResetPasswordFrom } from "../../types";
import AuthAxios from "@/AuthAxios";
import { IServerError } from "../../models/ServerError";
export default Vue.extend({
  data: () => ({
    formData: {
      password: "",
      confirmPassword: ""
    } as IResetPasswordFrom,
    errors: false,
    confirmed: false,
    errorMessage: false
  }),
  validations: {
    formData: {
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  methods: {
    onSubmit(): void {
      if (this.$v.formData) {
        this.errors = this.$v.formData.$invalid;
      }
      if (!this.errors) {
        const data = {
          password: this.formData.password,
          token: this.$route.params.token
        };
        console.log(data);
        AuthAxios.put("/users/forget_password/confirm", data)
          .then(res => {
            if (res && res.data) {
              this.confirmed = true;
            }
          })
          .catch(err => {
            const res = err.response.data as IServerError;
            if (
              res.statusCode === 400 &&
              res.message === "token provided is not correct or expired"
            ) {
              this.errorMessage = true;
            }
          });
      }
    }
  }
});
</script>
<style scoped>
.error {
  color: red;
  font: inherit;
}

.error-input {
  border-color: red;
  color: red;
}
.warning {
  color: orange;
}

.warning a {
  color: rgb(146, 96, 3);
}
</style>
