<template>
  <div class="theme-container">

    <TopNavigation/>

    <PromoBanner/>

    <div class="Body error_404 content custom">
      <div class="region region-content">
        <div class="Hero--empty is-active"></div>
        <div class="Body-sections">
          <section class="block block-bean">
            <section class="Section--developer-404 Section--basicContent ViewMode--default Background--0 u-align--left u-padding--medium">
              <div class="Wrap">
                <div class="Section-content  ">
                  <h1 class="Hero-title">404 Page Not Found</h1>
                  <p>The web page or file you were trying to reach cannot be found. It may have been moved to a
                    different location or removed because the information it contained is no longer valid.</p>
                  <p>Common errors that can result in broken links include:</p>
                  <p>- Truncated URL's.&nbsp;Some email applications may break a URL due to line breaks.&nbsp;You may
                    need to cut and paste a URL from your email application into your browser's location field.</p>
                  <p>- Case Sensitivity.&nbsp;URL's are case sensitive.&nbsp;"File.html" and "file.html" are not
                    considered the same file by the server.&nbsp;Please verify that the URL is entered correctly as
                    printed.</p>
                  <p>Please <a href="mailto:info@okta.com">email</a> your feedback/comments.</p>
                </div>
              </div>
              <div class="Background-curve"></div>
            </section>
          </section>
        </div>
      </div>
    </div>

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

