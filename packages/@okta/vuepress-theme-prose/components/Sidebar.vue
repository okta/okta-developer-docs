<template>
  <aside class="landing-navigation">
    <ul class="landing">
      <ul class="sections">
        <SidebarItem
          v-for="link in navigation"
          :key="link.title"
          :link="link"
        />
      </ul>
    </ul>
  </aside>
</template>

<script>
import _ from "lodash";
import { getGuidesInfo, guideFromPath } from "../util/guides";
import {
  concepts as conceptsRedesign,
  guides as guidesRedesign,
  languagesSdk as languagesSdkRedesign,
  reference as referenceRedesign
} from "../const/navbar/redesign/navbar.const";
import {
  concepts,
  guides,
  languagesSdk,
  reference
} from "../const/navbar/navbar.const";

export default {
  name: "Sidebar",
  inject: ["appContext"],
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  computed: {
    navigation() {
      // FeatureFlag.
      return (this.$page.redesign
        ? this.getNewNavigation()
        : this.getNavigation() || []
      ).map(nav => {
        this.addStatesToLink(nav);
        return nav;
      });
    }
  },
  data() {
    return {
      usingFile: false
    };
  },
  mounted() {
    if (!this.appContext.isInMobileViewport) {
      this.handleScroll();
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
    getNewNavigation() {
      const homeLink = { title: "Home", path: "/" };
      return [
        homeLink,
        ...this.getGuides(guidesRedesign),
        ..._.cloneDeep(conceptsRedesign),
        ..._.cloneDeep(referenceRedesign),
        ..._.cloneDeep(languagesSdkRedesign)
      ];
    },
    getNavigation() {
      if (this.$page.path.includes("/code/")) {
        this.usingFile = true;
        return _.cloneDeep(languagesSdk);
      }
      if (this.$page.path.includes("/docs/reference/")) {
        this.usingFile = true;
        return _.cloneDeep(reference);
      }
      if (this.$page.path.includes("/docs/concepts/")) {
        this.usingFile = true;
        return _.cloneDeep(concepts);
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
    getGuides(overrides) {
      const pages = this.$site.pages;
      const guidesInfo = getGuidesInfo({ pages });
      // FeatureFlag.
      let navs = _.cloneDeep(overrides || guides);
      const framework = guideFromPath(this.$route.path).framework;
      navs.forEach(nav => {
        let queue = new Array();
        queue.push(nav);
        let current = queue.pop();
        while (current) {
          if (current && current.subLinks) {
            queue.push(...current.subLinks);
          } else if (current && current.guideName) {
            // add sections
            current.subLinks = [];
            const guide = guidesInfo.byName[current.guideName];
            if (guide && guide.sections) {
              guide.sections.forEach(section => {
                current.subLinks.push({
                  title: section.title,
                  path: section.makeLink(
                    guide.frameworks.includes(framework)
                      ? framework
                      : guide.mainFramework
                  )
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
