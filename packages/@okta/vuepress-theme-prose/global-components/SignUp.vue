<template>
  <div
    class="signup"
    vue-if="!isRegionLoading"
  >
    <div class="signup--content">
      <div class="signup--form">
        <div v-if="isRegionLocked">
          <p>We believe that you are located in a region recently impacted by the US sanctions and we are no longer able to process this request. This policy is in effect until further notice.</p>
        </div>
        <div v-else>
          <form
            id="signupForm"
            @submit="submitForm"
          >
            <div class="row">
              <label
                class="field-wrapper"
                for="email"
              >
                Work Email
                <input
                  id="email"
                  v-model="form.email.value"
                  type="text"
                  maxlength="128"
                  :class="{ error: !form.email.isValid }"
                  @blur="validationService.checkEmailInput('email')"
                >
                <ul
                  v-if="form.email.errorList.length"
                  class="error-color error-msg"
                >
                  <li
                    v-for="(error, index) in form.email.errorList"
                    :key="index"
                    class="error-color"
                  >
                    {{ error }}
                  </li>
                </ul>
              </label>
            </div>
            <div class="user-name">
              <div class="row">
                <label
                  class="field-wrapper"
                  for="firstName"
                >
                  First Name
                  <input
                    id="firstName"
                    v-model="form.firstName.value"
                    type="text"
                    maxlength="128"
                    :class="{ error: !form.firstName.isValid }"
                    @blur="validationService.checkFormInput('firstName')"
                  >
                  <ul
                    v-if="form.firstName.errorList.length"
                    class="error-color error-msg"
                  >
                    <li
                      v-for="(error, index) in form.firstName.errorList"
                      :key="index"
                      class="error-color"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </label>
              </div>
              <div class="row">
                <label
                  class="field-wrapper"
                  for="lastName"
                >
                  Last Name
                  <input
                    id="lastName"
                    v-model="form.lastName.value"
                    type="text"
                    maxlength="128"
                    :class="{ error: !form.lastName.isValid }"
                    @blur="validationService.checkFormInput('lastName')"
                  >
                  <ul
                    v-if="form.lastName.errorList.length"
                    class="error-color error-msg"
                  >
                    <li
                      v-for="(error, index) in form.lastName.errorList"
                      :key="index"
                      class="error-color"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </label>
              </div>
            </div>

            <div class="row">
              <label
                class="field-wrapper"
                for="country"
              >
                Country/Region
                <select
                  id="country"
                  v-model="form.country.value"
                  name=""
                  :class="{ error: !form.country.isValid }"
                  @change="
                    validationService.checkFormInput('country');
                    validationService.resetFormField('state', {
                      reset: true,
                      value: '',
                    });
                    showConsentSection(form.country.value);
                    states = form.country.value;
                  "
                >
                  <option
                    disabled
                    selected
                  >Country</option>
                  <option
                    v-for="country in getCountries"
                    :key="country.value"
                    :value="country.value"
                  >{{ country.name }}</option>
                </select>
                <span
                  v-if="form.country.errorList.length"
                  class="error-color error-msg"
                >{{ validationService.errorDictionary.emptyField }}</span>
              </label>
            </div>
            <div
              v-if="states.list.length"
              class="row"
            >
              <label
                class="field-wrapper"
                for="state"
              >
                {{ states.label }}
                <select
                  id="state"
                  v-model="form.state.value"
                  name=""
                  :class="{ error: !form.state.isValid }"
                  @change="validationService.checkFormInput('state')"
                >
                  <option
                    selected
                    disabled
                  >{{ states.label }}</option>
                  <option
                    v-for="state in states.list"
                    :key="state.name"
                    :value="state.value"
                  >{{ state.name }}</option>
                </select>
                <span
                  v-if="form.state.errorList.length"
                  class="error-color error-msg"
                >{{ validationService.errorDictionary.emptyField }}</span>
              </label>
            </div>
            <div class="row signup--recaptcha">
              <label
                class="field-wrapper"
                for="recaptcha"
              >
                <vue-recaptcha
                  ref="recaptcha"
                  :load-recaptcha-script="true"
                  :sitekey="captchaSiteKey"
                  :theme="theme"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                />
                <span
                  v-if="form.captcha.errorList.length"
                  class="error-color error-msg"
                >{{ validationService.errorDictionary.emptyField }}</span>
              </label>
            </div>
            <div
              v-if="error !== null"
              class="row error-color"
            >
              {{ error }}
            </div>
            <div class="row signup--submit">
              <label
                id="submitbutton"
                class="field-wrapper"
                for="signup"
              >
                <a
                  v-if="isPending"
                  class="btn pending"
                >
                  <img src="/img/ajax-loader-white.gif">
                </a>
                <input
                  v-else
                  id="signup"
                  type="submit"
                  class="btn"
                  :disabled="!validationService.isValidForm()"
                  value="Sign up"
                >
              </label>
            </div>

            <div
              v-show="displayConsent"
              class="consent--section"
            >
              <div class="consent--section-text">
                <p>
                  By clicking “SIGN UP” I agree to the applicable Free Trial terms
                  in
                  <SmartLink :item="{ link: '/terms/', target: '_blank' }">
                    Okta’s Terms of Service
                  </SmartLink>
                  during my use of the Free Trial Service and Okta’s
                  <SmartLink :item="{ link: 'https://www.okta.com/privacy-policy' }">
                    Privacy Policy
                  </SmartLink>.
                </p>
                <p>
                  I agree that Okta may contact me with marketing communications.
                  See Privacy Policy for details on how to unsubscribe.
                </p>
              </div>
              <div
                v-show="displayAgree"
                class="consent--section-agree"
              >
                <label for="agree-checkbox">
                  <input
                    id="agree-checkbox"
                    v-model="form.consentAgree.value"
                    type="checkbox"
                    name=""
                  >
                  I agree (Optional)
                </label>
              </div>
            </div>
          </form>
          <div class="splitter">
            <span />
            <span>or</span>
            <span />
          </div>
          <div class="row">
            <div class="field-wrapper">
              <button
                id="continue-github"
                class="btn social-btn"
                @click="openTermsConditionsDialog(uris.github)"
              >
                <i class="fa fa-github" /> Continue with GitHub
              </button>
            </div>
          </div>
          <div class="row">
            <div class="field-wrapper">
              <button
                id="continue-google"
                class="btn social-btn"
                @click="openTermsConditionsDialog(uris.google)"
              >
                <span class="google-logo" /> Continue with Google
              </button>
            </div>
          </div>
          <TermsAndConditionsDialog
            v-if="isShowTermsConditionsDialog"
            :social-url="socialUrl"
            @close="closeTermsConditionsDialog()"
          />
          <div class="row goto-signin">
            Already signed up?
            <SmartLink :item="{ link: '/login/' }">
              Sign in
            </SmartLink>
          </div>
        </div>
      </div>
      <div class="signup--description">
        <Content slot-key="signup-description" />
        <div class="logo-wrapper">
          <CompanyLogos
            with-heading
            small
            :centered="false"
          />
        </div>
        <div
          v-if="!isRegionLocked"
          class="auth0-banner"
        >
          <div class="auth0-banner--content">
            <p>
              Are you a developer looking for a pay-as-you-go option? Check out Auth0 self-service plans starting at $23 per month.
            </p>
            <p>
              <SmartLink :item="{ link: 'https://auth0.com/signup?utm_medium=referral&utm_source=okta&utm_campaign=okta-signup-referral-21-09-27&utm_content=signup&promo=sup', target: '_self' }">
                Start Building for Free &rsaquo;
              </SmartLink>
            </p>
          </div>
          <div class="auth0-banner--logo">
            <img src="/img/logos/auth0-shield.svg">
          </div>
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
  canadianProvinces,
  GDPR_COUNTRIES
} from "../const/signup.const";
import getAnalyticsValues from "../util/attribution/attribution";
import storage from "../util/localStorage";
import { getIdpUri } from "../util/uris";
import { GeoLocation, isRegionLocked } from "../util/geoLocation";

