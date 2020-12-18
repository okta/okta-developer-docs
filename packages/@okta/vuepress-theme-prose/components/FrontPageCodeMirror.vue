<template>
  <codemirror 
    ref="myCm" 
    :value="widgetCode"
    :options="cmOptions"
    >
  </codemirror>
</template>

<script>

import dedent from 'dedent'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'

export default {
  name: 'FrontPageCodeMirror',
  components: {
    codemirror
  },
  data (){
    return{
      widgetCode: dedent`
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
      }
    }
  }
}

</script>