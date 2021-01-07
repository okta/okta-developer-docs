import config from "./config.js";
import configureCoveoEndpoint from "./endpoint";
import registerTemplates from "./templates";
import registerListeners from "./listeners";

export const initSearchBar = async () => {
  const rootElement = document.querySelector("[data-search-bar]");

  await configureCoveoEndpoint();
  registerListeners(rootElement);

  Coveo.initSearchbox(rootElement, "/search/", {
    Searchbox: config.searchboxConfig,
    Omnibox: config.omniboxConfig,
    Analytics: config.analyticsConfig
  });
};

export const initSearchPage = async () => {
  const rootElement = document.querySelector("[data-search-page]");
  const searchBar = document.querySelector("[data-search-bar]");

  await configureCoveoEndpoint();
  registerListeners(rootElement);
  registerTemplates();

  Coveo.init(rootElement, {
    externalComponents: [searchBar],
    Facet: {
      enableSettings: false
    },
    sourceFilter: {
      valueCaption: config.facetValueCaptions,
      includeInOmnibox: true
    },
    Searchbox: config.searchboxConfig,
    Omnibox: config.omniboxConfig,
    Analytics: config.analyticsConfig,
    SearchInterface: config.searchInterfaceConfig,
    Pager: config.pagerConfig,
    ResultLink: {
      onClick: config.resultLinkOnClick
    }
  });
};
