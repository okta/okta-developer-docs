<template>
  <section class="customLanding-gray">
    <div class="customLanding-wrapper">
        <div class="customLanding-features">
            <div class="customLanding-features__row" v-for="({ id, title, text, link, linkText, list }) in rows" :key="title">
                <div class="customLanding-features__col">
                    <div class="customLanding-features__title">
                        <img :src="`/img/customLanding/features-${id}.svg`" />
                        <h3>{{title}}</h3>
                    </div>
                    <p class="customLanding-features__text">{{text}}</p>
                    <a v-if="link" class="customLanding-features__button" :href="`${link}`" :blank="link.includes('https') ? '_blank' : '_self'">{{linkText}}</a>
                </div>
                <div class="customLanding-features__col">
                    <p class="customLanding-features__caption">Build this if you want to:</p>
                    <ul class="customLanding-features__list" v-for="item in list" :key="item">
                        <li class="customLanding-features__list-item" v-html="item"></li>
                    </ul>
                </div>
                <svg width="904" height="5" viewBox="0 0 904 5" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="-6.51946e-08" y1="3.29102" x2="433.582" y2="3.29096" stroke="url(#paint0_linear_391_1522)" stroke-width="2"/><line y1="-1" x2="433.582" y2="-1" transform="matrix(-1 -1.1723e-07 -6.51946e-08 1 903.62 4.29102)" stroke="url(#paint1_linear_391_1522)" stroke-width="2"/><circle cx="451.753" cy="2.5" r="2.5" fill="#D7D7DC"/><defs><linearGradient id="paint0_linear_391_1522" x1="422" y1="4.29102" x2="8.91945" y2="4.29104" gradientUnits="userSpaceOnUse"><stop stop-color="#EBEBED"/><stop offset="1" stop-color="#EBEBED" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear_391_1522" x1="422" y1="4.9471e-05" x2="8.91945" y2="4.39394e-05" gradientUnits="userSpaceOnUse"><stop stop-color="#EBEBED"/><stop offset="1" stop-color="#EBEBED" stop-opacity="0"/></linearGradient></defs></svg>
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
                    link: '/docs/guides/oin-sso-overview/',
                    linkText: 'Get started with Single Sign-On',
                    list: [
                        'Streamline the sign-in flow',
                        'Use Okta for identity management and secure access',
                        'Federate using <a href="/docs/guides/oin-oidc-overview/main/">OIDC</a> or <a href="/docs/concepts/saml/">SAML</a>'
                    ]
                },
                {
                    id: 2,
                    title: 'Automate the user lifecycle',
                    text: 'Automatically provision, update, and deprovision users securely with SCIM and automate complex actions with our low code/no-code building tools.',
                    link: '/docs/guides/oin-lifecycle-mgmt-overview/',
                    linkText: 'Get started with the user lifecycle',
                    list: [
                        'Synchronize your app user profiles with Okta profiles',
                        'Use <a href="/docs/concepts/scim/">SCIM</a> to manage users in cloud-based systems',
                        'Provide custom onboarding and offboarding flows with <a href="https://help.okta.com/wf/en-us/Content/Topics/Workflows/connector-builder/connector-builder.htm" target="_blank">Workflows Connector Builder</a>'
                    ]
                },
                {
                    id: 3,
                    title: 'Risk signal sharing',
                    text: "Connect to Okta's risk APIs to share risk signals and make it easier for your customers to protect their users and data.",
                    link: '',
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