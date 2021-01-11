<template>
  <div class="search--wrapper">
    <div class="SearchBox" data-search-bar data-pipeline="developer-okta-com">
      <div class="CoveoOmnibox"></div>
      <div class="CoveoAnalytics"></div>
    </div>
    <img class="input--icon" src="/img/icons/search.svg" />
  </div>
</template>

<script>
export default {
  mounted() {
    const isSearchPage = window.location.pathname === "/search/";
    if (!isSearchPage) {
      import("../util/coveo/init").then(({ initSearchBar }) => initSearchBar());
    }
  }
};
</script>
