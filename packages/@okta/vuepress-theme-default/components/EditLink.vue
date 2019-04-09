<template>
  <a
    v-if=editLink
    id="edit-link"
    :href="editLink"
    target="_blank"
    rel="noopener noreferrer"
    data-proofer-ignore
  >{{ editLinkText }}</a>
</template>

<script>
  import { endingSlashRE } from '../util'
  export default {
    name: 'EditLink',
    computed: {
      editLink () {
        if (this.$page.frontmatter.editLink === false) {
          return
        }
        const {
          repo,
          editLinks,
          docsDir = '',
          docsBranch = 'master',
          docsRepo = repo
        } = this.$site.themeConfig.editLink
        if (docsRepo && editLinks && this.$page.regularPath) {
          return this.createEditLink(repo, docsRepo, docsDir, docsBranch, this.$page.regularPath)
        }
      },
      editLinkText () {
        return (
          this.$site.themeConfig.editLink.editLinkText
          || `Edit this page`
        )
      }
    },

    methods: {
      createEditLink (repo, docsRepo, docsDir, docsBranch, path) {

        return (
          `https://github.com/${docsRepo}`
          + `/edit`
          + `/${docsBranch}/`
          + (docsDir ? docsDir.replace(endingSlashRE, '') : '')
          + path
          + `/index.md`
        )
      }
    }
  }
</script>
