<template>
  <div class="okta-w-wrapper" >

    <style ref="styleContainer">
    </style>

    <div 
      id="widget-container"
    >
    </div>

  </div>
</template>

<script>
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
export default {
  name: 'LiveWidgetOktaWidget',
  props: ['configJS', 'configSCSS'],
  data(){
    return {
      rendered: true
    }
  },
  mounted: function() {
     import('@okta/okta-signin-widget').then(module => {
      this.$nextTick(function() {
        this.OktaSignIn = module.default;
        this.renderWidget()
        });
    });
  },
  watch: {
    configSCSS: function(){
      this.$refs.styleContainer.innerHTML = this.configSCSS
    },
    configJS: function(){
      this.renderWidget()
    }
  },
  destroyed () {
    this.widget ? this.widget.remove() : null;
  },
  methods:{
    renderWidget(){
      this.widget ? this.widget.remove() : null;
      this.widget = new this.OktaSignIn(this.configJS);

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
            }, 100);
          }
        });

      this.widget.renderEl({ el: '#widget-container' });
    }
  }
};
</script>
