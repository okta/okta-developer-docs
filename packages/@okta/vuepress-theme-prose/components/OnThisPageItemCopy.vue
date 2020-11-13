<template>
  <li>
    <a :href="linkHash" class="on-this-page-link" :class="{'router-link-active': imActive}" @click.prevent="clickLink">
      {{link.title}}
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
  props: ['link', ],
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
  },
  watch: {
    $route(to, from){
      this.imActive = this.isLinkActive(this.link, to.hash)
     },
    activeAnchor(){
      this.imActive = this.isLinkActive(this.link, this.activeAnchor)
    }
  },
  methods: {
    calculateLinkHash: function(link){
      if (link.path) {
          const linkPathDeconstructed = link.path.split('/');
          return linkPathDeconstructed[linkPathDeconstructed.length-1];
      } else {
        return `#${link.slug}`
      }
    },
    isLinkActive: function( node, toLinkHash = this.$route.hash) {
      const nodeHash = this.calculateLinkHash(node)
      if (toLinkHash === nodeHash) {
        return true;
      }
      if(this.activeAnchor && this.activeAnchor === nodeHash){ 
        return true;
      }
      return false;
    },
    setActiveData: function() {
      this.linkHash = this.calculateLinkHash(this.link)
      const currentHash =  this.$route.hash || this.activeAnchor;
      this.imActive = this.isLinkActive(this.link, currentHash);
      this.iHaveChildrenActive = (this.link.children || [] ).some( child => this.isLinkActive(child, currentHash));
    },
    clickLink: function(e) {
      if(this.linkHash) {
        const node = document.querySelector(this.linkHash);
        if(node) { // node is sometimes null - perhaps content hasn't loaded?
          this.$router.push(this.linkHash)
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
