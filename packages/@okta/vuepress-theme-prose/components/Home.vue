<template>
  <div class="homepage content">
    <div class="content--container">
      <Sidebar />
    </div>
    <div class="width-adjuster">
      <div class="justify-content-center">
        <Hero />
        <Journeys />
        <FeaturedJourneys />
        <Resources />
        <News />
        <Support />
      </div>
    </div>
  </div>
</template>

<script>
import FeaturedJourneys from "./FeaturedJourneys.vue";

export default {
  name: "Home",
  components: {
    Hero: () => import("../components/Hero"),
    Sidebar: () => import("../components/Sidebar"),
    Resources: () => import("../components/Resources"),
    News: () => import("../components/News"),
    Support: () => import("../components/Support"),
    Journeys: () => import("../components/Journeys"),
    FeaturedJourneys: () => import("../components/FeaturedJourneys"),
  },
};
</script>
