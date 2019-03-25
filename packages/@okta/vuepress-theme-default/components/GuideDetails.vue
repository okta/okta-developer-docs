<template>
  <div class="guide-details">
<<<<<<< HEAD
    <InGuideNavigation
=======
    <GuidesNavigation
>>>>>>> def39456ae42c7cf1d384dd04896a232fe4e4f39
      :sections="sections"
      :section="section"
      :lang="lang"
      :guide="guide" 
<<<<<<< HEAD
    />   
=======
    />
>>>>>>> def39456ae42c7cf1d384dd04896a232fe4e4f39
    <Content :pageKey="componentKey" id="guide_content" />
  </div>
</template>

<script>
  export default {
    name: 'GuideDetails',
    props: [ 'componentKey', 'sections', 'guide', 'lang', 'section' ],
    components: {
<<<<<<< HEAD
      InGuideNavigation: () => import('../components/InGuideNavigation.vue'),
=======
      GuidesNavigation: () => import('../components/GuidesNavigation.vue'),
>>>>>>> def39456ae42c7cf1d384dd04896a232fe4e4f39
    },
  }
</script>

