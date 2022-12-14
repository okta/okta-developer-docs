<template>
  <DialogWindow
    title="Tell us more about yourself"
    @close="closeTermsConditionsDialog()"
  >
    <div class="dialog-text">
      <p>
        The information you provide will only be used to help us improve your
        experience. Your personal data is safe and secure with us.
      </p>
      <label for="tac-country">
        Country/Region
        <select
          id="tac-country"
          ref="countryEl"
          v-model="selectedCountry"
          name="Country"
          class="tac-row"
          @change="
            region = $event.target.value;
            resetFields();
          "
        >
        
          <option
            disabled
            selected
          />
          <option
            v-for="country in countriesList"
            :key="country.value"
            :value="country.value"
          >{{ country.name }}</option>
        </select>
      </label>
      <label
        v-show="region.list.length"
        for="tac-regionData"
      >
        {{ region.type }}
        <select
          id="tac-regionData"
          ref="regionDataEl"
          v-model="selectedRegion"
          name="Region"
          class="tac-row"
        >
          <option
            disabled
            selected
          />
          <option
            v-for="regionData in region.list"
            :key="regionData.name"
            :value="regionData.value"
          >{{ regionData.name }}</option>
        </select>
      </label>
      <div
        v-show="isGDPRCountry"
        class="marketing-c"
      >
        <div class="title">
          Marketing Communication <span> - Optional</span>
        </div>
        <div class="gdpr-condition">
          <input
            id="okta-contact"
            ref="gdprBoxEl"
            type="checkbox"
            name=""
            checked="false"
          >
          <label for="okta-contact">
            I agree that Okta may contact me with marketing communications. See
            Privacy Policy for details on how to unsubscribe.
          </label>
        </div>
      </div>
    </div>
    <template #footer>
      <div
        v-show="selectedCountry"
        class="agree-policy"
      >
        <div class="splitter" />
        <p>
          By clicking "continue", I agree to the applicable Free Trial terms in
          <SmartLink :item="{ link: '/terms/' }">
            Okta's Terms
          </SmartLink> and
          the processing of my personal data by Okta as described in the
          <SmartLink :item="{ link: '/privacy-policy/' }">
            Privacy Policy
          </SmartLink>.
        </p>
      </div>
      <div class="terms-conditions-btns">
        <div class="btn-container">
          <input
            type="button"
            class="btn social-btn"
            value="Cancel"
            @click="closeTermsConditionsDialog()"
          >
        </div>
        <div class="btn-container">
          <input
            type="button"
            class="btn red-button"
            :class="{ 'btn-disabled': isDisabledSocialAuth }"
            value="Continue"
            :disabled="isDisabledSocialAuth"
            @click="!isDisabledSocialAuth && setTaCUrlAndRedirect()"
          >
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

export default {
  name: "TermsAndConditionsDialog",
  components: {
    SmartLink: () => import("./SmartLink"),
    DialogWindow: () => import("./DialogWindow")
  },
  props: {
    socialUrl: {
      required: true,
      type: ""
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
          this.regionData.type = "";
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
      const okta_oie = true;
      const country = this.selectedCountry;
      const regionType = this.region.type.toLowerCase(); // could be "state" or "province".
      const regionName = this.selectedRegion;
      const stateObject = {
        okta_AcceptedToS,
        okta_ts_AcceptedToS,
        okta_oie,
        country,
      };

      if (regionType !== "") {
        stateObject[regionType] = regionName;
      }

      window.location.href = buildUrl(this.socialUrl, {
        queryParams: {
          state: JSON.stringify(stateObject)
        }
      });
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
    }
  }
};
</script>
