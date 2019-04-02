<template>
  <div class="Page okta-guides">
    <TopNavigation />
    <section class="PageContent">
      <!-- START Page Content -->
      <div class="PageContent-main" id="guides-body">
        <GuideDetails 
          v-if="section && section.key" 
          :componentKey="section.key" 
          :sections="sections" 
          :section="section"
          :guide="guide" 
          :framework="framework"
        />
        <GuidesOverview v-else :featured="featured"/>
      </div>
      <!-- END Page Content -->
    </section>
    <Footer/>
  </div>
</template>

<script>
  import { 
    guideFromPath,
    makeGuidePath,
    findGuides,
    findGuideSections,
    findMainFrameworksOfGuide
  } from '../util/guides';
  export default {
    components: {
      GuideDetails: () => import('../components/GuideDetails.vue'),
      GuidesOverview: () => import('../components/GuidesOverview.vue'),
      TopNavigation: () => import('../components/TopNavigation.vue'),
      Footer: () => import('../components/Footer.vue'),
    },

    data() { 
      return {
        guide: null,
        framework: null,
        section: null,
        sections: [],
        currentPath: null,
      };    
    },
    computed: { 
      featured() { 
        return this.$frontmatter.featured;
      },
    },
    methods: { 
      updatePath() { 
        this.currentPath = window.location.pathname; 
      },
    },
    beforeMount() {
      this.updatePath();
    },
    
    watch: {
      currentPath() {
        let { guide, framework, sectionNum } = guideFromPath(this.currentPath);
        const pages = this.$site.pages;
        const sections = findGuideSections({ guide, pages });
        const section = sections[sectionNum-1 || 0];

        if(!framework) { 
          framework = findMainFrameworksOfGuide({ guide, pages })[0];
          if(window && guide) { 
            window.location.pathname = makeGuidePath({ guide, framework, sectionNum });
          }
        }

        this.sections = sections;
        this.section = section;
        this.guide = guide;
        this.framework = framework;
      },

      '$route' () {  
        this.updatePath();
      },
    },
  }

</script>

<style lang="scss">
  @import '../assets/css/okta';
  @import '~prismjs/themes/prism-solarizedlight.css';
</style>

