<template>
  <blockquote>
    <p><strong>Note</strong>: We strongly advise against using WebViews for authentication on mobile apps as this practice exposes users to unacceptable security risks. See <a href="https://datatracker.ietf.org/doc/html/rfc8252" target="_blank">OAuth 2.0 for Native Apps</a>. Consider using Okta's native SDKs instead.</p>
  </blockquote>
</template>

<script>
export default {
  name: "ApiAmProdWarning"
};
</script>