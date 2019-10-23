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
        <li v-for="link in navigation" :key="link.title" :class="{ active: isActive(link) || link.overview == true, subnav: link.links}">
          <a :href="link.link" v-on:click="expandSubNav">{{link.title}}</a>
          <ol v-if="link.links" v-show="link.links && showSublinks(link)" class="sections" :id=link.subLinksId>
            <li v-for="subLink in link.links" :key="subLink.title" :class="{section: true}">
              <div class="highlight">
                <router-link :to="subLink.link">{{subLink.title}}</router-link>
              </div>
            </li>
          </ol>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
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

        if (this.$page.path == '/docs/concepts/') {
          return this.$site.themeConfig.sidebars.concepts
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
      },

      expandSubNav: function (event) {
        const parent = event.target.parentElement;
        const sections = parent.querySelector('.sections');
        if( !sections ) {
          return;
        }

        event.preventDefault();
        
        if(sections.style.display == 'block') {
          parent.classList.remove('open');
          sections.style.display = 'none';
        } else {        
          parent.classList.add('open');
          sections.style.display = 'block';
        }
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
