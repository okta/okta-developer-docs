(window.webpackJsonp=window.webpackJsonp||[]).push([[597],{315:function(e,t,a){"use strict";a.r(t);var n=a(8),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("div",{staticStyle:{"font-size":"0.9em","margin-bottom":"-20px"}},[a("a",{attrs:{href:"/books/api-security/sanitizing/"}},[e._v("← Sanitizing Data")])]),e._v(" "),a("h2",{attrs:{id:"sanitizing-attack-vectors"}},[e._v("Look For Other Attack Vectors "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#sanitizing-attack-vectors","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),e._v(" "),a("p",[e._v("Inputs are everywhere, often only evident in hindsight. User input and file uploads are just the tip of the iceberg, but what if we consider more than input and instead the code itself? Here are a couple of examples to illustrate this point.")]),e._v(" "),a("h3",{attrs:{id:"your-dependencies"}},[e._v("Your Dependencies "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#your-dependencies","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),e._v(" "),a("p",[e._v("Do you trust all of your dependencies? How about all of the transitive dependencies of your application? It is not uncommon to for an application to have a page that lists its dependencies versions and licenses (the later might even be required depending on the license). The popular Node package manager (npm) has had a few projects which have contained "),a("a",{attrs:{href:"https://blog.npmjs.org/post/80277229932/newly-paranoid-maintainers",target:"_blank",rel:"noopener noreferrer"}},[e._v("maliciously formed license fields"),a("OutboundLink")],1),e._v(". In another npm incident, "),a("a",{attrs:{href:"https://iamakulov.com/notes/npm-malicious-packages/",target:"_blank",rel:"noopener noreferrer"}},[e._v("packages ran malicious scripts"),a("OutboundLink")],1),e._v(" upon installation automatically that uploaded the user's environment variables to a third party.")]),e._v(" "),a("p",[e._v("Every dependency is code you include from other systems across your trust boundary. Properly inspecting and validating your dependencies is a critical first step of any input sanitation plan. GitHub recently introduced "),a("a",{attrs:{href:"https://blog.github.com/2017-11-16-introducing-security-alerts-on-github/",target:"_blank",rel:"noopener noreferrer"}},[e._v("automated security alerting"),a("OutboundLink")],1),e._v(" to let you know when your dependencies might have security issues. Pay attention to these and you can prevent a lot of headaches.")]),e._v(" "),a("h3",{attrs:{id:"inbound-html-requests"}},[e._v("Inbound HTML Requests "),a("a",{staticClass:"header-anchor header-link",attrs:{href:"#inbound-html-requests","aria-hidden":"true"}},[a("i",{staticClass:"fa fa-link"})])]),e._v(" "),a("p",[e._v("Almost all values from an HTTP request can be changed by the sender and need to be handled accordingly. To help illustrate this, here is a simple HTTP POST including numerous headers to "),a("code",[e._v("http://example.com/submit-me")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language-http extra-class"},[a("pre",{pre:!0,attrs:{class:"language-http"}},[a("code",[a("span",{pre:!0,attrs:{class:"token request-line"}},[a("span",{pre:!0,attrs:{class:"token property"}},[e._v("POST")]),e._v(" /submit-me HTTP/1.1")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Host:")]),e._v(" example.com\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Accept:")]),e._v(" */*\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Referer:")]),e._v(" http://example.com/fake.html\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Accept-Language:")]),e._v(" en-us\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Content-Type:")]),e._v(" application/x-www-form-urlencoded\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Accept-Encoding:")]),e._v(" gzip, deflate\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("User-Agent:")]),e._v(" My Fake UserAgent <img src onerror='alert(\"haxor\")'>\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Content-Length:")]),e._v(" 37\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Connection:")]),e._v(" Keep-Alive\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[e._v("Cache-Control:")]),e._v(" no-cache\n\nfoo=bar&key=value\n")])])]),a("p",[e._v("You can see right away: request headers are user input too.  Imagine for a moment that an HTTP client maliciously changes the User-Agent header. The logged User-Agent may falsely identify a request as coming from a different client application than the one in which it really originated.originated from. While that's unlikely to affect the current request, it might cause confusion in the application's logging and reporting system.")]),e._v(" "),a("p",[e._v("Further, the User-Agent could be visible from an internal web application that doesn't sanitize the User-Agent values before displaying them. In this case, an HTTP client could maliciously modify their User-Agent to any JavaScript code they want which would then be executed in an internal user's browser via XSS.")]),e._v(" "),a("p",[e._v("As these examples illustrate, even sanitizing relatively innocuous inputs is an important part of an overall security strategy.")])])}),[],!1,null,null,null);t.default=r.exports}}]);