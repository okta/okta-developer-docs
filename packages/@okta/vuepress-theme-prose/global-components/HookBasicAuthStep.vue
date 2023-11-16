<template>
  <p>
    Add the <strong>Authentication field</strong> and <strong>Authentication secret</strong> values. This example uses <a href="https://developer.okta.com/docs/guides/common-hook-set-up-steps/nodejs/main/#http-header-basic-authentication">HTTP Basic Authentication</a>.<br><br>
    <ul>
      <li><strong>Authentication field</strong> = <code>authorization</code></li>
      <li><strong>Authentication secret</strong> = <code>Basic YWRtaW46c3VwZXJzZWNyZXQ=</code></li>
    </ul>
  </p>
</template>

<script>
export default {
  name: "HookBasicAuthStep"
};
</script>