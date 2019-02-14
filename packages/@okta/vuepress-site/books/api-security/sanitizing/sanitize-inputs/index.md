---
title: Sanitize Inputs - Sanitizing Data
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/sanitizing/">&larr; Sanitizing Data</a></div>

## Sanitize Inputs {#sanitize-inputs}

Sanitizing inputs can be a good option when the input format is not strict but still somewhat predictable, such as phone numbers or other free-text fields. There are a few different ways to sanitize inputs, you could use a whitelist, a blacklist, or escape input.

### Sanitize Input Using a Whitelist
When sanitizing data with a whitelist, only valid characters/strings matching a given pattern are kept.  For example, when validating a phone number there are multiple formats people use, US phone numbers could be written as `555-123-1245`, `(555) 123-1245`, `555.123.1245`, or a similar combination. Running any of these through a whitelist that only allows numeric characters would leave `5551231245`.

### Sanitize Input Using a Blacklist
A blacklist, of course, is the exact opposite of a whitelist. A blacklist can be used to strip HTML `<script>` tags or other non-conforming text from inputs before using input values.  This technique suffers from the same shortcomings of the above section, <a href="#sanitizing-reject-bad" class="section">Rejecting Bad Inputs</a>. This type of sanitization must be done recursively until the value no longer changes. For example if the value <code>&lt;scr<b>&lt;script</b>ipt foo bar</code> is only processed once the result would be still contain `<script`, but if done recursively, the result would be `foo bar`.

### Sanitize Input Using Escaping
Escaping input is one of the easiest and best ways to deal with free-form text.  Essentially, instead of trying to determine the parts of the input that are safe (as with the above strategies), you assume the input is unsafe. There are a few different ways to encode strings depending on how the value is used:

#### HTML/XML Encoding
Example Input:<br/>
`<img src onerror='alert("haxor")'>`

Result:<br/>
`&lt;img src onerror=&#39;alert(&quot;haxor&quot;)&#39;&gt;`

#### HTML/XML Attribute Encoding
Example Input:<br/>
`<div attr="" injectedAttr="a value here"><div attr="">`

Result:<br/>
`<div attr="&quot;&nbsp;injectedAttr&#61;&quot;a&nbsp;value
&nbsp;here&quot;&gt;&lt;div attr=&quot;">`

#### JSON Encoding
Example Input:<br/>
`{"key": "", anotherKey": "anotherValue"}`

Result:<br/>
`{"key": "\", anotherKey\": \"anotherValue\""}`

#### Base64 Encoding
Example Input:<br/>`any random string or binary data`

Result:<br/>
`YW55IHJhbmRvbSBzdHJpbmcgb3IgYmluYXJ5IGRhdGE=`

There are ways to escape just about any format you need SQL, CSV, LDAP, etc.

### Do Nothing
The last type of input validation is the no-op. Along with being the easiest to implement it is the most dangerous and most strongly discouraged! Almost every application takes input from an untrusted source. Not validating inputs puts your application and users at risk.
