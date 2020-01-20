(window.webpackJsonp=window.webpackJsonp||[]).push([[789],{483:function(e,t,o){"use strict";o.r(t);var a=o(8),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("p",[e._v("The sections in this guide include information on building a URL to request a claim. These sections refer you to this page for the specific steps to build that URL to request a claim and decode the JWT to verify that the claim was included in the token. Specific request and payload examples remain in the appropriate sections. Move on to the section for the claim that you want to create if you don't currently need these steps.")]),e._v(" "),o("p",[e._v("To test the full authentication flow that returns an ID token or an access token, build your request URL:")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("Obtain the following values from your OpenID Connect application, both of which can be found on the application's "),o("strong",[e._v("General")]),e._v(" tab:")]),e._v(" "),o("ul",[o("li",[e._v("Client ID")]),e._v(" "),o("li",[e._v("Redirect URI")])])]),e._v(" "),o("li",[o("p",[e._v("Use the authorization server's authorization endpoint:")]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note:")]),e._v(" See "),o("router-link",{attrs:{to:"/docs/guides/customize-authz-server/overview/"}},[e._v("Authorization Servers")]),e._v(" for more information on the types of authorization servers available to you and what you can use them for.")],1)]),e._v(" "),o("ul",[o("li",[o("p",[e._v("An Okta Org Authorization Server authorization endpoint looks like this:")]),e._v(" "),o("p",[o("code",[e._v("https://${yourOktaDomain}/oauth2/v1/authorize")])])]),e._v(" "),o("li",[o("p",[e._v("A custom authorization endpoint looks like this:")]),e._v(" "),o("p",[o("code",[e._v("https://${yourOktaDomain}/oauth2/${authServerId}/v1/authorize")])])])]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note:")]),e._v(" If you add the claim to the default authorization server, the "),o("code",[e._v("${authServerId}")]),e._v(" is "),o("code",[e._v("default")]),e._v(".")])]),e._v(" "),o("p",[e._v("You can retrieve a custom authorization server's authorization endpoint using the server's metadata URI:")]),e._v(" "),o("p",[o("strong",[e._v("ID token")]),e._v(" "),o("code",[e._v("https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/openid-configuration")])]),e._v(" "),o("p",[o("strong",[e._v("Access token")]),e._v(" "),o("code",[e._v("https://${yourOktaDomain}/oauth2/${authServerId}/.well-known/oauth-authorization-server")])])]),e._v(" "),o("li",[o("p",[e._v("Add the following query parameters to the URL:")]),e._v(" "),o("ul",[o("li",[e._v("Your OpenID Connect application's "),o("code",[e._v("client_id")]),e._v(" and "),o("code",[e._v("redirect_uri")])]),e._v(" "),o("li",[e._v("A scope, which for the purposes of the examples is "),o("code",[e._v("openid")]),e._v(". When you are adding a Groups claims, both the "),o("code",[e._v("openid")]),e._v(" and the "),o("code",[e._v("groups")]),e._v(" scopes are included.")]),e._v(" "),o("li",[e._v("The response type, which for an ID token is "),o("code",[e._v("id_token")]),e._v(" and an access token is "),o("code",[e._v("token")])])]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note:")]),e._v(" The examples in this guide use the "),o("router-link",{attrs:{to:"/docs/concepts/auth-overview/#implicit-flow"}},[e._v("Implicit flow")]),e._v(". For the "),o("router-link",{attrs:{to:"/docs/concepts/auth-overview/#authorization-code-flow"}},[e._v("Authorization Code flow")]),e._v(", the response type is "),o("code",[e._v("code")]),e._v(". You can exchange an authorization code for an ID token and/or an access token using the "),o("code",[e._v("/token")]),e._v(" endpoint.")],1)]),e._v(" "),o("ul",[o("li",[e._v("Values for "),o("code",[e._v("state")]),e._v(" and "),o("code",[e._v("nonce")]),e._v(", which can be anything")])]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note:")]),e._v(" All of the values are fully documented on the "),o("router-link",{attrs:{to:"/docs/reference/api/oidc/#authorize"}},[e._v("Obtain an Authorization Grant from a user")]),e._v(" page.")],1)]),e._v(" "),o("p",[e._v("The resulting URL looks something like this:")]),e._v(" "),o("div",{staticClass:"language-bash extra-class"},[o("pre",{pre:!0,attrs:{class:"language-bash"}},[o("code",[o("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -X GET\n"),o("span",{pre:!0,attrs:{class:"token string"}},[e._v('"https://'),o("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${yourOktaDomain}")]),e._v("/oauth2/"),o("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${authServerId}")]),e._v("/v1/authorize?client_id=examplefa39J4jXdcCwWA\n&response_type=id_token\n&scope=openid\n&redirect_uri=https%3A%2F%2FyourRedirectUriHere.com\n&state=myState\n&nonce="),o("span",{pre:!0,attrs:{class:"token variable"}},[e._v("${myNonceValue}")]),e._v('"')]),e._v("\n")])])]),o("blockquote",[o("p",[o("strong",[e._v("Note:")]),e._v(" The "),o("code",[e._v("response_type")]),e._v(" for an access token looks like this: "),o("code",[e._v("&response_type=token")])])])]),e._v(" "),o("li",[o("p",[e._v("After you paste the request into your browser, the browser is redirected to the sign-in page for your Okta org. Enter the credentials for a user who is mapped to your OpenID Connect application, and then the browser is directed to the "),o("code",[e._v("redirect_uri")]),e._v(" that you specified in the URL and in the OpenID Connect app. An ID token, or an access token, and any state that you defined are included in the response. The following are response examples:")]),e._v(" "),o("p",[o("strong",[e._v("ID token")])]),e._v(" "),o("div",{staticClass:"language-bash extra-class"},[o("pre",{pre:!0,attrs:{class:"language-bash"}},[o("code",[e._v("https://yourRedirectUriHere.com"),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#id_token=eyJraWQiOiIxLVN5[...]C18aAqT0ixLKnJUR6EfJI-IAjtJDYpsHqML7mppBNhG1W55Qo3IRPAg&state=myState")]),e._v("\n")])])]),o("p",[o("strong",[e._v("Access token")])]),e._v(" "),o("div",{staticClass:"language-bash extra-class"},[o("pre",{pre:!0,attrs:{class:"language-bash"}},[o("code",[e._v("https://yourRedirectUriHere.com"),o("span",{pre:!0,attrs:{class:"token comment"}},[e._v("#access_token=eyJraWQiOiIxLVN5M2w2dFl2VTR4MXBSLXR5cVZQWERX[...]YNXrsr1gTzD6C60h0UfLiLUhA&token_type=Bearer&expires_in=3600&scope=openid&state=myState")]),e._v("\n")])])])]),e._v(" "),o("li",[o("p",[e._v("To check the returned ID token or access token payload, you can copy the value and paste it into any JWT decoder (for example: https://jsonwebtoken.io). Using a JWT decoder, confirm that the token contains all of the claims that you are expecting, including the custom one. If you specified a nonce, that is also included.")])])]),e._v(" "),o("NextSectionLink")],1)}),[],!1,null,null,null);t.default=n.exports}}]);