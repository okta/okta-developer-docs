<template>
  <div :class="{ 'stack-selector': !noSelector, 'no-selector': noSelector, 'display-inline': inline }" v-if="options.length">
    <div class="selector-control" v-if="!noSelector">
      <span class="instructions-label">
        Instructions for
      </span>

      <nav class="select-dropdown">
        <v-select :options="options" v-model="selectedOption" :searchable="true" :multiple="false" :clearable="false" v-on:input="inputChanged">
          <template #selected-option="{title, css}">
            <i :class="css"></i><span class="framework">{{title}}</span>
          </template>
          <template #option="{title, link, css}">
            <div class="dropdown-item" :key="link">

              <i :class="css"></i><span class="framework">{{title}}</span>

            </div>
          </template>
      </v-select>
      </nav>
    </div>
    <aside class="stack-content">
      <Content v-if="snippetComponentKey" :pageKey="snippetComponentKey" />
    </aside>
  </div>
  <div v-else class="no-stack-content">
    No code snippets defined
  </div>
</template>

<script>
  import { getGuidesInfo, guideFromPath } from '../util/guides';
  export default {
    name: 'StackSelector',
    props: {
      snippet: {
        type: String,
        required: true,
      },
      noSelector: {
        type: Boolean,
        default: false,
      },
      inline: {
        type: Boolean,
        default: false,
      },
    },
    data() { 
      return { 
        offsetFromViewport: null,
        hasFocus: false,
      };
    },
    methods: { 
      handleScroll() { 
        // beforeUpdated was somehow AFTER the viewport offsets were calculated for new content
        // thus we need to save this from before they swap tabs within the StackSelector
        this.offsetFromViewport = this.$el.getBoundingClientRect().top;
      },
      inputChanged: function(value) {
        if (value && value.link) {
          this.hasFocus = true;
          this.$router.push(value.link);
        }
      }
    },
    created () {
      if(typeof window !== "undefined") { 
        window.addEventListener('scroll', this.handleScroll);
      }
    },
    destroyed () {
      if(typeof window !== "undefined") { 
        window.removeEventListener('scroll', this.handleScroll);
      }
    },
    computed: { 
      guideName() {
        return guideFromPath( this.$route.path ).guideName;
      },
      framework() { 
        // Default to first available framework
        return guideFromPath( this.$route.path ).framework || this.options[0].name;
      },
      sectionName() {
        return guideFromPath( this.$route.path ).sectionName;
      },
      guide() {
         return getGuidesInfo({pages: this.$site.pages}).byName[this.guideName];
      },
      section() { 
        return this.guide.sectionByName[this.sectionName];
      },
      options() { 
        return (this.section &&  // Eagerly awaiting the ?. operator 
          this.section.snippetByName && 
          this.section.snippetByName[this.snippet] && 
          this.section.snippetByName[this.snippet].frameworks) || []; 
      },
      snippetComponentKey() { 
        const option = this.options.find( option => option.framework === this.framework );
        return (option ? option.componentKey : '');
      },
      selectedOption: {
          get: function() {
            return this.options.find(option => option.framework === this.framework)
          },
          set: function (selectedOption) {
            // no-op for silencing computed property assignemnt(by vue-select) warning
          }
      }
    },
    updated() { 
      // If we are the Stack Selector that was focused (clicked on), 
      // scroll that we stay in the same position relative to the viewport
      if(this.hasFocus && this.offsetFromViewport ) { 
        this.$nextTick(() => { // postponed to allow child components to rerender
          window.scroll(0, this.$el.offsetTop - this.offsetFromViewport );
          this.hasFocus = false;
        });
      }
    },
  };
</script>
<style scoped lang="scss">
  .no-stack-content { 
    border: 1px solid #d66;
    padding: 10px;
  }
  .display-inline {
    display: inline;

    .stack-content {
      display: inline;

      & > div, & /deep/ p {
        display: inline;
      }
    }
  }
</style>
