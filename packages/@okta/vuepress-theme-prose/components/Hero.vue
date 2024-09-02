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
          v-if="showBanner"
          primary-cta-text="Save your spot now"
          primary-cta-link="https://a0.to/devday24/okta-dev"
          primary-link-target="_blank"
        >
          <template #heading>
          </template>
          <template #description>
            Join Aaron and Semona to learn more about the OAuth Global Token Revocation standard and how it can impact your applications via Okta’s new feature: Universal Logout.
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
      const bannerStartTime = new Date('2024-09-03T01:00:00-04:00');
      const bannerStartTimeEpoch = Math.floor(bannerStartTime.getTime() / 1000);
      const bannerEndTime = new Date('2024-09-24T23:59:00-04:00');
      const bannerEndTimeEpoch = Math.floor(bannerEndTime.getTime() / 1000);

      const currentTimeEpoch = Math.floor(Date.now() / 1000);

      return currentTimeEpoch >= bannerStartTimeEpoch && currentTimeEpoch <= bannerEndTimeEpoch;
    },
  },
};
</script>
