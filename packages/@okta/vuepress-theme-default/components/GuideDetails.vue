<template>
  <div class="guide-details">
    <GuidesNavigation
      :sectionName="sectionName"
      :framework="framework"
      :guideName="guideName" 
    />
    <div id="guide_content">
      <h1>{{ section.title }}</h1>
      <Content :pageKey="componentKey"/>
    </div>
  </div>
</template>

<script>
  import { getGuidesInfo } from '../util/guides';
  export default {
    name: 'GuideDetails',
    props: [ 'guideName', 'framework', 'sectionName' ],
    computed: { 

      guide() { 
        return getGuidesInfo({ pages: this.$site.pages }).byName[this.guideName];
      },

      section() { 
        const section = this.guide.sectionByName[this.sectionName];
        return section;
      },
      componentKey() { 
        const guides = getGuidesInfo({ pages: this.$site.pages });
        return guides.byName[this.guideName].sectionByName[this.sectionName].componentKey;
      },
    },
    components: {
      GuidesNavigation: () => import('../components/GuidesNavigation.vue'),
    },
  }
</script>

