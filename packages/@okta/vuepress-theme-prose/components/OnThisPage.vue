<template>
  <aside style="position:fixed;">
    <div class="title">On This Page</div>
    <div>
      <ul class="links">
        <OnThisPageItem v-for="(link, index) in $page.fullHeaders[0].children" :link="link" :key="index" />
      </ul>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'OnThisPage',
    components: {
      OnThisPageItem: () => import('../components/OnThisPageItem.vue'),
    },
    data() {
      return {

      }
    }
  }
</script>