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
import { LAYOUT_CONSTANTS } from '../layouts/Layout.vue';
export default {
  name: 'OnThisPageItem',
  props: ['link', 'activeAnchor'],
  data() {
    return {
      imActive: false,
      iHaveChildrenActive: false,
      linkHash: '',
    }
  },
  components: {
    OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
  },
  mounted() {
    this.setActiveData();
    this.calculateLinkHash();
  },
  watch: {
    $route(to, from){
     this.imActive = this.isLinkActive(this.link, to.hash)
    },
    activeAnchor(){
      if(this.activeAnchor){
        // this.$router.push(this.activeAnchor)
        this.imActive = this.isLinkActive(this.link)
      }
    }
  },
  methods: {
    calculateLinkHash: function(link){
      const linkPathDeconstructed = this.link.path.split('/');
      this.linkHash = linkPathDeconstructed[linkPathDeconstructed.length-1];
    },
    isLinkActive: function( node, toLinkHash = null  ) {
      if(this.activeAnchor && this.activeAnchor === this.linkHash){ 
        return true 
      }
      if(toLinkHash && toLinkHash === this.linkHash) {
        return true;
      }
      return false;
    },
    setActiveData: function() {
      const currentHash = this.activeAnchor || this.$route.hash
      this.imActive = this.isLinkActive(this.link);
      this.iHaveChildrenActive = (this.link.children || [] ).some( child => this.isLinkActive(child) );
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
          this.$router.push(hash)
          const scrollToPosition = node.offsetTop - document.querySelector('.fixed-header').clientHeight - LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
          window.scrollTo(0, scrollToPosition);
          // Chrome & Safari: when zoomed in/out, window.scrollTo does not always perform scroll strictly equal to passed parameter
          // https://bugs.chromium.org/p/chromium/issues/detail?id=890345
          if(window.scrollY < scrollToPosition) {
            const scrollAlignment = 2;
            window.scrollBy(0, scrollAlignment);
          }
        }
      }
    }
  }
}
</script>
