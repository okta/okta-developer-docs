<template>
  <div>
    <div class="fixed-header">
      <TopBar />
      <Breadcrumb />
    </div>

    <div class="page-body">
      <div class="content">
        <div class="content--container">
          <div class="tree-nav">
            <Sidebar />
          </div>
          <div class="content-area">
            <PageTitle />
            <MobileOnThisPage />
            <Content />
          </div>
          <div class="on-this-page">
            <OnThisPage />
          </div>
        </div>
      </div>
    </div>

    <Footer />

  </div>
</template>

<script>
export default {
  components: {
    TopBar: () => import('../components/TopBar.vue'),
    Sidebar: () => import('../components/Sidebar.vue'),
    OnThisPage: () => import('../components/OnThisPage.vue'),
    MobileOnThisPage: () => import('../components/MobileOnThisPage.vue'),
    PageTitle: () => import('../components/PageTitle.vue'),
    Breadcrumb: () => import('../components/Breadcrumb.vue'),
    Footer: () => import('../components/Footer.vue'),
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>