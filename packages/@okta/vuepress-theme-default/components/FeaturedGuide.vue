<template>
  <a :href="guideInfo.link" class="guide-featured">
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
    <footer class="card--footer">
      <section class="card--actions">
        <FrameworkIconBlock :frameworks="mainLanguagesOfGuide"/>
      </section>
    </footer>
  </a>
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

