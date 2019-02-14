<template>
  <p>
    <span
      :class="('api-uri-template api-uri-' + method.toLowerCase() )">
       <span class="api-label">
        {{ method | uppercase }}
      </span>
       {{ url }}
     </span>
  </p>
</template>

<style scoped lang="scss">
  p {
    font-weight: bold;
  }
</style>

<script>
  export default {
    name: 'ApiOperation',
    props: {
      method: {
        type: String,
        default: 'get'
      },
      url: {
        type: String,
        default: '',
      }
    },
    filters: {
      uppercase: function (value) {
        return value.toUpperCase()
      }
    }
  }
</script>
