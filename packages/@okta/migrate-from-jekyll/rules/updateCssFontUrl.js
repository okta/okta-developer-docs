function updateFontUrlInCss(file) {

  if(!file.origPath.endsWith('.scss')) {
    return file
  }


  file.bodyLines.forEach((line, index) => {
    if(line.includes('font_url(\'')) {
      line = line.replace('font_url(\'', 'url(\'/fonts/')
    }
    file.bodyLines[index] = line


    if(line.includes('url(\'/assets/fonts/')) {
      line = line.replace('url(\'/assets/fonts/', 'url(\'/fonts/')
    }
    file.bodyLines[index] = line
  })

  return file

}

module.exports = updateFontUrlInCss
