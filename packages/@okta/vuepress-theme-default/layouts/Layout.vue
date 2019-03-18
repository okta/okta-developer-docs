<template>
  <div class="PageWrap Page"
  :class="{
    'Page--docs-page': isDocsPage
       }"
  >
    <!-- Begin Header -->
    <TopNavigation></TopNavigation>
    <!-- End Header -->


    <!-- Begin Promo Banner -->
    <PromoBanner />
    <!-- End Promo Banner -->


    <!-- Begin Page Content -->
    <component v-if="$page.frontmatter.component" :is="$page.frontmatter.component" />
    <Page v-else />
    <!-- End Page Content -->


    <!-- Begin Footer -->
    <Footer />
    <!-- End Footer -->
  </div>
</template>

<script>
export default {
  components: {
    TopNavigation: () => import('../components/TopNavigation.vue'),
    Footer: () => import('../components/Footer.vue'),
    Documentation: () => import('../components/Documentation.vue'),
    Page: () => import('../components/Page.vue'),
    ChangeLog: () => import('../components/ChangeLog.vue'),
    PromoBanner: () => import('../components/PromoBanner.vue')
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  computed: {
    isDocsPage() {
      return this.$page.path.includes('/docs/api/resources/') || this.$page.path.includes('/test_page')
    }
  }
}

</script>

<style lang="scss">
  @import '../assets/css/okta';
  @import '~prismjs/themes/prism-solarizedlight.css';

</style>
