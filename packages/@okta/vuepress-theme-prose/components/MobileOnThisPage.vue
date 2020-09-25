<template>
  <div class="mobile-on-this-page" v-show="options.length > 0">
    <h3 class="mobile-header">On This Page</h3>
    <v-select :options="options" v-model="selectedOption" :searchable="false" :multiple="false" :clearable="false" v-on:input="inputChanged">

      <template #option="{label, isSubheading}">
        <div class="dropdown-item" v-bind:class="{subheading: isSubheading}">
          {{label}}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
  export default {
    name: 'MobileOnThisPage',
    data: ()=>({ 
     selectedOption: {}
    }),
    computed: {
      options: function () {
        let optionsList = [];
        if( this.$page.headers ) {
          this.$page.headers.forEach(function (header, index) {
            optionsList.push({label: header.title, code: header.slug, isSubheading: header.level === 3});
          });
        }
        this.selectedOption = optionsList[0]
        return optionsList;
      },
    },
    methods: {
      inputChanged: function(value) {
        this.selectedOption = value
        window.scrollTo(0, document.querySelector('#'+value.code).offsetTop - document.querySelector('.fixed-header').clientHeight - 45);
      }
    }
  }
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
</style>

