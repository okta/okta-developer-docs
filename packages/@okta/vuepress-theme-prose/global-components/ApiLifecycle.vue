<template>
  <SmartLink :item="{ link }">
    <span
      v-if="access === labelType.BETA"
      class="api-label api-label-beta"
    >
      <i class="fa fa-warning" /> Beta
    </span>
    <span
      v-if="access === labelType.EARLY_ACCESS"
      class="api-label api-label-ea"
    >
      <i class="fa fa-flag" /> Early Access
    </span>
    <span
      v-if="access === labelType.DEPRECATED"
      class="api-label api-label-deprecated"
    >
      <i class="fa fa-warning" /> Deprecated
    </span>
    <span
      v-if="access === labelType.IDENTITY_ENGINE"
      class="api-label api-label-ie"
    >
      Identity Engine
    </span>
    <span
      v-if="access === labelType.CLASSIC_ENGINE"
      class="api-label api-label-classic-engine"
    >
      Classic Engine
    </span>
    <span
      v-if="access === labelType.LIMITED_GA"
      class="api-label api-label-limited-ga"
    >
      Limited GA
    </span>
  </SmartLink>
</template>

<script>
const DEFAULT_LINK = "https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/";
const IE_LINK = "/docs/concepts/oie-intro/";
const DEPRECATED_LINK = "https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#deprecation";
const EA_LINK = "https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/#early-access-ea"

export default {
  name: "ApiLifecycle",
  components: {
    SmartLink: () => import("../components/SmartLink.vue")
  },
  props: {
    access: {
      type: String,
      default: "Beta"
    }
  },
  computed: {
    link() {
      if(this.access === this.labelType.IDENTITY_ENGINE) {
        return IE_LINK;
      } else if(this.access === this.labelType.DEPRECATED) {
        return DEPRECATED_LINK;
      } else if(this.access === this.labelType.EARLY_ACCESS) {
        return EA_LINK;
      } else {
        return DEFAULT_LINK;
      }
    }
  },
  created() {
    this.labelType = {
      BETA: "beta",
      EARLY_ACCESS: "ea",
      DEPRECATED: "deprecated",
      IDENTITY_ENGINE: "ie",
      LIMITED_GA: "Limited GA",
      CLASSIC_ENGINE: "Classic Engine"
    };
  }
};
</script>
