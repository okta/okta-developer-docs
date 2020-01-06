<template>
  <div>
    <div class="fixed-header">
      <TopBar />
      <Breadcrumb />
    </div>

    <div class="page-body">
      <div class="content">
        <div class="content--container">
          <div class="content-area">
            <GuideDetails
              v-if="section && section.componentKey"
              :sectionName="sectionName"
              :guideName="guideName"
              :framework="framework"
            />
            <div v-else>
              <GuidesOverview :featured="featured"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

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
      TopBar: () => import('../components/TopBar.vue'),
      Breadcrumb: () => import('../components/Breadcrumb.vue'),
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
          let hasChanged = false;

          if( !framework && guide.mainFramework )  { 
            framework = guide.mainFramework;
            hasChanged = !!framework;
          }

          if( !sectionName ) { 
            sectionName = guide.order[0];
            hasChanged = hasChanged || !!sectionName;
          }

          if(window && hasChanged) {
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
  @import '../assets/css/prose';
  .icon.outbound {
    display: none !important
  }
</style>

<style>

  
</style>
