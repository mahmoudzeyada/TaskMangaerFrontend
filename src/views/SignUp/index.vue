<template>
  <div class="main">
    <section class="signup">
      <div class="container">
        <div class="signup-content">
          <div class="signup-form">
            <h2 class="form-title">Sign up</h2>
            <form method="POST" class="register-form" id="register-form">
              <div class="form-group">
                <label for="name"
                  ><i class="zmdi zmdi-account material-icons-name"></i
                ></label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name *"
                  v-model.lazy="$v.formData.name.$model"
                  :class="{
                    'error-input': $v.formData.name.$error && errors
                  }"
                />
              </div>
              <div v-if="errors">
                <div class="error" v-if="!$v.formData.name.required">
                  Name is Required
                </div>
                <div class="error" v-if="!$v.formData.name.minLength">
                  Name must have at least
                  {{ $v.formData.name.$params.minLength.min }} letters.
                </div>
                <div class="error" v-if="!$v.formData.name.shape">
                  Name must be alphabetic
                </div>
              </div>
              <div class="form-group">
                <label for="email"><i class="zmdi zmdi-email"></i></label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email *"
                  :class="{ 'error-input': $v.formData.email.$error && errors }"
                  v-model.lazy="$v.formData.email.$model"
                />
                <div v-if="errors">
                  <div class="error" v-if="!$v.formData.email.required">
                    email filed is required
                  </div>
                  <div class="error" v-if="!$v.formData.email.email">
                    it must be an email
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="age"><i class="zmdi zmdi-lock"></i></label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  placeholder="Your Age *"
                  :class="{ 'error-input': $v.formData.age.$error && errors }"
                  v-model="$v.formData.age.$model"
                />
                <div v-if="errors">
                  <div class="error" v-if="!$v.formData.age.required">
                    email filed is required
                  </div>
                  <div class="error" v-if="!$v.formData.age.integer">
                    age must be integer value
                  </div>
                  <div class="error" v-if="!$v.formData.age.between">
                    age must be at least
                    {{ $v.formData.age.$params.between.min }}
                  </div>
                </div>
              </div>
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
            </form>
          </div>
          <div class="signup-image">
            <figure>
              <img src="@/assets/images/signup-image.jpg" alt="sing up image" />
            </figure>
            <router-link to="/signin"
              ><a class="signup-image-link">I am already member</a></router-link
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {
  required,
  minLength,
  between,
  email,
  integer,
  sameAs
} from "vuelidate/lib/validators";
import { IFormData } from "@/types";
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("Auth");

export default Vue.extend({
  data: () => ({
    formData: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: null
    } as IFormData,
    // form state to control errors behavior
    errors: false
  }),
  methods: {
    ...mapActions(["signUp"]),
    onSubmit() {
      if (this.$v.formData) {
        this.errors = this.$v.formData.$invalid;
        if (!this.errors) {
          delete this.formData.confirmPassword;
          this.signUp(this.formData)
            .then(res => this.$router.push("/dashboard"))
            .catch(err => console.log(err));
        }
      }
    }
  },
  validations: {
    formData: {
      name: {
        required,
        minLength: minLength(4),
        shape: (value: string): boolean => /^[a-zA-Z]+$/.test(value)
      },
      email: {
        required,
        email
      },
      age: {
        integer,
        required,
        between: between(18, 95)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAsPassword: sameAs("password")
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
</style>
