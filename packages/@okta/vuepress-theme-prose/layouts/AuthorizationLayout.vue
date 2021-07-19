<template>
  <div class="authorization-layout">
    <header class="authorization-layout--header page-header">
      <SmartLink :item="{ link: '/' }" class="header--logo">
        <img src="/img/icons/okta-developer.svg" />
      </SmartLink>
    </header>

    <section class="authorization-layout--content">
      <Content />
    </section>

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
