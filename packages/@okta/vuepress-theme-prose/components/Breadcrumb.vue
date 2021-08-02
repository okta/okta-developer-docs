<template>
<div class="breadcrumb" v-if="showBreadcrumb">
  <div class="breadcrumb--container">
    <ol>
      <li v-for="(crumb, index) in crumbItems" :key="index">
        <span>{{crumb.title}}</span>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 9L5 5L1 1" stroke="#1D1D21"/>
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
        document.querySelector('.mobile--toggle').click();
      },

      getCrumbs: function(menu, parent = null) {
        for (const menuItem of menu) {
          if (Array.isArray(menuItem)) {
            this.getCrumbs(menuItem);
          }

          if (parent) {
            menuItem.parents = _.union([parent], parent.parents)
          }

          if(menuItem.path != undefined && this.$page.path == menuItem.path) {

            //add parent crumbs           
            menuItem.parents.reverse().map((parentCrumb) => {
              this.crumbs.push({'link': parentCrumb.path, 'title': parentCrumb.title});
            });

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
