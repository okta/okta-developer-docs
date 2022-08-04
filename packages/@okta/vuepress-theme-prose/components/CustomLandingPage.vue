<template>
  <div class="custom-landing">
    <CustomLandingHero />
    <CustomLandingAbout />
    <CustomLandingTools />
  </div>
</template>

<script>
	export default {
    name: 'CustomLandingPage',
    inject: ["appContext"],
    components: {
      CustomLandingHero: () => import("../components/customLanding/Hero.vue"),
      CustomLandingAbout: () => import("../components/customLanding/About.vue"),
      CustomLandingTools: () => import("../components/customLanding/Tools.vue")
    }
  }
</script>