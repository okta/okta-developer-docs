<template>
  <div class="guide-details">
    <GuidesNavigation
      :sections="sections"
      :section="section"
      :lang="lang"
      :guide="guide" 
    />
    <Content :pageKey="componentKey" id="guide_content" />
  </div>
</template>

<script>
  export default {
    name: 'GuideDetails',
    props: [ 'componentKey', 'sections', 'guide', 'lang', 'section' ],
    components: {
      GuidesNavigation: () => import('../components/GuidesNavigation.vue'),
    },
  }
</script>

