<template>
  <div class="okta-w-wrapper" ref="mainWrapper" >
    <div id="widget-container" />
  </div>
</template>

<script>
export default {
  name: 'LiveWidgetOktaWidget',
  props: ['configJS', 'configSCSS'],
  data(){
    return {
      rendered: true,
      oktaSignIn: undefined,
    }
  },
  mounted: function() {
    import('@okta/okta-signin-widget').then(
      (module) => {
        this.oktaSignIn = module.default
        this.renderWidget()
      }
    )
  },
  watch: {
    configJS: function(){
      this.renderWidget()
    },
    configSCSS: function(){
      //vue ignores empty style tags, so it's need to be done "old way"
      if(this.configSCSS){
        const styleTagToRemove = document.getElementById('styletag')
        if (styleTagToRemove) { styleTagToRemove.remove()}
        const style = document.createElement('style')
        style.innerHTML = this.configSCSS
        style.id = 'styletag'
        this.$refs.mainWrapper.appendChild(style)
      }
    }
  },
  destroyed () {
    this.widget ? this.widget.remove() : null;
  },
  methods:{
    renderWidget(){
      this.widget ? this.widget.remove() : null;
      this.widget = new this.oktaSignIn(this.configJS);
      this.widget.on('afterRender', () => {
          if (this.rendered) {
            // Last focused element to return to
            const elementToFocus = (document.activeElement);
            setTimeout(() => {
              const activeElement = (document.activeElement);
              if (activeElement.id === 'okta-signin-password') {
                activeElement.blur();
                elementToFocus.focus();
              }
            }, 200);
          }
        });

      this.widget.renderEl({ el: '#widget-container' });
    }
  }
};
</script>
