<template>
  <li>
    <a :href="link.path || '#' + link.slug" class="on-this-page-link" :class="{'router-link-active': imActive}" @click.prevent="clickLink">
      <span >{{link.title}}</span>
    </a>
    <ul v-show="link.children && (iHaveChildrenActive || imActive)">
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
    hasActiveChildren(node) {
      let hasActiveChildren = false;
      if (node.children) {
        hasActiveChildren |= node.children.some(this.hasActiveChildren)
      }
      return hasActiveChildren || this.isActive(node);
    },
    setActiveData: function() {
      this.imActive = this.isActive(this.link);
      this.iHaveChildrenActive = this.hasActiveChildren(this.link);
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
        if(node && decodeURIComponent(this.$route.hash) !== decodeURIComponent(hash)) { // node is sometimes null - perhaps content hasn't loaded?
          this.$router.push(hash)
        }
      }
    }
  }
}
</script>
