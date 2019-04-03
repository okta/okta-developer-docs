<template>
  <div class="framework-icon-block">
    <span v-for="icon in icons"><i :class="icon.css" :title="icon.title"></i></span>
  </div>
</template>

<script>
  import { commonify, fancify, iconify, cssForIcon } from '../util/frameworks';
  export default {
    name: 'FrameworkIconBlock',
    props: ['frameworks'],
    computed: { 
      icons() { 
        return this.frameworks
          .map( framework => commonify(framework) )
          .map( 
            framework => ({
              framework, 
              title: fancify(framework),
              css: cssForIcon(framework)
              })
            );
      },
    },
  }
</script>

