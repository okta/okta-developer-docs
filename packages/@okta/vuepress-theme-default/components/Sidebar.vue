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
            <ul v-if=showSublinks(link) :id=link.subLinksId>
              <li v-for="subLink in link.subLinks" :key="subLink.link" :class="{'is-active': $page.path === subLink.link}">
                <a :href="subLink.link">{{subLink.title}}</a>
              </li>
            </ul>
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
        sidebarActive: false
      }
    },
    computed: {
      navigation() {
        if (this.$page.path.includes('/code/')) {
          return this.$site.themeConfig.sidebars.codePages
        }

        return this.$site.themeConfig.sidebars.main
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
        if (link.subLinks) {
          return false
        }
        if (this.$page.path.includes('/code/')) {
          return this.$page.path.includes(link.activeCheck)
        }

        return this.$page.path.includes(link.link)
      },

      showSublinks(link) {
        if(link.subLinks) {
          return link.subLinks.find((subLink) => {
            return this.$page.regularPath.includes(subLink.link)
          })
        }
        return false
      }
    }
  }
</script>

<style src="../assets/css/okta.scss" lang="scss"></style>
<style scoped>
    .Sidebar-nav {
      margin-bottom: 60px;
    }
</style>
