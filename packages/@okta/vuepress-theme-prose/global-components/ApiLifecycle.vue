<template>
  <SmartLink :item="{ link }">
    <span class="api-label api-label-beta" v-if="access === labelType.BETA">
      <i class="fa fa-warning"></i> Beta
    </span>
    <span class="api-label api-label-ea" v-if="access === labelType.ERLY_ACCESS">
      <i class="fa fa-flag"></i> Early Access
    </span>
    <span class="api-label api-label-deprecated" v-if="access === labelType.DEPRECATED">
      <i class="fa fa-fire-extinguisher"></i> Deprecated
    </span>
    <span class="api-label api-label-ie" v-if="access === labelType.IDENTITY_ENGINE">
      Identity Engine
    </span>
  </SmartLink>
</template>

<script>
const DEFAULT_LINK = "/docs/reference/releases-at-okta/";
const IE_LINK = ""; // Waiting for OKTA-358659.
let labelType;

export default {
  name: "ApiLifecycle",
  components: {
    SmartLink: () => import("../components/SmartLink.vue")
  },
  props: {
    access: {
      type: String,
      default: "beta"
    }
  },
  computed: {
    link() {
      return this.access === this.labelType.IDENTITY_ENGINE ? IE_LINK : DEFAULT_LINK;
    }
  },
  created() {
    this.labelType = {
      BETA: "beta",
      ERLY_ACCESS: "ea",
      DEPRECATED: "deprecated",
      IDENTITY_ENGINE: "ie"
    };
  }
};
</script>
