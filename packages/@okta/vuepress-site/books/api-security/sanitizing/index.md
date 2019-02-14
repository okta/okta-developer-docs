---
title: Sanitizing Data
---
# Sanitizing Data {#sanitizing}

<div class="chapter-author">By Brian Demers</div>

The inputs to your application represent the most significant surface area of attack for any application. Does your API power forms for user input? Do you display data that didn't originate in your API? Do users upload files through your API?

Any time data crosses a trust boundary - the boundary between any two systems - it should be validated and handled with care. For example, a trust boundary would be any input from an HTTP request, data returned from a database, or calls to remote APIs.

Let's start with a simple example: a user submission to the popular internet forum, Reddit.  A user could try to include a malicious string in a comment such as:

```html
<img src onerror='alert("haxor")'>
```

If this were rendered as is, in an HTML page, it would pop up an annoying message to the user.  However, to get around this, when Reddit displays the text to the user, it is escaped:

```html
&lt;img src onerror=&#39;alert(&quot;haxor&quot;)&#39;&gt;
```

which will make the comment appear as visible text instead of HTML, as shown in <a href="#fig_sanitizing_reddit" class="figref"></a>.

<figure id="fig_sanitizing_reddit">
  <img /assets/img/books/reddit.png" alt=""/>
  <figcaption>Reddit properly escapes user input</figcaption>
</figure>

In this example the trust boundary is obvious as any user input should not be trusted.

There are a few different approaches you can use when validating input:

* Accept known good
* Reject bad
* Sanitize
* Do nothing







<section class="chapter-subsection-list"><ul><li><a href="/books/api-security/sanitizing/accept-good">Accept Known Good</a></li><li><a href="/books/api-security/sanitizing/reject-bad">Reject Bad Inputs</a></li><li><a href="/books/api-security/sanitizing/sanitize-inputs">Sanitize Inputs</a></li><li><a href="/books/api-security/sanitizing/common-attacks">Common Attacks</a></li><li><a href="/books/api-security/sanitizing/attack-vectors">Look For Other Attack Vectors</a></li><li><a href="/books/api-security/sanitizing/best-practices">Best Practices for Secure Data</a></li></ul></section>
