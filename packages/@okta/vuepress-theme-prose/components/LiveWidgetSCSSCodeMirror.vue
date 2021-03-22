<template>
  <textarea disabled ref="codemirrorscss" name="codemirrorscss" id="codemirrorscss"></textarea>
</template>

<script>
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css'
import 'codemirror/theme/neat.css';

export default {
  name: 'LiveWidgetSCSSCodeMirror',
  props: ['initialConfig'],
  mounted: async function() {
    // load side effects for code mirror
    await import('codemirror/mode/javascript/javascript.js');

    // load codemirror
    const module = await import('codemirror');
    const CodeMirror = module.default;
    this.codemirror = CodeMirror.fromTextArea(this.$refs.codemirrorscss, this.cmOptions);
    this.codemirror.setValue(this.code);
    this.codemirror.setOption('mode',  'javascript');
    this.codemirror.on('change', this.emitCSS)
  },
  data() {
    return {
     code: this.initialConfig,
     cmOptions: {
        lineNumbers: true,
        mode: 'sass',
        theme: 'neat',
        styleActiveLine: true,
        matchBrackets: true,
        gutters: ["CodeMirror-lint-markers"],
        readOnly: false,
      },
    };
  },
  beforeDestroy: function() {
    this.destroyCm();
  },
  methods: {
    emitCSS(){
      this.$emit('cmCSSValueSet', this.codemirror.getValue())
    },
    destroyCm() {
      const element = this.codemirror.doc.cm.getWrapperElement();
      element && element.remove && element.remove();
    },
  },
};
</script>
