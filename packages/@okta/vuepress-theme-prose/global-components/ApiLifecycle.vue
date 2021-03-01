<template>
  <SmartLink :item="{ link }">
    <span class="api-label api-label-beta" v-if="access == 'beta'">
      <i class="fa fa-warning"></i> Beta
    </span>
    <span class="api-label api-label-ea" v-if="access == 'ea'">
      <i class="fa fa-flag"></i> Early Access
    </span>
    <span class="api-label api-label-deprecated" v-if="access == 'deprecated'">
      <i class="fa fa-fire-extinguisher"></i> Deprecated
    </span>
    <span class="api-label api-label-ie" v-if="access == 'ie'">
      Identity Engine
    </span>
  </SmartLink>
</template>

<script>
const DEFAULT_LINK = "/docs/reference/releases-at-okta/";
const IE_LINK = "";
const labelType = {
  ACCESS: "access",
  ERLY_ACCESS: "ea",
  DEPRECATED: "deprecated",
  IDENTITY_ENGINE: "ie"
}

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
      return this.access === labelType.IDENTITY_ENGINE
        ? IE_LINK
        : DEFAULT_LINK;
    }
  }
};
</script>
