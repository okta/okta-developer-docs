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
        <Dialog />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Dialog: () => import("../components/Dialog"),
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
              title: "Understand the basics of identity",
              text: "Learn the key concepts you need for creating identity and access management (IAM) solutions for WIC",
              list: [
                {
                  url: "/docs/concepts/iam-overview",
                  text: "Understand IAM",
                },
                {
                  url: "/docs/concepts/how-okta-works",
                  text: "How WIC works",
                },
                {
                  url: "/docs/concepts/oauth-openid",
                  text: "Choose an authentication protocol",
                },
                {
                  url: "/signup/",
                  text: "Get a developer org",
                },
              ]
            }
          ]
        },
        {
          title: "Build",
          block: [
            {
              title: "Connect with APIs and SDKs",
              text: "Build apps and services that interact directly with WIC for a completely integrated experience",
              list: [
                {
                  url: "/docs/reference",
                  text: "Explore reference APIs",
                },
                {
                  url: "/code",
                  text: "Explore our SDKs ",
                },
                {
                  url: "/docs/guides/embedded-authentication",
                  text: "Explore embedded authentication use cases",
                },
              ]
            },
            {
              title: "Authenticate",
              text: "Define how your applications and APIs verify the identity of a user or device",
              list: [
                {
                  url: "/docs/guides/redirect-authentication",
                  text: "Start with redirect authentication",
                },
                {
                  url: "/docs/guides/authenticators-overview/main",
                  text: "Set up multifactor authentication",
                },
                {
                  url: "/docs/guides/identity-providers",
                  text: "Use an external IdP"
                }
              ]
            },
            {
              title: "Brand and customize",
              text: "Tailor your IAM tools with your organization’s brand and give users a consistent, familiar experience",
              list: [
                {
                  url: "/docs/guides/custom-url-domain/main",
                  text: "Add a custom domain",
                },
                {
                  url: "/docs/guides/custom-email/main",
                  text: "Style email notifications",
                },
                {
                  url: "/docs/guides/custom-widget/main",
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
              title: "Join the Okta Integration Network (OIN)",
              text: "Promote your OIDC, SAML, SCIM, or API service integration to thousands of customers and grow your business with the Okta Integration Network (OIN)",
              list: [
                {
                  url: "/docs/guides/okta-integration-network/",
                  text: "Learn about the OIN",
                },
                {
                  url: "https://www.okta.com/integrations",
                  text: "Explore the OIN catalog"
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
