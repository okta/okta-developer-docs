<template>
  <DialogWindow
    @close="closeTermsConditionsDialog()"
    title="Help us improve your experience"
  >
    <div class="dialog-text">
      <label for="tac-country">
        Country
        <select
          name="Country"
          id="tac-country"
          class="tac-row"
          ref="countryEl"
          v-model="selectedCountry"
          @change="
            states = $event.target.value;
            refreshFields();
          "
        >
          <option disabled selected></option>
          <option
            v-for="country in countrieList"
            v-bind:key="country.value"
            :value="country.value"
            >{{ country.name }}</option
          >
        </select>
      </label>
      <label for="tac-state" v-show="states.list.length">
        {{ states.label }}
        <select name="Satate" id="tac-state" class="tac-row" ref="stateEl" v-model="selectedSatate">
          <option disabled selected></option>
          <option
            v-for="state in states.list"
            v-bind:key="state.name"
            :value="state.value"
            >{{ state.name }}</option
          >
        </select>
      </label>
      <div class="marketing-c" v-show="isGDPRCountry">
        <div class="title">
          Marketing Communication <span> - Optional</span>
        </div>
        <div class="gdpr-condition">
          <input
            type="checkbox"
            name=""
            id="okta-contact"
            ref="gdprBoxEl"
            checked="false"
          />
          <label for="okta-contact">
            I agree that Okta may contact me with marketing communications. See
            Privacy Policy for details on how to unsubscribe.
          </label>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <div class="agree-policy" v-show="selectedCountry">
        <div class="splitter"></div>
        <p>
          By clicking "continue", I agree to the applicable Free Trial terms in
          <SmartLink :item="{ link: '/terms/' }">Okta's Terms</SmartLink> and
          the processing of my personal data by Okta as described in the
          <SmartLink :item="{ link: '/privacy-policy/' }"
            >Privacy Policy</SmartLink
          >.
        </p>
      </div>
      <div class="terms-conditions-btns">
        <div class="btn-container">
          <input
            type="button"
            class="btn red-button"
            @click="setTaCUrlAndRedirect()"
            :class="{'btn-disabled': isDisabledSocialAuth}"
            value="continue"
            :disabled="isDisabledSocialAuth"
          />
        </div>
        <div class="btn-container mr-15">
          <input
            type="button"
            class="btn social-btn"
            value="cancel"
            @click="closeTermsConditionsDialog()"
          />
        </div>
      </div>
    </template>
  </DialogWindow>
</template>

<script>
import {
  countriesList,
  americanStates,
  canadaProvinces,
  GDPR_COUNTRIES
} from "../const/signup.const";

const CANADA = "Canada";
const USA = "United States";

export default {
  name: "TermsAndConditionsDialog",
  components: {
    SmartLink: () => import("./SmartLink"),
    DialogWindow: () => import("./DialogWindow")
  },
  props: {
    socialUrl: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      selectedCountry: "",
      selectedSatate: "",
      state: { label: "", list: [] }
    };
  },
  computed: {
    isDisabledSocialAuth() {
      // If country not selected, disable "continue" button.
      if (!this.selectedCountry) {
        return true;
      };
      // If country Canada or USA but satate not selected, disable "continue" button.
      if (this.selectedCountry === USA || this.selectedCountry === CANADA) {
        if (!this.selectedSatate) {
          return true;
        }
      }
    },
    states: {
      get() {
        return this.state;
      },
      set(country) {
        if (country === USA) {
          this.state.list = americanStates;
          this.state.label = "State";
        } else if (country === CANADA) {
          this.state.list = canadaProvinces;
          this.state.label = "Province";
        } else {
          this.state.list = [];
          this.state.label = "";
        }
      }
    },
    countrieList() {
      return countriesList;
    },
    isGDPRCountry() {
      if (GDPR_COUNTRIES.includes(this.selectedCountry)) {
        return true;
      }
    }
  },
  methods: {
    setTaCUrlAndRedirect() {
      const dataStamp = Date.now();
      const acceptContactValue = this.$refs.gdprBoxEl.checked;
      const country = encodeURI(this.selectedCountry);
      const state = encodeURI(this.selectedSatate);
      const oktaTaCUrl = `${this.socialUrl}?okta_AcceptedToS=${acceptContactValue}&signUpCountry=${country}&signUpState=${state}&okta_ts_AcceptedToS=${dataStamp}`;

      window.location.href = oktaTaCUrl;
    },
    closeTermsConditionsDialog() {
      this.$emit("close");
    },
    refreshFields() {
      if (this.$refs.gdprBoxEl) {
        this.$refs.gdprBoxEl.checked = false;
      }

      if (this.$refs.stateEl) {
        this.selectedSatate = "";
        this.$refs.stateEl.value = "";
      }
    }
  }
};
</script>

<style lang="scss">
.dialog-text {
  .marketing-c {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 16px;
      margin: 0 0 8px 0;
      font-weight: 500;
      span {
        color: #bbbbbb;
      }
    }
    .gdpr-condition {
      display: flex;
      margin: 0 0 24px 0;
      font-size: 14px;
      background-color: #162836;
      align-items: center;
      padding: 12px 16px;
      input[type="checkbox"] {
        margin: 0 16px 0 0;
      }
    }
  }
  .tac-row {
    margin: 8px 0 24px 0;
  }
  label {
    cursor: pointer;
  }
}
.agree-policy {
  .splitter {
    border: 2px solid #20313b;
    margin: 0 0 24px 0;
  }
}
.terms-conditions-btns {
  margin: 40px 0 0 0;
}
</style>
