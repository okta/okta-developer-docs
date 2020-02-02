<template>
  <div>
    <div class="fixed-header">
      <TopBar />
      <Search />
    </div>

    <div class="page-body">
      <Breadcrumb />
      <div class="content" v-if="$page.frontmatter.component">
        <component :is="$page.frontmatter.component" />
      </div>
      <div class="content" v-else>
        <div class="content--container">
          <div class="tree-nav">
            <Sidebar />
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
export default {
  components: {
    TopBar: () => import('../components/TopBar.vue'),
    Search: () => import('../components/Search.vue'),
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
    return {}
  },
  mounted() {

    window.addEventListener('load', () => {
        window.setTimeout(() => {
          let anchor = window.location.href.split('#')[1];
          if (anchor) {
            let target = document.getElementById(anchor);
            if (target) {
              window.scrollTo(0, target.offsetTop - document.querySelector('.fixed-header').clientHeight - 45);
            }
          }

          // let links = document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href*="/quickstart/#"])');
          let links = document.querySelectorAll('.header-anchor.header-link');

          Array.from(links).forEach((link) => {
            link.addEventListener('click', function(event) {

              if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

                let target = document.querySelector(this.hash);
                if (target) {
                  event.preventDefault();
                  window.scrollTo(0, target.offsetTop - document.querySelector('.fixed-header').clientHeight - 45);
                  location.hash = this.hash;
                  return false;
                }
              }
            })
          })
        }, 500);
    });

  }
}
</script>

<style lang="scss">
@import '../assets/css/prose';
</style>