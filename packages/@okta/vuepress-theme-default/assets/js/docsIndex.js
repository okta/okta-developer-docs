(function($) {
  // Handle building the icons and code languages
  var codeLanguages = [
    { name: 'android', label: 'Android' },
    { name: 'angular', label: 'Angular' },
    { name: 'react',label: 'React' },
    { name: 'ios',  label: 'iOS' },
    { name: 'javascript', label: 'JavaScript' },
    { name: 'vue', label: 'Vue.js' },
    { name: 'go', label: 'Go' },
    { name: 'java', label: 'Java' },    
    { name: 'dotnet', label: '.NET' },
    { name: 'nodejs', label: 'Node.js' },
    { name: 'php', label: 'PHP' },
    { name: 'rest', label: 'REST' }
  ];

  function renderCodeLinks() {
    var flexBox = $('<div class="docs-page-tiles">');
    codeLanguages.forEach(function(language) {

      var icon = $('<i>', {
        class: 'icon docsPage code-' + language.name + '-32',
      });
      // Temporary until main dotnet page is set
      if (language.name == 'dotnet') {
        var link = $('<a>', {
          text: language.label,
          href: '/code/dotnet/aspnetcore/',
        });
      }else{
        var link = $('<a>', {
          text: language.label,
          href: '/code/' + language.name + '/',
        });
      }
      
      link.prepend($('<br />'));
      link.prepend(icon);
      flexBox.append(link);
    });

    $('#docs-languages').append(flexBox);
  }

  // Load documentation icons
  renderCodeLinks();
})(jQuery);
