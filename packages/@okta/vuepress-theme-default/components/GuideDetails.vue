<template>
  <div class="guide-details">
    <GuidesNavigation
      :sections="sections"
      :section="section"
      :framework="framework"
      :guide="guide" 
    />
    <Content :pageKey="componentKey" id="guide_content" />
  </div>
</template>

<script>
  export default {
    name: 'GuideDetails',
    props: [ 'componentKey', 'sections', 'guide', 'framework', 'section' ],
    components: {
      GuidesNavigation: () => import('../components/GuidesNavigation.vue'),
    },
  }
</script>

