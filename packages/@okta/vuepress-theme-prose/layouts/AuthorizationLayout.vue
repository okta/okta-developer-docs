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
  mounted: async function() {
    await (function(apiKey){
          (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
          v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
              o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
              y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
              z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
              pendo.initialize({
                  visitor: {},
                  account: {}
              });
          }
          )('f8bd2822-002a-478f-66a9-0178efd7ee1f');
  }
}
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>
