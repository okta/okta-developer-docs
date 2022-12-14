<template>
  <div class="homepage content">
    <div class="content--container">
      <Sidebar />
      <div class="width-adjuster">
        <AnnouncementBanner>
          <template #description>
            <strong>We've got a new API reference in the works!</strong><br>
            With a fresh look and feel, our new API content features a more logical navigation and a wider variety of code examples. <a href="https://developer.okta.com/docs/api/">Try the beta now</a>.
          </template>
        </AnnouncementBanner>
        <div class="justify-content-center">
          <div class="homepage--elevated">
            <div class="homepage--top-section homepage--section-margins">
              <div class="row flex align-items-center homepage--intro-heading">
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <h1 class="homepage--main-heading homepage--color-main">
                    Okta Developer Portal
                  </h1>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <h6>Auth for All</h6>
                  <p class="homepage--section-description">
                    Quickly deploy auth that protects your apps,<br>
                    APIs, and infrastructure
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-12 homepage--sub-heading">
                  <h2 class="homepage--color-main">
                    Let’s get started
                  </h2>
                </div>
              </div>

              <div class="homepage--selector-block-margin selector-tiles">
                <div
                  v-for="(tile, index) in $page.frontmatter.tiles"
                  :key="index"
                  class="selector-tile-item"
                >
                  <SelectorTile :tile-data="tile" />
                </div>
              </div>
            </div>
            <div
              class="homepage--assurance-block-margin homepage--section-margins"
            >
              <div class="row flex justify-content-around">
                <div
                  v-for="(assurance, index) in $page.frontmatter.assurances"
                  :key="index"
                  class="col-xl-4 col-lg-4 col-md-4 col-sm-12"
                >
                  <AssuranceItem :item="assurance" />
                </div>
              </div>
            </div>
            <div
              class="homepage--partners-block-margin homepage--section-margins"
            >
              <CompanyLogos />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Sidebar: () => import("../components/Sidebar"),
    SelectorTile: () => import("../components/SelectorTile"),
    AssuranceItem: () => import("../components/AssuranceItem"),
    CompanyLogos: () => import("../components/CompanyLogos"),
    SmartLink: () => import("../components/SmartLink"),
  },

  data() {
    return {
      pseudoAuthorizedCodeBlock: false
    };
  },
};
</script>
