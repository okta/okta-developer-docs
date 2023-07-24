export const concepts = [
   {
      title: "Concepts",
      path: "/docs/concepts/",
      subLinks: [
         {
            title: "API Access Management",
            path: "/docs/concepts/api-access-management/",
         },
         {
            title: "Authorization servers",
            path: "/docs/concepts/auth-servers/",
         },
      {
        title: "Brands",
        path: "/docs/concepts/brands/",
      },
         {
            title: "Event hooks",
            path: "/docs/concepts/event-hooks/",
         },
         {
            title: "Events API migration",
            path: "/docs/concepts/events-api-migration/",
         },
         {
            title: "External Identity Providers",
            path: "/docs/concepts/identity-providers/",
         },
         {
            title: "Feature lifecycle management",
            path: "/docs/concepts/feature-lifecycle-management/",
         },
         {
            title: "Role assignment",
            path: "/docs/concepts/role-assignment/",
         },
         {
            title: "How Okta works",
            path: "/docs/concepts/how-okta-works/",
         },
         {
            title: "Inline hooks",
            path: "/docs/concepts/inline-hooks/",
         },
         {
            title: "Interaction Code grant type",
            path: "/docs/concepts/interaction-code/",
         },
         {
            title: "Key rotation",
            path: "/docs/concepts/key-rotation/",
         },
         {
            title: "Monitor Okta",
            path: "/docs/concepts/monitor/",
         },
         {
            title: "Multi-tenant solutions",
            path: "/docs/concepts/multi-tenancy/",
         },
         {
            title: "OAuth 2.0 and OIDC overview",
            path: "/docs/concepts/oauth-openid/",
         },
         {
            title: "Redirect vs. embedded deployment",
            path: "/docs/concepts/redirect-vs-embedded/",
         },
         {
            title: "Okta data model",
            path: "/docs/concepts/okta-data-model/",
         },
         {
            title: "Okta Identity Engine overview",
            path: "/docs/concepts/oie-intro/",
         },
         {
            title: "Okta organizations",
            path: "/docs/concepts/okta-organizations/",
         },
         {
            title: "Policies",
            path: "/docs/concepts/policies/",
         },
         {
            title: "Session management",
            path: "/docs/concepts/session/",
         },
         {
            title: "User profiles",
            path: "/docs/concepts/user-profiles/",
         },
         {
            title: "Understanding IAM",
            path: "/docs/concepts/iam-overview/",
            subLinks: [
               {
                  title: "Identity management factors",
                  path: "/docs/concepts/iam-overview-identity-management-factors/"
               },
               {
                  title: "Authentication factors",
                  path: "/docs/concepts/iam-overview-authentication-factors/"
               },
               {
                  title: "Authorization factors",
                  path: "/docs/concepts/iam-overview-authorization-factors/"
               },
               {
                  title: "Architectural factors",
                  path: "/docs/concepts/iam-overview-architectural-factors/"
               },
               {
                  title: "IAM terminology",
                  path: "/docs/concepts/iam-overview-iam-terminology/",
                  description: true,
               }
            ]
         },
         {
            title: "Understanding SAML",
            path: "/docs/concepts/saml/",
            subLinks: [
               {
                  title: "SAML FAQ",
                  path: "/docs/concepts/saml/faqs/",
               },
            ],
         },
         {
            title: "Understanding SCIM",
            path: "/docs/concepts/scim/",
            subLinks: [
               {
                  title: "SCIM FAQ",
                  path: "/docs/concepts/scim/faqs/",
               },
            ],
         },
      ],
   },
];

