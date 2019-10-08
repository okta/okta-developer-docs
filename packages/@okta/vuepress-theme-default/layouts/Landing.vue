<template>
  <div class="Page okta-landing">
    <TopNavigation />
    <Breadcrumb />
    <section class="PageContent NoPaddingTop">
      <!-- START Page Content -->
      <div class="PageContent-main" id="guides-body">
        <div class="guide-details">
          <div class="guide-details-content">
            <aside class="landing-navigation">
              <ul class="landing">
                <li :class="{ overview: true, active: true }">
                  <router-link to="/docs/reference/">Overview</router-link>
                </li>
                <li>
                  <router-link to="/docs/reference/">OpenID Connect &amp; OAuth 2.0 API</router-link>
                </li>
                <li>
                  <router-link to="/docs/reference/">Authentication API</router-link>
                </li>
                <li :class="{ subnav: true }">
                  <router-link to="/" class="guide">Management APIs</router-link>
                  <ol class="sections">
                    <li>
                      <div class="highlight"><router-link to="/">sec title</router-link></div>
                    </li>
                  </ol>
                </li>
                <li>
                  <router-link to="/docs/reference/">Design Principles</router-link>
                </li>
                <li>
                  <router-link to="/docs/reference/">Error Codes</router-link>
                </li>
                <li>
                  <router-link to="/docs/reference/">Okta Expression Language</router-link>
                </li>
                <li>
                  <router-link to="/docs/reference/">Rate Limits</router-link>
                </li>
                <li>
                  <router-link to="/docs/reference/">Postman Collections</router-link>
                </li>
              </ul>
            </aside>
            <div class="guide-content">
              <Content />
            </div>
          </div>
        </div>
      </div>
      <!-- END Page Content -->
    </section>
    <Footer/>
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
  @import '../assets/css/okta';
  @import '~prismjs/themes/prism-solarizedlight.css';
  .icon.outbound {
    display: none !important
  }
</style>
