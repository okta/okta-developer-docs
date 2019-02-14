function resolveRelativeLinks(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  file.bodyLines.forEach((line, index) => {
    if (line.includes('](') && line.includes('.html')) {
      if(!line.includes('](http')) {
        file.bodyLines[index] = line.replace('.html', '/')
      }
    }

  })

  return file

}

module.exports = resolveRelativeLinks
