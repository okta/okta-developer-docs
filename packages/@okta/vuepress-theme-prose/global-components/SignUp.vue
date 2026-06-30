<template>
  <section
    v-if="!isRegionLoading"
    class="signup"
  >
    <div class="signup__wrapper">
      <div
        v-if="isRegionLocked"
        class="signup__locked"
      >
        <p>We believe that you are located in a region recently impacted by the US sanctions and we are no longer able to process this request. This policy is in effect until further notice.</p>
      </div>
      <div
        v-else
        class="signup__main"
      >
        <h1 class="signup__mobile-title">
         Start building your integration
        </h1>
        <div class="signup__hero-col">
          <SignUpHeroSection :theme="theme" />
        </div>
        <div class="signup__form-col">
          <SignUpRegistrationForm
            :form="form"
            :validation-service="validationService"
            :is-pending="isPending"
            :error="error"
            :captcha-site-key="captchaSiteKey"
            :theme="theme"
            :get-countries="getCountries"
            :states="states"
            :display-agree="displayAgree"
            @submit-form="handleSubmitForm"
            @country-change="onCountryChange"
            @captcha-verified="onCaptchaVerified"
            @captcha-expired="onCaptchaExpired"
          />
        </div>
      </div>
      <div class="signup__form-bottom-cards-divider" />
      <div class="signup__bottom-cards">
        <SignUpBottomCard
          variant="okta"
          logo-src="/img/signup/okta-logo-bottom-card.svg"
          logo-alt="Okta"
          screenshot-src="/img/signup/bottom-card-1.png"
          title="Internal teams and partners"
          description="Get a Workforce or Customer Identity Cloud free trial to manage secure, frictionless access for your teams"
          cta-text="Start a 30-day free trial"
          cta-link="https://okta.com/free-trial/workforce-identity"
        />
        <SignUpBottomCard
          variant="auth0"
          logo-src="/img/signup/auth0-logo-bottom-card.png"
          logo-alt="Auth0"
          screenshot-src="/img/signup/bottom-card-2.png"
          title="Customers and apps"
          description="Secure and scale intuitive user experiences for AI agents, users, and customer-facing apps, ensuring security from end to end."
          cta-text="Try Auth0 Platform"
          cta-link="https://auth0.com/signup?utm_medium=referral&utm_source=okta&utm_campaign=okta-signup-referral-21-09-27&utm_content=signup&promo=sup&ocid=7014z000001cbvjAAA-aPA4z0000008OZeGAM"
        />
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
import { GeoLocation, isRegionLocked, getStoredCountryCode } from "../util/geoLocation";

const CANADA = "Canada";
const USA = "United States";

const GENERIC_ERROR_MSG =
  "Something unexpected happened while processing your registration. Please try again.";

const THEME_MODE_KEY = 'is_dark_mode';

export default {
  components: {
    VueRecaptcha,
    SignUpHeroSection: () => import("../components/signup/SignUpHeroSection"),
    SignUpRegistrationForm: () => import("../components/signup/SignUpRegistrationForm"),
    SignUpBottomCard: () => import("../components/signup/SignUpBottomCard")
  },
  data() {
    return {
      state: { label: "", list: [] },
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
    const geoCallback = () => {
      this.isRegionLocked = isRegionLocked();
      this.isRegionLoading = false;
      this.prefillCountry();
    };

    new GeoLocation(geoCallback);

    // GeoLocation doesn't call onCompletion when cached data exists and isn't
    // expired, so fall back after a short delay to ensure the page renders.
    setTimeout(() => {
      if (this.isRegionLoading) {
        geoCallback();
      }
    }, 500);
  },
  mounted() {
    // Used for observing theme changes to update feature card icons accordingly
    this._themeObserver = new MutationObserver(() => {
      this.theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    });
    this._themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  },
  beforeDestroy() {
    if (this._themeObserver) {
      this._themeObserver.disconnect();
    }
  },
  methods: {
    getTheme: function() {
      const stored = storage.getItem(THEME_MODE_KEY);
      try {
        return JSON.parse(stored) === true ? "dark" : "light";
      } catch {
        return "light";
      }
    },
    prefillCountry() {
      const isoCode = getStoredCountryCode();
      if (!isoCode) return;

      try {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const countryName = regionNames.of(isoCode);
        const match = countriesList.find(c => c.value === countryName);
        if (match) {
          this.form.country.value = match.value;
          this.states = match.value;
          this.showConsentSection(match.value);
        }
      } catch (_) {
        // Intl.DisplayNames not supported in this environment, skip prefill
      }
    },
    onCountryChange(country) {
      this.validationService.checkFormInput("country");
      this.validationService.resetFormField("state", {
        reset: true,
        value: "",
      });
      this.showConsentSection(country);
      this.states = country;
    },
    async handleSubmitForm(e, extraData) {
      this.validationService.checkFormInput("country");
      await this.validationService.checkEmailInput("email");
      this.validationService.checkFormInput("state");
      this.validationService.checkFormInput("captcha");

      if (this.validationService.isValidForm() && extraData.isExtraValid) {
        // make api call
        const { baseUri, campaignId, orgPlan } = this.$site.themeConfig.uris;
        const registrationPath = `/free-trial/api/free-trial/`;

        const analyticsValues = getAnalyticsValues();
        const body = {
            email: this.form.email.value,
            firstName: extraData.firstName,
            lastName: extraData.lastName,
            country: this.form.country.value,
            state: this.form.state.value,
            consent: this.form.consentAgree.value,
            gRecaptchaResponse: this.form.captcha.value,
            campaignId: campaignId,
            phone: '000000',
            orgPlan: orgPlan,
            department: extraData.department,
            builderType: extraData.builderType,
            utms: analyticsValues,
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
            if (data.code === 'WIC_DUP_EMAIL') {
              this.error = 'An Okta Integrator Free Plan org already exists for the email provided';
              break;
            }
            if (data.message) {
              this.error = data.message;
              break;
            }
            this.error = GENERIC_ERROR_MSG;
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
      this.validationService.resetFormField("captcha", {
        reset: true,
        value: ""
      });
      this.validationService.checkFormInput("captcha");
    },
  },
};
</script>
