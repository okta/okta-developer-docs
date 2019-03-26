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
          :lang="lang"
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
    guideFromHash,
    findGuides,
    findGuideSections
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
        lang: null,
        section: null,
        sections: [],
        currentHash: null,
      };    
    },
    computed: { 
      featured() { 
        return this.$frontmatter.featured;
      },
    },
    methods: { 
      updateHash() { 
        this.currentHash = window.location.hash = window.location.hash || '';
      },
    },
    beforeMount() {
      this.updateHash();
    },
    
    watch: {
      currentHash() {
        const { guide, lang, sectionNum } = guideFromHash(this.currentHash);
        const pages = this.$site.pages;
        const sections = findGuideSections({ guide, pages });
        const section = sections[sectionNum-1 || 0];

        this.sections = sections;
        this.section = section;
        this.guide = guide;
        this.lang = lang;
      },

      '$route' (to, from) {  
        this.updateHash();
      },
    }
  }

</script>

<style lang="scss">
  @import '../assets/css/okta';
  @import '~prismjs/themes/prism-solarizedlight.css';
</style>

