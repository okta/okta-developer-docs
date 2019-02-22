---
title: Look For Other Attack Vectors - Sanitizing Data
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/sanitizing/">&larr; Sanitizing Data</a></div>

## Look For Other Attack Vectors {#sanitizing-attack-vectors}

Inputs are everywhere, often only evident in hindsight. User input and file uploads are just the tip of the iceberg, but what if we consider more than input and instead the code itself? Here are a couple of examples to illustrate this point.

### Your Dependencies
Do you trust all of your dependencies? How about all of the transitive dependencies of your application? It is not uncommon to for an application to have a page that lists its dependencies versions and licenses (the later might even be required depending on the license). The popular Node package manager (npm) has had a few projects which have contained [maliciously formed license fields](https://blog.npmjs.org/post/80277229932/newly-paranoid-maintainers). In another npm incident, [packages ran malicious scripts](https://iamakulov.com/notes/npm-malicious-packages/) upon installation automatically that uploaded the user's environment variables to a third party.

Every dependency is code you include from other systems across your trust boundary. Properly inspecting and validating your dependencies is a critical first step of any input sanitation plan. GitHub recently introduced [automated security alerting](https://blog.github.com/2017-11-16-introducing-security-alerts-on-github/) to let you know when your dependencies might have security issues. Pay attention to these and you can prevent a lot of headaches.

### Inbound HTML Requests
Almost all values from an HTTP request can be changed by the sender and need to be handled accordingly. To help illustrate this, here is a simple HTTP POST including numerous headers to `http://example.com/submit-me`:

```http
POST /submit-me HTTP/1.1
Host: example.com
Accept: */*
Referer: http://example.com/fake.html
Accept-Language: en-us
Content-Type: application/x-www-form-urlencoded
Accept-Encoding: gzip, deflate
User-Agent: My Fake UserAgent <img src onerror='alert("haxor")'>
Content-Length: 37
Connection: Keep-Alive
Cache-Control: no-cache

foo=bar&key=value
```

You can see right away: request headers are user input too.  Imagine for a moment that an HTTP client maliciously changes the User-Agent header. The logged User-Agent may falsely identify a request as coming from a different client application than the one in which it really originated.originated from. While that's unlikely to affect the current request, it might cause confusion in the application's logging and reporting system.

Further, the User-Agent could be visible from an internal web application that doesn't sanitize the User-Agent values before displaying them. In this case, an HTTP client could maliciously modify their User-Agent to any JavaScript code they want which would then be executed in an internal user's browser via XSS.

As these examples illustrate, even sanitizing relatively innocuous inputs is an important part of an overall security strategy.
