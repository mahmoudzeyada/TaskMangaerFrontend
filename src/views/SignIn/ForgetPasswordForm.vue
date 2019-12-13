<template>
  <div class="signin-form">
    <h2 class="form-title">Reset Password</h2>
    <div v-if="!emailSubmitted">
      <form method="POST" class="register-form" id="login-form">
        <div class="form-group">
          <label for="email"><i class="zmdi zmdi-email"></i></label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email *"
            :class="{ 'error-input': $v.email.$error && errors }"
            v-model.lazy="$v.email.$model"
          />
          <div v-if="errors">
            <div class="error" v-if="!$v.email.required">
              email filed is required
            </div>
            <div class="error" v-if="!$v.email.email">
              it must be an email
            </div>
          </div>
        </div>

        <div class="form-group form-button">
          <input
            type="submit"
            name="submit"
            id="submit"
            class="form-submit"
            value="send email"
            @click.prevent="onSubmit"
          />
        </div>
      </form>
    </div>

    <div v-else>
      <p>
        If we found an account associated with that username, we've sent
        password reset instructions to the primary email address on the account.
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { required, email } from "vuelidate/lib/validators";
import AuthAxios from "@/AuthAxios";
import { IForgetPasswordRes } from "@/models/User";
import { AxiosResponse } from "axios";
export default Vue.extend({
  data: () => ({
    email: "",
    errors: false,
    emailSubmitted: ""
  }),
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    onSubmit(): void {
      if (this.$v.email) {
        this.errors = this.$v.email.$invalid;
      }
      if (!this.errors) {
        AuthAxios.put("/users/forget_password", { email: this.email })
          .then((res: AxiosResponse<IForgetPasswordRes>) => {
            this.emailSubmitted = res.data.message;
          })
          .catch(err => console.log(err));
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
.success {
  color: green;
  text-align: center;
}
</style>
