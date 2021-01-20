export const concepts = [
  {
    title: "Concepts",
    subLinks: [
      {
        title: "Concepts overview",
        path: "/docs/concepts/"
      },
      {
        title: "API Access Management",
        path: "/docs/concepts/api-access-management/"
      },
      {
        title: "Authentication",
        path: "/docs/concepts/authentication/"
      },
      {
        title: "Authorization Servers",
        path: "/docs/concepts/auth-servers/"
      },
      {
        title: "Event Hooks",
        path: "/docs/concepts/event-hooks/"
      },
      {
        title: "Events API Migration",
        path: "/docs/concepts/events-api-migration/"
      },
      {
        title: "External Identity Providers",
        path: "/docs/concepts/identity-providers/"
      },
      {
        title: "Feature Lifecycle Management",
        path: "/docs/concepts/feature-lifecycle-management/"
      },
      {
        title: "How Okta works",
        path: "/docs/concepts/how-okta-works/"
      },
      {
        title: "Inline Hooks",
        path: "/docs/concepts/inline-hooks/"
      },
      {
        title: "Key Rotation",
        path: "/docs/concepts/key-rotation/"
      },
      {
        title: "OAuth 2.0 and Open ID Connect Overview",
        path: "/docs/concepts/oauth-openid/"
      },
      {
        title: "Okta Data Model",
        path: "/docs/concepts/okta-data-model/"
      },
      {
        title: "Okta Organizations",
        path: "/docs/concepts/okta-organizations/"
      },
      {
        title: "Okta-Hosted Flows",
        path: "/docs/concepts/okta-hosted-flows/"
      },
      {
        title: "Hosted Vs. Embedded",
        path: "/docs/concepts/hosted-vs-embedded/"
      },
      {
        title: "Policies",
        path: "/docs/concepts/policies/"
      },
      {
        title: "Social Login Overview",
        path: "/docs/concepts/social-login/"
      },
      {
        title: "Understanding SAML",
        subLinks: [
          {
            title: "SAML Overview",
            path: "/docs/concepts/saml/"
          },
          {
            title: "SAML FAQ",
            path: "/docs/concepts/saml/faqs/"
          }
        ]
      },
      {
        title: "Understanding SCIM",
        subLinks: [
          {
            title: "SCIM Overview",
            path: "/docs/concepts/scim/"
          },
          {
            title: "SCIM FAQ",
            path: "/docs/concepts/scim/faqs/"
          }
        ]
      }
    ]
  }
];

