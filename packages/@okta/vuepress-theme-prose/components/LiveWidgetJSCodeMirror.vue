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
    this.codeMirror = CodeMirror.fromTextArea(this.$refs.codemirrorjs, this.cmOptions);
    this.codeMirror.setValue(this.code);
    this.codeMirror.setOption('mode',  'javascript');
    //add handler to change event of codemirror
    this.codeMirror.on('change', this.emitCMValue)
  },
  data() {
    return {
     code: this.initialConfig,
     typingDelayTimer: undefined,
     emitDelay: 800,
     lintErrors: [],
     cmOptions: {
        	lineNumbers: true,
          mode: {
            name: 'javascript',
            json: true
          },
    	    gutters: ["CodeMirror-lint-markers"],
    	    lint: {
            onUpdateLinting: (annotationsNotSorted, annotations, cm)=> this.onUpdateLinting(annotationsNotSorted, annotations, cm),
            options: { }
          },
    	    matchBrackets: true,
          theme: 'neat',
      },
    };
  },
  watch: {
    lintErrors: function(){
      console.log('LINT ERRORS UPDATED')
      console.log(this.lintErrors)
    }
  },
  beforeDestroy: function() {
    this.destroyCm();
  },
  methods: {
    destroyCm() {
      const element = this.codeMirror.doc.cm.getWrapperElement();
      element && element.remove && element.remove();
    },
    onUpdateLinting(annotationsNotSorted, annotations, cm) {
            this.lintErrors = annotationsNotSorted;
    },
    emitCMValue(){
      if (this.lintErrors.length !==0 ) {
        return
      }
      if(this.typingDelayTimer){
        clearTimeout(this.typingDelayTimer)
      }
      this.typingDelayTimer = setTimeout(()=>{
          this.$emit('cmJSValueSet', this.codeMirror.getValue())
      }, this.emitDelay);   
    }
  },
};
</script>
