<template>
    <p>Add the <strong>Authentication field</strong> and <strong>Authentication secret</strong> values. This example uses <a href="https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/#http-header-basic-authentication">HTTP Basic Authentication</a>.<br><br>
    <ul>
    <li><strong>Authentication field</strong> = <code>authorization</code></li>
    <li><strong>Authentication secret</strong> = <code>Basic YWRtaW46c3VwZXJzZWNyZXQ=</code></li>
    </ul>
    </p>
    <blockquote>
    <p><strong>Note:</strong> If you want to use OAuth 2.0 to secure your inline hooks, see <a href="https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/#oauth-2-0-client-secret">OAuth 2.0: Client Secret</a> or <a href="https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/#oauth-2-0-private-key">OAuth 2.0: Private Key</a>.</p>
    </blockquote>
</template>

<script>
export default {
  name: "HookBasicAuthStep"
};
</script>