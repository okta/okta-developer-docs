<template>
  <SmartLink :item="{ link: '/docs/reference/releases-at-okta/' }">
    <span class="api-label api-label-beta" v-if="access == 'beta'">
      <i class="fa fa-warning"></i> Beta
    </span>
    <span class="api-label api-label-ea" v-if="access == 'ea'">
      <i class="fa fa-flag"></i> Early Access
    </span>
    <span class="api-label api-label-deprecated" v-if="access == 'deprecated'">
      <i class="fa fa-fire-extinguisher"></i> Deprecated
    </span>
  </SmartLink>
</template>

<script>
export default {
  name: "ApiLifecycle",
  components: {
    SmartLink: () => import("../components/SmartLink.vue"),
  },
  props: {
    access: {
      type: String,
      default: "beta",
    },
  },
};
</script>
