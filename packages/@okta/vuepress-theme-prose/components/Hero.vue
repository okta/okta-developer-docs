<template>
  <!-- Remove style attribute from .hero section when removing promo banner -->
  <div class="hero-container">
    <section
      class="hero"
      style="padding-top: 28px; padding-bottom: 28px;"
    >
      <div class="hero-wrapper-container">
        <div :class="{ 'hero__wrapper': true, 'wrapper': true, 'full-width-wrapper': !showBanner }">
          <h1 class="hero__title dont-break-out">
            Okta developer
          </h1>
          <p class="hero__paragraph dont-break-out">
            Our developer  portal enables you to deploy auth that protects your users, apps, APIs, and infrastructure.
          </p>
          <!-- Start workshops promo banner -->
          <p style="color: white; font-size: 18px; line-height: 1.4; max-width: 500px;">
            Get your app <a
              style="color: white; text-decoration: underline;"
              href="https://regionalevents.okta.com/enterprisereadyworkshops"
              target="_blank"
            >enterprise-ready with free virtual workshops</a>!
          </p>
          <!-- End workshops promo banner -->
        </div>
        <!-- 
          For understanding usage of the banner, refer https://oktawiki.atlassian.net/wiki/spaces/DOC/pages/2920874189/Adding+a+banner+on+homepage+in+dev+docs
         -->
        <HomePageBanner
          v-if="showBanner"
          primary-cta-text="Primary button"
          primary-cta-link="/docs/guides/"
          primary-link-target="_self"
          secondary-cta-text="Secondary button"
          secondary-cta-link="https://www.yahoo.com"
        >
          <template #heading>
            Banner heading
          </template>
          <template #description>
            Get your app
            <a
              href="https://regionalevents.okta.com/enterprisereadyworkshops"
              target="_blank"
            >
              enterprise-ready with free virtual workshops
            </a>!
          </template>
        </HomePageBanner>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Hero",
  data() {
    return {
      showBanner: false
    }
  }
};
</script>
