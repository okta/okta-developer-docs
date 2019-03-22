<template>
  <aside class="in-guide-navigation">
    <ul>
      <li v-for="sec in sections">
        <a :href="sec.makeLink(lang)">{{sec.title}}</a>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'InGuideNavigation',
    props: [ 'sections', 'lang', 'section' ],
  };
</script>

