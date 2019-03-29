<template>
  <div :class="pageClasses">
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
    Code: () => import('../components/Code.vue'),
    PromoBanner: () => import('../components/PromoBanner.vue')
  },
  mounted () {
    window.addEventListener('load', () => {

        let anchor = window.location.href.split('#')[1]
        if (anchor) {
          let target = document.getElementById(anchor)
          if (target) {
            window.scrollTo(0, (target.offsetTop - 90))
          }
        }

      let links = document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href*="/quickstart/#"])')

      Array.from(links).forEach((link) => {
        link.addEventListener('click', function(event) {
          event.preventDefault()
          let target = document.querySelector(this.hash)
          if(target) {
            window.scrollTo(0, (target.offsetTop - 90))
          }

        })
      })
    })



  },
  computed: {
    isDocsPage() {
      return this.$page.path.includes('/docs/api/resources/') || this.$page.path.includes('/test_page')
    },

    pageClasses() {
      if (this.$page.path.includes('/docs/api/resources/') ||
      this.$page.path.includes('/code/')) {
        return 'Page Page--docs-page'
      }

      if (this.$page.path.includes('/test_page')) {
        return 'Page test-page Page--docs-page'
      }

      return 'PageWrap Page'
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
