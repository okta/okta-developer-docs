<template>
  <div class="layout">
    <div class="fixed-header">
      <Header />
    </div>
    <div
      :class="{
        'page-body': true,
      }"
    >
      <HeaderNav />

      
      <div class="content" v-if="$page.frontmatter.component">
        <component :is="$page.frontmatter.component" />
      </div>

      <div class="content" v-else-if="$page.frontmatter.customLandingPage">
        <div
          :class="{
            'content--container': true,
            'navigation-only': appContext.isTreeNavMobileOpen
          }"
        >
          <Sidebar />
          <div class="content-custom">
            <CustomLandingPage />
          </div>
        </div>
      </div>

      <div class="content" v-else>
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
            <div class="edit-on-github">
              <span class="fa fa-github"></span>
              <span>
                <a
                  v-if="editLink"
                  id="edit-link"
                  :href="editLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-proofer-ignore
                  >{{ editLinkText }}</a
                >
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
  </div>
</template>

<script>
export const LAYOUT_CONSTANTS = {
  HEADER_TO_CONTENT_GAP: 45 //px
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
    CustomLandingPage: () => import("../components/CustomLandingPage.vue"),
    GeneratedContent: () => import("../components/GeneratedContent.vue"),
    Footer: () => import("../components/Footer.vue"),
    Quickstart: () => import("../components/Quickstart.vue"),
    Pricing: () => import("../components/Pricing.vue"),
    OktaIntegrationNetwork: () =>
      import("../components/OktaIntegrationNetwork.vue"),
    Search: () => import("../components/Search.vue"),
    Home: () => import("../components/Home.vue"),
    Terms: () => import("../components/Terms.vue"),
    Errors: () => import("../components/Errors.vue"),
  },
  mixins: [SidebarItems],
  data() {
    return {
      appContext: {
        isTreeNavMobileOpen: false,
        isInMobileViewport: false,
        treeNavDocs: []
      },
      stackSelectorData: {
        to: '',
        from: ''
      },
    };
  },
  provide() {
    return {
      appContext: this.appContext,
      stackSelectorData: this.stackSelectorData,
    };
  },
  mounted: function() {
    import('../util/pendo');
    let that = this;
    that.appContext.treeNavDocs = this.getTreeNavDocs();
    this.$on("toggle-tree-nav", event => {
      that.appContext.isTreeNavMobileOpen = event.treeNavOpen;
    });
    this.onResize();
    window.addEventListener("resize", this.onResize);
    this.redirIfRequired();
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
    }
  },
  methods: {
    redirIfRequired() {
      if (this.$page && this.$page.redir) {
        let anchor = window.location.href.split("#")[1] || "";
        if (anchor) {
          this.$router.replace({ path: `${this.$page.redir}#${anchor}` });
        } else {
          this.$router.replace({ path: `${this.$page.redir}` });
        }
      }
    },
    onResize() {
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
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style lang="scss">
@import "../assets/css/prose";
</style>
