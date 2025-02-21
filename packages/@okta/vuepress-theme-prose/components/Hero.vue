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
            Our developer portal enables you to deploy auth that protects your users, apps, APIs, and infrastructure.
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
          v-show="showBanner"
          primary-cta-text="Sign up for the Integrator Free Plan"
          primary-cta-link="https://developer.okta.com/signup/"

          secondary-cta-text="Learn more at the Okta blog"
          secondary-cta-link="https://developer.okta.com/blog/"
        >
          <!-- <template #heading /> -->
          <template #heading>
    Coming May 2, 2025!
          </template>
          <template #description>
            Okta is introducing a new free org for developers and integrators available at <a href="http://localhost:8080/signup/">Sign Up</a>. The Integration Free Plan org will replace the existing Okta Developer Edition Service. If you are an existing Okta Developer Edition user, you will need to update to the new org. <a href="https://developer.okta.com/blog/" target="_blank">Learn more</a>.
          </template>
        </HomePageBanner>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Hero",
  computed: {
    showBanner() {
      const bannerStartTime = new Date('2025-02-14T01:00:00-04:00');
      const bannerStartTimeEpoch = Math.floor(bannerStartTime.getTime() / 1000);
      const bannerEndTime = new Date('2025-02-24T23:59:00-04:00');
      const bannerEndTimeEpoch = Math.floor(bannerEndTime.getTime() / 1000);

      const currentTimeEpoch = Math.floor(Date.now() / 1000);

      return currentTimeEpoch >= bannerStartTimeEpoch && currentTimeEpoch <= bannerEndTimeEpoch;
    },
  },
};
</script>
