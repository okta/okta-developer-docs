<template>
  <header>
    <SmartLink :item="{ link: '/' }" classes="header--logo">
      <img src="/img/icons/okta-developer.svg" alt="Okta Developer Logo" />
    </SmartLink>
    <div
      :class="{
        'search--slideout': true,
        opened: searchOpened || isSearchPage,
      }"
    >
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
      <SmartLink :item="{ link: '/signup/' }" classes="sign-up--button">
        Sign Up
      </SmartLink>
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
    SearchBar: () => import("../components/SearchBar.vue"),
    SmartLink: () => import("../components/SmartLink.vue"),
  },
  data() {
    return {
      isSearchPage: false,
      searchOpened: false,
      menuOpened: false,
    };
  },
  watch: {
    $route: "closeMenu",
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
    toggleMenu: function(value) {
      this.menuOpened = typeof value === "boolean" ? value : !this.menuOpened;
      this.searchOpened = false;
    },
    closeMenu: function() {
      this.toggleMenu(false);
    },
    handleResize: function() {
      if (window.innerWidth >= 768) {
        this.searchOpened = false;
        this.menuOpened = false;
      }
    },
  },
};
</script>
