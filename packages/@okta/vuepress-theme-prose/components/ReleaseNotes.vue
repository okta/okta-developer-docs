<template>
  <section class="release-notes">
    <div class="wrapper">
      <hr class="release-notes__divider">
      <div class="release-notes__card">
        <div class="release-notes__card-content">
          <h2 class="release-notes__title dont-break-out">
            Developer release notes
          </h2>
          <p class="release-notes__description dont-break-out">
            Release notes include Generally Available (GA) and Early Access (EA)
            features, plus weekly bug fixes.
          </p>
          <a
            class="release-notes__link dont-break-out"
            href="/docs/release-notes/"
          >
            Go to release notes
          </a>
        </div>
        <div class="release-notes__newest-releases">
          <p class="release-notes__newest-releases-label dont-break-out">
            Newest releases
          </p>
          <ul class="release-notes__newest-releases-list">
            <li
              v-for="release in releases"
              :key="release.title"
              class="release-notes__newest-releases-item"
            >
              <a
                class="release-notes__link dont-break-out"
                :href="release.link"
              >
                {{ release.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ReleaseNotes",
  data() {
    return {
      releases: [
        {
          title: "Identity Engine",
          link: "/docs/release-notes/2026-okta-identity-engine/",
        },
        {
          title: "Classic Engine",
          link: "/docs/release-notes/2026/",
        },
        {
          title: "Okta Identity Governance",
          link: "/docs/release-notes/2026-okta-identity-governance/",
        },
        {
          title: "Okta Privileged Access",
          link: "/docs/release-notes/2026-okta-privileged-access/",
        },
        {
          title: "Okta Access Gateway",
          link: "/docs/release-notes/2026-okta-access-gateway/",
        },
        {
          title: "Okta Aerial",
          link: "/docs/release-notes/2026-okta-aerial",
        },
        {
          title: "Okta Open Source MCP Server",
          link: "/docs/release-notes/2026-okta-mcp-server/",
        },
        {
          title: "Okta Developer Tools",
          link: "/docs/release-notes/2026-okta-dev-tools",
        },
      ],
    };
  },
};
</script>
