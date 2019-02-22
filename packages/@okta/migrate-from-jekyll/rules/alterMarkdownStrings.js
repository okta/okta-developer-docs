function alterMarkdownStrings(file) {

  if(!file.origPath.endsWith('.md')) {
    return file
  }


  file.bodyLines.forEach((line, index) => {
    // convert changelog support to markdown line
    if( line.includes('{{site.contact_support_lc}}') ) {
      line = line.replace('{{site.contact_support_lc}}', 'contact [Support](https://support.okta.com/help/open_case)')
    }

    if( line.includes('{{site.contact_support_uc}}') ) {
      line = line.replace('{{site.contact_support_uc}}', 'Contact [Support](https://support.okta.com/help/open_case)')
    }

    if( line.includes('~~~') ) {
      line = line.replace('~~~', '```')
    }

    if( line.includes('<your-org>') ) {
      line = line.replace('<your-org>', '{yourOktaDomain}')
    }

    if( line.includes('<authorization-server-ID>') ) {
      line = line.replace('<authorization-server-ID>', '{authorization-server-ID}')
    }

    if( line.includes('```sh') ) {
      line = line.replace('```sh', '```bash')
    }

    if( line.includes('```~') ) {
      line = line.replace('```~', '```')
    }

    if( line.includes('```shell') ) {
      line = line.replace('```shell', '```bash')
    }

    if( line.includes('``` shell') ) {
      line = line.replace('``` shell', '```bash')
    }

    if( line.includes('``` sh') ) {
      line = line.replace('``` sh', '```bash')
    }

    if( line.includes('~~~ shell') ) {
      line = line.replace('~~~ shell', '```bash')
    }

    if( line.includes('<%= ') ) {
      line = line.replace('<%= ', '{')
    }

    if( line.includes(' %>') ) {
      line = line.replace(' %>', '}')
    }

    if( line.includes('<script async src="//platform.twitter.com/widgets.js"') ) {
      line = ""
    }

    if( line.includes('<script>location=') ) {
      line = ""
    }

    if( line.includes('[Social Login](social_authentication.html)') ) {
      line = line.replace('[Social Login](social_authentication.html)', '[Social Login](/authentication-guide/social-login/)')
    }

    if( line.includes('[Dynamic Client Registration API](oauth-clients.html)') ) {
      line = line.replace('[Dynamic Client Registration API](oauth-clients.html)', '[Dynamic Client Registration API](/docs/api/resources/oauth-clients/)')
    }

    if( line.includes('[idp](idps.html)') ) {
      line = line.replace('[idp](idps.html)', '[idp](/docs/api/resources/idps/)')
    }

    if( line.includes('[Okta has helper libraries](/code/)') ) {
      line = line.replace('[Okta has helper libraries](/code/)', '[Okta has helper libraries](/documentation/)')
    }

    if( line.includes('/use_cases/api_security') ) {
      line = line.replace('/use_cases/api_security', '/use_cases/api_access_management/')
    }

    if( line.includes('[Authentication API](authn.html)') ) {
      line = line.replace('[Authentication API](authn.html)', '[Authentication API](/docs/api/resources/authn/)')
    }

    if( line.includes('<HTTP://MATHIASBYNENS.BE/>') ) {
      line = line.replace('<HTTP://MATHIASBYNENS.BE/>', '')
    }

    if( line.includes('{{ page.support_email }}') ) {
      line = line.replace(/{{ page.support_email }}/g, 'developers@okta.com')

    }


    // convert image to markdown image
    // ![alt text](image.png "Logo Title Text 1")
    if( line.includes('{% img') && line.includes('%}')) {
      let lineParts = line.split('{:')
      lineParts = lineParts[0].split(' ')
      let inImageTag = false
      let inAltTag = false
      let imageString = ""
      let altTag = []
      let string = ""

      lineParts.forEach((item, index) => {
        if(item !== '{%' && !inImageTag) {
          string += item
        }

        if(inImageTag === true) {
          if(item === "img") {
            return
          }

          if(new RegExp(['.png', '.jpg', '.jpeg', '.gif', '.svg'].join("|")).test(item)) {
            imageString = item
          }

          if(inAltTag === true && item !== '%}') {
            if( item.endsWith('"')) {
              let items = item.split('"')
              altTag.push(items[0])
              return
            }
            altTag.push(item)
          }

          if(item.startsWith('alt:')) {
            let altParts = item.split('alt:"')
            altTag.push(altParts[1])
            inAltTag = !inAltTag
          }

        }

        if(item === '{%') {
          inImageTag = !inImageTag
        }

        if(item === '%}') {
          inImageTag = !inImageTag
        }


      })

      string += (`![${altTag.join(' ')}](/assets/img/${imageString} \"${altTag.join(' ')}\")`)

      line = string
    }


  file.bodyLines[index] = line
  });

  return file

}

module.exports = alterMarkdownStrings
