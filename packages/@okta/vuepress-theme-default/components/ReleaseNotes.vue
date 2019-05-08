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

  </section>
</template>

<script>
export default {
  components: {
    Sidebar: () => import('./Sidebar.vue')
  }
}
</script>
