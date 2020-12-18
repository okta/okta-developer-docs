<template>
  <div class="authorization-layout">
    <div class="authorization-layout--header">
      <a href="https://www.okta.com/" rel="noopener noreferrer">
      <img src="/img/authorization/logo-okta.svg" alt="">
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
  }
}
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>
