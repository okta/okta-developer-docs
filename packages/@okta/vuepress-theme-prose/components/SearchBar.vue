<template>

    <!-- Search box  -->
    <div
        :class="{'SearchBar': true, 'is-active' : showSearchBar}"
        data-search-bar
        >
        <div class="Wrap">
        <div class="SearchBox" data-pipeline="developer-okta-com" style="display: flex;">
            <div class="CoveoOmnibox"></div>
            <div class="CoveoSearchButton">Search</div>
            <div class="CoveoAnalytics"></div>
        </div>
        </div>
    </div>
    <!-- end Search box  -->

</template>


<script>
  export default {
    data() {
      return {
        showSearchBar: false
      }
    },

    mounted() {
      // Mount Coveo after page load
      let coveoScript = document.createElement('script')
      coveoScript.setAttribute('src', 'https://developer.okta.com/sites/all/modules/okta_coveo_search_developer/js/okta_coveo_search_developer.js?20200204')
      document.head.appendChild(coveoScript)

      window.addEventListener("load", function(event) {
        window.document.dispatchEvent(new Event("developerLoaded", {
          bubbles: true,
          cancelable: true
        }));
      });

      // Toggle Search bar based on topbar state
      this.$root.$on('showSearchBar', data => {
        this.showSearchBar = !this.showSearchBar;
      });
    },
  }
</script>

<style>
  @import url('https://developer.okta.com/sites/all/modules/okta_coveo_search_developer/css/okta_coveo_search_developer.css?20200128');
</style>
