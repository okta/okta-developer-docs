---
title: API Security
---

# API Security

<div class="tagline">A guide to building and securing APIs<br>from the developer team at Okta</div>

### Table of Contents

<div class="table-of-contents">
<ul>
        <li><a href="/books/api-security/acknowledgments/" class="part-0" data-num="1">Acknowledgments</a></li>
          <li><a href="/books/api-security/foreword/" class="part-0" data-num="2">Foreword</a></li>
          <li><a href="/books/api-security/tls/" class="part-1" data-num="1">Transport Layer Security</a></li>
          <li><a href="/books/api-security/dos/" class="part-1" data-num="2">DOS Mitigation Strategies</a></li>
          <li><a href="/books/api-security/sanitizing/" class="part-1" data-num="3">Sanitizing Data</a></li>
          <li><a href="/books/api-security/api-keys/" class="part-1" data-num="4">Managing API Credentials</a></li>
          <li><a href="/books/api-security/authn/" class="part-1" data-num="5">Authentication</a></li>
          <li><a href="/books/api-security/authz/" class="part-1" data-num="6">Authorization</a></li>
          <li><a href="/books/api-security/gateways/" class="part-1" data-num="7">API Gateways</a></li>
          <li><a href="/books/api-security/about-the-authors/" class="part-9" data-num="1">About the Authors</a></li>
    </ul>
</div>

<style>
.tagline {
  font-size: 18pt;
  line-height: 32px;
  font-style: italic;
}
.table-of-contents ul {
  list-style-type: none;
}
.table-of-contents ul li {
  margin-bottom: 10px;
  vertical-align: middle;
  width: 100%;
  display: inline-block;
  font-size: 18px;
  padding-bottom: 6px;
  line-height: 20px;
}
.table-of-contents ul li a::before {
  height: 20px;
  width: 20px;
  display: block;
  float: left;
  color: #fff;
  padding: 5px;
  margin-right: 5px;
  margin: -7px 7px 0 0;
  line-height: 21px;
  content: " ";
  border: 2px #e22866 solid;
  border-radius: 100%;
  font-size: 16px;
}
.table-of-contents ul li a.part-1::before {
  background: #e22866;
  font-weight: bold;
  text-align: center;
  content: attr(data-num);
}
</style>
