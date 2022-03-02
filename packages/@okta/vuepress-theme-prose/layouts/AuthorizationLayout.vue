<template>
  <div class="authorization-layout layout">
    <div class="fixed-header">
      <Header />
    </div>

    <div class="page-body">
      <section class="authorization-layout--content">
        <Content />
      </section>
    </div>

    <div class="authorization-layout--footer">
      <Footer />
    </div>
    <portal-target name="dialog-wrapper"></portal-target>
  </div>
</template>

<script>
export default {
  components: {
    Footer: () => import("../components/Footer"),
    Header: () => import("../components/Header"),
    SmartLink: () => import("../components/SmartLink"),
  },
  data() {
    return {
      appContext: {
        isTreeNavMobileOpen: false,
        isInMobileViewport: false,
        treeNavDocs: []
      }
    };
  },
  provide() {
    return {
      appContext: this.appContext,
    };
  },
  mounted: function() {
    import("../util/pendo");
  },
};
</script>

<style lang="scss">
@import "../assets/css/prose";
</style>
