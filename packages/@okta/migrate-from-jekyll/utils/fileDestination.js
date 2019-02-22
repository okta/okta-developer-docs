module.exports = {
  resolveFinalFileDestination: ((fileData, rootPath) => {
    let pathParts = fileData.origPath.split('/')
    pathParts.shift()
    pathParts.shift()

    pathParts.forEach((part, index) => {
      if( part.startsWith("_") && part.length > 1) {
        pathParts[index] = part.slice(1)
      }
    })

    if( pathParts[pathParts.length-1].endsWith('.md') && pathParts[pathParts.length-1].toLowerCase() != "index.md" ) {
      let fileParts = pathParts[pathParts.length-1].split('.md')
      fileParts.pop()
      pathParts[pathParts.length-1] = fileParts[0]
      pathParts.push("index.md")
    }


    return rootPath + '/' + pathParts.join('/')
  })
}
