<template>
  <div class="page-content">
    <section id="SearchPage" class="CoveoSearchInterface" data-search-page>
      <div class="CoveoAnalytics"></div>
      <div class="CoveoFolding"></div>
      <div class="coveo-main-section">
        <div class="coveo-facet-column">
          <h3 class="coveo-facet-column-heading">
            Refine results from developer.okta.com
          </h3>
          <div
            class="CoveoFacet"
            id="sourceFilter"
            data-field="@commonoktasource"
            data-allowed-values="developer documentation, developer blog, developer forum, developer products"
            data-custom-sort="developer documentation, developer blog, developer forum, developer products"
            data-include-in-omnibox="false"
          ></div>
          <div class="coveo-facet-help hide--small">
            <h3 class="coveo-facet-column-heading">
              Can't find what you need?
            </h3>
            <p>
              Visit our
              <a
                class="is-external-link"
                href="https://www.okta.com/"
                target="_blank"
                rel="noopener noreferrer"
                >Corporate Site</a
              >
              for marketing and sales information.
            </p>
            <p>
              Visit our
              <a
                class="is-external-link"
                href="https://support.okta.com/help/s/"
                target="_blank"
                rel="noopener noreferrer"
                >Help Center</a
              >
              for documentation, support knowledge base, and community
              discussions.
            </p>
          </div>
        </div>
        <div class="coveo-results-column">
          <div class="coveo-results-header">
            <div class="coveo-summary-section">
              <span class="CoveoQuerySummary">
                <div class="coveo-show-if-no-results"></div>
              </span>
            </div>
            <div class="coveo-result-layout-section">
              <span class="CoveoResultLayout"></span>
            </div>
          </div>
          <div class="CoveoHiddenQuery"></div>
          <div class="CoveoErrorReport" data-pop-up="false"></div>
          <div
            class="CoveoResultList"
            data-layout="list"
            data-wait-animation="fade"
          >
            <script
              id="Default"
              class="result-template"
              type="text/html"
              data-layout="list"
            >
              <div class="coveo-result-frame">
                <div class="coveo-result-cell" style="margin-left:0;">
                  <div class="coveo-result-row is-primary">
                    <div class="coveo-result-cell">
                      <a class="CoveoResultLink"></a>
                    </div>
                  </div>
                  <div class="coveo-result-row is-secondary">
                    <div class="coveo-result-cell">
                      <a class="CoveoResultLink"></a>
                    </div>
                  </div>
                  <div class="coveo-result-row u-mt-0">
                    <div class="coveo-result-cell">
                      <span class="CoveoFieldValue" data-field="@source" data-helper="recommendedTag" data-html-value="true"></span>
                      <span class="CoveoFieldValue" data-field="@source" data-helper="sourceTag" data-html-value="true"></span>
                    </div>
                  </div>
                  <div class="coveo-result-row">
                    <div class="coveo-result-cell">
                      <span class="CoveoExcerpt"></span>
                    </div>
                  </div>
                  <div class="coveo-result-row">
                    <div class="coveo-result-cell">
                      <span class="CoveoFieldValue date" data-field="@date" data-helper="dateFormatter"></span>
                    </div>
                  </div>
                </div>
              </div>
            </script>
          </div>
          <div class="CoveoPager"></div>
          <div class="coveo-facet-help show--small">
            <h3 class="coveo-facet-column-heading">
              Can't find what you need?
            </h3>
            <p>
              Visit our
              <a
                class="is-external-link"
                href="https://www.okta.com/"
                target="_blank"
                rel="noopener noreferrer"
                >Corporate Site</a
              >
              for marketing and sales information.
            </p>
            <p>
              Visit our
              <a
                class="is-external-link"
                href="https://support.okta.com/help/s/"
                target="_blank"
                rel="noopener noreferrer"
                >Help Center</a
              >
              for documentation, support knowledge base, and community
              discussions.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    import("../util/coveo/init").then(({ initSearchPage }) => {
      initSearchPage();
    });
  },
};
</script>
