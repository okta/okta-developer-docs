function convertLayouts(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  if( 'frontmatter' in file && file.frontmatter != undefined ) {
    delete file.frontmatter.layout
  }

  return file

}

module.exports = convertLayouts
