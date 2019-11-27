<template>
  <div>
    <div class="fixed-header">
      <TopBar />
      <Breadcrumb />
    </div>

    <div class="page-body">
      <div class="content">
        <div class="content--container">
          <div class="tree-nav">Tree Nav</div>
          <div class="content-area">
            <Content />
          </div>
          <div class="on-this-page">On This Page</div>
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