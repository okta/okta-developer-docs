<template>
  <textarea disabled ref="codemirrorscss" name="codemirrorscss" id="codemirrorscss"></textarea>
</template>

<script>
import 'codemirror/lib/codemirror.css';
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
    this.codemirror.on('change', ()=> {
      console.log(this.codemirror.value)
    })
  },
  data() {
    return {
     code: this.initialConfig,
     cmOptions: {
        lineNumbers: true,
        mode: 'sass',
        theme: 'neat',
        styleActiveLine: true,
        smatchBrackets: true,
        readOnly: false,
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
  },
};
</script>
