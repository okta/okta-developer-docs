(window.webpackJsonp=window.webpackJsonp||[]).push([[819],{515:function(e,t,o){"use strict";o.r(t);var r=o(8),i=Object(r.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("p",[e._v("If you are building a Single-Page Application (SPA) that runs in older browsers that don't support Web Crypto for PKCE, then the Implicit flow is the recommended method for controlling access between your SPA and a resource server. The Implicit flow is intended for applications where the confidentiality of the client secret can't be guaranteed. In this flow, the client doesn't make a request to the "),o("code",[e._v("/token")]),e._v(" endpoint, but instead receives the access token directly from the "),o("code",[e._v("/authorize")]),e._v(" endpoint.  The client must be capable of interacting with the resource owner's user agent and capable of receiving incoming requests (through redirection) from the authorization server.")]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note:")]),e._v(" For SPAs running in modern browsers that support Web Crypto for PKCE, we recommend using the "),o("router-link",{attrs:{to:"/docs/guides/implement-auth-code-pkce/"}},[e._v("Authorization Code Flow with PKCE")]),e._v(" instead for maximum security.")],1)]),e._v(" "),o("p",[e._v("At a high level, the Implicit flow has the following steps:")]),e._v(" "),o("ul",[o("li",[e._v("Your application directs the browser to the Okta Sign-In Page, where the user authenticates.")]),e._v(" "),o("li",[e._v("Okta redirects the browser back to the specified redirect URI, along with access and ID tokens as a hash fragment in the URI.")]),e._v(" "),o("li",[e._v("Your application extracts the tokens from the URI.")]),e._v(" "),o("li",[e._v("Your application can now use these tokens to call the resource server (for example an API) on behalf of the user.")])]),e._v(" "),o("p",[e._v("For more information on the Implicit flow, see our "),o("router-link",{attrs:{to:"/docs/concepts/auth-overview/#implicit-flow"}},[e._v("OAuth 2.0 overview")]),e._v(".")],1),e._v(" "),o("NextSectionLink")],1)}),[],!1,null,null,null);t.default=i.exports}}]);