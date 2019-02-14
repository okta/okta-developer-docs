<template>
  <section class="PageContent DynamicSidebar" :class="{'has-tableOfContents': showToc}">
    <!-- Begin Sidebar -->
    <Sidebar />
    <!-- End Sidebar -->

    <!-- Begin Content -->
    <Content class="PageContent-main"/>
    <!-- End Content -->

    <!-- Begin Table Of Contents -->
    <TableOfContents v-if="showToc" class="TableOfContents" :items="toc"></TableOfContents>
    <!-- End Table Of Contents -->
  </section>
</template>

<script>
import { resolveHeaders } from '../util/index'
export default {
  components: {
    TableOfContents: () => import('./TableOfContents.vue'),
    Sidebar: () => import('./Sidebar.vue')
  },

  data() {
    return {
      toc: []
    }
  },
  mounted() {
    window.addEventListener("load", this.getAllHeaders)
  },
  computed: {
    showToc () {
      if (this.$page.frontmatter.showToc === false) {
        return false;
      }

      if (this.$page.path.includes('/code/')) {
        return false;
      }

      return true;
    }
  },
  methods: {
    getAllHeaders(event) {
      let headers = document.querySelectorAll('.PageContent-main>h1, .PageContent-main>h2, .PageContent-main>h3, .PageContent-main>h4.api.api-operation, .PageContent-main>h4:not(.api)')
      this.toc = Array.from(headers).map(header => {
        return  {
          level: header.localName.split('h')[1] == '1' ? '2': header.localName.split('h')[1],
          title: header.innerText,
          href: '#'+header.id,
          node: header,
          display: ''
        }
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('load', this.getAllHeaders);
  }
}
</script>
