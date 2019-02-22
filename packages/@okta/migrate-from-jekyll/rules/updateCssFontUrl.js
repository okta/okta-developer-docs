function updateFontUrlInCss(file) {

  if(!file.origPath.endsWith('.scss')) {
    return file
  }


  file.bodyLines.forEach((line, index) => {
    if(line.includes('font_url(\'')) {
      line = line.replace('font_url(\'', 'url(\'/assets/fonts/')
    }
    file.bodyLines[index] = line
  })

  return file

}

module.exports = updateFontUrlInCss
