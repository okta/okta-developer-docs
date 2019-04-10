<template>
  <router-link :to="target" class="next-section Button--red"><span><slot>Next: {{nextSection.title}}</slot></span></router-link>
</template>

<script>
  import { getGuidesInfo, findOnAncestor } from '../util/guides';
  export default { 
    name: 'NextSectionLink',
    props: ['name'],
    computed: { 
      guideName() { return findOnAncestor({ find: 'guideName', node: this }); },
      sectionName() { return findOnAncestor({ find: 'sectionName', node: this }); },
      framework() { return findOnAncestor({ find: 'framework', node: this }); },
      guide() { return getGuidesInfo({pages: this.$site.pages}).byName[this.guideName]; },
      section() { return this.guide.sectionByName[this.sectionName]; },
      nextSection() { 
        const thisIndex = this.guide.order.indexOf(this.sectionName);
        return this.guide.sections[thisIndex + 1];
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
