<template>
  <div class="PageWrap">
    <!-- Begin Header -->
    <TopNavigation></TopNavigation>
    <!-- End Header -->


    <!-- Begin Promo Banner -->

    <!-- End Promo Banner -->

    <div class="page-content">
      <section class="PageContent SectionIndex">
    <!-- Begin Page Content -->
        <div class="PageContent-main">
          <Breadcrumb></Breadcrumb>
          <h1>{{ $page.title }}</h1>
          <ul class="list--with-horizontal-icons">
            <li v-for="link in $page.frontmatter.top_links" :key="link.path">
              <router-link :to="link.path"><img :src="'/assets/img/'+link.icon"><span>{{link.name}}</span></router-link>
            </li>
          </ul>

          <div class="Row">
            <div class="Column--6 Column--small-12">
              <Content slot-key="left"></Content>
            </div>
            <div class="Column--6 Column--small-12">
              <Content slot-key="right"></Content>
            </div>
          </div>
        </div>
    <!-- End Page Content -->
      </section>
    </div>

    <!-- Begin Footer -->
    <Footer />
    <!-- End Footer -->
  </div>
</template>

<script>
export default {
  components: {
    TopNavigation: () => import('../components/TopNavigation.vue'),
    Footer: () => import('../components/Footer.vue')
  }
}

</script>

<style lang="scss">
  @import '../styles/okta';
  @import '~prismjs/themes/prism-solarizedlight.css';

  .header-anchor {
    display:none;
  }
</style>
