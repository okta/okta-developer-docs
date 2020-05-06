<template>
  <router-link :to="guide.makeLink(guide.mainFramework)" class="guides--featured">
    <header>
      <section>
        <h1 class="title">
          {{guide.title}}
        </h1>
      </section>
    </header>
    <section class="excerpt">
      {{guide.excerpt}}
    </section>
    <footer>
      <section class="icons">
        <FrameworkIconBlock :frameworks="mainFrameworksOfGuide"/>
      </section>
    </footer>
  </router-link>
</template>

<script>
  import { getGuidesInfo } from '../util/guides';

  export default {
    name: 'FeaturedGuideItem',
    props: ['guideName'],
    computed: { 
      guide() { 
        return getGuidesInfo({ pages: this.$site.pages }).byName[this.guideName];
      },
      mainFrameworksOfGuide() { 
        return this.guide.frameworks;
      },
    },
  }
</script>

