<template>
  <textarea disabled ref="codemirrorjs" name="codemirrorjs" id="codemirrorjs"></textarea>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/neat.css';
import 'codemirror/addon/lint/lint.css'

import {JSHINT} from 'jshint'

export default {
  name: 'LiveWidgetJSCodeMirror',
  props: ['initialConfig'],
  mounted: async function() {
    // load side effects for code mirror, linter, matchbrackets, etc. 
    await import('codemirror/mode/javascript/javascript.js');
    await import('codemirror/addon/lint/lint')
    await import('codemirror/addon/lint/javascript-lint')
    await import('codemirror/addon/edit/matchbrackets')
    window.JSHINT = JSHINT
    // load codemirror
    const module = await import('codemirror');
    const CodeMirror = module.default;
    this.codemirror = CodeMirror.fromTextArea(this.$refs.codemirrorjs, this.cmOptions);
    this.codemirror.setValue(this.code);
    this.codemirror.setOption('mode',  'javascript');
    //emit cm value for
    this.codemirror.on('change', this.emitCMValue)
  },
  data() {
    return {
     code: this.initialConfig,
     cmOptions: {
        	lineNumbers: true,
          mode: {
            name: 'javascript',
            json: true
          },
    	    gutters: ["CodeMirror-lint-markers"],
    	    lint: true,
    	    matchBrackets: true,
          theme: 'neat',
      },
    };
  },
  beforeDestroy: function() {
    this.destroyCm();
  },
  methods: {
    destroyCm() {
      const element = this.codemirror.doc.cm.getWrapperElement();
      element && element.remove && element.remove();
    },
    emitCMValue(){
      console.log(this.codemirror)
      this.$emit('cmJSValueSet', this.codemirror.getValue())
    }
  },
};
</script>
