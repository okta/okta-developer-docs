<template>
  <section class="customLanding-gray">
    <div class="customLanding-wrapper">
        <div class="customLanding-features">
            <div class="customLanding-features__row" v-for="({ id, title, text, link, linkText, caption, list }) in rows">
                <div class="customLanding-features__col">
                    <div class="customLanding-features__title">
                        <img :src="`/img/customLanding/features-${id}.svg`" />
                        <h3>{{title}}</h3>
                    </div>
                    <p class="customLanding-features__text">{{text}}</p>
                    <a class="customLanding-features__button" :href="`${link}`" :blank="link.includes('https') ? '_blank' : '_self'">{{linkText}}</a>
                </div>
                <div class="customLanding-features__col">
                    <p class="customLanding-features__caption">Build this if you want to:</p>
                    <ul class="customLanding-features__list" v-for="item in list" :key="item">
                        <li class="customLanding-features__list-item" v-html="item"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'customLandingFeatures',
    data() {
        return {
            rows: [
                {
                    id: 1,
                    title: 'Enable Single Sign-On',
                    text: 'Let users securely sign in to your app with their credentials.',
                    link: 'https://docs.google.com/document/d/157AdLbA38W_WyAIH0W45YE1G3F3pWzWVI8wIfVmBAZQ/edit#heading=h.xz5gewuas0i5',
                    linkText: 'Get Started with Single Sign-On',
                    list: [
                        'Streamline the sign-in flow',
                        'Use Okta for identity management and secure access',
                        'Federate using <a href="/docs/concepts/saml/">SAML</a> or <a href="/docs/guides/oin-oidc-overview/main/">OIDC</a>'
                    ]
                },
                {
                    id: 2,
                    title: 'Automate the User Lifecycle',
                    text: 'Automatically provision, update, and de-provision users securely with SCIM and automate complex actions with our low code/no-code building tools.',
                    link: '/docs/guides/oin-lifecycle-mgmt-overview/',
                    linkText: 'Build SCIM provisioning',
                    list: [
                        'Synchronize your app user profiles with Okta profiles',
                        'Use <a href="/docs/concepts/scim/">SCIM</a> to manage users in cloud-based systems',
                        'Provide custom onboarding and offboarding flows with <a href="https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-builder/connector-builder.htm" target="_blank">Workflows Connector Builder</a>'
                    ]
                },
                {
                    id: 3,
                    title: 'Risk Signal Sharing',
                    text: "Connect to Okta's risk APIs to share risk signals and make it easier for your customers to protect their users and data.",
                    link: '#',
                    linkText: 'Get Started with Risk Signal Sharing',
                    list: [
                        '<a href="/docs/guides/third-party-risk-integration/main">Use the Risk Signal API</a> to unite risk signals with access decisions and secure digital experiences',
                        'Enhance security efficacy against targeted identity attacks',
                        'Start your journey towards continuous authentication'
                    ]
                }
            ]
        }
    }
  }
</script>