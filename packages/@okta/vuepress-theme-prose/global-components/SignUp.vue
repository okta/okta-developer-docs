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
            v-if="displayCaptcha"
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
            <a href="/terms" target="_blank" rel="noopener noreferrer">Okta’s Terms of Service</a> during my use of the
            Free Trial Service and Okta’s
            <a href="https://www.okta.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. I further agree that
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
          <a class="btn social-btn" :href="uris.github">
            Continue With GitHub
          </a>
        </div>
      </div>
      <div class="row">
        <div class="field-wrapper">
          <a class="btn social-btn" :href="uris.google">
            Continue With Google
          </a>
        </div>
      </div>
      <div class="row goto-signin">
        Already signed up? <a href="/login">Sign in</a>
      </div>
    </div>
    <div class="signup--description">
      <Content slot-key="signup-description" />
      <div class="logo-wrapper">
        <CompanyLogos withHeading small v-bind:centered="false" />
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
import { getIdpUri } from "../util/uris";

const CANADA = "Canada";
const USA = "United States";

export default {
  components: {
    VueRecaptcha,
    CompanyLogos: () => import("../components/CompanyLogos")
  },
  data() {
    return {
      state: { label: "", list: [] },
      displayConsent: false,
      displayAgree: false,
      displayCaptcha: true,
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
        },
        captcha: { value: "", isValid: true, errorList: [] }
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
    },
    uris() {
      const { uris } = this.$site.themeConfig;

      return {
        github: getIdpUri(uris, "github"),
        google: getIdpUri(uris, "google"),
      };
    },
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
      this.validationService.checkFormInput("captcha");

      if (this.validationService.isValidForm()) {
        // make api call
        const { baseUri, registrationPolicyId} = this.$site.themeConfig.uris;
        const registrationPath = `/api/v1/registration/${registrationPolicyId}/register`;
        const body = {
          userProfile: {
            email: this.form.email.value,
            firstName: this.form.firstName.value,
            lastName: this.form.lastName.value,
            country: this.form.country.value,
            state: this.form.state.value,
            emailOptInC: this.form.consentAgree.value,
            captchaResponse: this.form.captcha.value,
          },
        };

        this.apiService.post(registrationPath, { body })
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

    onCaptchaVerified(response) {
      this.form.captcha.value = response;
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
      this.form.captcha.value = "";
    }
  },
  mounted() {
    const formElement = document.querySelector("#signupForm");
    setHiddenUtmValues(formElement);

    if (window.location.hostname !== "developer.okta.com") {
      // Do not show/enforce CAPTCHA on non-production deploys
      this.form.captcha.value = "mocked-captcha-response";
      this.displayCaptcha = false;
    }
  }
};
</script>