const CANADA = "Canada";
const USA = "United States";

const GENERIC_ERROR_MSG =
  "Something unexpected happened while processing your registration. Please try again.";

const THEME_MODE_KEY = 'is_dark_mode';

export default {
  components: {
    VueRecaptcha,
    CompanyLogos: () => import("../components/CompanyLogos"),
    SmartLink: () => import("../components/SmartLink"),
    TermsAndConditionsDialog: () =>
      import("../components/TermsAndConditionsDialog")
  },
  data() {
    return {
      isShowTermsConditionsDialog: false,
      socialUrl: "",
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
          hidden: true
        },
        captcha: { value: "", isValid: true, errorList: [] }
      },
      isPending: false,
      error: null,
      captchaSitekey: null,
      theme: 'light',
      isRegionLoading: true,
      isRegionLocked: null,
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
          this.state.list = canadianProvinces;
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
        google: getIdpUri(uris, "google")
      };
    }
  },
  beforeMount() {
    const { captcha } = this.$site.themeConfig;

    if (window.location.hostname === "developer.okta.com") {
      this.captchaSiteKey = captcha.production;
    } else {
      this.captchaSiteKey = captcha.test;
    }

    this.theme = this.getTheme();

    this.isRegionLocked = isRegionLocked();
    new GeoLocation(() => {
      this.isRegionLocked = isRegionLocked();
      this.isRegionLoading = false;
    });
  },
  mounted() {
    this.analyticsValues = getAnalyticsValues();
  },
  methods: {
    getTheme: function() {
      return JSON.parse(storage.getItem(THEME_MODE_KEY)) === true ? "dark" : "light";
    },
    async submitForm(e) {
      e.preventDefault();
      this.validationService.checkFormInput("firstName");
      this.validationService.checkFormInput("lastName");
      this.validationService.checkFormInput("country");
      await this.validationService.checkEmailInput("email");
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
            okta_oie: true,
            // Merge in analytics tracking data
            ...this.analyticsValues,
          },
        };

        this.isPending = true;

        this.apiService
          .post(registrationPath, { body })
          .then(() => {
            // Reset error in case of transient failure that succeeds later
            this.error = null;

            if (window.dataLayer) {
              // Google Analytics email signup success event
              window.dataLayer.push({ event: "07_CIAMTrial" });
            }

            // Redirect user to success landing page
            window.location.assign("/signup/thank-you/");
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
        value: false
      });

      if (GDPR_COUNTRIES.indexOf(country) !== -1) {
        this.displayAgree = true;
        this.form.consentAgree.hidden = false;
      }
    },

    onCaptchaVerified(response) {
      this.validationService.resetFormField("captcha", {
        reset: true,
        value: response
      });
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
      this.validationService.resetFormField("captcha", {
        reset: true,
        value: ""
      });
      this.validationService.checkFormInput("captcha");
    },
    closeTermsConditionsDialog() {
      this.isShowTermsConditionsDialog = false;
    },
    openTermsConditionsDialog(url) {
      this.socialUrl = url;
      this.isShowTermsConditionsDialog = true;
    }
  },
};
</script>
