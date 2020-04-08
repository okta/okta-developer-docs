<template>
  <div class="next-section">
    <router-link :to="target" class="button is-button-cerise is-button-small"><span><slot>Next: {{title}}</slot></span></router-link>
  </div>
</template>

<script>
  import { getGuidesInfo, guideFromPath } from '../util/guides';
  export default { 
    name: 'NextSectionLink',
    props: ['name'],
    computed: { 
      guideName() { return guideFromPath( this.$route.path ).guideName; },
      sectionName() { return guideFromPath( this.$route.path ).sectionName; },
      framework() { return guideFromPath( this.$route.path ).framework; },
      guide() { return getGuidesInfo({pages: this.$site.pages}).byName[this.guideName]; },
      section() { return this.guide.sectionByName[this.sectionName]; },
      nextSection() { 
        if(!this.guide) { 
          return '';
        }
        const thisIndex = this.guide.order.indexOf(this.sectionName);
        return this.guide.sections[thisIndex + 1];
      },
      title() {
        if(!this.nextSection) {
          return '';
        }
        return this.nextSection.title;
      },
      pathForNext() { 
        return this.nextSection ? this.nextSection.makeLink(this.framework) : '';
      },
      target() { 
        return this.name ? this.guide.sectionByName[this.name].makeLink(this.framework) : this.pathForNext;
      },
    },
  };
</script>