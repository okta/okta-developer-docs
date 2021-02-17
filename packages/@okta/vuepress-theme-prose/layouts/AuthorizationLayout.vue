<template>
  <div class="authorization-layout">
    <div class="authorization-layout--header">
      <SmartLink :item="{ link: '/' }">
        <img src="/img/icons/okta-developer.svg" />
      </SmartLink>
    </div>

    <section class="authorization-layout--content">
      <Content />
    </section>

    <div class="authorization-layout--footer">
      <img src="/img/authorization/bg-image.png" alt="" />
      <Footer />
    </div>
    <portal-target name="dialog-wrapper"></portal-target>
  </div>
</template>

<script>
export default {
  components: {
    Footer: () => import("../components/Footer.redesign"),
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
