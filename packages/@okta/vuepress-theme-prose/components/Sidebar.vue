<template>
  <aside class="landing-navigation" :class="{active: sidebarActive}">
    <ul class="landing">
      <SidebarItem v-for="(link, key) in navigation" :key="key" :link="link" />
    </ul>
  </aside>
</template>

<script>
import _ from "lodash";
import { getGuidesInfo, guideFromPath } from "../util/guides";

export default {
  name: "Sidebar",
  props: {
    sidebarActive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  data() {
    return {
      usingFile: false
    };
  },
  mounted() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    navigation() {
      if (this.$page.path.includes("/code/")) {
        this.usingFile = true;
        return this.$site.themeConfig.sidebars.codePages;
      }
      if (this.$page.path.includes("/docs/reference/")) {
        this.usingFile = true;
        return this.$site.themeConfig.sidebars.reference;
      }
      if (this.$page.path.includes("/docs/guides")) {
        return this.getGuides();
      }
      if (this.$page.path.includes("/docs/concepts/")) {
        const conceptsRegex = /(\/docs\/concepts\/)[A-Za-z-]*\/$/;
        return _.chain(this.$site.pages)
          .filter(page => page.path.match(conceptsRegex))
          .sortBy(page => page.title)
          .sort()
          .unshift({ title: "Concepts", path: "/docs/concepts/" })
          .value();
      }
      if (this.$page.path.includes("/books/")) {
        const booksRegex = /(\/books\/)[A-Za-z-]*\/$/;
        return _.chain(this.$site.pages)
          .filter(page => page.path.match(booksRegex))
          .sortBy(page => page.title)
          .sort()
          .value();
      }
    }
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
    getGuides() {
      const pages = this.$site.pages;
      const guides = getGuidesInfo({ pages });
      let navs = _.map(this.$site.themeConfig.sidebars.guides, _.clone);
      const framework = guideFromPath(this.$route.path).framework;
      navs.forEach(nav => {
        // Traverse guide tree to add links to leaf nodes
        let queue = new Array();
        queue.push(nav);
        let current = queue.pop();
        while(current){
          if( current && current.subLinks ){
            // Add activeCheck to sub-categories in nav
            current.subLinks = current.subLinks.map(subLink => 
              subLink.guideName ? ({ ...subLink, activeCheck: `/${subLink.guideName}` }) : subLink);
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