<template>
  <aside class="guides-navigation">
    <ul class="guides">
      <li :class="{ overview: true, active: !guide }">
        <a href="/guides/">Overview</a>
      </li>
      <li v-for="someGuide in guides" :class="{ active: someGuide.name === guide}">
        <a :href="someGuide.link" class="guide">{{someGuide.title}}</a>
        <ol v-if="someGuide.name === guide" class="sections">
          <li v-for="sec in sections" :class="{section: true, active: sec.name === section.name}">
            <div class="highlight"><a :href="sec.makeLink(lang)">{{sec.title}}</a></div>
          </li>
        </ol>
      </li>
    </ul>
  </aside>
</template>

<script>
  import { findGuides } from '../util/guides';
  export default {
    name: 'GuidesNavigation',
    props: [ 'sections', 'lang', 'section', 'guide' ],
    computed: { 
      guides() { 
        return findGuides({ pages: this.$site.pages });
      },
    },
  };
</script>


