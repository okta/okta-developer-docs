<template>

  <aside class="Sidebar" :class="{'Sidebar-active': sidebarActive}">

    <h2 class="Sidebar-location Sidebar-toggle h6">Navigation</h2>
    <div class="Sidebar-close Sidebar-toggle" v-on:click="sidebarActive = !sidebarActive"></div>
    <div>
      <div v-for="section in navigation" :key="section.title" class="Sidebar-group">
        <h3 class="Sidebar-title">{{section.title | capitalize}}</h3>
        <ul class="Sidebar-nav">
          <li v-for="link in section.links" :key="link.title" :class="{'is-active': isActive(link)}">
            <a :href="link.link">{{link.title}}</a>
            <CategoryLinks category="authentication" :showExcerpt="false" id="Sidebar_References" v-if="link.link.includes('/docs/api/resources/oidc/') && $page.path.includes('/docs/api/resources/oidc/')"/>
            <CategoryLinks linkPrefix="/docs/api/getting_started" :showExcerpt="false" id="Sidebar_GettingStarted" v-if="link.link.includes('/docs/api/getting_started') && $page.path.includes('/docs/api/getting_started/')"/>
            <CategoryLinks category="management" where_exp="deprecated" sort="title" :showExcerpt="false" id="Sidebar_Resources" v-if="link.link.includes('/docs/api/resources') && !link.link.includes('/docs/api/resources/oidc') && !$page.path.includes('/docs/api/resources/oidc/') && $page.path.includes('/docs/api/resources')"/>
          </li>
        </ul>
      </div>
    </div>

  </aside>

</template>

<script>
  export default {
    name: 'Sidebar',
    data () {
      return {
        sidebarActive: true
      }
    },
    computed: {
      navigation() {
        if (this.$page.path.includes('/code/')) {
          return this.$site.themeConfig.sidebars.codePages
        }
        return this.$site.pages
          .filter(pages => pages.path.startsWith( "/documentation/"))[0]
          .frontmatter.sections
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    methods: {
      isActive: function (link) {
        if (this.$page.path.includes('/code/')) {
          return this.$page.path.includes(link.activeCheck)
        }
        return this.$page.path === link.path
      }
    }
  }
</script>

<style src="../assets/css/okta.scss" lang="scss"></style>
<style scoped>
  .Sidebar-group {
    margin: 0 0 60px
  }
</style>
