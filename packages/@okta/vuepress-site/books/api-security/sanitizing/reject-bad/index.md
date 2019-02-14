---
title: Reject Bad Inputs - Sanitizing Data
---

<div style="font-size: 0.9em; margin-bottom: -20px;"><a href="/books/api-security/sanitizing/">&larr; Sanitizing Data</a></div>

## Reject Bad Inputs {#sanitizing-reject-bad}

Rejecting known invalid inputs is more complicated than only accepting known good inputs (which we talked about above) and far less accurate.  This strategy is typically implemented as a blacklist of strings or patterns.  This technique may require many regular expressions to be run against a single field which may also affect the speed of your application. It also means that this blacklist will require updates any time a new pattern needs to be blocked.

Take a typical use-case of blocking 'bad-words'.  This problem is incredibly complex as language usage varies across locale. These complexities can be demonstrated using the simple word: `ass`. It would be pretty easy to block this word alone, but doing so would also block the proper use of the word referring to donkeys. Then you need to think about both variations of the word and where those letters happen to come together: 'badass,' 'hard-ass,' 'amass,' 'bagasse', the first two are questionable while the second two are fine. Even if you block all of these and the thousands of other words that contain these three letters, there are still variations that would make it past: '4ss', 'as.s,' 'azz,' '@ss,' 'āss,' or '\41\73\73' (escaped characters). As time goes on the list of blocked words would increase raising the total cost of the solution.

Another famous example of this technique is antivirus software. Your antivirus updates every few days to get a new blacklist of items to scan. And we all know how well that works ;)

