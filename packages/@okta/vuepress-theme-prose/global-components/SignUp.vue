<template>
  <div class="signup">
    <div class="signup--form">
      <form
        id="signupForm"
        @submit="submitForm"
        method="POST"
        action="https://developer.okta.com/developer/signup/"
      >
        <div class="row">
          <label class="field-wrapper" for="email">
            Email
            <input
              type="text"
              id="email"
              maxlength="128"
              v-model="form.email.value"
              :class="{ error: !form.email.isValid }"
              @blur="validationService.checkEmailInput('email')"
            />
            <ul class="error-color error-msg" v-if="form.email.errorList.length">
              <li
                class="error-color"
                v-for="(error, index) in form.email.errorList"
                v-bind:key="index"
              >
                {{ error }}
              </li>
            </ul>
          </label>
        </div>
        <div class="user-name">
          <div class="row">
            <label class="field-wrapper" for="firstName">
              First Name
              <input
                type="text"
                id="firstName"
                maxlength="128"
                v-model="form.firstName.value"
                :class="{ error: !form.firstName.isValid }"
                @blur="validationService.checkFormInput('firstName')"
              />
              <ul class="error-color error-msg" v-if="form.firstName.errorList.length">
                <li
                  class="error-color"
                  v-for="(error, index) in form.firstName.errorList"
                  v-bind:key="index"
                >
                  {{ error }}
                </li>
              </ul>
            </label>
          </div>
          <div class="row">
            <label class="field-wrapper" for="lastName">
              Last Name
              <input
                type="text"
                id="lastName"
                maxlength="128"
                v-model="form.lastName.value"
                :class="{ error: !form.lastName.isValid }"
                @blur="validationService.checkFormInput('lastName')"
              />
              <ul class="error-color error-msg" v-if="form.lastName.errorList.length">
                <li
                  class="error-color"
                  v-for="(error, index) in form.lastName.errorList"
                  v-bind:key="index"
                >
                  {{ error }}
                </li>
              </ul>
            </label>
          </div>
        </div>

        <div class="row">
          <label class="field-wrapper" for="country">
            Country
            <select
              name=""
              v-model="form.country.value"
              id="country"
              @change="
                validationService.checkFormInput('country');
                validationService.resetFormField('state', {
                  reset: true,
                  value: ''
                });
                showConsentSection(form.country.value);
                states = form.country.value;
              "
              :class="{ error: !form.country.isValid }"
            >
              <option disabled selected>Country</option>
              <option
                v-for="country in getCountries"
                v-bind:key="country.value"
                :value="country.value"
                >{{ country.name }}</option
              >
            </select>
            <span class="error-color error-msg" v-if="form.country.errorList.length">{{
              validationService.errorDictionary.emptyField
            }}</span>
          </label>
        </div>
        <div class="row" v-if="states.list.length">
          <label class="field-wrapper" for="state">
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
                v-bind:key="state.name"
                :value="state.value"
                >{{ state.name }}</option
              >
            </select>
            <span class="error-color error-msg" v-if="form.state.errorList.length">{{
              validationService.errorDictionary.emptyField
            }}</span>
          </label>
        </div>
        <div class="row">
          <vue-recaptcha
            ref="recaptcha"
            :loadRecaptchaScript="true"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            sitekey="6LeaS6UZAAAAADd6cKDSXw4m2grRsCpHGXjAFJcL"
          >
          </vue-recaptcha>
        </div>
        <div class="row">
          <label class="field-wrapper" for="signup">
            <input
              type="submit"
              class="btn red-button"
              :disabled="!validationService.isValidForm()"
              id="signup"
              value="sign up"
            />
          </label>
        </div>

        <div class="consent--section" v-show="displayConsent">
          <p class="consent--section-text">
            By clicking “SIGN UP” I agree to the applicable Free Trial terms in
            <a href="/terms" target="_blank">Okta’s Terms of Service</a> during my use of the
            Free Trial Service and Okta’s
            <a href="https://www.okta.com/privacy-policy" target="_blank">Privacy Policy</a>. I further agree that
            Okta may contact me with marketing communications (details on how to
            unsubscribe are located in the Privacy Policy link).
          </p>
          <div class="consent--section-agree" v-show="displayAgree">
            <label for="agree-checkbox">
              <input
                type="checkbox"
                name=""
                id="agree-checkbox"
                @change="
                  validationService.checkFormCheckboxInput('consentAgree')
                "
                v-model="form.consentAgree.value"
              />
              I agree
            </label>
            <span
              class="error-color error-msg"
              v-if="form.consentAgree.errorList.length"
              >{{ validationService.errorDictionary.emptyField }}</span
            >
          </div>
        </div>
      </form>
      <div class="splitter">
        <span></span>
        <span>or</span>
        <span></span>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <input
            type="button"
            class="social-btn"
            value="continue with github"
          />
        </div>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <input
            type="button"
            class="social-btn"
            value="continue with google"
          />
        </div>
      </div>
      <div class="row goto-signin">
        Already signed up? <a href="/login">Sign in</a>
      </div>
    </div>
    <div class="signup--description">
      <Content slot-key="signup-description" />
      <div class="logo-wrapper">
        <h4>Trusted by</h4>
        <div class="partners-logo">
          <img src="/img/authorization/proof-by.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import { SignUpValidation } from "../util/signupValidation.service";
import { Api } from "../util/api.service";
import {
  countriesList,
  americanStates,
  canadaProvinces,
  GDPR_COUNTRIES
} from "../const/signup.const";
import setHiddenUtmValues from "../util/attribution/attribution";

const CANADA = "Canada";
const USA = "United States";

export default {
  components: {
    VueRecaptcha
  },
  data() {
    return {
      state: { lable: "", list: [] },
      displayConsent: false,
      displayAgree: false,
      form: {
        state: { value: "", isValid: true, errorList: [], hidden: true },
        email: { value: "", isValid: true, errorList: [] },
        firstName: { value: "", isValid: true, errorList: [] },
        lastName: { value: "", isValid: true, errorList: [] },
        country: { value: "", isValid: true, errorList: [] },
        consentAgree: {
          value: false,
          isValid: true,
          errorList: [],
          hidden: true
        }
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

        if (country === USA) {
          this.state.list = americanStates;
          this.state.label = "State";
        } else if (country === CANADA) {
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
    },
    apiService() {
      return new Api(this.$site.themeConfig.uris.baseUri);
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
      this.validationService.checkFormCheckboxInput("consentAgree");

      if (this.validationService.isValidForm()) {
        // make api call
        console.warn(this.apiService.baseUrl);
      }
    },

    showConsentSection(country) {
      // Show consent section while selecting country.
      this.displayConsent = true;
      // Hide consent opt checkbox.
      this.displayAgree = false;
      this.form.consentAgree.hidden = true;
      this.validationService.resetFormField("consentAgree", {
        reset: true,
        value: false
      });

      if (GDPR_COUNTRIES.indexOf(country) !== -1) {
        this.displayAgree = true;
        this.form.consentAgree.hidden = false;
      }
    },

    onCaptchaVerified() {},
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
    }
  },
  mounted() {
    const formElement = document.querySelector("#signupForm");
    setHiddenUtmValues(formElement);
  }
};
</script>
