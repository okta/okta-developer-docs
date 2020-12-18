<template>
  <div class="search--wrapper" data-search-bar>
    <div class="SearchBox" data-pipeline="developer-okta-com">
      <div class="CoveoOmnibox"></div>
      <div class="CoveoAnalytics"></div>
    </div>
    <img class="input--icon" src="/img/icons/search.svg" />
  </div>
</template>

<script>
export default {
  mounted() {
    // Mount Coveo after page load
    let coveoScript = document.createElement("script");
    coveoScript.setAttribute(
      "src",
      "https://developer.okta.com/sites/all/modules/okta_coveo_search_developer/js/okta_coveo_search_developer.js?20200204"
    );
    document.head.appendChild(coveoScript);
    window.addEventListener("load", function(event) {
      window.document.dispatchEvent(
        new Event("developerLoaded", {
          bubbles: true,
          cancelable: true
        })
      );
    });
  }
};
</script>
