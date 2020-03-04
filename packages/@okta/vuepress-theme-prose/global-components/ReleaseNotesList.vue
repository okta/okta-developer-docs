<template>
  <div>
    <Content v-for="page in releaseNotesPages" :key="page.key" :pageKey="page.key"/>
  </div>
</template>

<script>
import _ from "lodash"
export default {
  computed: {
    releaseNotesPages: function () {
      let pages = this.$site.pages
        .filter(pages => pages.path.startsWith("/docs/release-notes/2"))

      return _.orderBy(pages, 'path').reverse()
    }
  },
  data: function () {
    return {}
  }
}

</script>


