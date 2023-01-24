<template>
  <div class="search--wrapper">
    <div
      class="SearchBox"
      data-search-bar
      data-pipeline="developer-okta-com"
    >
      <div class="search--form">
        <div class="CoveoOmnibox" />
        <div class="Searchbox__button">
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6436 13.6549L10.3978 9.40832C11.0508 8.55089 11.4183 7.44849 11.4183 6.26416C11.4183 3.32441 9.0504 0.956543 6.11065 0.956543C3.1709 0.956543 0.802246 3.3252 0.802246 6.26495C0.802246 9.20469 3.17012 11.5726 6.10987 11.5726C7.29419 11.5726 8.35525 11.2051 9.25402 10.5521L13.5006 14.7986C13.6637 14.9617 13.8681 15.0436 14.0725 15.0436C14.2769 15.0436 14.4805 14.9617 14.6443 14.7986C14.9705 14.4717 14.9705 13.9818 14.6436 13.6549L14.6436 13.6549ZM6.11065 9.93963C4.0689 9.93963 2.43596 8.3067 2.43596 6.26495C2.43596 4.22319 4.0689 2.59026 6.11065 2.59026C8.1524 2.59026 9.78534 4.22319 9.78534 6.26495C9.78534 8.30592 8.15164 9.93963 6.11065 9.93963Z"
              fill="#FFFEFA"
            />
          </svg>
        </div>
      </div>
      <div class="CoveoAnalytics" />
    </div>
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
