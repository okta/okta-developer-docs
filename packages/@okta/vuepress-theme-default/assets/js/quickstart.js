(function($) {
  /**
   * linkState
   *
   * This object defines the links that will appear, and serves as a state object once
   * the app begins.  If you need to add new libraries, add them to this object.  If
   * you need to change the default libraries, change the `default` states in this
   * object.
   *
   * `default` links will be selected by default. As the user navigates, the active
   * properties will be modified accordingly.
   */
  var linkState = {
    clients: [
      {
        name: 'okta-sign-in-page',
        label: 'Okta Sign-In Page',
        serverExampleType: 'auth-code',
        default: true
      },
      {
        name: 'widget',
        label: 'Okta Sign-In Widget',
        serverExampleType: 'implicit',
        codeIconName: 'javascript'
      },
      {
        name: 'angular',
        label: 'Angular',
        serverExampleType: 'implicit'
      },{
        name: 'react',
        label: 'React',
        serverExampleType: 'implicit'
      },
      {
        name: 'vue',
        label: 'Vue',
        serverExampleType: 'implicit'
      },
      {
        name: 'android',
        label: 'Android',
        serverExampleType: 'implicit'
      },
      {
        name: 'ios',
        label: 'iOS',
        serverExampleType: 'implicit'
      },
      {
        name: 'react-native',
        label: 'React Native',
        serverExampleType: 'implicit',
        codeIconName: 'react' // Placeholder until React-Native has been added
      }
    ],
    servers: [
      {
        default: true,
        name: 'nodejs',
        label: 'Node JS',
        frameworks: [
          {
            default: true,
            name: 'express',
            label: 'Express.js'
          },
          {
            name: 'generic',
            label: 'Generic Node'
          }
        ]
      },
      {
        name: 'java',
        label: 'Java',
        frameworks: [
          {
            name: 'spring',
            label: 'Spring',
            default: true
          },
          {
            name: 'generic',
            label: 'Generic Java'
          }
        ]
      },
      {
        name: 'php',
        label: 'PHP',
        frameworks: [
          {
            name: 'generic',
            label: 'Generic PHP',
            default: true
          }
        ]
      },
      {
        name: 'dotnet',
        label: '.NET',
        frameworks: [
          {
            name: 'aspnetcore',
            label: 'ASP.NET Core',
            default: true
          },
          {
            name: 'aspnet4',
            label: 'ASP.NET 4.x',
          }
        ]
      }
    ]
  }

  /**
   * Matches /client/server/framework
   */
  var urlExpression = '/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)';

  /**
   * Iterate through the link state, render buttons and setup click handlers
   */
  function renderLinks() {
    linkState.clients.forEach(function (client) {
      var link = $('<a>', {
        text: client.label,
        class: client.active ? 'active' : '',
        click: function () {
          linkState.clients.forEach(function (client) {
            client.link.removeClass('active');
            client.active = false;
          });
          $(this).addClass('active');
          client.active = true;
          applySelectionTuple(getSelectionTupleFromLinkSate());
        }
      });
      var listItem = $('<li>', {
        class: 'with-icon'
      });
      var icon = $('<i>', {
        class: 'icon code-' + (client.codeIconName || client.name) + '-32'
      });
      link.prepend(icon);
      listItem.append(link);
      client.link = link;
      $('#client-selector ul').append(listItem);
    });

    linkState.servers.forEach(function (server) {
      var link = $('<a>', {
        text: server.label,
        class: server.active ? 'active' : '',
        click: function () {
          linkState.servers.forEach(function (server) {
            server.link.removeClass('active');
              server.active = false;
          });
          renderFrameworkLinks(server);
          $(this).addClass('active');
          server.active = true;

          // Sets the first framework to active if one is not set
          var framework = server.frameworks.filter(function(fwork){
            return fwork.active == true;
          })[0] || server.frameworks[0];
          framework.active = true;

          applySelectionTuple(getSelectionTupleFromLinkSate());
        }
      });
      var listItem = $('<li>', {
        class: 'with-icon'
      });
      var icon = $('<i>', {
        class: 'icon code-' + server.name + '-32'
      });
      link.prepend(icon);
      listItem.append(link);
      server.link = link;
      $('#server-selector ul').append(listItem);
      if (server.active) {
        renderFrameworkLinks(server);
      }
    });

    function renderFrameworkLinks(server) {
      $('#framework-selector a').each(function (i, element) {
        $(element).remove();
      });

      server.frameworks.forEach(function (framework) {
        var link = $('<a>', {
          id: 'framework-' + framework.name,
          text: framework.label,
          class: framework.active ? 'active' : '',
          click: function () {
            server.frameworks.forEach(function (framework) {
              framework.link.removeClass('active');
              framework.active = false;
            });
            $(this).addClass('active');
            framework.active = true;
            applySelectionTuple(getSelectionTupleFromLinkSate());
          }
        });
        framework.link = link;
        $('#framework-selector ul').append(link);
      });
    }
  }

  /**
   * Fetches the content for a given selection tuple
   */
  function loadContent(clientName, server, framework) {
    var client = linkState.clients.filter(function (client) {
      return client.name === clientName;
    })[0];
    var clientContentUrl = '/quickstart-fragments/' + clientName + '/default-example';
    var serverContentUrl = '/quickstart-fragments/' + server + '/' + framework + '-' + client.serverExampleType;

    $.ajax({
      url: clientContentUrl
    }).done(function( html ) {
      $('#client_content').html(html);

      // Re-run domain replacement now that content has changed. Defined in myOkta.js.
      window.getMyOktaAccounts();
    });
    $.ajax({
      url: serverContentUrl
    }).done(function (html) {
      $('#server_content').html( html );

      // Re-run domain replacement now that content has changed. Defined in myOkta.js.
      window.getMyOktaAccounts();

      // Set the framework to active
      document.getElementById('framework-' + framework).setAttribute('class', 'active');
    });
  };

  /**
   * Get the active selections from the window hash
   *
   * @returns [clientName, serverName, frameworkName]
   */
  function getSelectionTupleFromHash() {
    var matches = window.location.hash.match(urlExpression);
    var clientName = matches && matches[1];
    var serverName = matches && matches[2];
    var frameworkName = matches && matches[3];
    return [clientName, serverName, frameworkName];
  }

  /**
   * Get the active selections from the link sate
   *
   * @returns [clientName, serverName, frameworkName]
   */
  function getSelectionTupleFromLinkSate() {
    var tuple = [];
    linkState.clients.forEach(function (client) {
      if (client.active) {
        tuple.push(client.name);
      }
    });
    linkState.servers.forEach(function (server) {
      if (server.active) {
        tuple.push(server.name)
        server.frameworks.forEach(function (framework) {
          if (framework.active) {
            tuple.push(framework.name)
          }
        });
      }
    });
    return tuple;
  }

  /**
   * Apply a selection tuple to the application state (set new window hash and load content)
   */
  function applySelectionTuple(selectionTuple) {
    window.location.replace('#/' + selectionTuple.join('/'));
    loadContent.apply(null, selectionTuple);
    if (window.ga) {
      window.ga('set', 'page', window.location.pathname + window.location.hash);
      window.ga('send', 'pageview');
    }
  }

  /**
   * Apply a selection tuple to the link state (will modify `active` properties)
   */
  function applySelectionTupleToLinkSate(selectionTuple) {
    var activeClient = selectionTuple[0];
    var activeServer = selectionTuple[1];
    var activeFramework = selectionTuple[2];

    linkState.clients.forEach(function (client) {
      client.active = client.name === activeClient;
    });
    linkState.servers.forEach(function (server) {
      server.active = server.name === activeServer;
      server.frameworks.forEach(function (framework) {
        framework.active = framework.name === activeFramework;
      });
    });
  }

  function getDefaultClient(serverName) {
    return linkState.clients.filter(function (client) {
      return client.default;
    })[0];
  }

  function getDefaultServer(serverName) {
    return linkState.servers.filter(function (server) {
      return server.default;
    })[0];
  }

  function getDefaultFrameworkForServer(serverName) {
    var server = linkState.servers.filter(function (server) {
      return server.name == serverName;
    })[0];
    if (!server) {
      return
    }
    var defaultFramework = server.frameworks.filter(function (framework) {
      return framework.default === true;
    })[0];
    return defaultFramework;
  }


  /**
   * Begin application.  Fetch default selections from link state, and current
   * selections from window hash.  Window hash overrides default link state.
   */
  function main() {
    var hashTuple = getSelectionTupleFromHash();
    var defaultClient = getDefaultClient();
    var defaultServer = getDefaultServer();
    var defaultFramework = getDefaultFrameworkForServer(hashTuple[1] || defaultServer.name);
    var initialTuple = [
      hashTuple[0] || defaultClient.name,
      hashTuple[1] || defaultServer.name,
      hashTuple[2] || defaultFramework.name
    ];

    applySelectionTupleToLinkSate(initialTuple);
    renderLinks();
    applySelectionTuple(initialTuple);
    $('#account_link').addClass('active');
  }

  // Used to scroll to the right place without anchors, 150 is to account for our header space
  window.scrollToAccount = function () {
    $('html, body').animate({scrollTop: $('#account').offset().top - 150});
    $('#account_link').addClass('active');
    $('#client_setup_link').removeClass('active');
    $('#server_setup_link').removeClass('active');
  };
  window.scrollToServer = function () {
    $('html, body').animate({scrollTop: $('#server_setup').offset().top - 150});
    $('#server_setup_link').addClass('active');
    $('#client_setup_link').removeClass('active');
    $('#account_link').removeClass('active');
  };
  window.scrollToClient = function () {
    $('html, body').animate({scrollTop: $('#client_setup').offset().top - 150});
    $('#client_setup_link').addClass('active');
    $('#server_setup_link').removeClass('active');
    $('#account_link').removeClass('active');
  };

  // Load the quickstart partials
  main();

})(jQuery);
