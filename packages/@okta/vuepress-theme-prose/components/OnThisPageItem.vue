<template>
  <li>
    <span class="on-this-page-link" :class="{'router-link-active': link.imActive, 'is-child': link.level}" v-on:click="$emit('emit-hash', link.hash)">
      {{link.title}}
    </span>
  </li>
</template>

<script>
import { LAYOUT_CONSTANTS } from '../layouts/Layout.vue';
export default {
  name: 'OnThisPageItem',
  props: ['link'],
  data() {
    return {
      imActive: false,
      iHaveChildrenActive: false,
      linkHash: '',
    }
  },
  methods: {
  //   emitHash: function(){
  //     this.$emit(this.link.hash);
  //   },
  //   calculateLinkHash: function(link){
  //     if (link.path) {
  //         const linkPathDeconstructed = link.path.split('/');
  //         return linkPathDeconstructed[linkPathDeconstructed.length-1];
  //     } else {
  //       return `#${link.slug}`
  //     }
  //   },
  //   isLinkActive: function( node, toLinkHash = this.$route.hash) {
  //     const nodeHash = this.calculateLinkHash(node)
  //     if (toLinkHash === nodeHash) {
  //       return true;
  //     }
  //     if(this.activeAnchor && this.activeAnchor === nodeHash){ 
  //       return true;
  //     }
  //     return false;
  //   },
  //   clickLink: function(e) {
  //     if(this.linkHash) {
  //       const node = document.querySelector(this.linkHash);
  //       if(node) { // node is sometimes null - perhaps content hasn't loaded?
  //         this.$router.push(this.linkHash)
  //         const scrollToPosition = node.offsetTop - document.querySelector('.fixed-header').clientHeight - LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
  //         window.scrollTo(0, scrollToPosition);
  //         // Chrome & Safari: when zoomed in/out, window.scrollTo does not always perform scroll strictly equal to passed parameter
  //         // https://bugs.chromium.org/p/chromium/issues/detail?id=890345
  //         if(window.scrollY < scrollToPosition) {
  //           const scrollAlignment = 2;
  //           window.scrollBy(0, scrollAlignment);
  //         }
  //       }
  //     }
  //   }
  }
  }
</script>
