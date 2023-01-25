<template>
  <div class="custom-landing">
    <CustomLandingHero />
    <CustomLandingFeatures />
    <CustomLandingExplore />
    <CustomLandingStart />
  </div>
</template>

<script>
  export default {
    name: 'OktaIntegrationNetwork',
    components: {
      CustomLandingHero: () => import("./components/Hero.vue"),
      CustomLandingFeatures: () => import("./components/Features.vue"),
      CustomLandingExplore: () => import("./components/Explore.vue"),
      CustomLandingStart: () => import("./components/Start.vue")
    },
    inject: ["appContext"]
  }
</script>
