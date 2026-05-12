<template>
  <div class="signup-hero">
    <h1 class="signup-hero__title">
      Start your Integration<br>
      building journey.
    </h1>

    <div class="signup-hero__features">
      <SignUpFeatureCard
        title="Build for Security"
        description="Leverage industry standards to meet enterprise identity demands like SSO, provisioning, AI governance, session termination, and more."
        :icon="theme === 'dark' ? '/img/signup/secured-laptop-dark.svg' : '/img/signup/secured-laptop.svg'"
      />
      <SignUpFeatureCard
        title="Attract Enterprise Customers"
        description="Build credibility with an OIN listing that shows enterprise buyers your integration is tested, validated, and ready to deploy."
        :icon="theme === 'dark' ? '/img/signup/container-bucket-dark.svg' : '/img/signup/container-bucket.svg'"
      />
    </div>

    <div class="signup-hero__divider" />

    <SignUpPartnerLogos :theme="theme" />
  </div>
</template>

<script>
import SignUpFeatureCard from "./SignUpFeatureCard.vue";
import SignUpPartnerLogos from "./SignUpPartnerLogos.vue";

export default {
  name: "SignUpHeroSection",
  components: {
    SignUpFeatureCard,
    SignUpPartnerLogos,
  },
  props: {
    theme: {
      type: String,
      default: 'light',
    },
  },
};
</script>
