<template>
  <div v-pre>
    <p>
      To exercise the flow, you need an ID token from the OIDC app linked to the agent. Complete an OIDC sign-in against that app to obtain one. For an example Authorization Code with PKCE sign-in helper, see <a href="/docs/guides/ai-agent-third-party-token-exchange/main/#create-an-app-to-obtain-a-test-id-token">Create an app to obtain a test ID token</a>.
    </p>

    <blockquote>
      <p>
        <strong>Note:</strong> Add the helper's callback URL (for example, <code>http://localhost:8765/callback</code>) to the linked OIDC app's <strong>Sign-in redirect URIs</strong> before you run it, and remove it after verification is complete.
      </p>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "AiAgentObtainTestIdToken"
};
</script>
