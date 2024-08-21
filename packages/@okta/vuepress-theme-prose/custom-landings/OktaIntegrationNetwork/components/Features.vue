<template>
  <section class="customLanding-gray">
    <div class="customLanding-wrapper">
      <div class="customLanding-features">
        <h2>What integrations can I build?</h2>
        <div
          v-for="({ id, title, text, link, linkText, list }) in rows"
          :key="title"
          class="customLanding-features__row"
        >
          <div class="customLanding-features__col">
            <div class="customLanding-features__title">
              <img :src="`/img/customLanding/features-${id}.svg`">
              <h3>{{ title }}</h3>
            </div>
            <p class="customLanding-features__text">
              {{ text }}
            </p>
            <a
              v-if="link"
              class="customLanding-features__button"
              :href="`${link}`"
              :blank="link.includes('https') ? '_blank' : '_self'"
            >{{ linkText }}</a>
          </div>
          <div class="customLanding-features__col">
            <p class="customLanding-features__caption">
              Build this if you want to:
            </p>
            <ul
              v-for="item in list"
              :key="item"
              class="customLanding-features__list"
            >
              <li
                class="customLanding-features__list-item"
                v-html="item"
              />
            </ul>
          </div>
          <svg
            width="904"
            height="5"
            viewBox="0 0 904 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          ><line
            x1="-6.51946e-08"
            y1="3.29102"
            x2="433.582"
            y2="3.29096"
            stroke="url(#paint0_linear_391_1522)"
            stroke-width="2"
          /><line
            y1="-1"
            x2="433.582"
            y2="-1"
            transform="matrix(-1 -1.1723e-07 -6.51946e-08 1 903.62 4.29102)"
            stroke="url(#paint1_linear_391_1522)"
            stroke-width="2"
          /><circle
            cx="451.753"
            cy="2.5"
            r="2.5"
            fill="#D7D7DC"
          /><defs><linearGradient
            id="paint0_linear_391_1522"
            x1="422"
            y1="4.29102"
            x2="8.91945"
            y2="4.29104"
            gradientUnits="userSpaceOnUse"
          ><stop stop-color="#EBEBED" /><stop
            offset="1"
            stop-color="#EBEBED"
            stop-opacity="0"
          /></linearGradient><linearGradient
            id="paint1_linear_391_1522"
            x1="422"
            y1="4.9471e-05"
            x2="8.91945"
            y2="4.39394e-05"
            gradientUnits="userSpaceOnUse"
          ><stop stop-color="#EBEBED" /><stop
            offset="1"
            stop-color="#EBEBED"
            stop-opacity="0"
          /></linearGradient></defs></svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'CustomLandingFeatures',
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
                        'Federate using <a href="/docs/concepts/oauth-openid/">OIDC</a> or <a href="/docs/concepts/saml/">SAML</a>'
                    ]
                },
                {
                    id: 2,
                    title: 'Automate lifecycle management',
                    text: 'Automatically provision, update, and deprovision users securely with SCIM and automate complex actions with our low code/no-code building tools.',
                    link: '/docs/guides/oin-lifecycle-mgmt-overview/',
                    linkText: 'Get started with lifecycle management',
                    list: [
                        'Synchronize your app user profiles with Okta profiles',
                        'Use <a href="/docs/concepts/scim/">SCIM</a> to manage users in cloud-based systems',
                        'Provide custom onboarding and offboarding flows with <a href="https://help.okta.com/okta_help.htm?type=wf&id=ext-connector-builder" target="_blank">Workflows Connector Builder</a>'
                    ]
                },
                {
                    id: 3,
                    title: 'Connect to the Okta API',
                    text: "Access and manage Okta resources directly from your application with an API service integration.",
                    link: '/docs/guides/oin-api-service-overview/',
                    linkText: 'Get started with API service integrations',
                    list: [
                        'Securely access Okta API endpoints using OAuth 2.0 without user association (service-to-service use case)',
                        'Allow customers to find and configure your integration through the Okta Integration Network catalog'
                    ]
                }
            ]
        }
    }
  }
</script>