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
        document.querySelector(".fixed-header").clientHeight ;

      document.querySelector(".sidebar-area").style.height =
        maxHeight + "px"; 
    },
  }
};
</script>
