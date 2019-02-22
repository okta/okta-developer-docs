<template>
  <ul>
    <li v-for="link in links" :key="link.path" :class="{'is-active': $page.path === link.path}">
      <router-link :to="link.path">{{ link.title }}</router-link>
      <br v-if="link.frontmatter.excerpt && showExcerpt">
      <span class="description" v-if="link.frontmatter.excerpt && showExcerpt">{{ link.frontmatter.excerpt }}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "CategoryLinks",
    props: {
      "category": {
        type: String
      },
      "linkPrefix": {
        type: String
      },
      "where_exp": {
        type: String
      },
      "sort": {
        type: String
      },
      "showExcerpt": {
        type: Boolean,
        default: true
      }
    },
    computed: {
      links() {
        let links = []

        if (this.category) {
          links = this.$site.pages.filter((el) => el.frontmatter.category === this.category);
        } else if (this.linkPrefix) {
          links = this.$site.pages.filter((el) => el.path.includes(this.linkPrefix))
        }

        if ( this.where_exp != undefined ) {
           let toRemove = links.filter((el) => el.frontmatter[this.where_exp] && el.frontmatter[this.where_exp] == true);
           links = links.filter((el) => toRemove.indexOf(el) < 0);
        }

        if ( this.sort ) {
          let ascDesc = this.sortAsc ? -1 : 1;
          return links.sort((a, b) => ascDesc * a[this.sort].localeCompare(b.title));
        }

        return links
      }
    }
  }
</script>
