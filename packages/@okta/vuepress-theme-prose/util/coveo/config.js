const TABLET = 768;
const MOBILE = 320;

export default {
  omniboxConfig: {
    enableQueryExtensionAddon: true,
    enableQuerySyntax: true,
    placeholder: "Search our content",
    triggerQueryOnClear: true
  },
  searchboxConfig: {
    enableOmnibox: true
  },
  analyticsConfig: {
    searchHub: "developer-okta-com"
  },
  searchInterfaceConfig: {
    pipeline: "developer-okta-com",
    enableHistory: true,
    enableAutomaticResponsiveMode: false
  },
  facetValueCaptions: {
    "Developer blog": "Blog",
    "Developer documentation": "Docs",
    "Developer forum": "Developer forum",
    "Developer products": "Products and Pricing"
  },
  pagerConfig: {
    numberOfPages: numberOfPages()
  }
};

function numberOfPages() {
  let numberOfPages = 10;

  if (window.innerWidth <= TABLET) {
    numberOfPages = 5;
  }
  if (window.innerWidth <= MOBILE) {
    numberOfPages = 3;
  }

  return numberOfPages;
}
