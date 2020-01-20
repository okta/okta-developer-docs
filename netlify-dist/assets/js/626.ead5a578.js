(window.webpackJsonp=window.webpackJsonp||[]).push([[626],{342:function(t,s,a){"use strict";a.r(s);var n=a(8),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",[a("i",{staticClass:"icon-48 docsPage code-ios"}),t._v(" Overview")]),t._v(" "),a("p",[t._v("This guide will walk you through integrating authentication and authorization into a Swift iOS native application with Okta.")]),t._v(" "),a("h2",{attrs:{id:"prerequisites"}},[t._v("Prerequisites "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#prerequisites","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("If you do not already have a "),a("strong",[t._v("Developer Edition Account")]),t._v(", you can create one at "),a("a",{attrs:{href:"https://developer.okta.com/signup/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://developer.okta.com/signup/"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("h3",{attrs:{id:"add-an-openid-connect-client"}},[t._v("Add an OpenID Connect Client "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#add-an-openid-connect-client","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("ul",[a("li",[t._v("Log into the Okta Developer Dashboard, and "),a("strong",[t._v("Create New App")])]),t._v(" "),a("li",[t._v("Choose "),a("strong",[t._v("Native app")]),t._v(" as the platform, then populate your new OpenID Connect application with values similar to:")])]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Setting")]),t._v(" "),a("th",[t._v("Value")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("Application Name")]),t._v(" "),a("td",[t._v("OpenId Connect App "),a("em",[t._v("(must be unique)")])])]),t._v(" "),a("tr",[a("td",[t._v("Login redirect URIs")]),t._v(" "),a("td",[t._v("com.okta.example:/callback")])]),t._v(" "),a("tr",[a("td",[t._v("Logout redirect URIs")]),t._v(" "),a("td",[t._v("com.okta.example:/logout")])])])]),t._v(" "),a("blockquote",[a("p",[a("em",[t._v("As with any Okta application, make sure you assign Users or Groups to the OpenID Connect Client. Otherwise, no one can use it.")])])]),t._v(" "),a("h2",{attrs:{id:"installation"}},[t._v("Installation "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#installation","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("The simplest way to add authentication into an iOS app is using the library "),a("a",{attrs:{href:"http://cocoapods.org/pods/OktaAuth",target:"_blank",rel:"noopener noreferrer"}},[t._v("Okta AppAuth"),a("OutboundLink")],1),t._v(", available through "),a("a",{attrs:{href:"http://cocoapods.org",target:"_blank",rel:"noopener noreferrer"}},[t._v("CocoaPods"),a("OutboundLink")],1),t._v(". To install it, simply add the following line to your Podfile:")]),t._v(" "),a("div",{staticClass:"language-ruby extra-class"},[a("pre",{pre:!0,attrs:{class:"language-ruby"}},[a("code",[t._v("pod "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'OktaAuth'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'~> 0.1'")]),t._v("\n")])])]),a("h2",{attrs:{id:"configuration"}},[t._v("Configuration "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#configuration","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("Create a new "),a("code",[t._v("Okta.plist")]),t._v(" file in your application's bundle with the following fields:")]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token prolog"}},[t._v('<?xml version="1.0" encoding="UTF-8"?>')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token doctype"}},[t._v('<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("plist")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("version")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("1.0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("dict")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("issuer"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("https://${yourOktaDomain}/oauth2/{authServerId}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("clientId"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{clientIdValue}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("redirectUri"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("{redirectUrlValue}"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("scopes"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("offline_access"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("openid"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("profile"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("dict")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("plist")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[a("strong",[t._v("Note")]),t._v(": "),a("em",[t._v("To receive a "),a("strong",[t._v("refresh_token")]),t._v(", you must include the "),a("code",[t._v("offline_access")]),t._v(" scope.")])]),t._v(" "),a("blockquote",[a("p",[t._v("Important: Most native applications send access tokens to access APIs. If you're building an API that will need to accept access tokens, "),a("router-link",{attrs:{to:"/docs/guides/customize-authz-server/"}},[t._v("create an authorization server")]),t._v(".")],1)]),t._v(" "),a("h3",{attrs:{id:"update-the-private-use-uri-scheme"}},[t._v("Update the Private-use URI Scheme "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#update-the-private-use-uri-scheme","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("In order to redirect back to your application from a web browser, you must specify a unique URI to your app. To do this, open "),a("code",[t._v("Info.plist")]),t._v(" in your application bundle and set a "),a("strong",[t._v("URL Scheme")]),t._v(" to the scheme of the login redirect URI.")]),t._v(" "),a("p",[t._v("For example, if your "),a("strong",[t._v("Login Redirect URI")]),t._v(" is "),a("code",[t._v("com.okta.example:/callback")]),t._v(", the "),a("strong",[t._v("URL Scheme")]),t._v(" will be "),a("code",[t._v("com.okta.example")]),t._v(".")]),t._v(" "),a("h2",{attrs:{id:"adding-authentication"}},[t._v("Adding Authentication "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#adding-authentication","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("Users can sign in to your iOS application a number of different ways.\nThe easiest, and most secure way is to use the "),a("strong",[t._v("default login page")]),t._v(". This page renders the "),a("router-link",{attrs:{to:"/code/javascript/okta_sign-in_widget/"}},[t._v("Okta Sign-In Widget")]),t._v(", equipped to handle User Lifecycle operations, MFA, and more.")],1),t._v(" "),a("p",[t._v("First, update your "),a("code",[t._v("AppDelegate")]),t._v(" to include the following function to allow the redirect to occur:")]),t._v(" "),a("div",{staticClass:"language-swift extra-class"},[a("pre",{pre:!0,attrs:{class:"language-swift"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// AppDelegate.swift")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("application")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("_")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("UIApplication")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" open url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("URL")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("UIApplicationOpenURLOptionsKey")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("Any")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("Bool")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resume")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("Then, you can start the authorization flow by simply calling "),a("code",[t._v("login")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-swift extra-class"},[a("pre",{pre:!0,attrs:{class:"language-swift"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("login")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("self")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("nil")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Success")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" tokenResponse "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" response "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// tokenResponse.accessToken")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// tokenResponse.idToken")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// tokenResponse.refreshToken")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"handle-the-login-state"}},[t._v("Handle the Login State "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#handle-the-login-state","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("In native applications, it is common for users to have a long-lived session. It is important for the app to manage the user's session by refreshing tokens when they expire, using the "),a("code",[t._v("refresh_token")]),t._v(" or re-prompting the user to login.")]),t._v(" "),a("h3",{attrs:{id:"store-the-user-s-tokens"}},[t._v("Store the User's Tokens "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#store-the-user-s-tokens","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("Tokens are securly stored in the Keychain. They are easily set and retrieved with the helper methods "),a("code",[t._v("set")]),t._v(" and "),a("code",[t._v("get")]),t._v(".")]),t._v(" "),a("div",{staticClass:"language-swift extra-class"},[a("pre",{pre:!0,attrs:{class:"language-swift"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("login")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("self")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("nil")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("error"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Success")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" tokenResponse "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" response "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tokens"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" tokenResponse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("accessToken"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" forKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"accessToken"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tokens"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" tokenResponse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("idToken"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" forKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"idToken"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tokens"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("set")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" tokenResponse"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("refreshToken"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" forKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"refreshToken"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("When starting up the application, check for the existence of an "),a("code",[t._v("access_token")]),t._v(" to see if the user has an existing session:")]),t._v(" "),a("div",{staticClass:"language-swift extra-class"},[a("pre",{pre:!0,attrs:{class:"language-swift"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" currentToken "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tokens"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("forKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"accessToken"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Token is valid!")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Token does not exist, prompt the user to login.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"validating-the-token"}},[t._v("Validating the Token "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#validating-the-token","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("Before using an "),a("code",[t._v("access_token")]),t._v(" or "),a("code",[t._v("id_token")]),t._v(", ensure the tokens are valid by calling the "),a("code",[t._v("introspect")]),t._v(" method:")]),t._v(" "),a("div",{staticClass:"language-swift extra-class"},[a("pre",{pre:!0,attrs:{class:"language-swift"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("introspect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("validate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("token"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" currentToken"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("nil")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Error: '),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token delimiter variable"}},[t._v("\\(")]),t._v("error"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token delimiter variable"}},[t._v(")")])]),t._v('"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" isValid "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" response "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("isValid "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Token is not valid, prompt the user to login")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h3",{attrs:{id:"fetch-user-claims"}},[t._v("Fetch User Claims "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#fetch-user-claims","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("Now that the "),a("code",[t._v("access_token")]),t._v(" has been stored and validated, use it to retrieve more information about the user:")]),t._v(" "),a("div",{staticClass:"language-swift extra-class"},[a("pre",{pre:!0,attrs:{class:"language-swift"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("OktaAuth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("userinfo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" error "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("nil")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Error: '),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token delimiter variable"}},[t._v("\\(")]),t._v("error"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),a("span",{pre:!0,attrs:{class:"token delimiter variable"}},[t._v(")")])]),t._v('"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" userinfo "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" response "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// userinfo["name"]')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// userinfo["email"]')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"conclusion"}},[t._v("Conclusion "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#conclusion","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("You have now successfully authenticated with Okta! Now what? With a user's "),a("code",[t._v("id_token")]),t._v(", you have basic claims for the user's identity. You can extend the set of claims by modifying the "),a("code",[t._v("scopes")]),t._v(" to retrieve custom information about the user. This includes "),a("code",[t._v("locale")]),t._v(", "),a("code",[t._v("address")]),t._v(", "),a("code",[t._v("groups")]),t._v(", and "),a("router-link",{attrs:{to:"/docs/reference/api/oidc/"}},[t._v("more")]),t._v(".")],1),t._v(" "),a("h2",{attrs:{id:"support"}},[t._v("Support "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#support","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),t._v(" "),a("p",[t._v("Have a question or see a bug? Post your question on "),a("a",{attrs:{href:"https://devforum.okta.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Okta Developer Forums"),a("OutboundLink")],1),t._v(".")])])}),[],!1,null,null,null);s.default=e.exports}}]);