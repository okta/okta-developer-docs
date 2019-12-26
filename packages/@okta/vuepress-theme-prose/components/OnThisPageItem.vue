<template>
  <li>
    <RouterLink :to="link.path || '#' + link.slug" class="on-this-page-link" :class="{'router-link-active': imActive}">
      <span @click.prevent="clickLink">{{link.title}}</span>
    </RouterLink>
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
      if(e.target && e.target.parentNode && e.target.parentNode.hash) {
        window.scrollTo(0, document.querySelector(e.target.parentNode.hash).offsetTop - document.querySelector('.fixed-header').clientHeight - 45);
        return;
      }
      console.error('No header found for this link');
    }
  }
}
</script>