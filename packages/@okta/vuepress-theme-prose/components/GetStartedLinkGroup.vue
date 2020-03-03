<template>
  <div class="get-started--link-group">
    <h2 v-if=section.link><a :href=section.link>{{section.title}}</a></h2>
    <h2 v-else>{{section.title}}</h2>
    <p>{{section.description}}</p>
    <ul>
      <li v-for="(link, i) in section.links" :key="i">
        <a :href="link.link">{{link.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'GetStartedLinkGroup',
    props: ['section']
  }
</script>

<style scoped>
  ul {
    margin: 1.5rem 0 0;
    padding: 0;
    list-style-type: none;
    font-size: 18px;
  }
  ul li {
    margin-bottom: 0.75rem;
  }
</style>
