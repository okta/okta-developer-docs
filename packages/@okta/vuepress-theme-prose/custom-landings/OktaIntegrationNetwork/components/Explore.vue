<template>
  <section class="customLanding-gray">
    <div class="customLanding-wrapper">
        <div class="customLanding-explore">
            <h2>Explore the integration process</h2>
            <p class="customLanding-explore__desc">Our step-by-step guides walk you through every phase of building your integration.</p>
            <div class="customLanding-explore__list">
                <div class="customLanding-explore__item" v-for="({ id, caption, text, link, path }) in list" :key="caption">
                    <div class="customLanding-explore__content">
                        <div class="customLanding-explore__icon">
                            <div class="customLanding-explore__icon-item" :style="`background: url(/img/customLanding/explore-${id}.svg) no-repeat 50% 50%;`">
                            </div>
                        </div>
                        <p class="customLanding-explore__caption">{{caption}}</p>
                        <p class="customLanding-explore__text">{{text}}</p>
                    </div>
                    <a :href="`${path}`" class="customLanding-explore__link" v-if="link">{{link}}</a>
                </div>
            </div>
            <p>Get started by signing up for a free Okta developer org. <a class="customLanding-hero__button2" href="/signup/">Sign up</a></p>

        </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'customLandingExplore',
    data() {
        return {
            list: [
                {
                    id: 1,
                    caption: 'Learn',
                    text: 'Easy and secure access is a base requirement for modern apps. Understand what enterprises need, their common use cases, and the technologies involved.',
                    link: 'View concepts',
                    path: '/docs/concepts/'
                },
                {
                    id: 2,
                    caption: 'Design & build',
                    text: 'OIN is a catalog and a support system. Our resources help you to design, build, and test your integration before you submit it for verification.',
                    link: 'View guides',
                    path: '/docs/guides/#publish-an-integration'
                },
                {
                    id: 3,
                    caption: 'Get Okta verified',
                    text: 'From testing to running diagnostics and validation, our team works with you to get your integration reviewed and ready to publish to the OIN.',
                    link: 'Learn more',
                    path: '/docs/guides/submit-app'
                },
                {
                    id: 4,
                    caption: 'Launch your integration',
                    text: 'Congratulations! Your integration is Okta verified and trusted by thousands of customers who use the OIN. Now, it’s time to spread the word.'
                }
            ]
        }
    }
  }
</script>