export const guides = [
  {
    title: "Guides",
    path: "/docs/guides/",
    subLinks: [
      {
        title: "Quickstart",
        guideName: "quickstart"
      },
      {
        title: "Sign users in",
        guideName: "sign-in-overview/main",
        subLinks: [
          {
            title: "Redirect authentication",
            subLinks: [
              {
                title: "Sign in to SPA with AuthJS",
                guideName: "auth-js-redirect",
              },
              {
                title: "Sign in to SPA",
                guideName: "sign-into-spa-redirect",
              },
              {
                title: "Sign in to web application",
                guideName: "sign-into-web-app-redirect",
              },
              {
                title: "Sign in to mobile app",
                guideName: "sign-into-mobile-app-redirect",
              },
              {
                title: "Redirect auth in the sample apps",
                guideName: "sampleapp-oie-redirectauth",
              },
              {
                title: "Refresh access and ID tokens",
                guideName: "oie-embedded-common-refresh-tokens",
              },
            ],
          },
          {
            title: "Embedded authentication",
            subLinks: [
              {
                title: "Get set up",
                subLinks: [
                  {
                    title: "Your Okta org",
                    guideName: "oie-embedded-common-org-setup",
                  },
                  {
                    title:
                      "SDK, widget, sample apps",
                    guideName: "oie-embedded-common-download-setup-app",
                  },
                  {
                    title: "Run the sample apps",
                    guideName: "oie-embedded-common-run-samples",
                  },
                ],
              },
              {
                title: "Auth JS fundamentals",
                guideName: "auth-js",
              },
              {
                title: "Embedded widget fundamentals",
                guideName: "embedded-siw",
              },
              {
                title: "Sign in to SPA: Auth JS",
                guideName: "sign-in-to-spa-authjs",
                description: true
              },
              {
                title: "Sign in to SPA: Widget",
                guideName: "sign-in-to-spa-embedded-widget",
              },
              {
                title: "Password optional",
                path: "/docs/guides/pwd-optional-overview/aspnet/main/",
                subLinks: [
                  {
                    title: "Sign up for new account with email only",
                    guideName: "pwd-optional-new-sign-up-email"
                  },
                  {
                    title: "Sign in with email only",
                    guideName: "pwd-optional-sign-in-email"
                  },
                  {
                    title: "Change your primary email address",
                    guideName: "pwd-optional-change-email"
                  },
                  {
                    title: "Best practices for password optional",
                    guideName: "pwd-optional-best-practices"
                  }
                ]
              },
              {
                title: "Embedded SDK use cases",
                subLinks: [
                  {
                    title: "Basic sign-in flow with password",
                    guideName: "oie-embedded-sdk-use-case-basic-sign-in",
                  },
                  {
                    title: "Sign in with Facebook",
                    guideName: "oie-embedded-sdk-use-case-sign-in-soc-idp",
                  },
                  {
                    title: "User password recovery",
                    guideName: "oie-embedded-sdk-use-case-pwd-recovery-mfa",
                  },
                  {
                    title: "Self-registration",
                    guideName: "oie-embedded-sdk-use-case-self-reg",
                  },
                  {
                    title: "New user activation",
                    guideName: "oie-embedded-sdk-use-case-new-user-activation",
                  },
                  {
                    title: "Sign in: password + email",
                    guideName: "oie-embedded-sdk-use-case-sign-in-pwd-email",
                  },
                  {
                    title: "Sign in: pwd and phone",
                    guideName: "oie-embedded-sdk-use-case-sign-in-pwd-phone",
                  },
                  {
                    title: "User sign out (local app)",
                    guideName: "oie-embedded-sdk-use-case-basic-sign-out",
                  },
                ],
              },
              {
                title: "Embedded Sign-In Widget use cases",
                subLinks: [
                  {
                    title: "Password optional",
                    subLinks: [
                      {
                        title: "Sign in with email only",
                        guideName: "pwd-optional-widget-sign-in-email"
                      }
                    ]
                  },
                  {
                    title: "Load the widget",
                    guideName: "oie-embedded-widget-use-case-load",
                  },
                  {
                    title: "Basic sign-in flow",
                    guideName: "oie-embedded-widget-use-case-basic-sign-in",
                  },
                  {
                    title: "Sign in with Facebook",
                    guideName: "oie-embedded-widget-use-case-sign-in-soc-idp",
                  },
                ],
              },
            ],
          },
          {
            title: "Authenticators",
            path: "/docs/guides/authenticators-overview/main/",
            subLinks: [
              {
                title: "Okta email",
                guideName: "authenticators-okta-email",
              },
              {
                title: "Okta Verify",
                guideName: "authenticators-okta-verify"
              },
              {
                title: "Custom authenticator",
                guideName: "authenticators-custom-authenticator"
              },
              {
                title: "Google authenticator",
                guideName: "authenticators-google-authenticator",
              },
              {
                title: "Web Authentication",
                guideName: "authenticators-web-authn",
              },
            ],
          },
          {
            title: "User-scoped account management",
            guideName: "configure-user-scoped-account-management",
          },
          {
            title: "Advanced use cases",
            path: "/docs/guides/advanced-use-case-overview/main/",
            subLinks: [
              {
                title: "Email Magic Links",
                guideName: "email-magic-links-overview"
              },
              {
                 title: "Device context",
                 guideName: "device-context"
              },
              {
                title: "Custom password recovery",
                guideName: "oie-embedded-sdk-use-case-custom-pwd-recovery-mfa",
              },
            ],
          },
          {
            title: "Mobile authentication",
            subLinks: [
              {
                title: "Identity Engine SDK overview",
                guideName: "mobile-idx-sdk-overview"
              }
            ]
          },
          {
            title: "Access policies",
            guideName: "configure-access-policy",
          },
          {
            title: "Global session and authn policies",
            guideName: "configure-signon-policy"
          },
          {
            title: "Test your access policies",
            guideName: "policy-simulation"
          },
          {
            title: "Add an external Identity Provider",
            path: "/docs/guides/identity-providers/",
            subLinks: [
              {
                title: "Enterprise Identity Provider",
                guideName: "add-an-external-idp"
              },
              {
                title: "Social login",
                guideName: "social-login"
              },
              {
                title: "Login.gov",
                guideName: "add-logingov-idp"
              },
            ],
          },
          { title: "Sign users out", guideName: "oie-embedded-sdk-use-case-basic-sign-out" },
          { title: "Single Logout", guideName: "single-logout" },
          {
            title: "Basics",
            subLinks: [
              {
                title: "Create an API token",
                guideName: "create-an-api-token",
              },
              { title: "Enable CORS", guideName: "enable-cors" },
              { title: "Find your Okta domain", guideName: "find-your-domain" },
              {
                title: "Find your application credentials",
                guideName: "find-your-app-credentials",
              },
              {
                title: "Share app key credentials for IdPs",
                guideName: "sharing-cert",
              },
              { title: "Set up SAML Tracer", guideName: "saml-tracer" },
              {
                title: "Upgrade SAML apps to SHA256",
                guideName: "updating-saml-cert",
              },
              {
                title: "Sign Okta certs with your own CA",
                guideName: "sign-your-own-saml-csr",
              },
            ],
          },
        ],
      },
      {
        title: "Okta Identity Engine upgrade",
        guideName: "oie-upgrade-overview/main",
        subLinks: [
          {
            title: "Plan embedded app upgrades",
            guideName: "oie-upgrade-plan-embedded-upgrades",
          },
          {
            title: "Identity Engine limitations",
            guideName: "ie-limitations",
          },
          {
            title: "Okta Sign-In Widget upgrade",
            subLinks: [
              {
                title: "Upgrade your widget",
                guideName: "oie-upgrade-sign-in-widget",
              },
              {
                title: "Deprecated widget JS methods",
                guideName: "oie-upgrade-sign-in-widget-deprecated-methods",
              },
              {
                title: "Updates to widget styling",
                guideName: "oie-upgrade-sign-in-widget-styling",
              },
              {
                title: "Updates to widget i18n",
                guideName: "oie-upgrade-sign-in-widget-i18n",
              },
            ],
          },
          {
            title: "Identity Engine SDK upgrade",
            subLinks: [
              {
                title: "Add the SDK to your app",
                guideName: "oie-upgrade-add-sdk-to-your-app",
              },
              {
                title: "Upgrade your app SDK",
                guideName: "oie-upgrade-api-sdk-to-oie-sdk",
              },
              {
                title: "Session changes",
                guideName: "oie-upgrade-sessions-api",
              },
            ],
          },
          {
            title: "Authn enrollment policy changes",
            guideName: "oie-upgrade-mfa-enroll-policy"
          }
        ]
      },
      {
        title: "Authorization",
        subLinks: [
          {
            title: "Implement by grant type",
            guideName: "implement-grant-type",
          },
          {
            title: "Create an authorization server",
            guideName: "customize-authz-server",
          },
          {
            title: "Transactional verification using CIBA",
            guideName: "configure-ciba",
          },
          {
            title: "Configure SSO for native apps",
            guideName: "configure-native-sso",
          },
          {
            title: "Set up On-Behalf-Of Token Exchange",
            guideName: "set-up-token-exchange",
          },
          { title: "Request user consent",
            guideName: "request-user-consent" },
          {
            title: "Configure Device Authz grant flow",
            guideName: "device-authorization-grant",
          },
          {
            title: "Rotate secrets and manage keys",
            guideName: "client-secret-rotation-key",
          },
          {
            title: "Tokens",
            subLinks: [
              {
                title: "Build a JWT for client authn",
                guideName: "build-self-signed-jwt",
              },
              {
                title: "Add custom claims",
                guideName: "customize-tokens-returned-from-okta",
              },
              {
                title: "Add a custom groups claim",
                guideName: "customize-tokens-groups-claim",
              },
              {
                title: "Add a dynamic allowlist",
                guideName: "customize-tokens-dynamic",
              },
              {
                title: "Add a static allowlist",
                guideName: "customize-tokens-static",
              },
              { title: "Refresh access tokens", guideName: "refresh-tokens" },
              { title: "Revoke tokens", guideName: "revoke-tokens" },
              {
                title: "Work with Okta session cookies",
                guideName: "session-cookie",
              },
              {
                title: "Validate access tokens",
                guideName: "validate-access-tokens",
              },
              { title: "Validate ID tokens", guideName: "validate-id-tokens" },
            ],
          },
        ],
      },
      {
        title: "Brand and Customize",
        subLinks: [
          {
            title: "Domain and email address",
            guideName: "custom-url-domain",
          },
          {
            title: "Sign-in page",
            guideName: "custom-widget",
          },
          {
            title: "Error pages",
            guideName: "custom-error-pages",
          },
          {
            title: "SMS messages",
            guideName: "custom-sms-messaging",
          },
          {
            title: "Email notifications",
            guideName: "custom-email",
          },
        ],
      },
      {
        title: "Okta Integration Network",
        customLandingPage: true,
        subLinks: [
          {
            title: "Single Sign-On",
            path: "/docs/guides/oin-sso-overview/",
            subLinks: [
              {
                title: "Build an SSO integration",
                guideName: "build-sso-integration",
              },
            ],
          },
          {
            title: "Lifecycle management",
            path: "/docs/guides/oin-lifecycle-mgmt-overview/",
            subLinks: [
              {
                title: "Build a SCIM integration",
                path: "/docs/guides/scim-provisioning-integration-overview/main/",
                subLinks: [
                  {
                    title: "Prepare your service",
                    path: "/docs/guides/scim-provisioning-integration-prepare/main/",
                  },
                  {
                    title: "Connect your service",
                    guideName: "scim-provisioning-integration-connect",
                  },
                  {
                    title: "Test your integration",
                    path: "/docs/guides/scim-provisioning-integration-test/main/",
                  },
                ],
              },
            ],
          },
          {
            title: "API service integrations",
            path: "/docs/guides/oin-api-service-overview/",
            subLinks: [
              {
                title: "Build an API service integration",
                guideName: "build-api-integration",
              },
            ],
          },
          {
            title: "Publish an OIN integration",
            path: "/docs/guides/submit-app-overview/",
            subLinks: [
              {
                title: "OIN submission requirements",
                guideName: "submit-app-prereq",
              },
              {
                title: "Submit an OIN integration",
                guideName: "submit-app",
              },
            ]
          },
        ],
      },
      {
        title: "API Security",
        subLinks: [
          {
            title: "Configure Demonstrating Proof-of-Possession",
            guideName: "dpop",
          },
          {
            title: "Configure OAuth for Okta",
            guideName: "implement-oauth-for-okta",
          },
          {
            title: "Configure OAuth for Okta: Service App",
            guideName: "implement-oauth-for-okta-serviceapp",
          },
          {
            title: "Protect your API endpoints",
            guideName: "protect-your-api",
          },
          {
            title: "Integrate Third-Party Risk",
            guideName: "third-party-risk-integration",
          },
          {
            title: "Secure OAuth API between orgs",
            guideName: "secure-oauth-between-orgs",
          },
          {
            title: "Set up step-up authn with ACR values",
            guideName: "step-up-authentication"
          },
        ],
      },
      {
        title: "Manage users",
        subLinks: [
          {
            title: "Anything-as-a-Source integration",
            path: "/docs/guides/anything-as-a-source/",
          }
        ],
      },
      {
        title: "Deploy to Production",
        subLinks: [
          {
            title: "Deployment checklists",
            path: "/docs/guides/deployment-checklist/main/",
          },
          { title: "Deploy your app", guideName: "deploy-your-app" },
          {
            title: "Migrate to Okta",
            subLinks: [
              {
                title: "Prerequisites",
                path: "/docs/guides/migrate-to-okta-prerequisites/main/",
              },
              {
                title: "Bulk migration with credentials",
                path: "/docs/guides/migrate-to-okta-bulk/main/",
              },
              {
                title: "Migrate users with pwd hooks",
                path: "/docs/guides/migrate-to-okta-password-hooks/main/",
              },
            ],
          },
        ],
      },
      {
        title: "Automate org management with Terraform",
        guideName: "terraform-landing-page",
        subLinks: [
          {
            title: "Terraform overview",
            guideName: "terraform-overview",
          },
          {
            title: "Enable Terraform access",
            guideName: "terraform-enable-org-access",
          },
          {
            title: "Manage user access",
            guideName: "terraform-manage-user-access",
          },
          {
            title: "Manage groups",
            guideName: "terraform-manage-groups",
          },
          {
            title: "Manage authentication services",
            guideName: "terraform-manage-external-authenticators",
          },
          {
            title: "Customize end-user experience",
            guideName: "terraform-manage-end-user-experience",
          },
          {
            title: "Control Terraform access",
            guideName: "terraform-design-access-security",
          },
          {
            title: "Optimize Terraform access",
          guideName: "terraform-design-rate-limits"
          },
        ],
      },
      {
        title: "Hooks",
        subLinks: [
          {
            title: "Common hook set-up steps",
            guideName: "common-hook-set-up-steps",
          },
          {
            title: "Event hook",
            guideName: "event-hook-implementation",
          },
          {
            title: "Event hooks with ngrok",
            guideName: "event-hook-ngrok",
          },
          {
            title: "Event hooks with Hookdeck",
            guideName: "event-hook-hookdeck",
          },
          {
            title: "Event hooks with filters",
            guideName: "event-hook-filtering",
          },
          {
            title: "Password import inline hook",
            guideName: "password-import-inline-hook",
          },
          {
            title: "Registration inline hook",
            guideName: "registration-inline-hook",
          },
          {
            title: "SAML assertion inline hook",
          guideName: "saml-inline-hook"
          },
          {
            title: "Telephony inline hook",
            guideName: "telephony-inline-hook",
          },
          {
            title: "Token inline hook",
            guideName: "token-inline-hook",
          },
        ],
      },
      {
        title: "Okta Classic Engine",
        path: "/docs/guides/archive-overview/main/",
        subLinks: [
          {
            title: "Auth JS fundamentals",
            guideName: "archive-auth-js",
          },
          {
            title: "Configure sign-on policies",
            guideName: "archive-configure-signon-policy",
          },
          {
            title: "Embedded widget fundamentals",
            guideName: "archive-embedded-siw",
          },
          {
            title: "Sign in to SPA: Auth JS",
            guideName: "archive-sign-in-to-spa-authjs",
            description: true
          },
          {
            title: "Sign in to SPA: Embedded widget",
            guideName: "archive-sign-in-to-spa-embedded-widget",
            description: true
          },
          { title: "Sign users out", guideName: "sign-users-out" },
          {
            title: "Add multifactor authentication",
            guideName: "mfa",
          },
          {
            title: "Registration inline hook",
            guideName: "archive-registration-inline-hook"
           },
           {
            title: "Set up self-service registration",
            guideName: "archive-set-up-self-service-registration",
          },
          {
            title: "Mobile apps",
            subLinks: [
              {
                title: "Build a custom sign-in UI",
                guideName: "build-custom-ui-mobile"
              },
              {
                title: "Unlock with biometrics",
                guideName: "unlock-mobile-app-with-biometrics"
              },
              {
                title: "Share a sign-in session",
                guideName: "shared-sso-android-ios"
              }
            ]
          }
        ]
      }
    ]
  }
];

