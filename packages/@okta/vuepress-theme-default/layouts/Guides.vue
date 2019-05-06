<template>
  <div class="Page okta-guides">
    <TopNavigation />
    <section class="PageContent">
      <!-- START Page Content -->
      <div class="PageContent-main" id="guides-body">
        <GuideDetails
          v-if="section && section.componentKey"
          :sectionName="sectionName"
          :guideName="guideName"
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
    getGuidesInfo,
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
        section: null,
        guideName: null,
        guides: null,
        featured: null,
        framework: null,
        sectionName: null,
        currentPath: null,
      };
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
        let { guideName, framework, sectionName } = guideFromPath(this.currentPath);
        const pages = this.$site.pages;
        const guides = getGuidesInfo({pages});
        const guide = guides.byName[guideName];

        if(guideName && (!framework || !sectionName)) {
          framework = framework || guide.mainFramework;
          sectionName = sectionName || guide.order[0];

          if(window) {
            window.location.pathname = makeGuidePath({ guideName, framework, sectionName });
          }
        }

        this.featured = guides.featured;
        this.sectionName  = sectionName;
        this.section = sectionName && guide.sectionByName[sectionName];
        this.guideName = guideName;
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
  .icon.outbound {
    display: none !important
  }
</style>
