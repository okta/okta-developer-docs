<template>
  <div class="framework-icon-block">
    <span v-for="icon in icons"><i :class="icon.css" :title="icon.title"></i></span>
  </div>
</template>

<script>
  import { commonify, fancify } from '../util/frameworks';
  export default {
    name: 'FrameworkIconBlock',
    props: ['frameworks'],
    computed: { 
      icons() { 
        return this.frameworks
          .map( framework => commonify[framework] )
          .map( 
            framework => ({
              framework, 
              title: fancify[framework],
              icon: `code-${framework}-32`,
              css: `icon code-${framework}-32`
              })
            );
      },
    },
  }
</script>

