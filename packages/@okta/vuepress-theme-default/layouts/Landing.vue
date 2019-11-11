<template>
  <div class="Page okta-landing">
    <TopNavigation />
    <Breadcrumb />
    <section class="PageContent NoPaddingTop">
      <!-- START Page Content -->
      <div class="PageContent-main">
        <div class="landing-wrap">
          <div class="landing-page-content" >
            <Sidebar :oldNavigation=false />
            <div class="landing-content" :class="{'full-width': !showToc}">
              <Content />
            </div>
          </div>
        </div>
      </div>
      <!-- Begin Table Of Contents -->
      <TableOfContents v-if="showToc" class="TableOfContents"></TableOfContents>
      <!-- End Table Of Contents -->
      <!-- END Page Content -->
      
    </section>
    
    <Footer/>
  </div>
</template>

<script>
export default {
  components: {
    TopNavigation: () => import('../components/TopNavigation.vue'),
    Footer: () => import('../components/Footer.vue'),
    Sidebar: () => import('../components/Sidebar.vue'),
    TableOfContents: () => import('../components/TableOfContents.vue')
  },

  computed: {
    showToc () {
      if (this.$page.frontmatter.showToc === false) {
        return false;
      }

      if (this.$page.path.includes('/code/')) {
        return false;
      }

      return true;
    }
  }
}

</script>

<style lang="scss">
  @import '../assets/css/okta';
  @import '~prismjs/themes/prism-solarizedlight.css';
  .icon.outbound {
    display: none !important
  }
</style>