export const guides = [
  {
    title: "Guides",
    subLinks: [
      { title: "Guides overview", path: "/docs/guides/" },
      {
        title: "Basics",
        subLinks: [
          {
            title: "Quickstart: Signing in your first user",
            guideName: "quickstart"
          },
          { title: "Create an API token", guideName: "create-an-api-token" },
          { title: "Enable CORS", guideName: "enable-cors" },
          { title: "Find your Okta domain", guideName: "find-your-domain" },
          {
            title: "Find your application credentials",
            guideName: "find-your-app-credentials"
          },
          {
            title: "Share Application Key Credentials for IdPs across Apps",
            guideName: "sharing-cert"
          },
          { title: "Set up SAML Tracer", guideName: "saml-tracer" },
          {
            title: "Upgrade SAML Apps to SHA256",
            guideName: "updating-saml-cert"
          },
          {
            title: "Sign the Okta certificate with your own CA",
            guideName: "sign-your-own-saml-csr"
          },
          {
            title: "Set up self-service registration",
            guideName: "set-up-self-service-registration"
          }
        ]
      },
      {
        title: "Sign Users In",
        subLinks: [
          {
            title: "Add an external Identity Provider",
            guideName: "add-an-external-idp"
          },
          { title: "Add multifactor authentication", guideName: "mfa" },
          {
            title: "Mobile App",
            subLinks: [
              {
                title: "Unlock a mobile app with biometrics",
                guideName: "unlock-mobile-app-with-biometrics"
              },
              {
                title: "Build a custom sign-in UI in your mobile app",
                guideName: "build-custom-ui-mobile"
              },
              {
                title: "Sign users in to your mobile app",
                guideName: "sign-into-mobile-app"
              },
              {
                title: "Share a sign-in session with native mobile apps",
                guideName: "shared-sso-android-ios"
              }
            ]
          },
          {
            title: "Sign users in to your single-page application",
            guideName: "sign-into-spa"
          },
          {
            title: "Sign users in to your web application",
            guideName: "sign-into-web-app"
          },
          { title: "Sign users out", guideName: "sign-users-out" },
          {
            title: "Configure Okta sign-on and App sign-on policies",
            guideName: "configure-signon-policy"
          }
        ]
      },
      {
        title: "Authorization",
        subLinks: [
          {
            title: "Implement the Authorization Code Flow",
            guideName: "implement-auth-code"
          },
          {
            title: "Implement the Authorization Code Flow with PKCE",
            guideName: "implement-auth-code-pkce"
          },
          {
            title: "Create an Authorization Server",
            guideName: "customize-authz-server"
          },
          {
            title: "Implement the Client Credentials Flow",
            guideName: "implement-client-creds"
          },
          {
            title: "Implement the Implicit Flow",
            guideName: "implement-implicit"
          },
          { title: "Request user consent", guideName: "request-user-consent" },
          {
            title: "Implement the Resource Owner Password Flow",
            guideName: "implement-password"
          },
          {
            title: "Tokens",
            subLinks: [
              {
                title: "Build a JWT for Client Authentication",
                guideName: "build-self-signed-jwt"
              },
              {
                title: "Customize tokens returned from Okta with custom claims",
                guideName: "customize-tokens-returned-from-okta"
              },
              {
                title:
                  "Customize tokens returned from Okta with a Groups claim",
                guideName: "customize-tokens-groups-claim"
              },
              {
                title:
                  "Customize tokens returned from Okta with a dynamic allow list",
                guideName: "customize-tokens-dynamic"
              },
              {
                title:
                  "Customize tokens returned from Okta with a static allow list",
                guideName: "customize-tokens-static"
              },
              { title: "Refresh access tokens", guideName: "refresh-tokens" },
              { title: "Revoke Tokens", guideName: "revoke-tokens" },
              {
                title: "Work with Okta session cookies",
                guideName: "session-cookie"
              },
              {
                title: "Validate Access Tokens",
                guideName: "validate-access-tokens"
              },
              { title: "Validate ID Tokens", guideName: "validate-id-tokens" }
            ]
          }
        ]
      },
      {
        title: "Brand and Customize",
        subLinks: [
          {
            title: "Customize the Okta-hosted error pages",
            guideName: "custom-error-pages"
          },
          {
            title: "Customize the Okta URL domain",
            guideName: "custom-url-domain"
          },
          { title: "Style the Widget", guideName: "style-the-widget" },
          { title: "Customize SMS messages", guideName: "sms-customization" },
          {
            title: "Customize email notifications and email domains",
            guideName: "email-customization"
          }
        ]
      },
      {
        title: "OIN Partner Integrations",
        subLinks: [
          {
            title: "Build a SCIM provisioning integration",
            guideName: "build-provisioning-integration"
          },
          {
            title: "OIDC and the OIN: A Developer Primer",
            guideName: "oin-oidc-guide"
          },
          {
            title: "Build a Single Sign-On (SSO) integration",
            guideName: "build-sso-integration"
          },
          { title: "Submit an app integration", guideName: "submit-app" }
        ]
      },
      {
        title: "API Security",
        subLinks: [
          {
            title: "Implement OAuth for Okta",
            guideName: "implement-oauth-for-okta"
          },
          {
            title: "Implement OAuth for Okta with a Service App",
            guideName: "implement-oauth-for-okta-serviceapp"
          },
          {
            title: "Protect your API endpoints",
            guideName: "protect-your-api"
          },
          {
            title: "Configure an access policy",
            guideName: "configure-access-policy"
          }
        ]
      },
      {
        title: "Deploy to Production",
        subLinks: [
          { title: "Deployment checklist", guideName: "production-deployment" },
          { title: "Deploy your app", guideName: "deploy-your-app" },
          { title: "Migrate to Okta", guideName: "migrate-to-okta" }
        ]
      },
      {
        title: "Hooks",
        subLinks: [
          {
            title: "Common Hook Set-up Steps",
            guideName: "common-hook-set-up-steps"
          },
          { title: "Event Hook", guideName: "event-hook-implementation" },
          {
            title: "Password Import Inline Hook",
            guideName: "password-import-inline-hook"
          },
          {
            title: "Registration Inline Hook",
            guideName: "registration-inline-hook"
          }
        ]
      }
    ]
  }
];

