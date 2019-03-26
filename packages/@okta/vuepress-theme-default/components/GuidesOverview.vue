<template>
  <div class="guides-overview">
    <GuidesNavigation
    />
    <div class="overview-content">
      <h1>Guides</h1>
      <p>Step-by-step guides for your use cases.</p>
      <p>With Okta, you can lorem like no ipsum before</p>
      <h2>Featured Guides</h2>
      <div class="featured">
         <FeaturedGuide v-for="feature in featured" :guide="feature"/>
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

