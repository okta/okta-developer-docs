<template>
  <aside class="guide-featured">
    <a :href="guideInfo.link">{{guideInfo.title}}</a>
    {{guideInfo.excerpt}}
    <FrameworkIconBlock :frameworks="mainLanguagesOfGuide"/>
  </aside>
</template>

<script>
  import { findGuides, findMainLanguagesOfGuide } from '../util/guides';

  export default {
    name: 'FeaturedGuide',
    props: ['guide'],
    computed: { 
      guideInfo() { 
        return findGuides({ pages: this.$site.pages }).find( g => g.name === this.guide );
      },
      mainLanguagesOfGuide() { 
        return findMainLanguagesOfGuide({ guide: this.guide, pages: this.$site.pages });
      },
    },
  }
</script>

