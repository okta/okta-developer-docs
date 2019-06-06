<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-for="crumb in breadcrumb" :key="crumb.path"><router-link :to="crumb.path">{{crumb.title}}</router-link></li>
    </ol>
  </nav>
</template>

<script>
  export default {
    name: "Breadcrumb",
    computed: {
      breadcrumb() {

        if(!this.$page) { 
          return [];
        }
        
        const crumbs = [];

        if(this.$page.path.startsWith('/docs/guides/')) {
          crumbs.push(
            {path: '/documentation/', title: 'DOCS'},
            {path: '/docs/guides/', title: 'Guides' },
          );
          return crumbs;
        }

        if(this.$page.path == '/reference/' || this.$page.path.startsWith('/code/')) {
          crumbs.push({path: '/documentation/', title: 'DOCS'})
          return crumbs
        }


        const pathParts = this.$page.path.split("/")
        if (!pathParts[pathParts.length - 1].length) { pathParts.pop(); }

        let link = "";
        pathParts.forEach((part) => {
          link += part;
          const page = this.$site.pages.find((el) => el.path === link || el.path === link + "/");
          link += "/";

          if (page != null) {
            crumbs.push({path: page.path, title: page.title});
          }
        })
        return crumbs;
      }
    }
  }
</script>
