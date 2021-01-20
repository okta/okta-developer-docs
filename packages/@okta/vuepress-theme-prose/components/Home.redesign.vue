<template>
  <div class="redesign-homepage container-fluid">
    <div class="row">
      <div
        class="col-xl-2 col-lg-2 d-none d-lg-block redesign-homepage--col-no-padding"
      >
        <RedesignedSideBar />
      </div>
      <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12">
        <div class="row justify-content-center">
          <div class="col-11 redesign-homepage--elevated">
            <div class="row">
              <div class="col-12">
                <h1
                  class="redesign-homepage--main-heading redesign-homepage--color-main"
                >
                  Okta Developer Portal
                </h1>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h2
                  class="redesign-homepage--sub-heading redesign-homepage--color-main"
                >
                  Let's get started
                </h2>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p
                  class="redesign-homepage--sub-heading-disclaimer redesign-homepage--color-sub"
                >
                  Authenticate up to 1,000 users per month for free forever
                </p>
              </div>
            </div>
            <div class="row redesign-homepage--selector-block-margin ">
              <div
                class="col-xl-3 col-lg-6 col-md-6"
                v-for="(tile, index) in $page.frontmatter.tiles"
                :key="index"
              >
                <SelectorTile :tileData="tile" />
              </div>
            </div>
            <div
              class="row justify-content-around align-items-center flex-lg-row-reverse flex-md-row-reverse redesign-homepage--assurance-block-margin"
            >
              <div
                class="col-xl-4 col-lg-6 col-md-6 col-sm-12"
                v-for="(assurance, index) in $page.frontmatter.assurances"
                :key="index"
              >
                <AssuranceItem :item="assurance" />
              </div>
            </div>
            <div
              class="row justify-content-around redesign-homepage--customize-your-app-margin "
            >
              <div class="col-12">
                <h2
                  class="redesign-homepage--sub-heading redesign-homepage--color-main redesign-homepage--centered-md"
                >
                  Customize for your app, try it here
                </h2>
              </div>
              <div
                v-if="!pseudoAuthorizedCodeBlock"
                class="col-xl-7 col-md-12 col-sm-12"
              >
                <div class="redesign-homepage--code-example">
                  <div class="redesign-homepage--code-example--header">
                    Javascript
                  </div>
                  <div class="redesign-homepage--code-example--cm-wrapper">
                    <FrontPageCodeMirror />
                  </div>
                </div>
              </div>
              <div
                v-if="!pseudoAuthorized"
                class="col-xl-5 col-md-10 col-sm-12"
              >
                <div class="redesign-homepage--live-widget">
                  <FrontPageWidget @authLeia="togglePseudoAuth" />
                </div>
              </div>
              <div
                v-if="pseudoAuthorized"
                class="col-sm-12 col-xs-12 col-lg-10"
              >
                <div class="redesign-homepage--welcome-leia">
                  <div
                    class="redesign-homepage--welcome-leia--close"
                    @click="togglePseudoAuth"
                  >
                    <span>X</span> close
                  </div>
                  <div class="redesign-homepage--welcome-leia--header">
                    Welcome, Leia
                  </div>
                  <div class="redesign-homepage--welcome-leia--info">
                    Okta makes authentication straightforward. Connect your
                    apps, choose an identity provider (or use ours), add users,
                    configure rules, customize your login page, and then gain
                    insights from our built in reports.
                  </div>
                  <div class="redesign-homepage--welcome-leia--actions">
                    <a
                      href="/signup/"
                      class="redesign-homepage--welcome-leia--actions--cta act-btn"
                    >
                      Sign up for Okta
                    </a>
                    <a
                      href="/code/javascript/okta_sign-in_widget/"
                      class="redesign-homepage--welcome-leia--actions--docs act-btn"
                    >
                      View widget docs
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="redesign-homepage--partners-block-margin">
              <CompanyLogos />
            </div>
          </div>

          <div class="redesign-homepage--shapes">
            <img
              src="/img/home-curves.svg"
              class="redesign-homepage--shapes-curves"
            />
            <div class="redesign-homepage--shapes-fill"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyLogos from "./CompanyLogos.vue";
const SIDE_BY_SIDE_BREAKPOINT = 1200;

export default {
  name: "Home",
  components: {
    RedesignedSideBar: () => import("../components/RedesignedSidebar"),
    SelectorTile: () => import("../components/SelectorTile"),
    AssuranceItem: () => import("../components/AssuranceItem"),
    FrontPageWidget: () => import("../components/FrontPageWidget"),
    FrontPageCodeMirror: () => import("../components/FrontPageCodeMirror"),
    CompanyLogos: () => import("../components/CompanyLogos")
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
