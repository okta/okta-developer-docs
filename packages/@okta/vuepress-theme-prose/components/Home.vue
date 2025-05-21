<template>
  <div class="homepage content">
    <div class="content--container">
      <Sidebar />
    </div>
    <div class="width-adjuster">
      <div class="justify-content-center">
        <Hero />
        <WorkForce :items="workforce" />
        <Resources />
        <News />
        <Support />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Hero: () => import("../components/Hero"),
    Sidebar: () => import("../components/Sidebar"),
    WorkForce: () => import("../components/Workforce"),
    Resources: () => import("../components/Resources"),
    News: () => import("../components/News"),
    Support: () => import("../components/Support"),
  },
  data() {
    return {
      workforce: [
        {
          title: "Learn",
          block: [
            {
              src: "/img/workforce1-light.svg",
              src_dark: "/img/workforce1-dark.svg",
              title: "Understand the basics of identity",
              text: "Learn the key concepts that you need for creating identity and access management (IAM) solutions for Okta.",
              list: [
                {
                  url: "https://developer.okta.com/docs/concepts/iam-overview",
                  text: "Understand IAM",
                },
                {
                  url: "https://developer.okta.com/docs/concepts/how-okta-works",
                  text: "How Okta works",
                },
                {
                  url: "https://developer.okta.com/docs/concepts/oauth-openid",
                  text: "Choose an authentication protocol",
                },
                {
                  url: "https://developer.okta.com/signup",
                  text: "Get an Integrator Free Plan org",
                },
              ]
            }
          ]
        },
        {
          title: "Build",
          block: [
            {
              src: "/img/workforce2-light.svg",
              src_dark: "/img/workforce2-dark.svg",
              title: "Connect with APIs and SDKs",
              text: "Build apps and services that interact directly with Okta for a completely integrated experience.",
              list: [
                {
                  url: "https://developer.okta.com/docs/api/",
                  text: "Explore reference APIs",
                  isExternal: true
                },
                {
                  url: "https://developer.okta.com/code",
                  text: "Explore our SDKs",
                },
                {
                  url: "https://developer.okta.com/docs/guides/embedded-authentication",
                  text: "Explore embedded authentication use cases",
                },
              ]
            },
            {
              src: "/img/workforce3-light.svg",
              src_dark: "/img/workforce3-dark.svg",
              title: "Authenticate",
              text: "Define how your apps and APIs verify the identity of a user or device.",
              list: [
                {
                  url: "https://developer.okta.com/docs/guides/redirect-authentication",
                  text: "Start with redirect authentication",
                },
                {
                  url: "https://developer.okta.com/docs/guides/authenticators-overview/main",
                  text: "Set up multifactor authentication",
                },
                {
                  url: "https://developer.okta.com/docs/guides/identity-providers",
                  text: "Use an external IdP"
                }
              ]
            },
            {
              src: "/img/workforce4-light.svg",
              src_dark: "/img/workforce4-dark.svg",
              title: "Brand and customize",
              text: "Tailor your IAM tools with your organization’s brand and give users a consistent, familiar experience",
              list: [
                {
                  url: "https://developer.okta.com/docs/guides/custom-url-domain/main",
                  text: "Add a custom domain",
                },
                {
                  url: "https://developer.okta.com/docs/guides/custom-email/main",
                  text: "Style email notifications",
                },
                {
                  url: "https://developer.okta.com/docs/guides/custom-widget/main",
                  text: "Customize the sign-in page"
                }
              ]
            }
          ]
        },
        {
          title: "Publish",
          block: [
            {
              src: "/img/workforce5-light.svg",
              src_dark: "/img/workforce5-dark.svg",
              title: "Join the Okta Integration Network",
              text: "Promote your OIDC, SAML, SCIM, or API service integration to thousands of customers and grow your business with the Okta Integration Network (OIN)",
              list: [
                {
                  url: "https://developer.okta.com/docs/guides/okta-integration-network/",
                  text: "Learn about the OIN",
                },
                {
                  url: "https://www.okta.com/integrations",
                  text: "Go to the Okta Integration Network"
                },
              ]
            }
          ]
        },
      ]
    };
  },
};
</script>
