<template>
  <p>
    If you plan to enable AMR claims in the Okta org that you connect to the IdP org, you must enable <strong>Use standard AMR value format</strong> in the IdP org. Enable this option to send AMR claim values to apps using the standard format of the supported protocol rather than the legacy Okta format.<br>
    <br>
    <ol>
      <li>Go to <strong>Security</strong> > <strong>General</strong> and locate the <strong>Organization Security</strong> section.</li>
      <li>Select <strong>Enabled</strong> from the <strong>Use standard AMR value format</strong> dropdown.</li>
      <li>Click <strong>Save</strong>.</li>
    </ol>
  </p>
</template>

<script>
export default {
  name: "AMROktatoOkta"
};
</script>
