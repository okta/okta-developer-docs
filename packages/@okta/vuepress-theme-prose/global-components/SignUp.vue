<template>
  <div class="signup">
    <div class="signup--form">
      <form id="signupForm" @submit="submitForm">
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
            <ul
              class="error-color error-msg"
              v-if="form.email.errorList.length"
            >
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
              <ul
                class="error-color error-msg"
                v-if="form.firstName.errorList.length"
              >
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
              <ul
                class="error-color error-msg"
                v-if="form.lastName.errorList.length"
              >
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
                  value: '',
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
            <span
              class="error-color error-msg"
              v-if="form.country.errorList.length"
              >{{ validationService.errorDictionary.emptyField }}</span
            >
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
            <span
              class="error-color error-msg"
              v-if="form.state.errorList.length"
              >{{ validationService.errorDictionary.emptyField }}</span
            >
          </label>
        </div>
        <div class="row">
          <label class="field-wrapper" for="recaptcha">
            <vue-recaptcha
              ref="recaptcha"
              :loadRecaptchaScript="true"
              @verify="onCaptchaVerified"
              @expired="onCaptchaExpired"
              :sitekey="captchaSiteKey"
            >
            </vue-recaptcha>
            <span
              class="error-color error-msg"
              v-if="form.captcha.errorList.length"
              >{{ validationService.errorDictionary.emptyField }}</span
            >
          </label>
        </div>
        <div class="row error-color" v-if="error !== null">
          {{ error }}
        </div>
        <div class="row">
          <label class="field-wrapper" for="signup" id="submitbutton">
            <a class="btn red-button pending" v-if="isPending">
              <img src="/img/ajax-loader-white.gif" />
            </a>
            <input
              type="submit"
              class="btn red-button"
              :disabled="!validationService.isValidForm()"
              id="signup"
              value="sign up"
              v-else
            />
          </label>
        </div>

        <div class="consent--section" v-show="displayConsent">
          <p class="consent--section-text">
            By clicking “SIGN UP” I agree to the applicable Free Trial terms in
            <SmartLink :item="{ link: '/terms/', target: '_blank' }"
              >Okta’s Terms of Service</SmartLink
            >
            during my use of the Free Trial Service and Okta’s
            <SmartLink :item="{ link: 'https://www.okta.com/privacy-policy' }"
              >Privacy Policy</SmartLink
            >.<br /> I further agree that Okta may contact me with marketing
            communications (details on how to unsubscribe are located in the
            Privacy Policy link).
          </p>
          <div class="consent--section-agree" v-show="displayAgree">
            <label for="agree-checkbox">
              <input
                type="checkbox"
                name=""
                id="agree-checkbox"
                v-model="form.consentAgree.value"
              />
              I agree
            </label>
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
        Already signed up?
        <SmartLink :item="{ link: '/login/' }">Sign in</SmartLink>
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
  GDPR_COUNTRIES,
} from "../const/signup.const";
import setHiddenUtmValues from "../util/attribution/attribution";
import { getIdpUri } from "../util/uris";

const CANADA = "Canada";
const USA = "United States";

const GENERIC_ERROR_MSG =
  "Something unexpected happened while processing your registration. Please try again.";

export default {
  components: {
    VueRecaptcha,
    CompanyLogos: () => import("../components/CompanyLogos"),
    SmartLink: () => import("../components/SmartLink"),
  },
  data() {
    return {
      state: { label: "", list: [] },
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
          hidden: true,
        },
        captcha: { value: "", isValid: true, errorList: [] },
      },
      isPending: false,
      error: null,
      captchaSitekey: null,
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
      },
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
      this.validationService.checkFormInput("captcha");

      if (this.validationService.isValidForm()) {
        // make api call
        const { baseUri, registrationPolicyId } = this.$site.themeConfig.uris;
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

        this.isPending = true;

        this.apiService
          .post(registrationPath, { body })
          .then(res => {
            // Reset error in case of transient failure that succeeds later
            this.error = null;
            // Google Analytics email signup success event
            window.dataLayer &&
              window.dataLayer.push({ event: "07_CIAMTrial" });
            // Redirect user to success landing page
            window.location.assign("/signup/thank-you");
          })
          .catch(err => {
            this.handleApiError(err);
          })
          .finally(() => {
            this.isPending = false;
          });
      }
    },

    handleApiError(err) {
      if (err.response) {
        const { status, data } = err.response;

        switch (status) {
          case 400: {
            if (data.errorCauses && data.errorCauses.length) {
              this.error = data.errorCauses[0].errorSummary;
            }
            break;
          }
          default: {
            this.error = GENERIC_ERROR_MSG;
          }
        }
      } else {
        console.error(err);

        this.error = GENERIC_ERROR_MSG;
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
        value: false,
      });

      if (GDPR_COUNTRIES.indexOf(country) !== -1) {
        this.displayAgree = true;
        this.form.consentAgree.hidden = false;
      }
    },

    onCaptchaVerified(response) {
      this.validationService.resetFormField("captcha", {
        reset: true,
        value: response,
      });
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
      this.validationService.resetFormField("captcha", {
        reset: true,
        value: "",
      });
      this.validationService.checkFormInput("captcha");
    },
  },
  beforeMount() {
    const { captcha } = this.$site.themeConfig;

    if (window.location.hostname === "developer.okta.com") {
      this.captchaSiteKey = captcha.production;
    } else {
      this.captchaSiteKey = captcha.test;
    }
  },
  mounted() {
    const formElement = document.querySelector("#signupForm");
    setHiddenUtmValues(formElement);
  },
};
</script>
