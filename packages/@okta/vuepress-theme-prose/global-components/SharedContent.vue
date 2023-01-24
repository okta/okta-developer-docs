<template>
  <Content
    :class="{'display-inline-shared-content': inline }"
    :page-key="sharedComponentKey"
  />
</template>
  
<script>
  import { getSharedContentInfo } from '../util/sharedContent';
  import _ from 'lodash';

  const DEFAULT_CONTENT = 'fallback';

  export default {
    name: 'SharedContent',
    props: {
      contentName: {
        type: String,
        required: true,
      },
      inline: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      sharedComponent() {
        return getSharedContentInfo({pages: this.$site.pages}).byName[this.contentName];
      },
      fallbackSharedComponent() {
        return getSharedContentInfo({pages: this.$site.pages}).byName[DEFAULT_CONTENT];
      },
      sharedComponentKey() {
        return this.sharedComponent?.componentKey || this.fallbackSharedComponent.componentKey;
      },
    },
  };
</script>
<style scoped lang="scss">
  .display-inline-shared-content {
    display: inline;
  }
  .display-inline-shared-content > div,
  .display-inline-shared-content::v-deep p {
    display: inline;
  }
</style>