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

    if( line.includes('```php?start_inline=true') ) {
      line = line.replace('```php?start_inline=true', '```php')
    }

    if( line.includes('```chsarp') ) {
      line = line.replace('```chsarp', '```csharp')
    }

    if( line.includes('```jwt') ) {
      line = line.replace('```jwt', '```json')
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

    if( line.includes('{% include quickstart-coming-soon.html %}')) {
      line = 'Sorry! We\'re still working on this quickstart.\n' +
        '\n' +
        'Please check back soon or try our [Developer Forums](https://devforum.okta.com/)!'
    }

    if( line.includes('../resources/events#client-objecttype')) {
      line = line.replace('../resources/events#client-objecttype', '/docs/api/resources/events/#client-objecttype')
    }

    if( line.includes('{% include domain-admin-warning.html %}')) {
      line = line.replace('{% include domain-admin-warning.html %}', '<DomainAdminWarning />')
    }

    if( line.includes('/docs/guides/okta_sign-in_widget')) {
      line = line.replace('/docs/guides/okta_sign-in_widget', '/code/javascript/okta_sign-in_widget/')
    }

    if( line.includes('[Session API](sessions#create-session-with-session-token)')) {
      line = line.replace('[Session API](sessions#create-session-with-session-token)', '[Session API](/docs/api/resources/sessions#create-session-with-session-token)')
    }

    if( line.includes('[Enabling CORS](enabling_cors)')) {
      line = line.replace('[Enabling CORS](enabling_cors)', '[Enabling CORS](/docs/api/getting_started/enabling_cors/)')
    }

    if( line.includes('[OAuth 2.0 and OpenID Connect](/docs/api/resources/oauth2)')) {
      line = line.replace('[OAuth 2.0 and OpenID Connect](/docs/api/resources/oauth2)', '[OAuth 2.0 and OpenID Connect](/docs/api/resources/oauth2/)')
    }

    if( line.includes('[Error Codes](error_codes)')) {
      line = line.replace('[Error Codes](error_codes)', '[Error Codes](/reference/error_codes/)')
    }

    if( line.includes('(/docs/guides/saml_guidance)')) {
      line = line.replace('(/docs/guides/saml_guidance)', '(https://www.okta.com/integrate/documentation/saml/)')
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

      string += (`![${altTag.join(' ')}](/img/${imageString} \"${altTag.join(' ')}\")`)

      line = string
    }


  file.bodyLines[index] = line
  });

  return file

}

module.exports = alterMarkdownStrings
