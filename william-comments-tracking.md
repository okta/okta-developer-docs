# William Edor comment tracking — Smart Card access policy guide

Branch: `tc-okta-1152178-smart-card-access-policy-guide`
File: `packages/@okta/vuepress-site/docs/guides/oag-configure-authenticator-access-policy/main/index.md`
Source: [Google doc](https://docs.google.com/document/d/1qJ4TYYmYax0jD2ex5DvnmPjKq2w6x0w48DH8L0FNDE4/edit)

Scratch file, not part of the published doc. Delete before merging.

| # | Anchor text | William's comment (summary) | Category | Status | Notes |
|---|---|---|---|---|---|
| 1 | "Password only" | Smart Card button in a password-only policy still requires the password step; card only extracts identity | Discussion required | **Done** | Documented in new "Default authenticator and access policy behavior" section |
| 2 | "Assign the access policy to an app" | Mention deprecated group policy API and auto-migration? | Discussion required | Pending | William flagged doc-scope uncertainty himself |
| 3 | "Every app...must have an assigned access policy." | Implies no app has a policy; default password-only policy always exists | Some reworking | **Done** | Reworded to state the IdP's default password-only policy applies if none is explicitly assigned |
| 4 | "embedded in the certificate chain" (CRL bullet) | Same issue as #7 — CDPs are on the end user's smart card, not the CA chain | Easily actionable | **Done** | Reworded to "CDP URLs embedded in the end user's smart card certificate" |
| 5 | "as an array of one or more Base64-encoded X.509 certificates in DER format." | Array must form a valid ordered chain (issuer of cert N = subject of cert N+1); backend validates this | Easily actionable | **Done** | Added to `certificates` settings bullet: "the issuer of each certificate must match the subject of the next certificate in the array" |
| 6 | "Choose values for both" | `matchAttribute` is also required — must be empty string if unused, or set when `matchType` is `CUSTOM` | Some reworking | **Done** | Added dedicated settings bullet + updated numbered step |
| 7 | "embedded in the certificate chain" (request-example explanation) | Make CDP wording specific to the end user's smart card | Easily actionable | **Done** | Reworded to "CDP URLs embedded in the end user's smart card certificate" |
| 8 | "Configure Smart Card authentication and access policies for Access Gateway" (heading) | New first step required: configure mTLS certificate and hostname before creating the Smart Card authenticator | Some reworking | **Done** | Added new "Configure the mTLS certificate and hostname" section using confirmed [PR #3732](https://github.com/atko-eng/okta-oas3/pull/3732) endpoint (`PUT /api/v2/settings/authentication-service/certificates`, body `{type: "mtls", hostname, certificateId}`). `certificateId` sourcing resolved: added a first step to retrieve it via the existing `GET /api/v2/certificates` (List all certificates) endpoint, confirmed in `specs/oag/spec/oag.yaml` |
| 9 | "An access policy supports one rule, with a single authentication method chain" | One-rule limit is temporary (more rules planned); also whether to mention `access` enum (`allow` only today, `deny` planned) | Discussion required | **Done** (partial) | Current-state facts (one rule, `allow`-only) now consolidated in new "Default authenticator and access policy behavior" section. Deliberately omitted the future-tense "more rules/deny planned" language — out of scope per doc rules on forward-looking features |
| 10 | "But an app without one has no enforced sign-in requirement when offline" | Default policy (password only) always exists — sentence could be misread | Some reworking | **Done** | Reworded to state the password-only default is enforced instead of "no enforced sign-in requirement" |
| 11 | "S" | Stray character, remove | Easily actionable | **Done** | Line deleted |
| 12 | "for each IdP" | Default policy is only created for IdPs with offline mode enabled in `AUTOMATIC` failover mode | Some reworking | **Done** | Reworded to "for each IdP that has offline mode enabled with failover mode set to `AUTOMATIC`" |
| 13 | "action that defines an ordered chain of authentication methods" | Should the `access` enum (allow/deny) be mentioned here too? | Discussion required | **Done** (partial) | Resolved alongside #9 — current `allow`-only value is in the new default-behaviors section instead of inline here, to avoid repeating enum details in the concept intro |

## Summary

- Done: 12 / 13 (#1, #3, #4, #5, #6, #7, #8, #9 [partial], #10, #11, #12, #13 [partial])
- Some reworking: none remaining
- Discussion required, not yet started: #2
