<template>
  <aside class="guides-navigation">
    Navigation amongst all guides
    <ul>
      <li v-for="guide in guides">
        <a :href="guide.link">{{guide.title}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
  import { findGuides } from '../util/guides';
  export default {
    name: 'GuidesNavigation',
    computed: { 
      guides() { 
        return findGuides({ pages: this.$site.pages });
      }
    },
  };
</script>


