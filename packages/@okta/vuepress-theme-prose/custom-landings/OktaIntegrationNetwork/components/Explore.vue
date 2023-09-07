<template>
  <section class="customLanding-white customLanding-waves customLanding-waves-bottom customLanding-waves-top">
    <div class="customLanding-wrapper">
      <div class="customLanding-explore">
        <h2>Explore the integration process.</h2>
        <p class="customLanding-explore__desc">
          Our step-by-step guides walk you through every phase of building your integration.
        </p>
        <div class="customLanding-explore__list">
          <div
            v-for="({ id, caption, text, link, path }) in list"
            :key="caption"
            class="customLanding-explore__item"
          >
            <div class="customLanding-explore__content">
              <div class="customLanding-explore__icon">
                <div
                  class="customLanding-explore__icon-item"
                  :style="`background: url(/img/customLanding/explore-${id}.svg) no-repeat 50% 50%;`"
                />
              </div>
              <p class="customLanding-explore__caption">
                {{ caption }}
              </p>
              <p class="customLanding-explore__text">
                {{ text }}
              </p>
            </div>
            <a
              v-if="link"
              :href="`${path}`"
              class="customLanding-explore__link"
            >{{ link }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'CustomLandingExplore',
    data() {
        return {
            list: [
                {
                    id: 1,
                    caption: 'Learn',
                    text: 'Understand how Okta works and how to implement solutions for your use cases. Get started by signing up for a free Okta developer org and trying the quickstart examples.',
                    link: 'Try quickstart examples',
                    path: '/docs/guides/quickstart/'
                },
                {
                    id: 2,
                    caption: 'Design & build',
                    text: 'OIN is a catalog and a support system. View SSO, lifecycle, and service app integration guides to help you to design, build, and test your integration before you submit it for verification. Get support from the Okta Developer Forum during your build journey.',
                    link: 'Start with SSO',
                    path: '/docs/guides/oin-sso-overview/'
                },
                {
                    id: 3,
                    caption: 'Get Okta verified',
                    text: 'Prepare submission requirements and use the OIN Manager portal to submit your integration for verification. The OIN team runs diagnostics and works with you to validate your integration for publication.',
                    link: 'Publish your app',
                    path: '/docs/guides/submit-app-overview/'
                },
                {
                    id: 4,
                    caption: 'Launch your integration',
                    text: 'Congratulations! Your integration is Okta verified and trusted by thousands of customers who use the OIN. Now, it’s time to spread the word.',
                    link: 'View catalog',
                    path: 'https://okta.com/integrations/'
                }
            ]
        }
    }
  }
</script>