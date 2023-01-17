<template>
  <Content :class="{'display-inline': inline }" :pageKey="sharedComponentKey"></Content>
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
  .display-inline {
    display: inline;
  }
</style>