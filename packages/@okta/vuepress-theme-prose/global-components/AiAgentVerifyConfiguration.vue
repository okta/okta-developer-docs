<template>
  <div v-pre>
    <p>After you add the code, verify the Okta-side configuration:</p>

    <ol>
      <li>
        Go to <strong>Directory</strong> &gt; <strong>AI Agents</strong> and confirm that the agent appears with <strong>Status: Active</strong> and the expected owners, connections, and user app.
      </li>
      <li>
        (Optional) Go to <strong>Identity Governance</strong> &gt; <strong>Access Certifications</strong> to confirm that the agent's user sign-on app is visible for future certification campaigns.
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "AiAgentVerifyConfiguration"
};
</script>
