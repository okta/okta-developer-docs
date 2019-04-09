<template>
  <div class="guide-details">
    <GuidesNavigation
      :sectionName="sectionName"
      :framework="framework"
      :guideName="guideName" 
    />
    <Content :pageKey="componentKey" id="guide_content" />
  </div>
</template>

<script>
  import { getGuidesInfo } from '../util/guides';
  export default {
    name: 'GuideDetails',
    props: [ 'guideName', 'framework', 'sectionName' ],
    computed: { 
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

