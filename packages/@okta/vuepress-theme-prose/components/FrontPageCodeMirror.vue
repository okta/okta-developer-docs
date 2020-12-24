<template>
  <textarea disabled ref="codemirror" name="codemirror" id="codemirror"></textarea>
</template>

<script>

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

export default {
  name: 'FrontPageCodeMirror',
  components: {
  },
  mounted: function(){
    //load side effects for code mode
    (async () => {
            await import('codemirror/mode/javascript/javascript.js');
      })()
    //load codemirror
    import('codemirror').then(
      module=> {
        const CodeMirror = module.default
        this.codemirror = CodeMirror.fromTextArea(this.$refs.codemirror, this.cmOptions)
        this.codemirror.setValue(this.widgetCode)
        this.codemirror.setOption('mode',  'javascript')
      })
    },
  data (){
    return{
     dedent: null,
     widgetCode:`
      // Uses okta-signin-widget version 3.8.1

      var widget = new OktaSignIn({
        baseUrl: "{{yourOktaDomain}}",
        logo: "/sites/all/themes/developer/owb/alliance.png",
        i18n: {
          // Overriding English properties
          en: {
            "primaryauth.title": "Alliance Authentication",
            "primaryauth.submit": "Sign In"
          },
        },
        
      });
      widget.renderEl({
        el: "#widget-container"
      });`,
      cmOptions:{
        lineNumbers: true,
        mode: 'text/javascript',
        theme: 'base16-dark',
        styleActiveLine: true,
        readOnly: true,
      }
    }
  },
  beforeDestroy: function() {
        this.destroyCm()    
  },
  methods: {
    destroyCm(){
      const element = this.codemirror.doc.cm.getWrapperElement()
      element && element.remove && element.remove()
    }
  }
}

</script>