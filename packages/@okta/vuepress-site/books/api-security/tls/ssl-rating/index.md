---
title: SSL Rating - Transport Layer Security
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/tls/">&larr; Transport Layer Security</a></div>

## SSL Rating {#tls-ssl-rating}

After implementing SSL/TLS into your API endpoint infrastructure, be sure to run an SSL Rating test to validate your use of the SSL/TLS Best Practices in the section above. While an A+ SSL rating is not a guarantee that your infrastructure is ideally provisioned, any lower rating should raise red flags that you can correct.

To run the SSL Rating test on your public-facing site, visit <a href="https://www.ssllabs.com/ssltest" class="url">https://www.ssllabs.com/ssltest</a>.

Even if you aren't interested in learning about Diffie-Hellman or Certificate Authorities, you still need to secure your API using TLS/SSL and follow the best practices above.

However, I do encourage you to learn more about the details of TLS/SSL. It can be a daunting task and seemingly never-ending task sometimes, but as with any technology, the more you know about TLS/SSL, the more effective you'll be at building, testing, and reasoning about using it to secure your API. While once could fill an entire book about this topic, hopefully this chapter helped you learn more about the basics of TLS/SSL or helped fill in some gaps in your knowledge.
