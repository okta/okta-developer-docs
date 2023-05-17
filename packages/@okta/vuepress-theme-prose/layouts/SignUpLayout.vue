<template>
  <div class="authorization-layout layout">
    <div class="fixed-header">
      <Header />
    </div>
    <Content />
    <div class="authorization-layout--footer">
      <Footer />
    </div>
    <portal-target name="dialog-wrapper" />
  </div>
</template>

<script>

export default {
  components: {
    Footer: () => import("../components/Footer"),
    Header: () => import("../components/Header"),
    SmartLink: () => import("../components/SmartLink"),
  },
  mounted: function() {
    import("../util/pendo");
  },
};
</script>

<style lang="scss">
@import "../assets/css/prose";
</style>
