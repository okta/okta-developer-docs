<template>
  <div class="signup-hero">
    <h1 class="signup-hero__title">
      Start building your<br>
      integration
    </h1>

    <div class="signup-hero__features">
      <SignUpFeatureCard
        title="Preproduction sandbox"
        description="Set up a dedicated environment to build, test, and validate integrations using the OIN Wizard and the Submission Tester."
        :icon="theme === 'dark' ? '/img/signup/secured-laptop-dark.svg' : '/img/signup/secured-laptop.svg'"
      />
      <SignUpFeatureCard
        title="Build for security"
        description="Deliver enterprise identity solutions like SSO, provisioning, AI governance, session termination, and more."
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
