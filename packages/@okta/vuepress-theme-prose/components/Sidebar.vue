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
import SidebarItems from "../mixins/SidebarItems";


export default {
  name: "Sidebar",
  inject: ["appContext"],
  mixins: [SidebarItems],
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  data() {
    return {
      usingFile: false,
      // navigation: []
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
  }
};
</script>
