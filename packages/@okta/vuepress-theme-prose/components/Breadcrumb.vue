<template>
<div class="breadcrumb" v-if="showBreadcrumb">
  <div class="breadcrumb--container">
    <ol>
      <li v-for="(crumb, index) in crumbItems" :key="index">
        <router-link v-if="crumb.link" :to="crumb.link">{{crumb.title}}</router-link>
        <span v-else>{{crumb.title}}</span>
        <svg viewBox="0 0 256 512">
          <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
        </svg>
      </li>
      <li class="crumb-show-contents" @click="toggleTreeNav" >{{showHideContents}}</li>
    </ol>
  </div>
</div>
</template>

<script>
  import SidebarItems from "../mixins/SidebarItems";

  export default {
    name: "Breadcrumb",
    inject: ['appContext'],
    mixins: [SidebarItems],
    data() {
      return {crumbs: []};
    },
    computed: {
      showHideContents() {
        if(this.appContext.isTreeNavMobileOpen) {
          return 'Hide Contents';
        }
        return 'Show Contents';
      },
      showBreadcrumb() {
        if(this.$page.frontmatter.showBreadcrumb == false ) {
          return false;
        }

        return true;
      },
      crumbItems() {

        this.crumbs = [];
        var crumbs = this.getCrumbs(this.getNavigation());

        return crumbs;
      }
    },
    methods: {
      toggleTreeNav: function(value) {
        this.$parent.$emit('toggle-tree-nav', {treeNavOpen: !this.appContext.isTreeNavMobileOpen});
      },

      getCrumbs: function(menu, parent = null) {
        for (const menuItem of menu) {
          if (Array.isArray(menuItem)) {
            this.getCrumbs(menuItem);
          }

          if(menuItem.path != undefined && menuItem.path != '/' && this.$page.path.startsWith(menuItem.path)) {
 
            if (parent && parent.path == undefined) {
              this.crumbs.push({'link': false, 'title': parent.title});
            }
            this.crumbs.push({'link': menuItem.path, 'title': menuItem.title});
          }

          if (menuItem.subLinks != undefined) {
            this.getCrumbs(menuItem.subLinks, menuItem);
          }
        }

        return this.crumbs;
      }
    }
  }
</script>
