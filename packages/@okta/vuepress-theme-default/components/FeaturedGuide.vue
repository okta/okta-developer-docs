<template>
  <router-link :to="guideInfo.link" class="guide-featured">
    <header>
      <section>
        <h1 class="title">
          {{guideInfo.title}}
        </h1>
      </section>
    </header>
    <section class="excerpt">
      {{guideInfo.excerpt}}
    </section>
    <footer>
      <section class="icons">
        <FrameworkIconBlock :frameworks="mainFrameworksOfGuide"/>
      </section>
    </footer>
  </router-link>
</template>

<script>
  import { findGuides, findMainFrameworksOfGuide } from '../util/guides';

  export default {
    name: 'FeaturedGuide',
    props: ['guide'],
    computed: { 
      guideInfo() { 
        return findGuides({ pages: this.$site.pages }).find( g => g.name === this.guide );
      },
      mainFrameworksOfGuide() { 
        return findMainFrameworksOfGuide({ guide: this.guide, pages: this.$site.pages });
      },
    },
  }
</script>

