<template>
  <div
    v-show="options.length > 0"
    class="mobile-on-this-page"
  >
    <h3 class="mobile-header">
      On this page
    </h3>
    <v-select
      v-model="selectedOption"
      :options="options"
      :searchable="false"
      :multiple="false"
      :clearable="false"
      @input="inputChanged"
    >
      <template #option="{label, isSubheading}">
        <div
          class="dropdown-item"
          :class="{subheading: isSubheading}"
        >
          {{ label }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script>
  import { LAYOUT_CONSTANTS } from "../layouts/Layout";

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
        const target = document.querySelector('#'+value.code)

        const scrollToPosition = target.offsetTop - LAYOUT_CONSTANTS.ANCHOR_TOP_MARGIN;

        window.scrollTo({top: scrollToPosition, behavior: 'smooth'})
      }
    }
  }
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
</style>

