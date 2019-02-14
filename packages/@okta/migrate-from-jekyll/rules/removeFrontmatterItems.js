function removeFrontmatterExtra(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  if( 'frontmatter' in file && file.frontmatter != undefined) {
    if( 'book_chapter' in file.frontmatter) {
      delete file.frontmatter.book_chapter
    }

    if( 'book_section' in file.frontmatter) {
      delete file.frontmatter.book_section
    }

    if( 'support_email' in file.frontmatter) {
      delete file.frontmatter.support_email
    }

    if( 'weight' in file.frontmatter) {
      delete file.frontmatter.weight
    }
  }

  return file

}

module.exports = removeFrontmatterExtra
