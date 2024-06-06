<template>
  <div class="layout">
    <div
      ref="header"
      class="fixed-header"
    >
      <HeaderBanner
        banner-id="v1"
        @updateHeight="updateHeaderHeight"
      >
        <p>
          Is it easy or difficult to use our developer documentation?
          <a
            href="#"
            target="_blank"
            @click="openSurvey()"
          >
            Let us know in this short survey ↗
          </a>
        </p>
      </HeaderBanner>
      <Header />
      <HeaderNav />
    </div>
    <div
      :class="{
        'page-body': true,
      }"
    >
      <div
        v-if="$page.frontmatter.component"
        class="content"
      >
        <component :is="$page.frontmatter.component" />
      </div>

      <div
        v-else-if="$page.frontmatter.customLandingPage"
        class="content"
      >
        <div
          :class="{
            'content--container': true,
            'navigation-only': appContext.isTreeNavMobileOpen
          }"
        >
          <Sidebar />
          <div class="content-area content-area-full col-xl-10 col-lg-10 col-md-12 col-sm-12">
            <div class="content-custom">
              <component
                :is="currentCustomLanding"
                v-if="currentCustomLanding"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="content"
      >
        <div
          :class="{
            'content--container': true,
            'navigation-only': appContext.isTreeNavMobileOpen
          }"
        >
          <Sidebar />
          <div class="content-area col-xl-10 col-lg-10 col-md-12 col-sm-12">
            <Breadcrumb />
            <StackSelector v-if="$page.hasStackContent" />
            <MobileOnThisPage />
            <PageTitle />
            <ContentPage />
            <GeneratedContent v-if="$page.frontmatter.generated" />
            <div
              v-if="!$page.frontmatter.generated"
              class="edit-on-github"
            >
              <span class="fa fa-github" />
              <span>
                <a
                  v-if="editLink"
                  id="edit-link"
                  :href="editLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-proofer-ignore
                >{{ editLinkText }}</a>
              </span>
            </div>
          </div>
          <div class="on-this-page">
            <OnThisPage />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <Feedback />
  </div>
</template>

<script>
export const LAYOUT_CONSTANTS = {
  HEADER_TO_CONTENT_GAP: 45, //px
  ANCHOR_TOP_MARGIN: 32
};
const TABLET_BREAKPOINT = 767;

import SidebarItems from "../mixins/SidebarItems";

export const endingSlashRE = /\/$/;
export default {
  components: {
    Header: () => import("../components/Header.vue"),
    HeaderNav: () => import("../components/HeaderNav.vue"),
    Sidebar: () => import("../components/Sidebar.vue"),
    OnThisPage: () => import("../components/OnThisPage.vue"),
    MobileOnThisPage: () => import("../components/MobileOnThisPage.vue"),
    PageTitle: () => import("../components/PageTitle.vue"),
    Breadcrumb: () => import("../components/Breadcrumb.vue"),
    ContentPage: () => import("../components/ContentPage.vue"),
    GeneratedContent: () => import("../components/GeneratedContent.vue"),
    Footer: () => import("../components/Footer.vue"),
    Feedback: () => import("../components/Feedback.vue"),
    Quickstart: () => import("../components/Quickstart.vue"),
    Pricing: () => import("../components/Pricing.vue"),
    OktaIntegrationNetwork: () =>
      import("../custom-landings/OktaIntegrationNetwork/OktaIntegrationNetwork.vue"),
    Search: () => import("../components/Search.vue"),
    Home: () => import("../components/Home.vue"),
    Terms: () => import("../components/Terms.vue"),
    Errors: () => import("../components/Errors.vue"),
    Copyright: () => import("../components/Copyright.vue"),
    HeaderBanner: () => import("../components/HeaderBanner.vue"),
  },
  mixins: [SidebarItems],
  provide() {
    return {
      appContext: this.appContext,
      stackSelectorData: this.stackSelectorData,
    };
  },
  data() {
    return {
      appContext: {
        isTreeNavMobileOpen: false,
        isInMobileViewport: false,
        treeNavDocs: [],
        anchors: []
      },
      stackSelectorData: {
        to: '',
        from: ''
      },
    };
  },
  computed: {
    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig.editLink;
      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },
    editLinkText() {
      return this.$site.themeConfig.editLink.editLinkText || `Edit this page`;
    },
    currentCustomLanding() {
      const { frontmatter, title } = this.$page;
      if (title && frontmatter.customLandingPage) {
        return title.replace(/\s/g, '')
      }
      return ''
    }
  },
  watch: {
    $route(to, from) {
      this.appContext.isTreeNavMobileOpen = false;
      this.redirIfRequired();

      // On route change check if base path has changed.
      // If true, re-render sidebar.
      // We want to check if it's a 'real' route change (re-render sidebar) or just a page scroll
      // where the hash fragment changes (do nothing)
      if (from.path !== to.path) {
        // Previously we tried to remove re-render logic but seems it
        // caused additional bugs (https://oktainc.atlassian.net/browse/OKTA-419090, https://oktainc.atlassian.net/browse/OKTA-419134)
        // See https://github.com/okta/okta-developer-docs/pull/2170 <-- PR that gets rid of re-render sidebar logic
        this.appContext.treeNavDocs = this.getNavigationData();
      }
    }
  },
  mounted: function() {
    import('../util/pendo');
    let that = this;
    that.appContext.treeNavDocs = this.getTreeNavDocs();
    this.$on("toggle-tree-nav", event => {
      that.appContext.isTreeNavMobileOpen = event.treeNavOpen;
    });
    
    // Delay height adjustment on mount to ensure the header element is fully rendered.
    setTimeout(() => {
      this.updateHeaderHeight();
    }, 340)

    this.onResize();
    window.addEventListener("resize", this.onResize);
    this.redirIfRequired();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    redirIfRequired() {
      if (this.$page) {
        if (this.$page.redir) {
          let anchor = window.location.href.split("#")[1] || "";
          if (anchor) {
            this.$router.replace({ path: `${this.$page.redir}#${anchor}` });
          } else {
            this.$router.replace({ path: `${this.$page.redir}` });
          }
        }
        if (this.$page.path === '/okta-integration-network/') {
          this.$router.replace({ path: `/docs/guides${this.$page.path}` });
        }
      }
    },
    onResize() {
      this.updateHeaderHeight()
      this.appContext.isInMobileViewport =
        window.innerWidth <= TABLET_BREAKPOINT;
    },
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      return (
        `https://github.com/${docsRepo}` +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") : "") +
        "/" +
        path
      );
    },
    getTreeNavDocs() {
      this.appContext.treeNavDocs = this.appContext.treeNavDocs.length > 0 ? this.appContext.treeNavDocs : this.getNavigationData();
      return this.appContext.treeNavDocs;
    },
    updateHeaderHeight() {
      this.$nextTick(() => {
        const headerHeight = this.$refs.header?.offsetHeight || 0;

        if(headerHeight) {
          document.documentElement.style.setProperty('--header-height', `${headerHeight}px`)
        }
      });
    },
    openSurvey() {
      window.open('https://surveys.okta.com/jfe/form/SV_6XTKmUbd22BlYFg?source=' + encodeURIComponent(document.location.href), '_blank');
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/prose";
</style>
