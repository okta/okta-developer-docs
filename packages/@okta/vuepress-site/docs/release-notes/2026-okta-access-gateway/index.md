---
title: Okta Access Gateway API release notes 2026

---

# Okta Access Gateway API release notes (2026)

<a href="/rss/access-gateway.xml">
  <img src="/img/icons/Feed-icon.svg" alt="RSS" width="20" height="20" />
  Subscribe to RSS
</a><br><br>

Access Gateway is available for both Okta Classic Engine and Okta Identity Engine.

## July

### Monthly release 2026.07.0
<!-- Published on: 2026-07-12T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Developer documentation update in 2026.07.0](#developer-documentation-update-in-2026-07-0) | July 12, 2026 |
| [Bug fixed in 2026.07.0](#bug-fixed-in-2026-07-0) | July 12, 2026 |

#### OpenID Connect apps in offline mode

You can now configure OpenID Connect apps in offline mode. When you configure offline mode, it allows users to authenticate locally to their on-premises apps when Access Gateway can’t connect to the internet and the Okta identity provider. See [Add apps for offline mode](/docs/guides/oag-configure-apps-offline-mode/main/).

#### Developer documentation update in 2026.07.0

The update to the Okta Developer landing page replaces the static Learn/Build/Publish graphic with new sections for Journeys and release notes. This update delivers streamlined access to end-to-end guides for small-to-medium development projects and the latest platform updates. See [Okta Developer Landing page](https://developer.okta.com/).

#### Bug fixed in 2026.07.0



## May

### Monthly release 2026.05.0
<!-- Published on: 2026-05-13T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bug fixed in 2026.05.0](#bug-fixed-in-2026-05-0) | May 13, 2026 |

#### Bug fixed in 2026.05.0

The Access Gateway API was disabled when upgrading from version `2025.10.0` to `2026.03.0` or `2026.04.0`. (OKTA-1153987)

## April

### Monthly release 2026.04.0
<!-- Published on: 2026-04-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Bugs fixed in 2026.04.0](#bugs-fixed-in-2026-04-0) | April 8, 2026 |

#### Bugs fixed in 2026.04.0

* The `postLogoutUrl` for an app couldn’t be updated using the Replace the application behavior configuration [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/application-behavior/other/replacebehavior). (OKTA-1125316)
* The List all applications [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/applications/other/listapplication) returned an error if an app had `STATUS_CODE_403` as the `policyDenied` value in its app behavior settings and the request was used with `?expand=behavior` as a query parameter. (OKTA-1128154)
* When you used the Replace a protected resource [endpoint](https://developer.okta.com/docs/api/openapi/oag/oag/tags/application-protected-resources/other/replaceresource), it incorrectly returned an HTTP 404 Not Found error. (OKTA-1126600)

## March

### Monthly release 2026.03.0
<!-- Published on: 2026-03-11T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Temporary Offline Access (offline mode) is Limited EA in Preview](#temporary-offline-access-offline-mode-is-limited-ea-in-preview) | March 11, 2026 |
| [Developer documentation update in 2026.03.0](#developer-documentation-update-in-2026-03-0) | March 4, 2026 |

#### Temporary Offline Access (offline mode) is Limited EA in Preview

You can now configure offline mode settings for Access Gateway. When you configure offline mode, it allows users to authenticate locally to their on-premises apps when Access Gateway can’t connect to the internet and the Okta identity provider.

See:

* [Configure offline mode](/docs/guides/oag-offline-mode/main/)
* [Access Gateway API documentation](https://developer.okta.com/docs/api/openapi/oag/guides/overview)

<!-- OKTA-930922 FF:OFFLINE_MODE -->

#### Developer documentation update in 2026.03.0

Our [API reference pages](https://developer.okta.com/docs/api/) are undergoing a migration, which started on February 24. While the look and feel may vary across pages during this time, all technical documentation remains accurate and up to date.

## February

### Monthly release 2026.02.0
<!-- Published on: 2026-02-04T12:00:00Z -->

| Change | Expected in Preview Orgs |
| ------ | ------------------------ |
| [Developer documentation updates in 2026.02.0](#developer-documentation-updates-in-2026-02-0) | February 4, 2026 |

#### Developer documentation updates in 2026.02.0

The Okta developer portal search results now include the API references.

## January

### Monthly release 2026.01.0
<!-- Published on: 2026-01-08T12:00:00Z -->

| Change | Expected in Preview Orgs |
|--------|--------------------------|
| [Developer documentation update in 2026.01.0](#developer-documentation-update-in-2026-01-0) | January 7, 2026 |

#### Developer documentation update in 2026.01.0

The Okta API release notes now provide an RSS feed for each API release note category: [Classic Engine](/docs/release-notes/2026/), [Identity Engine](/docs/release-notes/2026-okta-identity-engine/), [Identity Governance](/docs/release-notes/2026-okta-identity-governance/), [Privileged Access](/docs/release-notes/2026-okta-privileged-access/), [Access Gateway](/docs/release-notes/2026-okta-access-gateway/), and [Aerial](/docs/release-notes/2026-okta-aerial/). Click the RSS icon to subscribe.
