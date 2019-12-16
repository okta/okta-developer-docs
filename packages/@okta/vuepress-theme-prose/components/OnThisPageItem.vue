<template>
  <li v-on:activeLink="activeLinkChange">
    <RouterLink :to="link.path || '#' + link.slug" class="on-this-page-link" :class="{'router-link-active': isHashActive(link) || childActive}" >
      {{link.title}}
    </RouterLink>
    <ul v-if="link.children">
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
      childActive: false,
      activeHashLink: null
    }
  },
  components: {
    OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
  },
  mounted() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);
    this.$on('childIsActive', function(e) {
      console.log(e);
      this.childActive = true;
    });
    
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function (event) {
      let maxHeight = document.querySelector('.on-this-page').clientHeight - window.scrollY
      if(maxHeight > window.innerHeight) {
        maxHeight = window.innerHeight - document.querySelector('.fixed-header').clientHeight - 60;
      }
      document.querySelector('.on-this-page-navigation').style.height = maxHeight + 'px';
 
    },

    isHashActive: function (link) {
      if( this.activeAnchor === null ) {
        return false;
      }

      if( link.path ) {
        console.log(link.path, this.activeAnchor, link.path.includes(this.activeAnchor));
        
        if(link.path.includes(this.activeAnchor)) {
          this.$parent.$emit('childIsActive', link);
          return true;
        }
      }

      if( link.slug ) {
        // Remove the # from the string
        let anchor = this.activeAnchor.replace(/^#/, '');
        if( link.slug == anchor ) {
          this.$parent.$emit('childIsActive', link, this.parent);
          return true;
        }
      }

      return false;
    },

    hasChildActive: function () {
      return false;
    },

    activeLinkChange: function (link) {
      console.log(link);
    }
  }
}
</script>