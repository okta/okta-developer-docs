<template>
  <section class="PageContent DynamicSidebar has-tableOfContents">
    <!-- Begin Sidebar -->
    <aside class="Sidebar"></aside>
    <!-- End Sidebar -->

    <!-- Begin Content -->
    <Content class="PageContent-main"/>
    <!-- End Content -->

    <!-- Begin Table Of Contents -->
    <TableOfContents class="TableOfContents" :items="toc"></TableOfContents>
    <!-- End Table Of Contents -->
  </section>
</template>

<script>

  import _ from "lodash"
export default {
  components: {
    TableOfContents: () => import('./TableOfContents.vue')
  },

  computed: {

    toc () {
      let pages = this.$site.pages
        .filter(pages => pages.path.startsWith("/docs/change-log/2"))

      pages =  _.orderBy(pages, 'path').reverse()

      return Array.from(pages).map(page => {


        return  {
          level: page.headers[0].level,
          title: page.headers[0].title,
          href: '#'+page.headers[0].slug,
          display: ''
        }
      })
    }
  }
}
</script>