export const languagesSdk = [
  {
    title: "Languages & SDKs",
    subLinks: [
      { title: "Languages & SDKs overview", path: "/code/" },
      {
        title: "Mobile",
        subLinks: [
          { title: "Android", path: "/code/android/" },
          { title: "iOS", path: "/code/ios/" },
          { title: "React Native", path: "/code/react-native/" }
        ]
      },
      {
        title: "Front End",
        subLinks: [
          {
            title: "Angular",
            subLinks: [
              {
                title: "Add User Authentication to Your Angular App",
                path: "/code/angular/"
              },
              {
                title: "Okta Sign-In Widget and Angular",
                path: "/code/angular/okta_angular_sign-in_widget/"
              },
              {
                title: "Okta Auth JS and Angular",
                path: "/code/angular/okta_angular_auth_js/"
              }
            ]
          },
          {
            title: "JavaScript",
            subLinks: [
              {
                title: "Add User Authentication to Your JavaScript App",
                path: "/code/javascript/"
              },
              {
                title: "Okta Sign-In Widget Guide",
                path: "/code/javascript/okta_sign-in_widget/"
              },
              {
                title: "Okta Auth SDK Guide",
                path: "/code/javascript/okta_auth_sdk/"
              }
            ]
          },
          {
            title: "React",
            subLinks: [
              {
                title: "Add User Authentication to Your React App",
                path: "/code/react/"
              },
              {
                title: "Okta Sign-In Widget and React",
                path: "/code/react/okta_react_sign-in_widget/"
              },
              {
                title: "Okta Auth JS and React",
                path: "/code/react/okta_react/"
              }
            ]
          },
          {
            title: "Vue",
            subLinks: [
              {
                title: "Add User Authentication to Your Vue App",
                path: "/code/vue/"
              },
              {
                title: "Okta Sign-In Widget and Vue",
                path: "/code/vue/okta_vue_sign-in_widget/"
              },
              {
                title: "Okta Auth JS and Vue",
                path: "/code/vue/okta_vue/"
              }
            ]
          }
        ]
      },
      {
        title: "Back End",
        subLinks: [
          { title: ".Net", path: "/code/dotnet/aspnetcore/" },
          { title: "Go", path: "/code/go/" },
          { title: "Java", path: "/code/java/" },
          { title: "Node.js", path: "/code/nodejs/" },
          { title: "PHP", path: "/code/php/" },
          { title: "Python", path: "/code/python/" },
          { title: "REST", path: "/code/rest/" }
        ]
      }
    ]
  }
];

