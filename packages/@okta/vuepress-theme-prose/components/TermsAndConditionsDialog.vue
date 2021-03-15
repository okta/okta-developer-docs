<template>
  <DialogWindow
    @close="closeTermsConditionsDialog()"
    title="Tell us more about yourself"
  >
    <div class="dialog-text">
      <p>
        The information you provide will only be used to help us improve your
        experience. Your personal data is safe and secure with us.
      </p>
      <label for="tac-country">
        Country
        <select
          name="Country"
          id="tac-country"
          class="tac-row"
          ref="countryEl"
          v-model="selectedCountry"
          @change="
            region = $event.target.value;
            resetFields();
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
      <label for="tac-regionData" v-show="region.list.length">
        {{ region.type }}
        <select
          name="Satate"
          id="tac-regionData"
          class="tac-row"
          ref="regionDataEl"
          v-model="selectedRegion"
        >
          <option disabled selected></option>
          <option
            v-for="regionData in region.list"
            v-bind:key="regionData.name"
            :value="regionData.value"
            >{{ regionData.name }}</option
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
            :class="{ 'btn-disabled': isDisabledSocialAuth }"
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
      selectedRegion: "",
      regionData: { type: "", list: [] }
    };
  },
  computed: {
    isDisabledSocialAuth() {
      // If country not selected, disable "continue" button.
      if (!this.selectedCountry) {
        return true;
      }
      // If country Canada or USA but satate not selected, disable "continue" button.
      if (this.selectedCountry === USA || this.selectedCountry === CANADA) {
        if (!this.selectedRegion) {
          return true;
        }
      }
    },
    region: {
      get() {
        return this.regionData;
      },
      set(country) {
        if (country === USA) {
          this.regionData.list = americanStates;
          this.regionData.type = "State";
        } else if (country === CANADA) {
          this.regionData.list = canadaProvinces;
          this.regionData.type = "Province";
        } else {
          this.regionData.list = [];
          this.regionData.type = "";
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
      const acceptContactValue = this.$refs.gdprBoxEl.checked;
      const countryName = this.selectedCountry;
      const regionType = this.region.type.toLowerCase();
      const regionName = this.selectedRegion;
      const dataStamp = Date.now();
      let redirectUrlParameters = [];

      redirectUrlParameters = [
        { name: "okta_AcceptedToS", value: acceptContactValue },
        { name: "okta_ts_AcceptedToS", value: dataStamp },
        { name: "country", value: encodeURI(countryName) },
        { name: regionType, value: encodeURI(regionName) },
      ];

      window.location.href = this._getSocialRedirectUrl(redirectUrlParameters);
    },
    closeTermsConditionsDialog() {
      this.$emit("close");
    },
    resetFields() {
      if (this.$refs.gdprBoxEl) {
        this.$refs.gdprBoxEl.checked = false;
      }

      if (this.$refs.regionDataEl) {
        this.selectedRegion = "";
        this.$refs.regionDataEl.value = "";
      }
    },
    _getSocialRedirectUrl(parameters = []) {
      let separator;
      let redirectUrl = `${this.socialUrl}`;

      parameters.forEach((parameter, index) => {
        if (parameter.name) {
          separator = index === 0 ? "?" : "&";
          redirectUrl += `${separator}${parameter.name}=${parameter.value}`;
        }
      });
      return redirectUrl;
    }
  }
};
</script>

<style lang="scss">
.dialog-text {
  font-size: 14px;
  label {
    font-size: 16px;
  }
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
