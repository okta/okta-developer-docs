module.exports = {
  parseFrontmatterRedirects: ((file) => {
    let redirects = []
    if(file.origPath.endsWith('.md') && 'frontmatter' in file && file.frontmatter != undefined) {

      strippedFinalPath = file.finalPath.replace('../vuepress-site', '')
      strippedFinalPath = strippedFinalPath.replace('.md', '.html')

      if('redirect_to' in file.frontmatter) {
        redirects.push({'path': strippedFinalPath, 'redirect':file.frontmatter.redirect_to})
      }

      if('redirect_from' in file.frontmatter) {
        if(Array.isArray(file.frontmatter.redirect_from)) {
          file.frontmatter.redirect_from.forEach((from) => {
            redirects.push({'path': from, 'redirect':strippedFinalPath})
          })
        } else {
          redirects.push({'path': file.frontmatter.redirect_from, 'redirect':strippedFinalPath})
        }
      }

    }

    return redirects
  })
}
