<template>
  <div class="guides-overview">
    <GuidesNavigation />
    <div class="overview-content">
      <h1>Guides</h1>
      <Content />
      <h2>Featured Guides</h2>
      <div class="featured">
         <FeaturedGuide v-for="guideName in featured" :guideName="guideName"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GuidesOverview',
    props: ['featured'],
    components: {
      FeaturedGuide: () => import('../components/FeaturedGuide.vue'),
      GuidesNavigation: () => import('../components/GuidesNavigation.vue'),
    },
  }
</script>

