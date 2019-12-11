<template>
  <li>
    <RouterLink :to="link.path || '#' + link.slug">
      {{link.title}}
      <ul v-if="link.children">
        <OnThisPageItem v-for="(childLink, index) in link.children" :key="index" :link="childLink" />
      </ul>
    </RouterLink>
  </li>
</template>

<script>
export default {
  name: 'OnThisPageItem',
  props: ['link'],
  components: {
    OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
  },
}
</script>