<template>
  <aside class="tree-nav">
      <ul class="sections">
        <SidebarItem
          v-for="link in navigation"
          :key="link.title"
          :link="link"
        />
      </ul>
  </aside>
</template>

<script>
import _ from "lodash";
import { getGuidesInfo, guideFromPath } from "../util/guides";
import {
  concepts,
  guides,
  languagesSdk,
  reference,
  releaseNotes
} from "../const/navbar.const";


export default {
  name: "Sidebar",
  inject: ["appContext"],
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  data() {
    return {
      usingFile: false,
      navigation: []
    };
  },
  mounted() {
    this.navigation = this.getNavigationData();
    if (!this.appContext.isInMobileViewport) {
      this.handleScroll();
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    $route(to, from) {
      // On route change check if base path has changed.
      // If true update `iHaveChildrenActive` parameter.
      // In such way will be possible to indicate current active item without needs to re-render sidebar
      if (from.path !== to.path) {
        this.navigation.forEach((nav) => {
          this.addStatesToLink(nav);
        });
      }
    }
  },
  methods: {
    getNavigationData() {
      return this.getNavigation().map(nav => {
        this.addStatesToLink(nav);
        return nav;
      });
    },
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
        document.querySelector(".fixed-header").clientHeight ;

      document.querySelector(".sidebar-area").style.height =
        maxHeight + "px"; 
    },
    addStatesToLink(link) {
      // Reset iHaveChildrenActive value.
      link.iHaveChildrenActive = false;

      if (link.path) {
        // Add state to leaf link
        link.iHaveChildrenActive = link.path === this.$page.regularPath;
      }
      if (link.subLinks) {
        for (const subLink of link.subLinks) {
          // Compute state to section link
          link.iHaveChildrenActive =
            link.iHaveChildrenActive || this.addStatesToLink(subLink);
        }
      }
      return link.iHaveChildrenActive;
    },
    getNavigation() {
      const homeLink = { title: "Home", path: "/" };
      return [
        homeLink,
        ...this.getGuides(),
        ..._.cloneDeep(concepts),
        ..._.cloneDeep(reference),
        ..._.cloneDeep(languagesSdk),
        ..._.cloneDeep(releaseNotes)
      ];
    },
    getGuides() {
      const pages = this.$site.pages;
      const guidesInfo = getGuidesInfo({ pages });
      let navs = _.cloneDeep(guides);
      const framework = guideFromPath(this.$route.path).framework;
      navs.forEach(nav => {
        let queue = new Array();
        queue.push(nav);
        let current = queue.pop();
        while (current) {
          if (current?.subLinks) {
            queue.push(...current.subLinks);
          } else if (current?.guideName) {
            // add sections
            current.subLinks = [];
            const guide = guidesInfo.byName[current.guideName];

            if (Array.isArray(guide?.sections)) {
              const [firstSection] = guide.sections;

              // Special value for guide that only has one section and should be
              // linked at the parent
              if (guide.sections.length === 1 && firstSection.name === 'main') {
                current.title = firstSection.title;
                current.path = firstSection.makeLink(guide.frameworks.includes(framework) ? framework : guide.mainFramework);
                current.frameworks = guide.frameworks;
              } else {
                guide.sections.forEach(section => {
                  current.subLinks.push({
                    title: section.title,
                    path: section.makeLink(
                      guide.frameworks.includes(framework)
                        ? framework
                        : guide.mainFramework
                    ),
                    frameworks: guide.frameworks
                  });
                });
              }
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
