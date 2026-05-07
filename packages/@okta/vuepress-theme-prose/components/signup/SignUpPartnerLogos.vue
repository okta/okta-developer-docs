<template>
  <div class="signup-logos">
    <p class="signup-logos__text">
      Join thousands of ISVs publishing integrations to the OIN and reach 17,000+ enterprises.
    </p>
    <div class="signup-logos__grid">
      <span
        v-for="(logo, index) in logos"
        :key="index"
        class="signup-logos__item"
      >
        <img
          :src="logo.icon"
          :alt="logo.name || 'Partner logo'"
        >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUpPartnerLogos",
  props: {
    theme: {
      type: String,
      default: 'light',
    },
  },
  computed: {
    isDark() {
      return this.theme === 'dark';
    },
    logos() {
      return [
        { name: 'Google', icon: '/img/google.svg' },
        { name: 'Atlassian', icon: '/img/atlassian.svg' },
        { name: 'AWS', icon: this.isDark ? '/img/aws.svg' : '/img/aws-light.svg' },
        { name: 'Salesforce', icon: '/img/salesforce.svg' },
        { name: 'Service Now', icon: this.isDark ? '/img/servicenow.svg' : '/img/servicenow-light.svg' },
        { name: 'Slack', icon: this.isDark ? '/img/slack.svg' : '/img/slack-light.svg' },
        { name: 'Workday', icon: this.isDark ? '/img/workday.svg' : '/img/workday-light.svg' },
        { name: 'Zendesk', icon: this.isDark ? '/img/zendesk.svg' : '/img/zendesk-light.svg' },
      ];
    },
  },
};
</script>
