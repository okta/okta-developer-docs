<template>
  <div>
    <Content v-for="page in changelogPages" :key="page.key" :pageKey="page.key"/>
  </div>
</template>

<script>
import _ from "lodash"
export default {
  computed: {
    changelogPages: function () {
      let pages = this.$site.pages
        .filter(pages => pages.path.startsWith("/docs/change-log/2"))

      return _.orderBy(pages, 'path').reverse()
    }
  },
  data: function () {
    return {}
  }
}

</script>


