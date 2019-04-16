<template>
  <div class="stack-selector">
    <nav class="tabs">
      <ul>
        <li v-for="opt in options" :class="{ current: opt.framework === framework }" >
          <router-link :to="opt.link"><i :class="opt.css"></i><span class="framework">{{opt.title}}</span></router-link>
        </li>
      </ul>
    </nav>
    <aside class="stack-content">
      <Content v-if="snippetComponentKey" :pageKey="snippetComponentKey" />
    </aside>
  </div>
</template>

<script>
  import { findOnAncestor } from '../util/guides';
  export default {
    name: 'StackSelector',
    props: [ 'snippet' ],
    data() { 
      return { 
        offsetFromViewport: null,
      };
    },
    methods: { 
      handleScroll() { 
        // beforeUpdated was somehow AFTER the viewport offsets were calculated for new content
        // thus we need to save this from before they swap tabs within the StackSelector
        this.offsetFromViewport = this.$el.getBoundingClientRect().top;
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
    computed: { 
      framework() { 
        // Default to first available framework
        return findOnAncestor({ find: 'framework', node: this }) || this.options[0].name;
      },
      section() { return findOnAncestor({ find: 'section', node: this }); },
      options() { return this.section ? this.section.snippetByName[this.snippet].frameworks : []; },
      snippetComponentKey() { 
        const option = this.options.find( option => option.framework === this.framework );
        return (option ? option.componentKey : '');
      },
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
  };
</script>
