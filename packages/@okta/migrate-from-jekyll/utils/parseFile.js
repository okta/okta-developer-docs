const fs = require("fs");
const { parseFrontmatter } = require("@vuepress/shared-utils")
const { read } = require('gray-matter')
module.exports = {
  parseFile: ((file, path) => {
    var allLines = file.split("\n");
    let frontmatter = []
    let bodyLines = []
    let inFrontmatter = false
    let frontmatterDone = false

    const { content, data } = parseFrontmatter(file)

    allLines.forEach(line => {
      if(line.startsWith('---') && path.endsWith('.md') && !line.includes('|')) {
        if(inFrontmatter && !frontmatterDone) {
          frontmatterDone = true
        }
        inFrontmatter = !inFrontmatter
        return
      }
      if(inFrontmatter && !frontmatterDone && path.endsWith('.md')) {
        let fmItems = line.split(":")

        if(fmItems[0] != '' && fmItems.length > 1) {
          frontmatter[fmItems[0]] = fmItems[1].trim()
        }
        return
      }

      bodyLines.push(line)

    })


    return {
      'origPath': path,
      'bodyLines': bodyLines,
      'frontmatter': data
    }


  })
}
