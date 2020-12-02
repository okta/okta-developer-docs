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
              maxlength="128"
              v-model="form.email.value"
              :class="{ error: !form.email.isValid }"
              @blur="validationService.checkEmailInput('email')"
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
              maxlength="128"
              placeholder="First Name"
              v-model="form.firstName.value"
              :class="{ error: !form.firstName.isValid }"
              @blur="validationService.checkFormInput('firstName')"
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
              maxlength="128"
              placeholder="Last Name"
              v-model="form.lastName.value"
              :class="{ error: !form.lastName.isValid }"
              @blur="validationService.checkFormInput('lastName')"
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
                validationService.checkFormInput('country');
                validationService.resetFormField('state', true);
                states = form.country.value;
              "
              :class="{ error: !form.country.isValid }"
            >
              <option disabled selected>Country</option>
              <option
                v-for="country in getCountries"
                v-bind:key="country.value.length * Math.random()"
                :value="country.value"
                >{{ country.name }}</option
              >
            </select>
            <span class="error-color" v-if="form.country.errorList.length">{{
              validationService.errorDictionary.emptyField
            }}</span>
          </label>
        </div>
        <div class="row" v-if="states.list.length">
          <label for="state">
            {{ states.label }}
            <select
              name=""
              id="state"
              v-model="form.state.value"
              @change="validationService.checkFormInput('state')"
              :class="{ error: !form.state.isValid }"
            >
              <option selected disabled>{{ states.label }}</option>
              <option
                v-for="state in states.list"
                v-bind:key="state.name.length * Math.random()"
                :value="state.value"
                >{{ state.name }}</option
              >
            </select>
            <span class="error-color" v-if="form.state.errorList.length">{{
              validationService.errorDictionary.emptyField
            }}</span>
          </label>
        </div>
        <div class="row">
          <label for="signup">
            <input
              type="submit"
              class="btn"
              :disabled="!validationService.isValidForm()"
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
import {
  countriesList,
  americanStates,
  canadaProvinces
} from "../models/signup.model";

export default {
  data() {
    return {
      canada: "Canada",
      usa: "United States",
      state: { lable: "", list: [] },
      form: {
        state: { value: "", isValid: true, errorList: [], hidden: true },
        email: { value: "", isValid: true, errorList: [] },
        firstName: { value: "", isValid: true, errorList: [] },
        lastName: { value: "", isValid: true, errorList: [] },
        country: { value: "", isValid: true, errorList: [] }
      }
    };
  },
  computed: {
    states: {
      get() {
        return this.state;
      },
      set(country) {
        this.form.state.hidden = false;
        
        if (country === this.usa) {
          this.state.list = americanStates;
          this.state.label = "States";
        } else if (country === this.canada) {
          this.state.list = canadaProvinces;
          this.state.label = "Province";
        } else {
          this.state.list = [];
          this.state.label = "";
          this.form.state.hidden = true;
        }
      }
    },
    getCountries() {
      return countriesList;
    },
    validationService() {
      return new SignUpValidation(this.form);
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.validationService.checkFormInput("firstName");
      this.validationService.checkFormInput("lastName");
      this.validationService.checkFormInput("country");
      this.validationService.checkEmailInput("email");
      this.validationService.checkFormInput("state");

      if (this.validationService.isValidForm()) {
        // make POST call
      }
    }
  }
};
</script>
