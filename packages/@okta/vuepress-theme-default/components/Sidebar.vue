<template>
  <div :class="{'Sidebar': oldNavigation}" >
    <aside :class="{'Sidebar-active': sidebarActive}" v-if="oldNavigation">

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

    <aside class="landing-navigation" v-else>
      <ul class="landing">
        <li :class="{overview: true}">Overview</li>
        <li v-for="link in navigation" :key="link.title" :class="{subnav: showSublinks(link), open: $page.path.includes(link.path)}">
          <a :href="link.path" :class="{active: isActive(link)}">{{link.title}}</a>
          <ol v-if="subLinks(link) && $page.path.includes(link.path)"  class="sections">
            <li v-for="subLink in subLinks(link)" :key="subLink.title">
              <router-link :to="subLink.path" :class="{active: isActive(subLink)}">{{subLink.title}}</router-link>
            </li>
          </ol>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'Sidebar',
    props: {
      oldNavigation: {
        default: true,
        type: Boolean
      }
    },
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

        if (this.$page.path.includes('/docs/concepts/')) {
          const conceptsRegex = /(\/docs\/concepts\/)[A-Za-z-]*\/$/;
          return _.chain(this.$site.pages)
          .filter(page => page.path.match(conceptsRegex))
          .sortBy(page => page.title)
          .sort()
          .value();
        }

        if (this.$page.path.includes('/docs/reference/')) {
          const referenceRegex = /(\/docs\/reference\/)[A-Za-z-]*\/$/;
          return _.chain(this.$site.pages)
          .filter(page => page.path.match(referenceRegex))
          .sortBy(page => page.title)
          .sort()
          .value();
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
        
        return this.$page.path == link.path
      },

      subLinks: function(link) {
        const allCatPages = _.chain(this.$site.pages)
          .filter(page => page.path.includes(link.path))
          .filter(page => page.path != link.path)
          .sortBy(page => page.title)
          .value();

        if(allCatPages.length > 0) {
          return allCatPages;
        }
        return false;
      },

      showSublinks(link) {
        const allCatPages = _.chain(this.$site.pages)
          .filter(page => page.path.includes(link.path))
          .filter(page => page.path != link.path)
          .sortBy(page => page.title)
          .value();

        if(allCatPages.length > 0) {
          return allCatPages;
        }

        if(link.subLinks) {
          return link.subLinks.find((subLink) => {
            return this.$page.regularPath.includes(subLink.link)
          })
        }

        return false
      },

      expandSubNav: function (event) {
        const parent = event.target.parentElement;
        const sections = parent.querySelector('.sections');
        if( !sections ) {
          return;
        }

        event.preventDefault();
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
