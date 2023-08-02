<template>
  <section 
    class="signup" 
    vue-if="!isRegionLoading"
  >
    <div class="signup__wrapper">
      <div v-if="isRegionLocked">
        <p>We believe that you are located in a region recently impacted by the US sanctions and we are no longer able to process this request. This policy is in effect until further notice.</p>
      </div>
      <div>
        <h1 class="signup__title">
          Choose what works best. 
          <span>Sign up is free.</span>
        </h1>
        <div 
          class="signup__items"
          :class="[formHidden ? 'active' : '']"
        >
          <div class="signup__item">
            <div class="signup__item__title">
              Customer <br> Identity Cloud
              <img 
                class="signup__item__title-logo" 
                src="/img/signup-item-logo.svg" 
              >
              <img 
                class="signup__item__title-logo signup__item__title-logo-white" 
                src="/img/signup-item-logo-white.svg" 
              >
            </div>
            <div class="signup__description">
              <div class="signup__rate">
                <div class="signup__rate__title">
                  Free
                </div>
                <div class="signup__rate__text">
                  For the first tier
                </div>
              </div>
              <div class="signup__content">
                <div class="signup__content__tip signup__content__tip-green">
                  BEST FOR DEVELOPERS
                </div>
                <div class="signup__content__title">
                  Secure my customers <br> or SaaS applications
                </div>
                <div class="signup__content__text">
                  Build intuitive, secure user experiences <br> in customer-facing applications.
                </div>
              </div>
              <div class="signup__link signup__link-dark">
                <a 
                  href="https://auth0.com/signup?utm_medium=referral&utm_source=okta&utm_campaign=okta-signup-referral-21-09-27&utm_content=signup&promo=sup&ocid=7014z000001cbvjAAA-aPA4z0000008OZeGAM" 
                  target="_blank"
                >
                  <span>Try Customer Identity Cloud <i>→</i></span>
                </a>
              </div>
            </div>
          </div>
          <div class="signup__container">
            <div class="signup__item__title">
              Workforce <br> Identity Cloud
            </div>
            <div class="signup__description">
              <div class="signup__rate">
                <div class="signup__rate__title">
                  Free Trial
                </div>
                <div class="signup__rate__text">
                  Get access for 30 days
                </div>
              </div>
              <div class="signup__content">
                <div class="signup__content__tip signup__content__tip-blue">
                  BEST FOR IT ADMINS
                </div>
                <div class="signup__content__title">
                  Secure my employees, <br> contractors, &amp; partners
                </div>
                <div class="signup__content__text">
                  Manage secure, frictionless access <br> to the tools and data your teams <br> need, on demand.
                </div>
              </div>
              <div class="signup__link">
                <a 
                  href="http://www.okta.com/free-trial" 
                  target="_blank"
                >
                  <span>Try Workforce Identity Cloud <i>→</i></span>
                </a>
              </div>
            </div>
            <div class="signup__item__title signup__item__title-hidden">
              Okta Developer Edition Service
            </div>
            <div class="signup__item__title signup__item__title-tablet">
              Access the Okta <br> Developer Edition Service
            </div>
            <div class="signup__description signup__description-bordered">
              <div class="signup__rate">
                <div class="signup__rate__title">
                  Free
                </div>
                <div class="signup__rate__text">
                  Test, explore, <br> and manage integrations
                </div>
              </div>
              <div class="signup__content">
                <div class="signup__content__tip signup__content__tip-green">
                  BEST FOR DEVELOPERS
                </div>
                <div class="signup__content__title">
                  Access the Okta <br> Developer Edition Service
                </div>
                <div class="signup__content__text">
                  Test your code and apps, as well as <br> manage and automate Okta for <br> employees and partners.
                </div>
              </div>
              <div class="signup__link signup__trigger">
                <button 
                  type="button"
                  @click="hideForm()"
                >
                  <span class="signup__trigger__text">Sign up free for Developer Edition</span>
                  <span class="signup__trigger__text-hidden">Sign up free</span>
                </button>
              </div>
            </div>
          </div>
          <div 
            class="signup__popup" 
            :class="formHidden ? 'active' : ''"
          >
            <div class="signup__popup__container">
              <div class="signup__popup__title">
                <h2 class="signup__popup__title-pc">
                  Let’s get you started with Okta Developer Edition Service.
                </h2>
                <h2 class="signup__popup__title-tablet">
                  Access the Okta <br> Developer Edition Service
                </h2>
                <h2 class="signup__popup__title-mobile">
                  Okta Developer Edition Service
                </h2>
                <span>Already signed up? <a href="/login">Log in here.</a></span>
              </div>
              <div 
                class="signup__popup__close"
                @click="hideForm()"
              />
              <form 
                id="signupForm"
                class="signup__form"
                @submit="submitForm"
              >
                <div class="signup__form__header">
                  <label
                    class="signup__form__field"
                    for="firstName"
                  >
                    <div class="signup__form__label">First Name<div class="signup__form__label-required">*</div></div>
                    <input
                      id="firstName"
                      v-model="form.firstName.value"
                      class="signup__form__input"
                      type="text"
                      maxlength="128"
                      placeholder="First Name"
                      :class="{ error: !form.firstName.isValid }"
                      @blur="validationService.checkFormInput('firstName')"
                      @focusout="setHeight()"
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
                  <label
                    class="signup__form__field"
                    for="lastName"
                  >
                    <div class="signup__form__label">Last Name<div class="signup__form__label-required">*</div></div>
                    <input
                      id="lastName"
                      v-model="form.lastName.value"
                      class="signup__form__input"
                      type="text"
                      maxlength="128"
                      placeholder="Last Name"
                      :class="{ error: !form.lastName.isValid }"
                      @blur="validationService.checkFormInput('lastName')"
                      @focusout="setHeight()"
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
                  <label
                    class="signup__form__field"
                    for="email"
                  >
                    <div class="signup__form__label">Work Email<div class="signup__form__label-required">*</div></div>
                    <input
                      id="email"
                      v-model="form.email.value"
                      class="signup__form__input"
                      type="text"
                      maxlength="128"
                      placeholder="Work Email"
                      :class="{ error: !form.email.isValid }"
                      @blur="validationService.checkEmailInput('email')"
                      @focusout="setHeight()"
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
                  <label
                    class="signup__form__field"
                    for="country"
                  >
                    <div class="signup__form__label">Country/Region<div class="signup__form__label-required">*</div></div>
                    <select
                      id="country"
                      v-model="form.country.value"
                      class="signup__form__input"
                      required
                      :class="{ error: !form.country.isValid }"
                      @change="
                        validationService.checkFormInput('country');
                        validationService.resetFormField('state', {
                          reset: true,
                          value: '',
                        });
                        showConsentSection(form.country.value);
                        states = form.country.value;
                        setHeight();
                      "
                    >
                      <option
                        value="" 
                        disabled 
                        selected
                      >Select...</option>
                      <option
                        v-for="country in getCountries"
                        :key="country.value"
                        required
                        :value="country.value"
                      >{{ country.name }}</option>
                    </select>
                    <span
                      v-if="form.country.errorList.length"
                      class="error-color error-msg"
                    >{{ validationService.errorDictionary.emptyField }}</span>
                    <div class="signup__form__chevron">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      ><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.00007 9.9394L12.4697 5.46973L13.5304 6.53039L8.5304 11.5304C8.2375 11.8233 7.76263 11.8233 7.46973 11.5304L2.46974 6.53039L3.5304 5.46973L8.00007 9.9394Z"
                        fill="#191919"
                      /></svg>
                    </div>
                  </label>
                  <label
                    v-if="states.list.length"
                    class="signup__form__field"
                    for="state"
                  >
                    <div class="signup__form__label">{{ states.label }}</div>
                    <select
                      id="state"
                      v-model="form.state.value"
                      class="signup__form__input"
                      name=""
                      :class="{ error: !form.state.isValid }"
                      @change="validationService.checkFormInput('state'), setHeight()"
                      @focusout="setHeight()"
                    >
                      <option
                        value="" 
                        disabled 
                        selected
                      >Select...</option>
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
                    <div class="signup__form__chevron">
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          fill-rule="evenodd" 
                          clip-rule="evenodd" 
                          d="M8.00007 9.9394L12.4697 5.46973L13.5304 6.53039L8.5304 11.5304C8.2375 11.8233 7.76263 11.8233 7.46973 11.5304L2.46974 6.53039L3.5304 5.46973L8.00007 9.9394Z" 
                          fill="#191919"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
                <div class="signup__form__body">
                  <label
                    class="signup__form__recaptcha"
                    for="recaptcha"
                  >
                    <vue-recaptcha
                      v-if="formHidden"
                      ref="recaptcha"
                      :load-recaptcha-script="true"
                      :sitekey="captchaSiteKey"
                      :theme="getTheme()"
                      @verify="onCaptchaVerified"
                      @expired="onCaptchaExpired"
                    />
                    <span
                      v-if="form.captcha.errorList.length"
                      class="error-color error-msg"
                    >{{ validationService.errorDictionary.emptyField }}</span>
                  </label>
                  <div
                    v-if="error !== null"
                    class="error-color"
                  >
                    {{ error }}
                  </div>
                  <div
                    v-show="displayConsent"
                    class="consent--section"
                  >
                    <div class="consent--section-text">
                      <p>
                        By clicking "SIGN UP" I agree to the
                        <SmartLink :item="{ link: '/terms/', target: '_blank' }">
                          Developer Edition Subscription Agreement
                        </SmartLink>
                        and Okta’s
                        <SmartLink :item="{ link: 'https://www.okta.com/privacy-policy' }">
                          Privacy Policy
                        </SmartLink>
                        during my use of the Okta Developer Edition Service.
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
                </div>
                <div class="signup__form__footer">
                  <label
                    id="submitbutton"
                    class="signup__form__button signup__form__button-dark"
                    for="signup"
                    :class="!validationService.isValidForm() ? 'disabled' : ''"
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
                  <div class="signup__form__splitter">
                    or
                  </div>
                  <span>Already signed up? <a href="/login">Log in here.</a></span>
                  <button
                    id="continue-github"
                    class="signup__form__button"
                    @click="openTermsConditionsDialog(uris.github)"
                  >
                    <i class="fa fa-github" /> Continue with GitHub
                  </button>
                  <button
                    id="continue-google"
                    class="signup__form__button"
                    @click="openTermsConditionsDialog(uris.google)"
                  >
                    <span class="google-logo" /> Continue with Google
                  </button>
                  <TermsAndConditionsDialog
                    v-if="isShowTermsConditionsDialog"
                    :social-url="socialUrl"
                    @close="closeTermsConditionsDialog()"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="signup__footer">
          <p>
            <span>Not sure what to choose?</span> <span>Learn more about</span>
            <a 
              target="_blank" 
              href="https://www.okta.com/workforce-identity/"
            > Workforce Identity</a> <span class="hidden">and</span>
            <a 
              target="_blank" 
              href="https://www.okta.com/customer-identity/"
            > Customer Identity
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
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
      formHidden: false,
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
          this.setHeight(true);
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
    setHeight(isNotUSAAndCanada) {
      let height;
      if (window.innerWidth > 1314) {
        if (!isNotUSAAndCanada) {
          setTimeout(function() {
            height = document.querySelector('.signup__form').getBoundingClientRect().height + 139 + 'px';
            document.querySelector('.signup__items.active').style.height = height;
          }, 10);
        } else {
          document.querySelector('.signup__items.active').style.height = 'auto';
        }
      }
      window.onresize = function() {
        if (window.innerWidth < 1314) {
          document.querySelector('.signup__items.active').style.height = 'auto';
        } else {
          document.querySelector('.signup__items.active').style.height = height;
        }
      }
    },
    hideForm() {
      if (document.querySelector('.signup__items.active') && !this.formHidden) {
        this.setHeight(true);
      }
      this.formHidden = !this.formHidden;
      if (!this.formHidden) {
        this.setHeight(true);
      } else {
        this.setHeight();
      }
    },
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
      this.setHeight();
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
