<template>
  <div class="stack-selector">
    <nav class="tabs">
      <ul>
        <li v-for="opt in options" :class="{ current: opt.lang === lang }" >
          <a :href="opt.link"><i :class="opt.css"></i><span class="framework">{{opt.title}}</span></a>
        </li>
      </ul>
    </nav>
    <aside class="stack-content">
      <Content v-if="snippetComponentKey" :pageKey="snippetComponentKey" />
    </aside>
  </div>
</template>

<script>
  import { findOnAncestor, findStackSnippets } from '../util/guides';
  export default {
    name: 'StackSelector',
    props: [ 'snippet' ],
    computed: { 
      lang() { 
        // Default to first available language
        return findOnAncestor({ find: 'lang', node: this }) || this.options[0].name;
      },
      guide() { return findOnAncestor({ find: 'guide', node: this }); },
      section() { return findOnAncestor({ find: 'section', node: this }); },
      options() { return findStackSnippets({ section: this.section, snippet: this.snippet, pages: this.$site.pages }); },     
      snippetComponentKey() { 
        const option = this.options.find( option => option.lang === this.lang );
        return (option ? option.key : '');
      },
    },
  };
</script>
