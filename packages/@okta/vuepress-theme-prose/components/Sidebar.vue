<template>
  <aside class="landing-navigation" :class="{active: sidebarActive}">
    <ul class="landing">
      <SidebarItem v-for="(link, key) in navigation" :key="key" :link="link" />
    </ul>
  </aside>

</template>

<script>
  import _ from 'lodash';
  export default {
    name: 'Sidebar',
    components: {
      SidebarItem: () => import('../components/SidebarItem.vue'),
    },
    data() {
      return {
        sidebarActive: false,
        usingFile: false
      }
    },
    mounted() {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
      this.$parent.$on('toggle-tree-nav', event => {
        this.sidebarActive = event.treeNavOpen;
      });
      
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
      navigation() {
        if (this.$page.path.includes('/code/')) {
          this.usingFile = true;
          return this.$site.themeConfig.sidebars.codePages
        }
        if (this.$page.path.includes('/docs/reference/')) {
          this.usingFile = true;
          return this.$site.themeConfig.sidebars.reference
        } 
        if (this.$page.path.includes('/docs/concepts/')) {
          const conceptsRegex = /(\/docs\/concepts\/)[A-Za-z-]*\/$/;
          return _.chain(this.$site.pages)
          .filter(page => page.path.match(conceptsRegex))
          .sortBy(page => page.title)
          .sort()
          .unshift( { title: 'Concepts', path: '/docs/concepts/'} )
          .value();
        }
        if (this.$page.path.includes('/books/')) {
          const booksRegex = /(\/books\/)[A-Za-z-]*\/$/;
          return _.chain(this.$site.pages)
          .filter(page => page.path.match(booksRegex))
          .sortBy(page => page.title)
          .sort()
          .value();
        }
      }
    },
    
    methods: {
      toggleSubNav: function (event) {
        const parent = event.target.parentElement;
        const sections = parent.querySelector('.sections');
        if( !sections ) {
          return;
        }
        event.preventDefault();
      },
      handleScroll: function (event) {
        let maxHeight = window.innerHeight - document.querySelector('.fixed-header').clientHeight - 60;
        
        document.querySelector('.landing-navigation').style.height = maxHeight + 'px';
      }
    }
  }
</script>