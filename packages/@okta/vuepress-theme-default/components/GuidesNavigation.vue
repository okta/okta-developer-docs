<template>
  <aside class="guides-navigation">
    <ul class="guides">
      <li :class="{ overview: true, active: !guideName }">
        <router-link to="/guides/">Overview</router-link>
      </li>
      <li v-for="someGuide in guides" :class="{ active: someGuide.name === guideName}">
        <router-link :to="someGuide.makeLink(someGuide.mainFramework)" class="guide">{{someGuide.title}}</router-link>
        <ol v-if="someGuide.name === guideName" class="sections">
          <li v-for="sec in sections" :class="{section: true, active: sec.name === sectionName}">
            <div class="highlight"><router-link :to="sec.makeLink(framework)">{{sec.title}}</router-link></div>
          </li>
        </ol>
      </li>
    </ul>
  </aside>
</template>

<script>
  import { getGuidesInfo } from '../util/guides';
  export default {
    name: 'GuidesNavigation',
    props: [ 'framework', 'sectionName', 'guideName' ],
    computed: { 
      guides() { 
        return getGuidesInfo({ pages: this.$site.pages }).guides;
      },
      sections() { 
        return getGuidesInfo({ pages: this.$site.pages }).byName[this.guideName].sections;
      },
    },
  };
</script>


