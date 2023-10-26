<template>
  <blockquote>
    <p>Add the <strong>Authentication field</strong> and <strong>Authentication secret</strong> values. This example uses HTTP Basic Authentication. Refer to [HTTP header: Basic Authentication](/docs/guides/common-hook-set-up-steps/nodejs/main/#http-header-basic-authentication).</p>
    <br><ul>
    <li>><strong>Authentication field</strong> = <code>authorization</code><li>

    <li><strong>Authentication secret</strong> = <code>Basic YWRtaW46c3VwZXJzZWNyZXQ=`</code></li>
    </ul>
  </blockquote>
</template>

<script>
export default {
  name: "HookBasicAuthStep"
};
</script>