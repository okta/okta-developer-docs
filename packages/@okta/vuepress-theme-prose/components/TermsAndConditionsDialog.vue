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
            v-for="country in countriesList"
            v-bind:key="country.value"
            :value="country.value"
            >{{ country.name }}</option
          >
        </select>
      </label>
      <label for="tac-regionData" v-show="region.list.length">
        {{ region.type }}
        <select
          name="Region"
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
            class="btn social-btn"
            value="cancel"
            @click="closeTermsConditionsDialog()"
          />
        </div>
        <div class="btn-container">
          <input
            type="button"
            class="btn red-button"
            @click="!isDisabledSocialAuth && setTaCUrlAndRedirect()"
            :class="{ 'btn-disabled': isDisabledSocialAuth }"
            value="continue"
            :disabled="isDisabledSocialAuth"
          />
        </div>
      </div>
    </template>
  </DialogWindow>
</template>

<script>
import buildUrl from "build-url";
import {
  countriesList,
  americanStates,
  canadianProvinces,
  GDPR_COUNTRIES
} from "../const/signup.const";

const CANADA = "Canada";
const USA = "United States";
const EMPTY_STRING = "";

export default {
  name: "TermsAndConditionsDialog",
  components: {
    SmartLink: () => import("./SmartLink"),
    DialogWindow: () => import("./DialogWindow")
  },
  props: {
    socialUrl: {
      required: true,
      type: EMPTY_STRING
    }
  },
  data() {
    return {
      selectedCountry: EMPTY_STRING,
      selectedRegion: EMPTY_STRING,
      regionData: { type: EMPTY_STRING, list: [] }
    };
  },
  computed: {
    isDisabledSocialAuth() {
      // If country not selected, disable "continue" button.
      if (!this.selectedCountry) {
        return true;
      }
      // If country Canada or USA but region not selected, disable "continue" button.
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
          this.regionData.list = canadianProvinces;
          this.regionData.type = "Province";
        } else {
          this.regionData.list = [];
          this.regionData.type = EMPTY_STRING;
        }
      }
    },
    countriesList() {
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
      const okta_AcceptedToS = this.$refs.gdprBoxEl.checked;
      const okta_ts_AcceptedToS = Date.now();
      const country = this.selectedCountry;
      const regionType = this.region.type.toLowerCase(); // could be "state" or "province".
      const regionName = this.selectedRegion;
      const queryParams = this.removeEmptyFields({
        okta_AcceptedToS,
        okta_ts_AcceptedToS,
        country,
        [regionType]: regionName
      });
      
      window.location.href = buildUrl(this.socialUrl, { queryParams });
    },
    closeTermsConditionsDialog() {
      this.$emit("close");
    },

    // Remove object fields with empty "key" value.
    removeEmptyFields(obj) {
      return Object.entries(obj)
        .filter(([k, v]) => k !== EMPTY_STRING )
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    },
    resetFields() {
      if (this.$refs.gdprBoxEl) {
        this.$refs.gdprBoxEl.checked = false;
      }

      if (this.$refs.regionDataEl) {
        this.selectedRegion = EMPTY_STRING;
        this.$refs.regionDataEl.value = EMPTY_STRING;
      }
    }
  }
};
</script>
