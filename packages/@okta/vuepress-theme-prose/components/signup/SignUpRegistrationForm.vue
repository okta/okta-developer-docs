<template>
  <div class="signup-form-wrapper">
    <h2 class="signup-form-wrapper__heading">
      Create your integrator free plan now!
    </h2>

    <form
      id="signupForm"
      class="signup-form"
      @submit="onSubmit"
    >
      <div class="signup-form__min-row signup-form__row--two-col">
        <label
          class="signup-form__field"
          for="firstName"
        >
          <div class="signup-form__label">
            First Name<span class="signup-form__required">*</span>
          </div>
          <input
            id="firstName"
            v-model="firstName"
            class="signup-form__input"
            :class="{ error: firstNameError }"
            required
            type="text"
            maxlength="128"
            placeholder="E.g. John"
            @blur="validateFirstName"
          >
          <span
            v-if="firstNameError"
            class="signup-form__error"
          >{{ firstNameError }}</span>
        </label>
        <label
          class="signup-form__field"
          for="lastName"
        >
          <div class="signup-form__label">
            Last Name<span class="signup-form__required">*</span>
          </div>
          <input
            id="lastName"
            v-model="lastName"
            class="signup-form__input"
            :class="{ error: lastNameError }"
            required
            type="text"
            maxlength="128"
            placeholder="E.g. Doe"
            @blur="validateLastName"
          >
          <span
            v-if="lastNameError"
            class="signup-form__error"
          >{{ lastNameError }}</span>
        </label>
      </div>

      <div class="signup-form__min-row">
        <label
          class="signup-form__field"
          for="email"
        >
          <div class="signup-form__label">
            Email<span class="signup-form__required">*</span>
          </div>
          <input
            id="email"
            v-model="form.email.value"
            class="signup-form__input"
            :class="{ error: !form.email.isValid }"
            required
            type="text"
            maxlength="128"
            placeholder="E.g. john@okta.com"
            @blur="validationService.checkEmailInput('email')"
          >
          <ul
            v-if="form.email.errorList.length"
            class="signup-form__error"
          >
            <li
              v-for="(err, idx) in form.email.errorList"
              :key="idx"
            >
              {{ err }}
            </li>
          </ul>
        </label>
      </div>

      <div class="signup-form__row signup-form__row--two-col">
        <label
          class="signup-form__field"
          for="department"
        >
          <div class="signup-form__label">
            Department<span class="signup-form__required">*</span>
          </div>
          <div class="signup-form__select-wrapper">
            <select
              id="department"
              v-model="department"
              class="signup-form__input signup-form__select"
              :class="{ error: departmentError }"
              required
              @change="validateDepartment"
            >
              <option
                value=""
                disabled
                selected
              >
                Select Department
              </option>
              <option
                v-for="dept in departments"
                :key="dept"
                :value="dept"
              >
                {{ dept }}
              </option>
            </select>
            <div class="signup-form__chevron">
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
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <span
            v-if="departmentError"
            class="signup-form__error"
          >{{ departmentError }}</span>
        </label>
        <label
          class="signup-form__field"
          for="country"
        >
          <div class="signup-form__label">
            Country / Region<span class="signup-form__required">*</span>
          </div>
          <div class="signup-form__select-wrapper">
            <select
              id="country"
              v-model="form.country.value"
              class="signup-form__input signup-form__select"
              :class="{ error: !form.country.isValid }"
              required
              @change="onCountryChange"
            >
              <option
                value=""
                disabled
                selected
              >
                Select...
              </option>
              <option
                v-for="country in getCountries"
                :key="country.value"
                :value="country.value"
              >
                {{ country.name }}
              </option>
            </select>
            <div class="signup-form__chevron">
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
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <span
            v-if="form.country.errorList.length"
            class="signup-form__error"
          >{{ validationService.errorDictionary.emptyField }}</span>
        </label>
      </div>

      <div
        v-if="states.list.length"
        class="signup-form__row"
      >
        <label
          class="signup-form__field"
          for="state"
        >
          <div class="signup-form__label">
            {{ states.label }}<span class="signup-form__required">*</span>
          </div>
          <div class="signup-form__select-wrapper">
            <select
              id="state"
              v-model="form.state.value"
              class="signup-form__input signup-form__select"
              :class="{ error: !form.state.isValid }"
              required
              @change="validationService.checkFormInput('state')"
            >
              <option
                value=""
                disabled
                selected
              >
                Select...
              </option>
              <option
                v-for="s in states.list"
                :key="s.name"
                :value="s.value"
              >
                {{ s.name }}
              </option>
            </select>
            <div class="signup-form__chevron">
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
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <span
            v-if="form.state.errorList.length"
            class="signup-form__error"
          >{{ validationService.errorDictionary.emptyField }}</span>
        </label>
      </div>

      <div class="signup-form__row">
        <div class="signup-form__label signup-form__label--section">
          Select one that describes you best<span class="signup-form__required">*</span>
        </div>
        <div class="signup-form__descriptors">
          <SignUpDescriptorOption
            v-for="opt in builderTypeOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
            :tooltip="opt.tooltip"
            :is-selected="builderType === opt.value"
            @select="onBuilderTypeSelect"
          />
        </div>
        <span
          v-if="builderTypeError"
          class="signup-form__error"
        >{{ builderTypeError }}</span>
      </div>

      <div class="signup-form__min-row">
        <label class="signup-form__recaptcha">
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
            class="signup-form__error"
          >{{ validationService.errorDictionary.emptyField }}</span>
        </label>
      </div>

      <div class="signup-form__min-row signup-form__consent">
        <div
          v-show="displayAgree"
          class="signup-form__consent-agree"
        >
          <label for="agree-checkbox-">
            <input
              id="agree-checkbox-"
              v-model="form.consentAgree.value"
              type="checkbox"
              name="consentAgree"
            >
            I agree that Okta may contact me with marketing communications.
            See Privacy Policy for details on how to unsubscribe.
          </label>
        </div>
        <div class="signup-form__consent-text">
          <p>
            By clicking "Sign up," I agree to be bound by the
            <SmartLink :item="{ link: '/terms/', target: '_blank' }">
              Integrator Free Plan Agreement
            </SmartLink>
            and Okta's
            <SmartLink :item="{ link: 'https://www.okta.com/privacy-policy' }">
              Privacy Policy
            </SmartLink>.
            If I am acting on behalf of an employer or another entity, I represent
            and warrant that I have the legal authority to bind that entity and
            its users to these terms.
            I acknowledge that my access to the Integrator Free Plan will automatically expire after
            180 consecutive days of inactivity.
          </p>
        </div>
      </div>

      <div
        v-if="error !== null"
        class="signup-form__row signup-form__error-banner"
      >
        {{ error }}
      </div>

      <div class="signup-form__actions">
        <label
          id="submitbutton"
          class="signup-form__submit-btn"
        >
          <a
            v-if="isPending"
            class="signup-form__pending"
          >
            <img class="signup-form__pending-img" src="/img/ajax-loader-white.gif">
          </a>
          <input
            v-else
            id="signup"
            type="submit"
            class="signup-form__submit-input"
            value="Sign Up"
          >
          <span class="signup-form__submit-arrow">&rarr;</span>
        </label>
      </div>

      <div class="signup-form__divider" />

      <div class="signup-form__login-link">
        <span>Signed up already? <a href="/login">Log in here</a></span>
      </div>
    </form>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import SignUpDescriptorOption from "./SignUpDescriptorOption.vue";

