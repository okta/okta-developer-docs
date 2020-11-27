<template>
  <div class="signup" id="signup-form">
    <div class="signup--form">
      <form @submit="submitForm">
        <div class="row">
          <label for="email">
            Email
            <input
              type="text"
              id="email"
              placeholder="Email"
              v-model="form.email.value"
              :class="{ error: !form.email.isValid }"
              @blur="
                validationService.checkEmailInput('email', form.email.value)
              "
            />
            <ul class="error-color" v-if="form.email.errorList.length">
              <li
                class="error-color"
                v-for="error in form.email.errorList"
                v-bind:key="error.length * Math.random()"
              >
                {{ error }}
              </li>
            </ul>
          </label>
        </div>
        <div class="row">
          <label for="firstName">
            First Name
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              v-model="form.firstName.value"
              :class="{ error: !form.firstName.isValid }"
              @blur="
                validationService.checkFormInput(
                  'firstName',
                  form.firstName.value
                )
              "
            />
            <ul class="error-color" v-if="form.firstName.errorList.length">
              <li
                class="error-color"
                v-for="error in form.firstName.errorList"
                v-bind:key="error.length * Math.random()"
              >
                {{ error }}
              </li>
            </ul>
          </label>
          <label for="lastName">
            Last Name
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              v-model="form.lastName.value"
              :class="{ error: !form.lastName.isValid }"
              @blur="
                validationService.checkFormInput(
                  'lastName',
                  form.lastName.value
                )
              "
            />
            <ul class="error-color" v-if="form.lastName.errorList.length">
              <li
                class="error-color"
                v-for="error in form.lastName.errorList"
                v-bind:key="error.length * Math.random()"
              >
                {{ error }}
              </li>
            </ul>
          </label>
        </div>
        <div class="row">
          <label for="country">
            Country
            <select
              name=""
              v-model="form.country.value"
              id="country"
              @change="
                validationService.checkFormInput('country', form.country.value)
              "
              :class="{ error: !form.country.isValid }"
            >
              <option selected disabled>Country</option>
              <option value="first">Urkaine</option>
            </select>
            <span class="error-color" v-if="form.country.errorList.length">{{
              validationService.errorDictionary.emptyField
            }}</span>
          </label>
        </div>
        <div class="row">
          <label for="signup">
            <input
              type="submit"
              class="btn"
              :disabled="!isValidForm"
              id="signup"
              value="sign up"
            />
          </label>
        </div>
      </form>
      <div class="splitter">
        <span></span>
        <span>or</span>
        <span></span>
      </div>
      <div class="row">
        <label for="">
          <input
            type="button"
            class="social-btn"
            value="continue with github"
          />
        </label>
      </div>
      <div class="row">
        <label for="">
          <input
            type="button"
            class="social-btn"
            value="continue with google"
          />
        </label>
      </div>
      <div class="row goto-signin">
        Already signed up? <a href="/signin">Sign in</a>
      </div>
    </div>
    <div class="signup--description">
      <Content slot-key="signup-description" />
      <div class="logo-wrapper">
        <h4>Trusted by</h4>
        <div class="partners-logo">
          <img
            src="@okta/vuepress-site/.vuepress/public/img/authorization/proof-by.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SignUpValidation } from "../services/signupValidation.service";

export default {
  data() {
    return {
      form: {
        email: { value: "", isValid: true, errorList: [] },
        firstName: { value: "", isValid: true, errorList: [] },
        lastName: { value: "", isValid: true, errorList: [] },
        country: { value: "", isValid: true, errorList: [] }
      },

    };
  },
  computed: {
    validationService() {
      return new SignUpValidation(this.form)
    },
    isValidForm() {
      let validForm = true;
      for (const key of Object.keys(this.form)) {
        if (!this.form[key].isValid) {
          validForm = false;
          return;
        }
      }
      return validForm;
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.validationService.checkFormInput("firstName", this.form.firstName.value);
      this.validationService.checkFormInput("lastName", this.form.lastName.value);
      this.validationService.checkFormInput("country", this.form.country.value);
      this.validationService.checkEmailInput("email", this.form.email.value);

      if (this.isValidForm) {
        // make POST call
      }
    }
  }
};
</script>
