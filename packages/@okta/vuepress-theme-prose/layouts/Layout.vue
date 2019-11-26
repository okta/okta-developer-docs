<template>
  <div>
    <div class="fixed-header">
      <TopBar />
      <Breadcrumb />
    </div>

    <div class="page-body">
      <div class="content">
        <div class="content--container">
          <Content />
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
    Breadcrumb: () => import('../components/Breadcrumb.vue'),
    Footer: () => import('../components/Footer.vue'),
  }
}
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>