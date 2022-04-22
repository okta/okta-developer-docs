<template>
  <aside class="tree-nav" >
      <div
        class="tree-nav-toggle active" 
        v-on:click="handleSidebarClose"
      >
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0246 6.62741V6.47741H14.8746H6.474L9.97949 3.26398L10.0902 3.16252L9.98861 3.05194L9.4816 2.49994L9.38024 2.38958L9.26977 2.49084L4.76977 6.61584L4.76959 6.61601C4.71613 6.66518 4.67345 6.72491 4.64426 6.79142C4.61507 6.85793 4.6 6.92978 4.6 7.00241C4.6 7.07504 4.61507 7.14689 4.64426 7.2134C4.67345 7.27991 4.71613 7.33964 4.76958 7.38881L4.76977 7.38898L9.26977 11.514L9.38024 11.6152L9.4816 11.5049L9.98861 10.9529L10.0902 10.8423L9.97949 10.7408L6.474 7.52741H14.8746H15.0246V7.37741V6.62741Z" fill="#00297A" stroke="#00297A" stroke-width="0.3"/><path d="M1.9 1V0.85H1.75H1H0.85V1V13V13.15H1H1.75H1.9V13V1Z" fill="#7D91CB" stroke="#7D91CB" stroke-width="0.3"/></svg>
      </div>
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
      sidebarIsOpened: true
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
    handleSidebarClose() {
      let button = document.querySelector(".tree-nav-toggle");
      let sidebar = document.querySelector(".sidebar-area");
      let container = document.querySelector(".width-adjuster");
      let content = document.querySelector(".content-area");
      let sections = document.querySelector(".sections");
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        if (container)
          container.classList.add('active');
        sidebar.classList.add('active');
        sections.classList.add('active');
        content.classList.add('active');
      } else {
        button.classList.add('active');
        if (container)
          container.classList.remove('active');
        sidebar.classList.remove('active');
        sections.classList.remove('active');
        content.classList.remove('active');
      }
    }
  }
};
</script>
