<template>
  <li>
    <a :href="link.path" class="on-this-page-link" :class="{'router-link-active': imActive}" @click.prevent="clickLink">
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
  },
  watch: {
    $route(to, from){
      this.setActiveData(to.hash)
     },
    activeAnchor(){
      this.setActiveData()
    }
  },
  methods: {
    calculateLinkHash: function(link){
      const linkPathDeconstructed = link.path.split('/');
      return linkPathDeconstructed[linkPathDeconstructed.length-1];
    },
    isLinkActive: function( node, toLinkHash = this.$route.hash) {
      const nodeHash = this.calculateLinkHash(node)
      // console.log('CALCULATED NODEHASH', nodeHash)
      if (toLinkHash === nodeHash) {
        return true;
      }
      if(this.activeAnchor && this.activeAnchor === nodeHash){ 
        return true;
      }
      return false;
    },
    setActiveData: function(toHash = null) {
      this.linkHash = this.calculateLinkHash(this.link)
      const currentHash = this.activeAnchor || toHash || this.$route.hash
      console.log('CURRENT HASH', currentHash)
      console.log(this.isLinkActive(this.link, currentHash))
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
