<template>
  <div class="guides-overview">
    <GuidesNavigation />
    <div class="guides-overview-content">
      <h1>Guides</h1>
      <p>Step-by-step guides for your use cases.</p>
      <p>With Okta, you can lorem like no ipsum before</p>
      <h2>Featured Guides</h2>
      <div class="guides-featured">
        <FeaturedGuide guide=""/>
        <FeaturedGuide guide=""/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GuidesOverview',
    components: {
      FeaturedGuide: () => import('../components/FeaturedGuide.vue'),
      GuidesNavigation: () => import('../components/GuidesNavigation.vue'),
    },
  }
</script>

