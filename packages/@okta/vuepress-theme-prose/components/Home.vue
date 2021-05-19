<template>
  <div class="homepage container-fluid">
    <div class="row">
      <div class="col-xl-2 col-lg-2 d-none d-lg-block homepage--col-no-padding">
        <HomeSidebar />
      </div>
      <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12">
        <div class="okta-game-banner row">
          <div class="okta-game-banner-wrapper">
            <div class="okta-game-banner--logo">
              <img src="/img/okta-game/okta-game-logo.svg" />
            </div>
            <div class="okta-game-banner--image">
              <img src="/img/okta-game/okta-game-image.svg" />
            </div>
            <div class="okta-game-banner--details">
              <p>Can you turn this small business into a global powerhouse?</p>
              <div class="okta-game-banner--details-buttons">
                <SmartLink
                  :item="{ link: 'https://codetycoongame.com/' }"
                  classes="play-now-btn"
                >
                  Play Now
                </SmartLink>
                <SmartLink
                  :item="{ link: 'https://youtu.be/aO5QTNjUQ6o' }"
                  classes="learn-more"
                >
                  Learn More
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-11 homepage--elevated">
            <div class="row">
              <div class="col-12">
                <h1 class="homepage--main-heading homepage--color-main">
                  Okta Developer Portal
                </h1>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <h2 class="homepage--sub-heading homepage--color-main">
                  Let's get started
                </h2>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="homepage--sub-heading-disclaimer homepage--color-sub">
                  Authenticate up to 15,000 users per month for free
                </p>
              </div>
            </div>
            <div class="row homepage--selector-block-margin ">
              <div
                class="col-xl-3 col-lg-6 col-md-6"
                v-for="(tile, index) in $page.frontmatter.tiles"
                :key="index"
              >
                <SelectorTile :tileData="tile" />
              </div>
            </div>
            <div
              class="row justify-content-around align-items-center flex-lg-row-reverse flex-md-row-reverse homepage--assurance-block-margin"
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
              class="row justify-content-around homepage--customize-your-app-margin "
            >
              <div class="col-12">
                <h2
                  class="homepage--sub-heading homepage--color-main homepage--centered-md"
                >
                  Customize your sign-in
                </h2>
              </div>
              <div
                v-if="!pseudoAuthorizedCodeBlock"
                class="col-xl-7 col-md-12 col-sm-12"
              >
                <div class="homepage--code-example">
                  <div class="homepage--code-example--header">
                    JavaScript
                  </div>
                  <div class="homepage--code-example--cm-wrapper">
                    <FrontPageCodeMirror />
                  </div>
                </div>
              </div>
              <div
                v-if="!pseudoAuthorized"
                class="col-xl-5 col-md-10 col-sm-12"
              >
                <div class="homepage--live-widget">
                  <FrontPageWidget @authLeia="togglePseudoAuth" />
                </div>
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
                    <span>X</span> close
                  </div>
                  <div class="homepage--welcome-leia--header">
                    Welcome, Leia
                  </div>
                  <div class="homepage--welcome-leia--info">
                    Okta makes authentication straightforward. Connect your
                    apps, choose an identity provider (or use ours), add users,
                    configure rules, customize your login page, and then gain
                    insights from our built in reports.
                  </div>
                  <div class="homepage--welcome-leia--actions">
                    <SmartLink
                      :item="{ link: '/signup/' }"
                      classes="homepage--welcome-leia--actions--cta act-btn"
                    >
                      Sign up for Okta
                    </SmartLink>
                    <SmartLink
                      :item="{ link: '/code/javascript/okta_sign-in_widget/' }"
                      classes="homepage--welcome-leia--actions--docs act-btn"
                    >
                      View widget docs
                    </SmartLink>
                  </div>
                </div>
              </div>
            </div>

            <div class="homepage--okta-game">
              <div class="homepage--okta-game-description">
                <h3>Code Tycoon - A Game from Okta</h3>
                <p>
                  As the junior developer at a small company, it’s up to you to
                  transform a small business into a global powerhouse while
                  grappling with endless meetings, bumbling co-workers, denial
                  of service attacks, and aggressive competitors.
                </p>
                <SmartLink
                  :item="{ link: 'https://codetycoongame.com/' }"
                  classes="play-now-btn"
                >
                  play now
                </SmartLink>
              </div>
              <div class="homepage--okta-game-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/aO5QTNjUQ6o"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <div class="homepage--partners-block-margin">
              <CompanyLogos />
            </div>
          </div>

          <div class="homepage--shapes">
            <img src="/img/home-curves.svg" class="homepage--shapes-curves" />
            <div class="homepage--shapes-fill"></div>
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
    HomeSidebar: () => import("../components/HomeSidebar"),
    SelectorTile: () => import("../components/SelectorTile"),
    AssuranceItem: () => import("../components/AssuranceItem"),
    FrontPageWidget: () => import("../components/FrontPageWidget"),
    FrontPageCodeMirror: () => import("../components/FrontPageCodeMirror"),
    CompanyLogos: () => import("../components/CompanyLogos"),
    SmartLink: () => import("../components/SmartLink")
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
