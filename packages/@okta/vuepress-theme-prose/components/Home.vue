<template>
  <div class="homepage content">
    <div class="content--container">
      <div class="sidebar-area">
        <Sidebar />
      </div>
      <div class="width-adjuster">
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
                    Quickly deploy auth that protects your apps,<br />
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
                  class="selector-tile-item"
                  v-for="(tile, index) in $page.frontmatter.tiles"
                  :key="index"
                >
                  <SelectorTile :tileData="tile" />
                </div>
              </div>
            </div>
            <div
              class="homepage--assurance-block-margin homepage--section-margins"
            >
              <div class="row flex justify-content-around">
                <div
                  class="col-xl-4 col-lg-4 col-md-4 col-sm-12"
                  v-for="(assurance, index) in $page.frontmatter.assurances"
                  :key="index"
                >
                  <AssuranceItem :item="assurance" />
                </div>
              </div>
            </div>
           <!-- <div
              class="homepage--customize-your-app-margin homepage--section-margins"
            >
              <h2
                class="homepage--main-heading homepage--color-main text-center"
              >
                Customize your sign-in
              </h2>
              <div class="flex align-items-center homepage--examples">
                <div
                  v-if="!pseudoAuthorizedCodeBlock"
                  class="homepage--code-example"
                >
                  <div class="homepage--code-example--cm-wrapper">
                    <FrontPageCodeMirror />
                  </div>
                </div>

                <div v-if="!pseudoAuthorized" class="homepage--live-widget">
                  <FrontPageWidget @authLeia="togglePseudoAuth" />
                </div>
                <div
                  v-if="pseudoAuthorized"
                  class="col-sm-12 col-xs-12 col-lg-10"
                >
                  <div class="homepage--welcome-leia">
                    <div
                      class="homepage--welcome-leia--close"
                      @click="togglePseudoAuth"
                    >
                      <svg
                        class="close-icon"
                        stroke="#00297A"
                        stroke-width="2"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 79.2 79.2"
                        width="32"
                      >
                        <line
                          stroke-width="5"
                          class="st1"
                          x1="23.3"
                          y1="55.9"
                          x2="55.9"
                          y2="23.3"
                        ></line>
                        <line
                          stroke-width="5"
                          class="st1"
                          x1="23.3"
                          y1="23.3"
                          x2="55.9"
                          y2="55.9"
                        ></line>
                      </svg>
                    </div>
                    <div class="homepage--welcome-leia--header">
                      Welcome, Leia
                    </div>
                    <div class="homepage--welcome-leia--info">
                      Okta makes authentication straightforward. Connect your
                      apps, choose an identity provider (or use ours), add
                      users, configure rules, customize your login page, and
                      then gain insights from our built in reports.
                    </div>
                    <div class="homepage--welcome-leia--actions">
                      <SmartLink
                        :item="{ link: '/signup/' }"
                        classes="homepage--welcome-leia--actions--cta act-btn"
                      >
                        Sign up for Okta
                      </SmartLink>
                      <SmartLink
                        :item="{
                          link: '/code/javascript/okta_sign-in_widget/'
                        }"
                        classes="homepage--welcome-leia--actions--docs act-btn"
                      >
                        View widget docs
                      </SmartLink>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <div>
            <br>
            <br>
            <!-- empty div for spacing  -->
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
const SIDE_BY_SIDE_BREAKPOINT = 1200;

export default {
  name: "Home",
  components: {
    Sidebar: () => import("../components/Sidebar"),
    SelectorTile: () => import("../components/SelectorTile"),
    AssuranceItem: () => import("../components/AssuranceItem"),
    FrontPageWidget: () => import("../components/FrontPageWidget"),
    FrontPageCodeMirror: () => import("../components/FrontPageCodeMirror"),
    CompanyLogos: () => import("../components/CompanyLogos"),
    SmartLink: () => import("../components/SmartLink"),
  },

  data() {
    return {
      pseudoAuthorized: false,
      pseudoAuthorizedCodeBlock: false
    };
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.isInMobileViewport = window.innerWidth < SIDE_BY_SIDE_BREAKPOINT;
    },
    togglePseudoAuth(e) {
      if (this.isInMobileViewport) {
        this.pseudoAuthorized = !this.pseudoAuthorized;
      } else {
        this.pseudoAuthorized = !this.pseudoAuthorized;
        this.pseudoAuthorizedCodeBlock = !this.pseudoAuthorizedCodeBlock;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
