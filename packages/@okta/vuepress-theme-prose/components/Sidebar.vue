<template>
  <div
    v-if="sidebarItems.length !== 0"
    class="sidebar-area"
  >
    <div class="sidebar-inner">
      <aside class="tree-nav">
        <div
          class="tree-nav-toggle active" 
          @click="handleSidebarClose"
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M15.0246 6.62741V6.47741H14.8746H6.474L9.97949 3.26398L10.0902 3.16252L9.98861 3.05194L9.4816 2.49994L9.38024 2.38958L9.26977 2.49084L4.76977 6.61584L4.76959 6.61601C4.71613 6.66518 4.67345 6.72491 4.64426 6.79142C4.61507 6.85793 4.6 6.92978 4.6 7.00241C4.6 7.07504 4.61507 7.14689 4.64426 7.2134C4.67345 7.27991 4.71613 7.33964 4.76958 7.38881L4.76977 7.38898L9.26977 11.514L9.38024 11.6152L9.4816 11.5049L9.98861 10.9529L10.0902 10.8423L9.97949 10.7408L6.474 7.52741H14.8746H15.0246V7.37741V6.62741Z"
            fill="#00297A"
            stroke="#00297A"
            stroke-width="0.3"
          /><path
            d="M1.9 1V0.85H1.75H1H0.85V1V13V13.15H1H1.75H1.9V13V1Z"
            fill="#7D91CB"
            stroke="#7D91CB"
            stroke-width="0.3"
          /></svg>
        </div>
        <ul class="sections">
          <SidebarItem
            v-for="link in sidebarItems"
            :key="link.title"
            :link="link"
          />
        </ul>
        <div
          class="scroll-up"
          @click="scrollUp"
        >
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ><path
            d="M0 0V1.93779H9.99774V0H0ZM0 7.74653H4.02604V12H5.97397V7.74653H10L5.00107 2.76801L0 7.74653Z"
            fill="#1662DD"
          /></svg>
        </div>
      </aside>
      <div class="sidebar-fade" />
    </div>
  </div>
</template>

<script>

import SidebarItems from "../mixins/SidebarItems";

export default {
  name: "Sidebar",
  components: {
    SidebarItem: () => import("../components/SidebarItem.vue")
  },
  mixins: [SidebarItems],
  inject: ["appContext"],
  data() {
    return {
      sidebarIsOpened: true,
      sidebarItems: []
    };
  },
  watch: {
    $route(to, from) {
      if (from.path !== to.path) {
        this.updateSidebarItems();
        const sidebarArea = document.querySelector('.sidebar-area')
        if (sidebarArea) {
          sidebarArea.addEventListener("scroll", this.checkHeight);
        }
      }
    },
  },
  mounted() {
    this.updateSidebarItems();
    window.addEventListener("resize", this.handleResize);
  },
  updated() {
    document.querySelector('.sidebar-area').addEventListener("scroll", this.checkHeight);
    this.handleScroll();
  },
  methods: {
    getLastChildrenActiveEl() {
      let activeItems = Array.from(document.querySelectorAll(".subnav-active"));
      let activeItem = activeItems[activeItems.length - 2];
      activeItem.classList.add('bordered');
    },
    updateSidebarItems() {
      const routes = this.appContext.treeNavDocs.length > 0 ? this.appContext.treeNavDocs : this.getNavigationData();
      const currentRoute = this.$route.path;
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path !== '/' && currentRoute.startsWith(routes[i].path)) {
          this.sidebarItems = routes[i].subLinks;
          break;
        }
      } 
      if (this.sidebarItems.length == 0) {
        document.querySelector("body").classList.add('isHome')
      }
    },
    handleScroll: function(event) {
      let maxHeight =
        window.innerHeight -
        document.querySelector(".fixed-header").clientHeight - 
        (document.querySelector(".header-nav")?.clientHeight || 0);
        
      document.querySelector(".sidebar-area").style.height =
        maxHeight + "px";
    },
    handleResize: function(event) {
      let maxHeight =
        window.innerHeight -
        document.querySelector(".fixed-header").clientHeight - 
        (document.querySelector(".header-nav")?.clientHeight || 0);
        
      if (document.querySelector(".sidebar-area")) {
      document.querySelector(".sidebar-area").style.height =
        maxHeight + "px";
      }
    },
    scrollUp() {
      let sidebar = document.querySelector('.sidebar-area')
      sidebar.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    },
    checkHeight() {
      let sidebar = document.querySelector('.sidebar-area');
      if (sidebar.scrollHeight > sidebar.clientHeight) {
        sidebar.classList.add('show-scroll-up');
      } else {
        sidebar.classList.remove('show-scroll-up');
      }
      if (sidebar.scrollTop == 0) {
        sidebar.classList.remove('show-scroll-up');
      }
      if (sidebar.scrollHeight - sidebar.scrollTop === sidebar.clientHeight) {
        sidebar.classList.add('no-fade');
      } else {
        sidebar.classList.remove('no-fade');
      }
    },
    handleSidebarClose() {
      let button = document.querySelector(".tree-nav-toggle");
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        document.body.classList.add('aside-hidden');
      } else {
        button.classList.add('active');
        document.body.classList.remove('aside-hidden');
      }
    }
  }
};
</script>