export const reference = [
  {
    title: "Reference",
    subLinks: [
      { title: "Reference Overview", path: "/docs/reference/" },
      { title: "API Overview", path: "/docs/reference/api-overview/" },
      {
        title: "Sign in Your Users",
        subLinks: [
          {
            title: "OpenID Connect & OAuth 2.0 API",
            path: "/docs/reference/api/oidc/"
          },
          { title: "Authentication", path: "/docs/reference/api/authn/" }
        ]
      },
      {
        title: "Manage Okta objects",
        subLinks: [
          { title: "Administrator Roles", path: "/docs/reference/api/roles/" },
          { title: "Apps", path: "/docs/reference/api/apps/" },
          {
            title: "Authorization Servers",
            path: "/docs/reference/api/authorization-servers/"
          },
          {
            title: "Dynamic Client Registration",
            path: "/docs/reference/api/oauth-clients/"
          },
          { title: "Event Hooks", path: "/docs/reference/api/event-hooks/" },
          { title: "Event Types", path: "/docs/reference/api/event-types/" },
          { title: "Factors", path: "/docs/reference/api/factors/" },
          { title: "Features", path: "/docs/reference/api/features/" },
          { title: "Groups", path: "/docs/reference/api/groups/" },
          { title: "Identity Providers", path: "/docs/reference/api/idps/" },
          { title: "Inline Hooks", path: "/docs/reference/api/inline-hooks/" },
          {
            title: "Linked Objects",
            path: "/docs/reference/api/linked-objects/"
          },
          { title: "Mappings", path: "/docs/reference/api/mappings/" },
          { title: "MyAccount", path: "/docs/reference/api/myaccount/" },
          { title: "Policy", path: "/docs/reference/api/policy/" },
          { title: "Schemas", path: "/docs/reference/api/schemas/" },
          { title: "Sessions", path: "/docs/reference/api/sessions/" },
          { title: "System Log", path: "/docs/reference/api/system-log/" },
          { title: "Templates", path: "/docs/reference/api/templates/" },
          {
            title: "ThreatInsight",
            path: "/docs/reference/api/threat-insight/"
          },
          {
            title: "Trusted Origins",
            path: "/docs/reference/api/trusted-origins/"
          },
          { title: "User Types", path: "/docs/reference/api/user-types/" },
          { title: "Users", path: "/docs/reference/api/users/" },
          { title: "Zones", path: "/docs/reference/api/zones/" }
        ]
      },
      {
        title: "Rate Limits",
        subLinks: [
          {
            title: "Rate limits overview",
            path: "/docs/reference/rate-limits/"
          },
          {
            title: "Authentication/End-user rate limits",
            path: "/docs/reference/rl-global-enduser/"
          },
          {
            title: "Management rate limits",
            path: "/docs/reference/rl-global-mgmt/"
          },
          {
            title: "Other endpoint rate limits",
            path: "/docs/reference/rl-global-other-endpoints/"
          },
          {
            title: "Additional limits",
            path: "/docs/reference/rl-additional-limits/"
          },
          {
            title: "Rate limit best practices",
            path: "/docs/reference/rl-best-practices/"
          },
          {
            title: "Client-based rate limits",
            path: "/docs/reference/rl-clientbased/"
          },
          { title: "DynamicScale", path: "/docs/reference/rl-dynamic-scale/" },
          {
            title: "Previous rate limits",
            path: "/docs/reference/rl-previous/"
          },
          {
            title: "System Log events for rate limits",
            path: "/docs/reference/rl-system-log-events/"
          }
        ]
      },
      { title: "Error Codes", path: "/docs/reference/error-codes/" },
      { title: "Import Hook", path: "/docs/reference/import-hook/" },
      {
        title: "Okta Expression Language",
        path: "/docs/reference/okta-expression-language/"
      },
      { title: "Password Hook", path: "/docs/reference/password-hook/" },
      {
        title: "Postman Collections",
        path: "/docs/reference/postman-collections/"
      },
      {
        title: "Registration Hook",
        path: "/docs/reference/registration-hook/"
      },
      {
        title: "Release Life Cycle",
        path: "/docs/reference/releases-at-okta/"
      },
      { title: "SAML Hook", path: "/docs/reference/saml-hook/" },
      { title: "SCIM Protocol", path: "/docs/reference/scim/" },
      {
        title: "Social IdP Settings",
        path: "/docs/reference/social-settings/"
      },
      { title: "Token Hook", path: "/docs/reference/token-hook/" },
      { title: "WebFinger", path: "/docs/reference/api/webfinger/" },
      {
        title: "Advanced Server Access",
        subLinks: [
          {
            title: "Introduction to the Advanced Server Access API",
            path: "/docs/reference/api/asa/introduction/"
          },
          {
            title: "ASA Attributes API",
            path: "/docs/reference/api/asa/attributes/"
          },
          { title: "ASA Audits API", path: "/docs/reference/api/asa/audits/" },
          {
            title: "ASA Clients API",
            path: "/docs/reference/api/asa/clients/"
          },
          {
            title: "ASA Entitlements API",
            path: "/docs/reference/api/asa/entitlements/"
          },
          { title: "ASA Groups API", path: "/docs/reference/api/asa/groups/" },
          {
            title: "ASA Projects API",
            path: "/docs/reference/api/asa/projects/"
          },
          {
            title: "ASA Service Users API",
            path: "/docs/reference/api/asa/service-users/"
          },
          { title: "ASA Teams API", path: "/docs/reference/api/asa/teams/" },
          { title: "ASA Users API", path: "/docs/reference/api/asa/users/" }
        ]
      }
    ]
  }
];
