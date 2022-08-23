<template>
  <div class="content--container">
    <Sidebar />
    <div class="content-area content-area-full col-xl-10 col-lg-10 col-md-12 col-sm-12">
      <div class="custom-landing">
        <CustomLandingHero />
        <CustomLandingAbout />
        <CustomLandingTools />
        <CustomLandingFeatures />
        <CustomLandingExplore />
        <CustomLandingStart />
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    name: 'OktaIntegrationNetwork',
    inject: ["appContext"],
    components: {
      Sidebar: () => import("../components/Sidebar.vue"),
      CustomLandingHero: () => import("../components/customLanding/Hero.vue"),
      CustomLandingAbout: () => import("../components/customLanding/About.vue"),
      CustomLandingTools: () => import("../components/customLanding/Tools.vue"),
      CustomLandingFeatures: () => import("../components/customLanding/Features.vue"),
      CustomLandingExplore: () => import("../components/customLanding/Explore.vue"),
      CustomLandingStart: () => import("../components/customLanding/Start.vue")
    }
  }
</script>