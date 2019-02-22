---
title: Best Practices for Secure Data - Sanitizing Data
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/sanitizing/">&larr; Sanitizing Data</a></div>

## Best Practices for Secure Data {#sanitizing-best-practices}

While this chapter provides an overview of a few common types of attacks, there are many more out there.

First, you don't need to be an expert to prevent these attacks, but you do need to have some knowledge of them. The Open Web Application Security Project at <a href="https://owasp.org" class="url">OWASP.org</a> is a great source information and examples on how to secure your application, often in multiple programming languages.

One of the most straightforward means of prevention is not to reinvent the wheel, and use an existing framework. Most frameworks contain tools to properly escape values, both on the frontend and backend, when used correctly.

Next, don't forget to monitor your application dependencies. There are mailing lists as well as open source and commercial tools to help you. New CVEs (Common Vulnerabilities and Exposures) are reported all of the time. For example, at the time of this writing a popular Java Web Container, Apache Tomcat 8, has about [60 CVEs](https://tomcat.apache.org/security-8.html) reported (and fixed). These reports, and the subsequent releases indicate that the project takes security seriously and updates regularly.

And finally, trust no one! As you have seen, any input into your API is an attack vector. Everything from an HTTP request to data returned from a database query to the files user upload could be dangerous. Proper data validation and sanitization goes a long way to help mitigate risk.

