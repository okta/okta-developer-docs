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
      return {
        crumbs: [],
        crumbParents: []
      };
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
        this.crumbParents = [];
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

          if(menuItem.path != undefined && this.$page.path.startsWith(menuItem.path)) {

            if(menuItem.path == '/') {
              continue;
            }

            switch (menuItem.path) {
              case '/code/':
                this.crumbs.push({'link': '/code/', 'title': 'Languages & SDKs'});
                continue;
              case '/quickstart/':
                this.crumbs.push({'link': '/quickstart/', 'title': 'Quickstart'});
                continue;
              case '/docs/reference/':
                this.crumbs.push({'link': '/docs/reference/', 'title': 'Reference'});
                continue;
              case '/docs/concepts/':
                this.crumbs.push({'link': '/docs/concepts/', 'title': 'Concepts'});
                continue;
              case '/docs/guides/':
                this.crumbs.push({'link': '/docs/guides/', 'title': 'Guides'});
                continue;
              case '/docs/release-notes/':
                this.crumbs.push({'link': '/docs/release-notes/', 'title': 'Release Notes'});
                continue;
            }
// console.log(this.crumbParents, 'this.crumbParents')
//             if (this.crumbParents.length > 0) {
//               this.crumbParents.map((parent) => {
//                 var parentCrumb = {'link': false, 'title': parent.title};
// console.log(parent.path, 'parent.path')
// console.log(this.crumbs.indexOf(parentCrumb), 'this.crumbs.indexOf(parentCrumb)')

                var parentCrumb = {'link': false, 'title': parent.title};
                if (parent && parent.path == undefined && !this.crumbItemExists(parentCrumb)) {
                  this.crumbs.push(parentCrumb);
                }
              // })
            // }
            this.crumbs.push({'link': menuItem.path, 'title': menuItem.title});
          }

          if (menuItem.subLinks != undefined) {
            this.getCrumbs(menuItem.subLinks, menuItem);
          }
        }

        return this.crumbs;
      },
      crumbItemExists: function (checkCrumb) {
        for (const crumb of this.crumbs) {
          if (crumb.title === checkCrumb.title) {
            return true;
          }
        }
        return false;
      }
    }
  }
</script>
