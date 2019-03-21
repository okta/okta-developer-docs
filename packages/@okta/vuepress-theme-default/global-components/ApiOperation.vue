<template>
  <p>
    <span
      :class="('api-uri-template api-uri-' + method.toLowerCase() )">
       <span class="api-label">
        {{ method | uppercase }}
      </span>
       <span v-html="formattedUrl"></span>
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
    computed: {
      formattedUrl: function() {
        return this.url.replace(/\${([^ ]*)}/gm, (match, prop) => '<strong>${'+prop+'}</strong>');
      }
    },
    filters: {
      uppercase: function (value) {
        return value.toUpperCase()
      },

      formatUrl: function (value) {
        return value.replace(/\${([^ ]*)}/gm, (match, prop) => `<strong>"${prop}"</strong>`);
      }
    }
  }
</script>
