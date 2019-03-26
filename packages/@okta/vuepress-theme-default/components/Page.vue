<template>
  <section class="PageContent DynamicSidebar has-tableOfContents">
    <!-- Begin Sidebar -->
    <Sidebar />
    <!-- End Sidebar -->

    <!-- Begin Content -->
    <div class="PageContent-main">
      <Content />
    </div>
    <!-- End Content -->

    <!-- Begin Table Of Contents -->
    <TableOfContents v-if="showToc" class="TableOfContents"></TableOfContents>
    <!-- End Table Of Contents -->
  </section>
</template>

<script>
export default {
  components: {
    TableOfContents: () => import('./TableOfContents.vue'),
    Sidebar: () => import('./Sidebar.vue')
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
