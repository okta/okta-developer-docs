<template>
  <div
    :class="{
      'company-logos--wrapper': true,
      'company-logos--centered': centered,
      'company-logos--small': small
    }"
  >
    <h1 v-if="withHeading && !small">
      Trusted by developers
    </h1>
    <h4 v-else-if="withHeading && small">
      Trusted by developers
    </h4>
    <div class="company-logos--icons">
      <span
        v-for="(logo, index) in $themeConfig.company_logos"
        :key="index"
        class="company-logos--icon"
        :style="{ 'background': 'url(' + logo.icon + ') 50% 50% no-repeat' }"
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
