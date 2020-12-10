<template>
<div class="breadcrumb" v-if="showBreadcrumb">
  <div class="breadcrumb--container">
    <ol>
      <li v-for="(crumb, index) in crumbs" :key="index">
        <router-link :to="crumb.link">{{crumb.title}}</router-link>
        <svg viewBox="0 0 256 512">
          <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
        </svg>
      </li>
      <li class="crumb-show-contents" @click="toggleTreeNav" v-if="enableShowHide">{{showHideContents}}</li>
    </ol>
  </div>
</div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    inject: ['appContext'],
    computed: {
      enableShowHide() {
        if(this.$page.path == '/docs/reference/') {
          return false;
        }
        return true;
      },
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
      crumbs() {
        let crumbs = [];
        crumbs.push({'link': '/docs/', 'title': 'Docs'});

        if(this.$page.path.startsWith('/code/')) {
          crumbs.push({'link': '/code/', 'title': 'Languages & SDKs'});
        }

        if(this.$page.path.startsWith('/quickstart/')) {
          crumbs.push({'link': '/quickstart/', 'title': 'Quickstart'});
        }

        if(this.$page.path.startsWith('/docs/reference/')) {
          crumbs.push({'link': '/docs/reference/', 'title': 'Reference'});
        }

        if(this.$page.path.startsWith('/docs/concepts/')) {
          crumbs.push({'link': '/docs/concepts/', 'title': 'Concepts'});
        }

        if(this.$page.path.startsWith('/docs/guides/')) {
          crumbs.push({'link': '/docs/guides/', 'title': 'Guides'});
        }

        if(this.$page.path.startsWith('/docs/release-notes/')) {
          crumbs.push({'link': '/docs/release-notes/', 'title': 'Release Notes'});
        }


        return crumbs;
      }
    },
    methods: {
      toggleTreeNav: function(value) {
        this.$parent.$emit('toggle-tree-nav', {treeNavOpen: !this.appContext.isTreeNavMobileOpen});
      }
    }
  }
</script>
