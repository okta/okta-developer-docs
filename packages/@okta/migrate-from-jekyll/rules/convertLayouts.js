function convertLayouts(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  if( 'frontmatter' in file && file.frontmatter != undefined ) {
    if(file.origPath.includes('/_code/')) {
      file.frontmatter.component = 'Code'
    }
    delete file.frontmatter.layout
  }

  return file

}

module.exports = convertLayouts
