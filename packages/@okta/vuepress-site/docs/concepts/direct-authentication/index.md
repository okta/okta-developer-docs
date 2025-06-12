---
title: Direct authentication
meta:
  - name: description
    content: An overview of what an authorization server is and the types of authorization servers available at Okta.
---





Use direct authentication when you want your app to directly authenticate users. For example, you don't want to delegate authentication to an IdP or authorization server using an HTTP redirect in a web browser. While delegating authentication is preferred, use direct authentication in situations where there's a high degree of trust between the user and your app.

Also, you can use direct authentication where usability constraints hinder the use of browser-based flows, such as mobile apps.