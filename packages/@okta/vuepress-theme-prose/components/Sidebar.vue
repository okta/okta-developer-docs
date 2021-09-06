<template>
  <aside class="tree-nav">
      <ul class="sections">
        <SidebarItem
          v-for="link in appContext.treeNavDocs"
          :key="link.title"
          :link="link"
        />
      </ul>
  </aside>
</template>

<script>

export default {
  name: "Sidebar",
  inject: ["appContext"],
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
