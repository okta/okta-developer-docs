<template>
  <aside class="guides-navigation">
    <ul class="guides">
      <li :class="{ overview: true, active: !guide }">
        <router-link to="/guides/">Overview</router-link>
      </li>
      <li v-for="someGuide in guides" :class="{ active: someGuide.name === guide}">
        <router-link :to="someGuide.link" class="guide">{{someGuide.title}}</router-link>
        <ol v-if="someGuide.name === guide" class="sections">
          <li v-for="sec in sections" :class="{section: true, active: sec.name === section.name}">
            <div class="highlight"><router-link :to="sec.makeLink(framework)">{{sec.title}}</router-link></div>
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
    props: [ 'sections', 'framework', 'section', 'guide' ],
    computed: { 
      guides() { 
        return findGuides({ pages: this.$site.pages });
      },
    },
  };
</script>


