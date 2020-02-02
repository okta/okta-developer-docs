<template>
  <p>
    <span
      :class="('api-uri-template api-uri-' + method.toLowerCase() )">
       <span class="api-label">
        {{ method | uppercase }}
      </span>
       <span class="api-url" v-html="formattedUrl"></span>
     </span>
  </p>
</template>

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
        let url = this.url;
        url = url.replace(/\//g, "/&#8203;");
        return url.replace(/\${([^ ]*)}/gm, (match, prop) => '<strong>${'+prop+'}</strong>');
      }
    },
    filters: {
      uppercase: function (value) {
        return value.toUpperCase()
      },

      formatUrl: function (value) {
        value = value.replace(/\//g, "/&#8203;");
        return value.replace(/\${([^ ]*)}/gm, (match, prop) => `<strong>"${prop}"</strong>`);
      }
    }
  }
</script>
