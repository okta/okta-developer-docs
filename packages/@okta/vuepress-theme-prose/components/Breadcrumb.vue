<template>
  <div
    v-if="showBreadcrumb"
    class="breadcrumb"
  >
    <div class="breadcrumb--container">
      <ol>
        <li
          v-for="(crumb, index) in crumbItems"
          :key="index"
        >
          <router-link
            v-if="crumb.link"
            :to="crumb.link"
          >
            {{ crumb.title }}
          </router-link>
          <span v-else>{{ crumb.title }}</span>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9L5 5L1 1"
              stroke="#1D1D21"
            />
          </svg>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  import { guideFromPath } from '../util/guides';

  export default {
    name: "Breadcrumb",
    inject: ['appContext'],
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
        let crumbs = this.getCrumbs(this.appContext.treeNavDocs);
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

          let windowPathname = window.location.pathname;

          if(
            this.$page.regularPath.indexOf('/-/') > 0 && 
            guideFromPath(this.$page.regularPath).guideName === menuItem.guideName &&
            menuItem.frameworks &&
            menuItem.frameworks.length > 0
          ) {
            windowPathname = this.$page.regularPath.replace('/-/', `/${menuItem.frameworks[0]}/`);
          }

          if(menuItem.path != undefined && windowPathname === menuItem.path) {
            //add parent crumbs    
            if (menuItem.parents) {      
              menuItem.parents.reverse().map((parentCrumb) => {
                this.crumbs.push({'link': parentCrumb.path, 'title': parentCrumb.title});
              });
            }

            this.crumbs.push({'link': menuItem.path, 'title': menuItem.title});
          }

          if (menuItem.subLinks != undefined) {
            // menuItem = this.addMainLinks(menuItem);
            this.getCrumbs(menuItem.subLinks, menuItem);
          }
        }

        return this.crumbs;
      },

      addMainLinks: function(menuItem) {   
        if(menuItem.title === 'Guides' && this.$page.path.startsWith('/docs/guides/')) {
          menuItem.path = '/docs/guides/';
        }       
        if(menuItem.title === 'Concepts' && this.$page.path.startsWith('/docs/concepts/')) {
          menuItem.path = '/docs/concepts/';
        }     
        if(menuItem.title === 'Reference' && this.$page.path.startsWith('/docs/reference/')) {
          menuItem.path = '/docs/reference/';
        }
        if(menuItem.title === 'Languages & SDKs' && this.$page.path.startsWith('/code/')) {
          menuItem.path = '/code/';
        }
        if(menuItem.title === 'Release Notes' && this.$page.path.startsWith('/docs/release-notes/')) {
          menuItem.path = '/docs/release-notes/';
        }

        return menuItem;
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
