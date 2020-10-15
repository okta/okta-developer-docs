<template>
  <div>
    <div class="fixed-header">
      <TopBar />
    </div>

    <div class="page-body">
      <Breadcrumb />
      <div class="content" v-if="$page.frontmatter.component">
        <component :is="$page.frontmatter.component" />
      </div>
      <div class="content" v-else>
        <div class="content--container">
          <div class="tree-nav">
            <Sidebar :sidebarActive="treeNavOpen" />
          </div>
          <div class="content-area">
            <PageTitle />
            <MobileOnThisPage />
            <Content />
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
  HEADER_TO_CONTENT_GAP: 45, //px
};

export default {
  components: {
    TopBar: () => import('../components/TopBar.vue'),
    Sidebar: () => import('../components/Sidebar.vue'),
    OnThisPage: () => import('../components/OnThisPage.vue'),
    MobileOnThisPage: () => import('../components/MobileOnThisPage.vue'),
    PageTitle: () => import('../components/PageTitle.vue'),
    Breadcrumb: () => import('../components/Breadcrumb.vue'),
    Footer: () => import('../components/Footer.vue'),
    Documentation: () => import('../components/Documentation.vue'),
    Reference: () => import('../components/Reference.vue'),
    Quickstart: () => import('../components/Quickstart.vue'),
  },
  data() {
    return {
      treeNavOpen: false
    }
  },
  mounted() {
    window.addEventListener('load', () => {
        const paddedHeaderHeight = document.querySelector('.fixed-header').clientHeight + LAYOUT_CONSTANTS.HEADER_TO_CONTENT_GAP;
        window.setTimeout(() => {
          let anchor = window.location.href.split('#')[1];
          if (anchor) {
            let target = document.getElementById(anchor);
            if (target) {
              window.scrollTo(0, target.offsetTop - paddedHeaderHeight);
            }
          } else {
            window.scrollBy(0, -paddedHeaderHeight)
          }

          const headingAnchorsMap = Array.from(document.querySelectorAll('.header-anchor.header-link')).reduce(function (anchorsByHash, anchor) {
            anchorsByHash[anchor.hash] = anchor;
            return anchorsByHash;
          }, {});
          const allContentAnchors = document.querySelectorAll('a[href^="#"]:not(.on-this-page-link):not(.tree-nav-link)');

          Array.from(allContentAnchors).forEach((link) => {
            link.addEventListener('click', function(event) {
              if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                let target = headingAnchorsMap[this.hash];
                if (target) {
                  event.preventDefault();
                  window.scrollTo(0, target.offsetTop - paddedHeaderHeight);
                  location.hash = this.hash;
                  return false;
                }
              }
            })
          })
        }, 500);
    });

    let that = this;
    this.$on('toggle-tree-nav', event => {
      that.treeNavOpen = event.treeNavOpen;
    });

    this.redirIfRequired();
  },
  watch: {
    $route(to, from) {
      this.redirIfRequired();
    }
  },
  methods: {
    redirIfRequired() {
      if(this.$page && this.$page.redir) {
        let anchor = window.location.href.split('#')[1] || '';
        if(anchor) {
          this.$router.replace({ path: `${this.$page.redir}#${anchor}` });
        } else {
          this.$router.replace({ path: `${this.$page.redir}` });
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>