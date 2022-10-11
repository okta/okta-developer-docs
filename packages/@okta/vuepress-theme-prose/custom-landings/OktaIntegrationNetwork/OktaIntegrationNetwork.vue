<template>
  <div class="custom-landing">
    <CustomLandingHero />
    <CustomLandingExplore />
    <CustomLandingFeatures />
    <CustomLandingStart />
  </div>
</template>

<script>
	export default {
    name: 'OktaIntegrationNetwork',
    inject: ["appContext"],
    components: {
      CustomLandingHero: () => import("./components/Hero.vue"),
      CustomLandingAbout: () => import("./components/About.vue"),
      CustomLandingFeatures: () => import("./components/Features.vue"),
      CustomLandingExplore: () => import("./components/Explore.vue"),
      CustomLandingStart: () => import("./components/Start.vue")
    }
  }
</script>