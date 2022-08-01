<template>
  <div>
    Custom Landing Page - {{title}}
  </div>
</template>

<script>
	export default {
    name: 'CustomLandingPage',
    inject: ["appContext"],
    data() {
      return {
        title: '',
      }
    },
    mounted() {
      this.getContent(this.appContext.treeNavDocs);
    },
    watch: {
      $route(to, from) {
        if (from.path !== to.path) {
          this.getContent(this.appContext.treeNavDocs);
        }
      },
    },
    methods: {
      getContent(navigation) {
        for (let el of navigation) {
          if (!!window && el.path && el.path == window.location.pathname) {
            document.title = el.title + ' | ' + this.$site.title;
            this.title = el.title;
            break;
          }
          if (el.subLinks && el.subLinks.length > 0) {
            this.getContent(el.subLinks);
          }
        }
      },
    }
  }
</script>