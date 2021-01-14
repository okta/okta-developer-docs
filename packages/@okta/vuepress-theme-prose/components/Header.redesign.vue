<template>
  <header class="redesign">
    <a href="/" class="header--logo">
      <img src="/img/icons/okta-developer.svg" />
    </a>
    <div :class="{ 'search--slideout': true, opened: searchOpened || isSearchPage }">
      <SearchBar />
    </div>
    <div :class="{ 'menu--slideout': true, opened: menuOpened }">
      <div class="header--links">
        <MenuItems
          :items="$themeConfig.redesign.primary_left_nav"
          :itemCss="'link link--small link--semi-bold'"
          :subItemCss="'link link--small link--semi-bold link--black'"
        />
        <MenuItems
          :items="$themeConfig.redesign.primary_right_nav"
          :itemCss="'link link--small link--semi-bold'"
          :subItemCss="'link link--small link--semi-bold link--black'"
        />
        <MenuItems
          :items="$themeConfig.redesign.primary_doc_nav"
          :itemCss="'link link--small link--semi-bold'"
          :subItemCss="'link link--small link--semi-bold link--black'"
        />
      </div>
      <a class="sign-up--button" href="/signup/">Sign Up</a>
    </div>
    <div class="mobile--toggles">
      <div v-if="!isSearchPage" class="mobile--toggle" @click="toggleSearch()">
        <img v-if="searchOpened" src="/img/icons/icon--search-cherry.svg" />
        <img v-else src="/img/icons/icon--search-white.svg" />
      </div>
      <div class="mobile--toggle" @click="toggleMenu()">
        <img v-if="menuOpened" src="/img/icons/icon--menu-cherry.svg" />
        <img v-else src="/img/icons/icon--menu-white.svg" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  components: {
    MenuItems: () => import("../components/MenuItems.vue"),
    MenuItem: () => import("../components/MenuItem.vue"),
    SearchBar: () => import("../components/SearchBar.redesign.vue")
  },
  data() {
    return {
      isSearchPage: false,
      searchOpened: false,
      menuOpened: false
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.isSearchPage = window.location.pathname === "/search/";
  },
  methods: {
    toggleSearch: function() {
      this.searchOpened = !this.searchOpened;
      this.menuOpened = false;
    },
    toggleMenu: function() {
      this.menuOpened = !this.menuOpened;
      this.searchOpened = false;
    },
    handleResize: function() {
      if (window.innerWidth >= 768) {
        this.searchOpened = false;
        this.menuOpened = false;
      }
    }
  }
};
</script>
