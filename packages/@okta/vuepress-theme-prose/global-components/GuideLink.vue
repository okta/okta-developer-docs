<template>
  <router-link :to="target"><span><slot>link</slot></span></router-link>
</template>

<script>
  export default { 
    name: 'GuideLink',
    props: ['link'],
    computed: { 
      target() { 
        return this.link;
      },
    },
  };
</script>
