<template>
  <div v-pre>
    <p><strong>Okta values (used by the token exchange):</strong></p>

    <table>
      <thead>
        <tr>
          <th>Environment variable</th>
          <th>Description</th>
          <th>Where to find it</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>OKTA_DOMAIN</code></td>
          <td>Okta org domain, for example <code>example.okta.com</code> (no <code>https://</code> prefix)</td>
          <td><strong>Admin Console</strong> &gt; <strong>Settings</strong> &gt; <strong>Account</strong></td>
        </tr>
        <tr>
          <td><code>OKTA_CUSTOM_AS_ID</code></td>
          <td>Custom authorization server ID, for example <code>default</code></td>
          <td><strong>Security</strong> &gt; <strong>API</strong></td>
        </tr>
        <tr>
          <td><code>OKTA_SCOPE</code></td>
          <td>The custom scope that the agent requests</td>
          <td>Custom AS &gt; <strong>Scopes</strong></td>
        </tr>
        <tr>
          <td><code>AGENT_CLIENT_ID</code></td>
          <td>Client ID of the imported third-party AI Agent, for example <code>wlp9k6...</code></td>
          <td><strong>Directory</strong> &gt; <strong>AI Agents</strong> &gt; (yourAgent) </td>
        </tr>
        <tr>
          <td><code>AGENT_KEY_ID</code></td>
          <td><code>kid</code> of the public JWK registered on the third-party AI agent</td>
          <td><strong>Directory</strong> &gt; <strong>AI Agents</strong> &gt; (yourAgent) &gt; <strong>Credentials</strong></td>
        </tr>
        <tr>
          <td><code>AGENT_PRIVATE_KEY_JWK</code></td>
          <td>The third-party agent's private JWK (single-line JSON)</td>
          <td>Output of <strong>Generate credentials</strong>. Store the value in a secrets manager</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AiAgentOktaConfigValues"
};
</script>
