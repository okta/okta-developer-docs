<template>
  <section class="customLanding-gray">
    <div class="customLanding-wrapper">
        <div class="customLanding-features">
            <div class="customLanding-features__row" v-for="({ id, title, text, linkText, caption, list }) in rows">
                <div class="customLanding-features__col">
                    <div class="customLanding-features__title">
                        <img :src="`/img/customLanding/features-${id}.svg`" />
                        <h3>{{title}}</h3>
                    </div>
                    <p class="customLanding-features__text">{{text}}</p>
                    <a class="customLanding-features__button" href="#">{{linkText}}</a>
                </div>
                <div class="customLanding-features__col">
                    <p class="customLanding-features__caption">Build this if you want to:</p>
                    <ul class="customLanding-features__list" v-for="item in list">
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
                    linkText: 'Get Started with Single Sign-On',
                    list: [
                        'Streamline the sign-in flow',
                        'Use Okta for identity management and secure access',
                        'Federate using <a href="#">SAML</a> or <a href="#">OIDC</a>'
                    ]
                },
                {
                    id: 2,
                    title: 'Automate the User Lifecycle',
                    text: 'Automatically provision, update, and de-provision users securely with SCIM and automate complex actions with our low code/no-code building tools.',
                    linkText: 'Build SCIM provisioning',
                    list: [
                        'Synchronize your app user profiles with Okta profiles',
                        'Use <a href="#">SCIM</a> to manage users in cloud-based systems',
                        'Provide custom onboarding and offboarding flows with <a href="#">Workflows Connector Builder</a>'
                    ]
                },
                {
                    id: 3,
                    title: 'Risk Signal Sharing',
                    text: "Connect to Okta's risk APIs to share risk signals and make it easier for your customers to protect their users and data.",
                    linkText: 'Get Started with Risk Signal Sharing',
                    list: [
                        'Use the Risk Signal API to unite risk signals with access decisions and secure digital experiences',
                        'Enhance security efficacy against targeted identity attacks',
                        'Start your journey towards continuous authentication'
                    ]
                }
            ]
        }
    }
  }
</script>