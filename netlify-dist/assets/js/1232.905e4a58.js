(window.webpackJsonp=window.webpackJsonp||[]).push([[1232],{889:function(t,s,n){"use strict";n.r(s);var a=n(8),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"_2016-43"}},[t._v("2016.43 "),n("a",{staticClass:"header-anchor header-link",attrs:{href:"#_2016-43","aria-hidden":"true"}},[n("i",{staticClass:"fa fa-link"})])]),t._v(" "),n("h3",{attrs:{id:"enhanced-well-known-endpoint-for-openid-connect"}},[t._v("Enhanced Well-Known Endpoint for OpenID Connect "),n("a",{staticClass:"header-anchor header-link",attrs:{href:"#enhanced-well-known-endpoint-for-openid-connect","aria-hidden":"true"}},[n("i",{staticClass:"fa fa-link"})])]),t._v(" "),n("p",[t._v("The "),n("router-link",{attrs:{to:"/docs/reference/api/oidc/#well-knownopenid-configuration"}},[t._v("OpenID Connect discovery endpoint")]),t._v(" "),n("code",[t._v(".well-known")]),t._v(" includes the introspection and revocation endpoints.")],1),t._v(" "),n("p",[t._v("Request Example:")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("GET https://"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v("/.well-known/openid-configuration\n")])])]),n("p",[t._v("Response Example:")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"issuer"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://'),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v('"')]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"authorization_endpoint"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://'),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v('/oauth2/v1/authorize"')]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"token_endpoint"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://'),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v('/oauth2/v1/token"')]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"userinfo_endpoint"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://'),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v('/oauth2/v1/userinfo"')]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"jwks_uri"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://'),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v('/oauth2/v1/keys"')]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"response_types_supported"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"code"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"code id_token"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"code id_token token"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"id_token"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"id_token token"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"token"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"introspection_endpoint"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://'),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v('/oauth2/v1/introspect"')]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"introspection_endpoint_auth_methods_supported"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"client_secret_basic"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"client_secret_post"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"none"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"revocation_endpoint"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://'),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("${yourOktaDomain}")]),t._v('/oauth2/v1/revoke"')]),t._v(",\n    "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"revocation_endpoint_auth_methods_supported"')]),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"client_secret_basic"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"client_secret_post"')]),t._v(",\n        "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"none"')]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h3",{attrs:{id:"new-function-for-replacing-strings"}},[t._v("New Function for Replacing Strings "),n("a",{staticClass:"header-anchor header-link",attrs:{href:"#new-function-for-replacing-strings","aria-hidden":"true"}},[n("i",{staticClass:"fa fa-link"})])]),t._v(" "),n("p",[t._v("Use the "),n("router-link",{attrs:{to:"/docs/reference/okta-expression-language/"}},[t._v("Expression Language")]),t._v(" function "),n("code",[t._v("String.replaceFirst")]),t._v(" to replace the first occurrence of a string.")],1),t._v(" "),n("p",[t._v("Example:")]),t._v(" "),n("p",[n("code",[t._v('String.replaceFirst("This list includes chores", "is", "at") = "That list includes chores"')])]),t._v(" "),n("p",[t._v("In release 2016.41 we introduced the string replacement function "),n("code",[t._v("String.replace")]),t._v(", which replaces all instances of a specified string.")]),t._v(" "),n("h3",{attrs:{id:"platform-bug-fixed"}},[t._v("Platform Bug Fixed "),n("a",{staticClass:"header-anchor header-link",attrs:{href:"#platform-bug-fixed","aria-hidden":"true"}},[n("i",{staticClass:"fa fa-link"})])]),t._v(" "),n("p",[t._v("POST requests to "),n("code",[t._v("/api/v1/sessions")]),t._v(" failed with an InvalidSessionException if the request specified a\n"),n("code",[t._v("sessionToken")]),t._v(" but no API token was included. (OKTA-104965)")])])}),[],!1,null,null,null);s.default=e.exports}}]);