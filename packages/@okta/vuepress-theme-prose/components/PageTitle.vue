<template>
  <div class="page-title">
    <h2 class="page-title--section" v-show="false">Not sure what goes here yet</h2>
    <h1 class="page-title--title">{{$page.title}}</h1>
    <div class="page-title--updated">
      <span class="updated-at">
        Last updated <span v-text=$page.lastUpdated></span> &mdash; 
        <a
          v-if=editLink
          id="edit-link"
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
          data-proofer-ignore
        >{{ editLinkText }}</a>
      </span>
    </div>
  </div>
</template>

<script>
  export const endingSlashRE = /\/$/
  export default {
    name: 'PageTitle',
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