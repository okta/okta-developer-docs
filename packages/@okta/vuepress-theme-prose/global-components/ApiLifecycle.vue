<template>
  <SmartLink :item="{ link }">
    <span class="api-label api-label-beta" v-if="access === labelType.BETA">
      <i class="fa fa-warning"></i> Beta
    </span>
    <span class="api-label api-label-ea" v-if="access === labelType.EARLY_ACCESS">
      <i class="fa fa-flag"></i> Early Access
    </span>
    <span class="api-label api-label-deprecated" v-if="access === labelType.DEPRECATED">
      <i class="fa fa-fire-extinguisher"></i> Deprecated
    </span>
    <span class="api-label api-label-ie" v-if="access === labelType.IDENTITY_ENGINE">
      Identity Engine
    </span>
    <span class="api-label api-label-classic-engine" v-if="access === labelType.CLASSIC_ENGINE">
      Classic Engine
    </span>
    <span class="api-label api-label-limited-ga" v-if="access === labelType.LIMITED_GA">
      Limited GA
    </span>
  </SmartLink>
</template>

<script>
const DEFAULT_LINK = "/docs/reference/releases-at-okta/";
const IE_LINK = "https://help.okta.com/en/oie/okta_help_CSH.htm#ext-get-started-oie";

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
      return this.access === this.labelType.IDENTITY_ENGINE ||
             this.access === this.labelType.CLASSIC_ENGINE
             ? IE_LINK : DEFAULT_LINK;
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
