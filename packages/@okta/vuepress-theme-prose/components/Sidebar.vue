<template>
  <aside class="landing-navigation">
    <ul class="landing">
      <SidebarItem v-for="link in navigation" :key="link.title" :link="link" />
    </ul>
  </aside>
</template>

<script>
import _ from "lodash";
import { getGuidesInfo, guideFromPath } from "../util/guides";  

export default {
  name: "Sidebar",
  inject: ['appContext'],
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  data() {
    return {
      usingFile: false
    };
  },
  mounted() {
    if(!this.appContext.isInMobileViewport) {
      this.handleScroll();
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    navigation() {
      return (this.getNavigation() || []).map(nav => {
        this.addStatesToLink(nav);
        return nav;
      });
    },
  },
  methods: {
    toggleSubNav: function(event) {
      const parent = event.target.parentElement;
      const sections = parent.querySelector(".sections");
      if (!sections) {
        return;
      }
      event.preventDefault();
    },
    handleScroll: function(event) {
      let maxHeight =
        window.innerHeight -
        document.querySelector(".fixed-header").clientHeight -
        60;

      document.querySelector(".landing-navigation").style.height =
        maxHeight + "px";
    },
    addStatesToLink(link) {
      if (link.path) {
        // Add state to leaf link
        link.imActive = link.path === this.$page.regularPath;
      }
      if (link.subLinks) {
        for (const subLink of link.subLinks) {
          // Compute state to section link
          link.imActive = link.imActive || this.addStatesToLink(subLink);
        }
      }
      return link.imActive;
    },
    getNavigation() {
      if (this.$page.path.includes("/code/")) {
        this.usingFile = true;
        return _.cloneDeep(this.$site.themeConfig.sidebars.codePages);
      }
      if (this.$page.path.includes("/docs/reference/")) {
        this.usingFile = true;
        return _.cloneDeep(this.$site.themeConfig.sidebars.reference);
      }
      if (this.$page.path.includes("/docs/concepts/")){
        this.usingFile = true;
        return _.cloneDeep(this.$site.themeConfig.sidebars.concepts);
      }
      if (this.$page.path.includes("/docs/guides")) {
        return this.getGuides();
      }
      if (this.$page.path.includes("/books/")) {
        const booksRegex = /(\/books\/)[A-Za-z-]*\/$/;
        return _.chain(this.$site.pages)
          .filter(page => page.path.match(booksRegex))
          .sortBy(page => page.title)
          .sort()
          .value();
      }
    },
    getGuides() {
      const pages = this.$site.pages;
      const guides = getGuidesInfo({ pages });
      let navs = _.cloneDeep(this.$site.themeConfig.sidebars.guides);
      const framework = guideFromPath(this.$route.path).framework;
      navs.forEach(nav => {
        let queue = new Array();
        queue.push(nav);
        let current = queue.pop();
        while(current){
          if( current && current.subLinks ){
            queue.push(...current.subLinks)
          } else if( current && current.guideName ) {
            // add sections
            current.subLinks = [];
            const guide = guides.byName[current.guideName];
            if (guide && guide.sections) {
              guide.sections.forEach(section => {
                current.subLinks.push({
                  title: section.title,
                  path: section.makeLink(guide.frameworks.includes(framework) ? framework : guide.mainFramework)
                });
              });
            }
          }
          current = queue.pop();
        }
      });
      return navs;
    }
  }
};
</script>