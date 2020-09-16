---
title: Common Attacks - Sanitizing Data
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/sanitizing/">&larr; Sanitizing Data</a></div>

## Common Attacks {#sanitizing-common-attacks}

The examples in this chapter have discussed ways to validate inputs but have only hinted at the type of attacks used when inputs are not properly sanitized. Let's look at those potential attacks, and how to prevent them, now.

### SQL Injection Attacks
SQL injection is by far the most common form of data sanitization attack, and remains number one in the [OWASP Top 10](https://www.owasp.org/images/7/72/OWASP_Top_10-2017_%28en%29.pdf.pdf) (a popular list of the most commonly found and exploited software vulnerabilities). It's held the number one spot for over 10 years now.

SQL injection occurs when an attacker is able to query or modify a database due to poor input sanitization. Other query injection attacks are similar, as most are typically a result of string concatenation.  In the following example, a simple user query string is built with concatenation.

```sql
userId = getFromInput("userId");
sql = "SELECT * FROM Users WHERE UserId = " + userId;
```

If the `userId` were `jcoder` the SQL query would be `"SELECT * FROM Users WHERE UserId = jcoder`, however, a malicious attacker might input `jcoder; DROP TABLE ImportantStuff` which would result in two statements being executed:

```sql
SELECT * FROM Users WHERE UserId = jcoder;
DROP TABLE ImportantStuff
```

Similarly, the user could enter `jcoder OR 1=1` which would query for a user with the ID of `jcoder` OR `true` (`1=1` is always true), this would return all of the users in the system.

The cause of this issue is the use of poor string concatenation.  In the example above, the value of the `userId` input crosses a trust boundary and ends up getting executed. The best way around this is to use SQL prepared statements.  The syntax for using prepared statements varies from language to language but the gist is that the above query would become `SELECT * FROM Users WHERE UserId = ?`.  The question mark would be replaced with the input value and be evaluated as a string instead of changing the query itself.

Most web frameworks and ORM libraries provide tools to protect against SQL injection attacks, be sure to look through your developer library documentation to ensure you're using these tools properly.

### XSS - Cross Site Scripting
A cross-site scripting attack (XSS) is an attack that executes code in a web page viewed by a user. There are three different types of XSS attacks:

* **Stored XSS** - A persisted (in a database, log, etc) payload is rendered to an HTML page. For example, content on an forum.
* **Reflected XSS** - Attack payload is submitted by a user, the rendered server response contains the executed code. This differs from Stored XSS where as the attack payload is not persisted, but instead delivered as part of the request, eg. a link: `http://example.com/login?userId=<script>alert(document.cookie)</script>`
* **DOM based XSS** - The attack payload is executed as the result of an HTML page's DOM changing. With DOM based XSS the attack payload may not leave the victim's browser. The client side JavaScript is exploited.

There are [tons of resources online](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29) that cover this topic in great detail, so I'll only provide a basic example here. Earlier in this chapter the string `<img src onerror='alert("haxor")'>` was posted as a Reddit comment. If this string isn't correctly escaped it would have resulted in an annoying popup, shown in <a href="#fig_sanitizing_alert" class="figref"></a>.

![A JavaScript alert popup](/img/books/api-security/sanitizing/images/alert.png "A JavaScript alert popup")

You may see `alert()` used throughout examples when describing these attacks. The idea is if you can cause an alert to happen in the browser, you can execute other code that does something more malicious like sends your information (cookie, session ID, or other personal info) to a remote site.

### File upload attacks
It is common for sites to support file uploads, particularly images such as profile avatars or photos. When uploading files, it is necessary to validate the type, size, and contents of these files.  For example, if a user is uploading an avatar image, it's important to ensure the newly uploaded file is actually an image.

If an attacker can upload a PHP file named `avatar.php` instead of an image file, then later retrieve the file, unexpected and disastrous behavior may occur. Imagine what would happen if that file is executed on the server, you could have a remote code exploit on your hands. There are a few things you can do to prevent this type of attack:

Validate expected file types
Check that file size is reasonable (if someone is uploading a 1GB image, you might have a problem)
If storing the file to disk, do NOT use a user input field as part of the file name, eg: `../../../etc/config.file`
Always serve the files with the correct Content-Type header (image/png, audio/mpeg)
Run a virus scan on all uploaded files
Do not allow uploads of web executed files: php, cgi, js, swf, etc.
Process the files - rename, resize, remove exif data, etc - before displaying back to the user