export default {
  name: "SignUpRegistrationForm",
  components: {
    VueRecaptcha,
    SignUpDescriptorOption,
    SmartLink: () => import("../SmartLink"),
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    validationService: {
      type: Object,
      required: true,
    },
    isPending: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
    captchaSiteKey: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: "light",
    },
    getCountries: {
      type: Array,
      default: () => [],
    },
    states: {
      type: Object,
      default: () => ({ label: "", list: [] }),
    },
    displayAgree: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      firstName: "",
      firstNameError: "",
      lastName: "",
      lastNameError: "",
      department: "",
      departmentError: "",
      builderType: "",
      builderTypeError: "",
      departments: [
        "Engineering",
        "Product",
        "Developer Relations",
        "Sales",
        "Marketing",
        "Security",
        "IT",
        "Operations",
        "Legal",
        "Others",
      ],
      builderTypeOptions: [
        {
          label: "Independent Software Vendor (ISV)",
          value: "Independent Software Vendor (ISV)",
          tooltip: "Build and publish integrations for your product on the Okta Integration Network (OIN), or extend an existing integration with additional capabilities.",
        },
        {
          label: "Solution Builders (GSI, SI, MSP, Solution Provider)",
          value: "Solution Builders (GSI, SI, MSP, Solution Provider)",
          tooltip: "Build and deliver integrations for customers as part of implementation, advisory, or managed services, with support for broader distribution through OIN.",
        },
        {
          label: "Other Developers Exploring APIs, SDKs etc",
          value: "Other Developers Exploring APIs, SDKs etc",
          tooltip: "Explore Okta APIs, authentication flows, and platform capabilities. If you are not building for Okta Platform, use an Okta Free Trial org for testing and evaluation.",
        },
        {
          label: "Existing Customers at Okta",
          value: "Existing Customers at Okta",
          tooltip: "Build integrations for your organization's Okta environment to support internal applications, workflows, and identity use cases.",
        },
      ],
    };
  },
  methods: {
    validateFirstName() {
      if (!this.firstName.trim()) {
        this.firstNameError = "This field cannot be left blank";
        return false;
      }
      this.firstNameError = "";
      return true;
    },
    validateLastName() {
      if (!this.lastName.trim()) {
        this.lastNameError = "This field cannot be left blank";
        return false;
      }
      this.lastNameError = "";
      return true;
    },
    validateDepartment() {
      if (!this.department) {
        this.departmentError = "This field cannot be left blank";
        return false;
      }
      this.departmentError = "";
      return true;
    },
    validateDescribedAs() {
      if (!this.builderType) {
        this.builderTypeError = "Please select one option";
        return false;
      }
      this.builderTypeError = "";
      return true;
    },
    onBuilderTypeSelect(value) {
      this.builderType = value;
      this.builderTypeError = "";
    },
    onCountryChange() {
      this.$emit("country-change", this.form.country.value);
    },
    onCaptchaVerified(response) {
      this.$emit("captcha-verified", response);
    },
    onCaptchaExpired() {
      this.$refs.recaptcha.reset();
      this.$emit("captcha-expired");
    },
    onSubmit(e) {
      e.preventDefault();

      const isFirstNameValid = this.validateFirstName();
      const isLastNameValid = this.validateLastName();
      const isDepartmentValid = this.validateDepartment();
      const isDescribedAsValid = this.validateDescribedAs();

      this.$emit("submit-form", e, {
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        department: this.department,
        builderType: this.builderType,
        isExtraValid: isFirstNameValid && isLastNameValid && isDepartmentValid && isDescribedAsValid,
      });
    },
  },
};
</script>
