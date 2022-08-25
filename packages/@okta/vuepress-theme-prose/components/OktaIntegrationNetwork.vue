<template>
  <div class="custom-landing">
    <CustomLandingHero />
    <CustomLandingAbout />
    <CustomLandingTools />
    <CustomLandingFeatures />
    <CustomLandingExplore />
    <CustomLandingStart />
  </div>
</template>

<script>
	export default {
    name: 'OktaIntegrationNetwork',
    inject: ["appContext"],
    components: {
      CustomLandingHero: () => import("../components/customLanding/Hero.vue"),
      CustomLandingAbout: () => import("../components/customLanding/About.vue"),
      CustomLandingTools: () => import("../components/customLanding/Tools.vue"),
      CustomLandingFeatures: () => import("../components/customLanding/Features.vue"),
      CustomLandingExplore: () => import("../components/customLanding/Explore.vue"),
      CustomLandingStart: () => import("../components/customLanding/Start.vue")
    }
  }
</script>