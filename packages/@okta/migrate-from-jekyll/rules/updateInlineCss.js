function udpateInlineCss(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }

  file.bodyLines.forEach((line, index) => {
    if (line.startsWith('{:')) {
      const currentLineIndex = index
      const targetIndex = index - 1

      const toAdd = line.replace('{:', '{')

      delete file.bodyLines[currentLineIndex]

      if(file.bodyLines[targetIndex].startsWith('#')) {
        file.bodyLines[targetIndex] = file.bodyLines[targetIndex] + ' ' + toAdd
      }

    }

  })

  return file

}

module.exports = udpateInlineCss
