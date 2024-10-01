---
title: Library versions
---

# Library versions

Okta publishes a number of officially-supported libraries and SDKs on [GitHub](https://github.com/okta). These libraries follow a consistent versioning and release pattern, described here. Note that this is separate from how Okta's HTTP APIs are [versioned and released](https://developer.okta.com/docs/api/openapi/okta-management/guides/release-lifecycle/).

The most up-to-date version information for each library and SDK is always available from the project GitHub readmes.

## Semantic Versioning

All of our libraries and SDKs follow [semantic versioning](https://semver.org/). Library versions are always `major.minor.patch` - for example, `0.1.2` or `2.1.33`.

We:

* Increase the **patch** version for bug fixes, security fixes, and code documentation. Backwards compatible and no breaking changes.
* Increase the **minor** version for new features and additions to the library's interface. Backwards compatible and no breaking changes.
* Increase the **major** version for breaking changes to the library's interface or breaking changes to behavior.

## Version lifecycle

Semantic versioning means that within a **major** version, you can safely apply minor and patch updates without your code breaking. The status of each major version series (for example, `1.x` or `2.x`) follows this lifecycle:

### Beta

Beta versions are currently in development and aren't ready for production use. While a library version is in beta, the code interface isn't final and breaking changes could occur without warning.

New libraries (or new major versions of existing libraries) typically stay in beta for a period of time while we iterate on the design and get feedback from the community. When the library is ready for production, it is marked as stable.

### Stable

Stable version series are supported by Okta for use in production code. Semantic versioning means that a stable major version may get new features (minor updates) or bug fixes (patch updates), but no breaking changes.

### Retiring

When a new major version of a library is released, the old major version series is marked as **retiring**. Retiring libraries are supported by Okta for six months. After this period of time, the version series is officially retired (below).

For example, if version 2.0.0 of `okta-sdk-example` is published in January, the 1.x series of `okta-sdk-example` (any version starting 1) is officially supported until July. The retirement dates are posted in the library's readme or documentation.

### Retired

Retired version series are no longer supported by Okta and are no longer recommended for production use. Okta doesn't publish new features or bug fixes for retired versions, except for critical security fixes (at our discretion).

For example, after `okta-sdk-example` version 1.x has a retiring period (of six months), it's no longer supported. Customers and developers are encouraged to upgrade to 2.0.0 or later.

When in doubt, check GitHub! The library's readme clearly states any versions that are retiring or are retired.
