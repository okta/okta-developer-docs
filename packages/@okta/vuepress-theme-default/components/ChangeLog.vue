<template>
  <section class="PageContent DynamicSidebar has-tableOfContents">
    <!-- Begin Sidebar -->
    <Sidebar />
    <!-- End Sidebar -->

    <!-- Begin Content -->
    <Content class="PageContent-main"/>
    <!-- End Content -->

  </section>
</template>

<script>
export default {
  components: {
    Sidebar: () => import('./Sidebar.vue')
  }
}
</script>
