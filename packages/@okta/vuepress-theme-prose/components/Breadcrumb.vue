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
      <li class="crumb-show-contents" @click="toggleTreeNav">{{showHideContents}}</li>
    </ol>
  </div>
</div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    data() {
      return {
        treeNavOpen: false
      }
    },
    computed: {
      showHideContents() {
        if(this.treeNavOpen) {
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
        const pathParts = this.$page.path.split('/');
        
        pathParts.forEach(pathPart => {
          if(pathPart != "") {
            crumbs.push({'link': '/'+pathPart+'/', 'title': pathPart.charAt(0).toUpperCase() + pathPart.slice(1)})
          }
        });

        // We don't want current page in breadcrumb (unless its the only one), so lets get rid of the last crumb
        if(crumbs.length > 1) {
          crumbs.pop();
        }

        // Custom Options
        if(crumbs[0].title == 'Code') {
          crumbs[0].title = 'Languages & SDKs';
        }

        return crumbs;
      }
    },
    methods: {
      toggleTreeNav: function(value) {
        this.treeNavOpen = !this.treeNavOpen;
        this.$parent.$emit('toggle-tree-nav', {treeNavOpen: this.treeNavOpen});
      }
    }
  }
</script>