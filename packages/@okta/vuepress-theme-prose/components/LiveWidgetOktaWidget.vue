<template>
  <div class="okta-w-wrapper" ref="mainWrapper" >
    <div id="widget-container" />
  </div>
</template>

<script>
import {LIVE_WIDGET_DYNAMIC_STYLE_ID} from  '../const/live-widget.const'
export default {
  name: 'LiveWidgetOktaWidget',
  props: ['configJS', 'configSCSS'],
  data(){
    return {
      rendered: false,
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
        const styleTagToRemove = document.getElementById(LIVE_WIDGET_DYNAMIC_STYLE_ID)
        if (styleTagToRemove) { styleTagToRemove.remove()}
        const style = document.createElement('style')
        style.innerHTML = this.configSCSS
        style.id = LIVE_WIDGET_DYNAMIC_STYLE_ID
        this.$refs.mainWrapper.appendChild(style)
      }
    }
  },
  destroyed () {
    this.destroyWidget();
  },
  methods:{
    renderWidget(){
      this.destroyWidget()
      this.widget = new this.oktaSignIn(this.configJS);
      this.widget.on('afterRender', () => {
          if (this.rendered) {
            // Last focused element to return to
            const elementToFocus = (document.activeElement);
            setTimeout(() => {
              const activeElement = (document.activeElement);
              if (activeElement.id === 'okta-signin-username') {
                activeElement.blur();
                elementToFocus.focus();
              }
            }, 200);
          }
        });
      this.widget.renderEl({ el: '#widget-container' });
      this.rendered = true;
    },
    destroyWidget(){
      if (this.widget) {
        this.widget.remove();
      }
    }
  },

};
</script>
