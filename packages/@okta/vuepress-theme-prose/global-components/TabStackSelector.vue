<template>
  <div
    v-if="options.length"
    class="stack-selector"
  >
    <nav class="tabs">
      <ul>
        <li
          v-for="opt in options"
          :key="opt.link"
          :class="{ current: opt.framework === framework }"
        >
          <router-link :to="opt.link">
            <i :class="opt.css" /><span class="framework">{{ opt.title }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <aside class="stack-content">
      <Content
        v-if="snippetComponentKey"
        :page-key="snippetComponentKey"
      />
    </aside>
  </div>
  <div
    v-else
    class="no-stack-content"
  >
    No code snippets defined
  </div>
</template>

<script>
  import { getGuidesInfo, guideFromPath } from '../util/guides';
  export default {
    name: 'StackSelector',
    props: [ 'snippet' ],
    data() {
      return {
        offsetFromViewport: null,
      };
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
      guide() { return getGuidesInfo({pages: this.$site.pages}).byName[this.guideName]; },
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
    updated() {
      // If we are the Stack Selector that was focused (clicked on),
      // scroll that we stay in the same position relative to the viewport
      const isActive = Array.from(this.$el.querySelectorAll('.tabs a')).includes(document.activeElement);
      if( isActive && this.offsetFromViewport ) {
        this.$nextTick(() => { // postponed to allow child components to rerender
          window.scroll(0, this.$el.offsetTop - this.offsetFromViewport );
        });
      }
    },
    methods: {
      handleScroll() {
        // beforeUpdated was somehow AFTER the viewport offsets were calculated for new content
        // thus we need to save this from before they swap tabs within the StackSelector
        this.offsetFromViewport = this.$el.getBoundingClientRect().top;
      },
    },
  };
</script>
<style scoped lang="scss">
  .no-stack-content {
    padding: 10px;

    border: 1px solid #dd6666;
  }
</style>
