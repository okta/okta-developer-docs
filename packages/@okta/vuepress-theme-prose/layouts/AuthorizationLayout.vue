<template>
  <div class="authorization-layout">
    <div class="authorization-layout--header">
      <a href="/">
      <img src="/img/icons/okta-developer.svg" alt="Okta Developer Logo"/>
      </a>
    </div>

    <section class="authorization-layout--content">
      <Content />
    </section>

    <div class="authorization-layout--footer">
      <img src="/img/authorization/bg-image.png" alt="">
      <Footer />
    </div>

  </div>
</template>

<script>

export default {
  components: {
    Footer: () => import('../components/Footer.redesign')
  },
  mounted: function() {
       import('../util/pendo');
  }
}
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>
