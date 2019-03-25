<template>
  <aside class="guides-navigation">
<<<<<<< HEAD
    Navigation amongst all guides
    <ul>
      <li v-for="guide in guides">
        <a :href="guide.link">{{guide.title}}</a>
=======
    <ul class="guides">
      <li v-for="someGuide in guides" :class="{ active: someGuide.name === guide}">
        <a :href="someGuide.link" class="guide">{{someGuide.title}}</a>
        <ol v-if="someGuide.name === guide" class="sections">
          <li v-for="sec in sections" :class="{section: true, active: sec.name === section.name}">
            <div class="highlight"><a :href="sec.makeLink(lang)">{{sec.title}}</a></div>
          </li>
        </ol>
>>>>>>> def39456ae42c7cf1d384dd04896a232fe4e4f39
      </li>
    </ul>
  </aside>
</template>

<script>
  import { findGuides } from '../util/guides';
  export default {
    name: 'GuidesNavigation',
<<<<<<< HEAD
=======
    props: [ 'sections', 'lang', 'section', 'guide' ],
>>>>>>> def39456ae42c7cf1d384dd04896a232fe4e4f39
    computed: { 
      guides() { 
        return findGuides({ pages: this.$site.pages });
      }
    },
  };
</script>


