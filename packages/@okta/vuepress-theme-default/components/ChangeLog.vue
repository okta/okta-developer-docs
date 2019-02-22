<template>
  <section class="PageContent DynamicSidebar has-tableOfContents">
    <!-- Begin Sidebar -->
    <aside class="Sidebar"></aside>
    <!-- End Sidebar -->

    <!-- Begin Content -->
    <Content class="PageContent-main"/>
    <!-- End Content -->

    <!-- Begin Table Of Contents -->
    <TableOfContents class="TableOfContents" :items="tableOfContentsItems"></TableOfContents>
    <!-- End Table Of Contents -->
  </section>
</template>

<script>
export default {
  components: {
    TableOfContents: () => import('./TableOfContents.vue')
  },
  computed: {
    tableOfContentsItems () {
      console.log(this.$page.headers)
      return [
        "1",
        "2"
      ]
    }
  }
}
</script>
