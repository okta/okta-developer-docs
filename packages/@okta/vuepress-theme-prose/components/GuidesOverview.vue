<template>
  <div class="content--container">
    <div class="tree-nav">
      <Sidebar :sidebarActive="treeNavOpen"/>
    </div>
    <div class="content-area">
      <h1>{{ $page.title }}</h1>
      <Content />
      <h2>Featured Guides</h2>
      <div class="guides--features">
         <FeaturedGuide :key="guideName" v-for="guideName in featured" :guideName="guideName"/>
      </div>
    </div>
  </div>
</template>

<script>
 import {
    getGuidesInfo
  } from '../util/guides';
  export default {
    name: 'GuidesOverview',
    components: {
      FeaturedGuide: () => import('../components/FeaturedGuide.vue'),
      Sidebar: () => import('../components/Sidebar.vue')
    },
    computed: {
      featured: function () {
        return this.guides && this.guides.featured ? this.guides.featured : null;
      }
    },
    data() {
      return {
        guides: null,
        treeNavOpen: false,
      };
    },
    mounted() {
      const pages = this.$site.pages;
      this.guides = getGuidesInfo({pages});
      let that = this;
      this.$parent.$on('toggle-tree-nav', event => {
        that.treeNavOpen = event.treeNavOpen;
      });
    },
  }
</script>