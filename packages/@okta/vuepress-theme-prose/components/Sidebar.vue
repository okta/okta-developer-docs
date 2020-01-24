<template>
  <aside class="landing-navigation" :class="{active: sidebarActive}">
    <ul class="landing">
      <li :class="{overview: true}" v-if="!usingFile">
        <router-link :to="overview.path">{{overview.title}}</router-link>
      </li>
      <li v-for="link in navigation" :key="link.title" :class="{subnav: showSublinks(link), open: $page.path.includes(link.path)}" @click.prevent="setSubnavOpen(link)">
        <div class="link-wrap">
          <svg viewBox="0 0 320 512" v-if="showSublinks(link) && !$page.path.includes(link.path)">
            <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/>
          </svg>

          <svg viewBox="0 0 320 512" v-if="showSublinks(link) && $page.path.includes(link.path)" class="open">
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"/>
          </svg>

          <router-link v-if="link.path" :to="link.path">{{link.title}}</router-link>
          <div class="is-link" v-else>{{link.title}}</div>
        </div>
        
        <ol v-if="usingFile && (showSublinks(link) || subnavOpen == link)"  class="sections" >
          <li v-for="subLink in link.subLinks" :key="subLink.title">
            <router-link :to="subLink.path" :class="{'router-link-active': isActive(subLink), 'router-link-exact-active': isActive(subLink)}">{{subLink.title}}</router-link>
          </li>
        </ol>

        <ol v-if="subLinks(link) && $page.path.includes(link.path) && !usingFile"  class="sections">
          <li v-for="subLink in subLinks(link)" :key="subLink.title">
            <router-link :to="subLink.path" :class="{active: isActive(subLink)}">{{subLink.title}}</router-link>
          </li>
        </ol>
      </li>
    </ul>
  </aside>
  
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
    data() {
      return {
        subnavOpen: null,
        sidebarActive: false,
        usingFile: false,
        overview: {
          title: 'Overview',
          path: '#'
        }
      }
    },
    mounted() {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
      this.$parent.$on('toggle-tree-nav', event => {
        this.sidebarActive = event.treeNavOpen;
      });
      
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
      navigation() {
        if (this.$page.path.includes('/code/')) {
          this.usingFile = true;
          return this.$site.themeConfig.sidebars.codePages
        }
        if (this.$page.path.includes('/docs/concepts/')) {
          this.overview.title = 'Concepts';
          this.overview.path = '/docs/concepts/';
          const conceptsRegex = /(\/docs\/concepts\/)[A-Za-z-]*\/$/;
          return _.chain(this.$site.pages)
          .filter(page => page.path.match(conceptsRegex))
          .sortBy(page => page.title)
          .sort()
          .value();
        }
        if (this.$page.path.includes('/docs/reference/')) {
          this.overview.title = 'Reference';
          this.overview.path = '/docs/reference/';
          const referenceRegex = /(\/docs\/reference\/)[A-Za-z-]*\/$/;
          return _.chain(this.$site.pages)
          .filter(page => page.path.match(referenceRegex))
          .sortBy(page => page.title)
          .sort()
          .value();
        }
        if (this.$page.path.includes('/docs/release-notes/')) {
          this.overview.title = 'Release Notes';
          this.overview.path = '/docs/release-notes/';
          return false;
          
        }
        
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
        
        if(link.path && link.path.includes('release-notes')) {
          return false;
        }
        let allCatPages = _.chain(this.$site.pages)
          .filter(page => page.path.includes(link.path))
          .filter(page => page.path != link.path)
          .sortBy(page => page.title)
          .value();
        if(allCatPages.length > 0) {
          // if(link.path.includes('release-notes')) {
          //   allCatPages = _.chain(allCatPages)
          //   .map(page => {
          //     page.title = page.headers[0].title;
          //     page.path = '/docs/release-notes/#_'+page.headers[0].title.replace(/\./g, '-');
          //     return page;
          //   })
          //   .reverse()
          //   .value();
          // }
          return allCatPages;
        }
        return false;
      },
      showSublinks(link) {
        if(link.path && link.path.includes('release-notes')) {
            return false;
          }
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
            console.log(subLink.path);
            return this.$page.regularPath.includes(subLink.link) || this.$page.regularPath.includes(subLink.activeCheck)
          })
        }
        return false
      },
      setSubnavOpen: function (link) {
        if(this.subnavOpen == null || this.subnavOpen != link) {
          this.subnavOpen = link
          return
        }

        if(this.subnavOpen == link) {
          this.subnavOpen = null
          return
        }
      },
      expandSubNav: function (event) {
        const parent = event.target.parentElement;
        const sections = parent.querySelector('.sections');
        if( !sections ) {
          return;
        }
        event.preventDefault();
      },
      handleScroll: function (event) {
        let maxHeight = document.querySelector('.tree-nav').clientHeight - window.scrollY
        if(maxHeight > window.innerHeight) {
          maxHeight = window.innerHeight - document.querySelector('.fixed-header').clientHeight - 60;
        }
        document.querySelector('.landing-navigation').style.height = maxHeight + 'px';
      }
    }
  }
</script>