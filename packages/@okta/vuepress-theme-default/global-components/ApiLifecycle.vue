<template>
  <a href="/docs/api/getting_started/releases-at-okta">
    <span class="api-label api-label-beta" v-if="access=='beta'"> <i class="fa fa-warning"></i> Beta </span>
    <span class="api-label api-label-ea" v-if="access=='ea'"> <i class="fa fa-flag"></i> Early Access </span>
    <span class="api-label api-label-deprecated" v-if="access=='deprecated'"> <i class="fa fa-fire-extinguisher"></i> Deprecated </span>
  </a>
</template>

<script>
  export default {
    name: 'ApiLifecycle',
    props: {
      access: {
        type: String,
        default: 'beta'
      }
    }
  }
</script>
