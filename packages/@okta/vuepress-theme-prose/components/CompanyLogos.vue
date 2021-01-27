<template>
  <div
    :class="{
      'company-logos--wrapper': true,
      'company-logos--centered': centered,
      'company-logos--small': small
    }"
  >
    <h1 v-if="withHeading && !small">Trusted by developers</h1>
    <h4 v-else-if="withHeading && small">Trusted by developers</h4>
    <div class="company-logos--icons">
      <img
        class="company-logos--icon"
        v-for="(logo, index) in $themeConfig.redesign.company_logos"
        :key="index"
        :src="logo.icon"
        :alt="logo.name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyLogos",
  props: {
    withHeading: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  }
};
</script>
