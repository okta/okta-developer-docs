<template>
  <div class="mobile-on-this-page" v-show="options.length > 0">
    <h3>On This Page</h3>
    <v-select :options="options" :value="options[0]" :searchable="false" :multiple="false" :clearable="false" v-on:input="inputChanged"></v-select>
  </div>
</template>

<script>
  export default {
    name: 'MobileOnThisPage',
    computed: {
      options: function () {
        let optionsList = [];
        if( this.$page.headers ) {
          this.$page.headers.forEach(function (header, index) {
            optionsList.push({label: header.title, code: header.slug});
          });
        }

        return optionsList;
      }
    },
    methods: {
      inputChanged: function(value) {
        window.scrollTo(0, document.querySelector('#'+value.code).offsetTop - document.querySelector('.fixed-header').clientHeight - 45);
      }
    }
  }
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
</style>

