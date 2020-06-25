<template>
  <li>
    <a :href="link.path || '#' + link.slug" class="on-this-page-link" :class="{'router-link-active': imActive}" @click.prevent="clickLink">
      <span >{{link.title}}</span>
    </a>
    <ul v-if="link.children && (iHaveChildrenActive || imActive)">
      <OnThisPageItem v-for="(childLink, index) in link.children" :key="index" :link="childLink" :activeAnchor=activeAnchor />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'OnThisPageItem',
  props: ['link', 'activeAnchor'],
  data() {
    return {
      imActive: false,
      iHaveChildrenActive: false
    }
  },
  components: {
    OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
  },
  mounted() {
    this.setActiveData();
  },
  watch: {
    activeAnchor: function (val) {
      this.setActiveData();
    }
  },
  methods: {
    isActive: function( node ) {
      if(this.activeAnchor === null) {
        return false;
      }
      let anchor = this.activeAnchor.replace(/^#/, '');
      return (node.path && node.path == node.basePath + '#' + anchor) || (node.slug && node.slug == anchor);
    },
    setActiveData: function() {
      this.imActive = this.isActive(this.link);
      this.iHaveChildrenActive = (this.link.children || [] ).some( child => this.isActive(child) );
    },
    clickLink: function(e) {
      let hash = "";
      if(e.target.tagName.toLowerCase() === 'span') {
        hash = e.target.parentNode.hash
      }

      if(e.target.tagName.toLowerCase() === 'a') {
        hash = e.target.hash
      }
    
      if(hash) {
        const node = document.querySelector(hash);
        if(node) { // node is sometimes null - perhaps content hasn't loaded?
          window.scrollTo(0, node.offsetTop - document.querySelector('.fixed-header').clientHeight - 45);
        }
      }
    }
  }
}
</script>
