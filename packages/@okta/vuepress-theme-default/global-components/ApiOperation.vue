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
      },

      formatUrl: function (value) {
      //.replace(/{% api_operation (get|post|delete|put) ([^ ]*) %}/gm, (match, method, url) => `<ApiOperation method="${method}" url="${url}" />`);
      }
    }
  }
</script>
