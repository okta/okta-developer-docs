<template>
  <div class="framework-icon-block">
    <i 
      :class="icon.css" 
      :title="icon.title"
      v-for="icon in icons" 
      :key="icon" 
    >
    </i>
  </div>
</template>

<script>
  import { commonify, fancify, cssForIcon } from '../util/frameworks';
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