export const languagesSdk = [
   {
      title: "Languages & SDKs",
      path: "/code/",
      subLinks: [
         {
            title: "Server-side",
            subLinks: [
               { title: "ASP.NET Core", path: "/code/dotnet/aspnetcore/" },
               { title: "ASP.NET Framework", path: "/code/dotnet/aspnet/" },
               { title: "Blazor", path: "/code/dotnet/blazor/" },
               { title: "Go", path: "/code/go/" },
               { title: "Java", path: "/code/java/" },
               { title: "Node.js", path: "/code/nodejs/" },
               { title: "PHP", path: "/code/php/" },
               { title: "Python", path: "/code/python/" },
            ],
         },
         {
            title: "Front-end",
            subLinks: [
               { title: "Angular", path: "/code/angular/" },
               { title: "React", path: "/code/react/" },
               { title: "Vue", path: "/code/vue/" },
               { title: "JavaScript", path: "/code/javascript/" },
            ],
         },
         {
            title: "Mobile/native",
            subLinks: [
               { title: "Android", path: "/code/android/" },
               { title: "iOS", path: "/code/ios/" },
               { title: "React Native", path: "/code/react-native/" },
            ],
         },
         { title: "Test APIs using Postman", path: "/code/rest/" },
      ],
   },
];

export const reference = [
   {
      title: "References",
      path: "/docs/reference/",
      subLinks: [
         {
            title: "Core Okta API",
            path: "/docs/reference/core-okta-api/",
            subLinks: [
               {
                  title: "Rate Limits",
                  path: "/docs/reference/rate-limits/",
                  subLinks: [
                     {
                        title: "Rate limit dashboard",
                        path: "/docs/reference/rl-dashboard/",
                     },
                     {
                        title: "Authn/End-user rate limits",
                        path: "/docs/reference/rl-global-enduser/",
                     },
                     {
                        title: "Management rate limits",
                        path: "/docs/reference/rl-global-mgmt/",
                     },
                     {
                        title: "Other endpoint rate limits",
                        path: "/docs/reference/rl-global-other-endpoints/",
                     },
                     {
                        title: "Additional limits",
                        path: "/docs/reference/rl-additional-limits/",
                     },
                     {
                        title: "Rate limit best practices",
                        path: "/docs/reference/rl-best-practices/",
                     },
                     {
                        title: "Client-based rate limits",
                        path: "/docs/reference/rl-clientbased/",
                     },
                     {
                        title: "DynamicScale",
                        path: "/docs/reference/rl-dynamic-scale/",
                     },
                     {
                        title: "Previous rate limits",
                        path: "/docs/reference/rl-previous/",
                     },
                     {
                        title: "System Log events for rate limits",
                        path: "/docs/reference/rl-system-log-events/"
                     },
                  ]
               },
               { title: "Error Codes", path: "/docs/reference/error-codes/" },
               { title: "User query options", path: "/docs/reference/user-query/" },
               { title: 'Sign in Your Users', path: 'empty' },
               { title: "Authentication", path: "/docs/reference/api/authn/" },
               { title: "Identity Providers", path: "/docs/reference/api/idps/" },
               { title: "OpenID Connect & OAuth 2.0 API", path: "/docs/reference/api/oidc/" },
               { title: "WebFinger", path: "/docs/reference/api/webfinger/" },
               { title: "Manage Okta Objects", path: "empty" },
               { title: "Administrator Roles", path: "/docs/reference/api/roles/" },
               { title: "Apps", path: "/docs/reference/api/apps/" },
               { title: "Authenticators Admin", path: "/docs/reference/api/authenticators-admin/" },
               { title: "Authorization Servers", path: "/docs/reference/api/authorization-servers/" },
               { title: "Brands", path: "/docs/reference/api/brands/" },
               { title: "CAPTCHAs", path: "/docs/reference/api/captchas/" },
               { title: "Devices", path: "/docs/reference/api/devices/" },
               { title: "Domains", path: "/docs/reference/api/domains/" },
               { title: "Dynamic Client Registration", path: "/docs/reference/api/oauth-clients/" },
               { title: "Event Types", path: "/docs/reference/api/event-types/" },
               { title: "Factors", path: "/docs/reference/api/factors/" },
               { title: "Features", path: "/docs/reference/api/features/" },
               { title: "Groups", path: "/docs/reference/api/groups/" },
               { title: "Identity Sources", path: "/docs/reference/api/xaas/" },
               { title: "Key Management", path: "/docs/reference/api/hook-keys/" },
               { title: "Linked Objects", path: "/docs/reference/api/linked-objects/" },
               { title: "Log Streaming", path: "/docs/reference/api/log-streaming/" },
               { title: "Mappings", path: "/docs/reference/api/mappings/" },
               { title: "MyAccount", path: "/docs/reference/api/myaccount/" },
               { title: "Org", path: "/docs/reference/api/org/" },
               { title: "Policy", path: "/docs/reference/api/policy/" },
               { title: "Push Providers", path: "/docs/reference/api/push-providers/" },
               { title: "Risk Events", path: "/docs/reference/api/risk-events/" },
               { title: "Risk Providers", path: "/docs/reference/api/risk-providers/" },
               { title: "Schemas", path: "/docs/reference/api/schemas/" },
               { title: "Sessions", path: "/docs/reference/api/sessions/" },
               { title: "Subscriptions", path: "/docs/reference/api/admin-notifications/" },
               { title: "System Log", path: "/docs/reference/api/system-log/" },
               { title: "Templates", path: "/docs/reference/api/templates/" },
               { title: "ThreatInsight", path: "/docs/reference/api/threat-insight/" },
               { title: "Trusted Origins", path: "/docs/reference/api/trusted-origins/" },
               { title: "UI Schema", path: "/docs/reference/api/uischema/" },
               { title: "User Types", path: "/docs/reference/api/user-types/" },
               { title: "Users", path: "/docs/reference/api/users/" },
               { title: "Zones", path: "/docs/reference/api/zones/" }
            ]
         },
         {
            title: "Advanced Server Access API",
            subLinks: [
               {
                  title: "Introduction",
                  path: "/docs/reference/api/asa/introduction/",
               },
               {
                  title: "ASA Attributes API",
                  path: "/docs/reference/api/asa/attributes/",
               },
               { title: "ASA Audits API", path: "/docs/reference/api/asa/audits/" },
               {
                  title: "ASA Clients API",
                  path: "/docs/reference/api/asa/clients/",
               },
               {
                  title: "ASA Entitlements API",
                  path: "/docs/reference/api/asa/entitlements/",
               },
               { title: "ASA Groups API", path: "/docs/reference/api/asa/groups/" },
               {
                  title: "ASA Projects API",
                  path: "/docs/reference/api/asa/projects/",
               },
               {
                  title: "ASA Service Users API",
                  path: "/docs/reference/api/asa/service-users/",
               },
               { title: "ASA Teams API", path: "/docs/reference/api/asa/teams/" },
               { title: "ASA Users API", path: "/docs/reference/api/asa/users/" },
            ],
         },
         {
            title: "SCIM Protocol",
            path: "/docs/reference/scim/",
            subLinks: [
               {
                  title: "SCIM V2.0",
                  path: "/docs/reference/scim/scim-20/",
               },
               {
                  title: "SCIM V1.1",
                  path: "/docs/reference/scim/scim-11/",
               },
            ],
         },
         {
            title: "Postman Collections",
            path: "/docs/reference/postman-collections/",
         },
         {
            title: "Hooks",
            subLinks: [
               {
                  title: "Event Hooks Management API",
                  path: "/docs/reference/api/event-hooks/",
               },
               {
                  title: "Inline Hooks Management API",
                  path: "/docs/reference/api/inline-hooks/",
               },
               {
                  title: "Inline Hook Types",
                  subLinks: [
                     {
                        title: "Password Import Hook",
                        path: "/docs/reference/password-hook/",
                     },
                     {
                        title: "Registration Hook",
                        path: "/docs/reference/registration-hook/",
                     },
                     { title: "SAML Hook", path: "/docs/reference/saml-hook/" },
                     {
                        title: "Telephony Hook",
                        path: "/docs/reference/telephony-hook/",
                     },
                     { title: "Token Hook", path: "/docs/reference/token-hook/" },
                     {
                        title: "User Import Hook",
                        path: "/docs/reference/import-hook/",
                     },
                  ],
               },
               {
                  title: "Hooks best practices",
                  path: "/docs/reference/hooks-best-practices/",
               },
            ],
         },
         {
            title: "Okta Expression Language",
            path: "/docs/reference/okta-expression-language/",
         },
         {
            title: "Expression Language in Identity Engine",
            path: "/docs/reference/okta-expression-language-in-identity-engine/",
         },
         {
            title: "Release Life Cycle",
            path: "/docs/reference/releases-at-okta/",
         },
         {
            title: 'Architecture Center',
            path: '/docs/reference/architecture-center/',
            subLinks: [
               {
                  title: 'Case studies',
                  subLinks: [
                     {
                        title: "CompanyX",
                        path: "/docs/reference/architecture-center/companyx/",
                     },
                  ],
               },
               {
                  title: 'Reference Architectures',
                  subLinks: [
                     {
                        title: "Directory coexistence",
                        path: "/docs/reference/architecture-center/directory-coexistence/",
                        subLinks: [
                           {
                              title: "Lab overview and prerequisites",
                              path: "/docs/reference/architecture-center/directory-coexistence/lab/",
                           },
                           {
                              title: "Migrate users from Azure AD",
                              path: "/docs/reference/architecture-center/directory-coexistence/lab-azure-ad/",
                           },
                           {
                              title: "Migrate users from an LDAP server",
                              path: "/docs/reference/architecture-center/directory-coexistence/lab-ldap-server/",
                           },
                           {
                              title: "Migrate users from a generic database",
                              path: "/docs/reference/architecture-center/directory-coexistence/lab-generic-database/",
                           },
                        ],
                     },
                     {
                        title: "Manage multiple Okta environments",
                        path: "/docs/reference/architecture-center/multiple-environments/",
                        subLinks: [
                           {
                              title: "Lab overview and prerequisites",
                              path: "/docs/reference/architecture-center/multiple-environments/lab/",
                           },
                           {
                              title: "Configure Terraform Cloud",
                              path: "/docs/reference/architecture-center/multiple-environments/lab-1-configure-terraform-cloud/",
                           },
                           {
                              title: "Create resources",
                              path: "/docs/reference/architecture-center/multiple-environments/lab-2-create-resources/",
                           },
                           {
                              title: "Rename a group",
                              path: "/docs/reference/architecture-center/multiple-environments/lab-3-rename-a-group/",
                           },
                           {
                              title: "Deploy changes to production",
                              path: "/docs/reference/architecture-center/multiple-environments/lab-4-deploy-changes-to-production/",
                           },
                           {
                              title: "Detect drift",
                              path: "/docs/reference/architecture-center/multiple-environments/lab-5-detect-drift/",
                           },
                           {
                              title: "Synchronize environments daily",
                              path: "/docs/reference/architecture-center/multiple-environments/lab-6-synchronize-environments-daily/",
                           },
                        ],
                     },
                  ],
               },
            ],
         },
      ],
   },
];

export const releaseNotes = [
   {
      title: "Release Notes",
      path: "/docs/release-notes/",
      subLinks: [
         { title: "2023", path: "/docs/release-notes/2023/" },
         {
            title: "2023 - Okta Identity Engine",
            path: "/docs/release-notes/2023-okta-identity-engine/",
         },
         { title: "2022", path: "/docs/release-notes/2022/" },
         {
            title: "2022 - Okta Identity Engine",
            path: "/docs/release-notes/2022-okta-identity-engine/",
         },
         { title: "2021", path: "/docs/release-notes/2021/" },
         {
            title: "2021 - Okta Identity Engine",
            path: "/docs/release-notes/2021-okta-identity-engine/",
         },
         { title: "2020", path: "/docs/release-notes/2020/" },
         { title: "2019", path: "/docs/release-notes/2019/" },
         { title: "2018", path: "/docs/release-notes/2018/" },
         { title: "2017", path: "/docs/release-notes/2017/" },
         { title: "2016", path: "/docs/release-notes/2016/" },
      ],
   },
];
