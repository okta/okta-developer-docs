module.exports = {
  resolveFinalFileDestination: ((fileData, rootPath) => {
    let pathParts = fileData.origPath.split('/')
    pathParts.shift()
    pathParts.shift()

    if(rootPath.endsWith('/')) {
      rootPath = rootPath.slice(0, -1)
    }

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

    if(pathParts[0] == 'assets' && (pathParts[1] == 'img' || pathParts[1] == 'fonts')) {
      pathParts.shift()
    }

    return rootPath + '/' + pathParts.join('/')
  })
}
