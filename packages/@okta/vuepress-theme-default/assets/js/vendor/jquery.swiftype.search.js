(function ($) {
  var queryParser = function (a) {
      var i, p, b = {};
      if (a === "") {
        return {};
      }
      for (i = 0; i < a.length; i += 1) {
        p = a[i].split('=');
        if (p.length === 2) {
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
      }
      return b;
    };
  $.queryParams = function () {
    return queryParser(window.location.search.substr(1).split('&'));
  };
  $.hashParams = function () {
    return queryParser(window.location.hash.substr(1).split('&'));
  };


  window.Swiftype = window.Swiftype || {};
  Swiftype.root_url = Swiftype.root_url || 'https://api.swiftype.com';
  Swiftype.pingUrl = function(endpoint, callback) {
    var to = setTimeout(callback, 350);
    var img = new Image();
    img.onload = img.onerror = function() {
      clearTimeout(to);
      callback();
    };
    img.src = endpoint;
    return false;
  };
  Swiftype.pingSearchResultClick = function (engineKey, docId, callback) {
    var params = {
      t: new Date().getTime(),
      engine_key: engineKey,
      doc_id: docId,
      q: Swiftype.currentQuery
    };
    var url = Swiftype.root_url + '/api/v1/public/analytics/pc?' + $.param(params);
    Swiftype.pingUrl(url, callback);
  };

  $.fn.swiftypeSearch = function (options) {
    var options = $.extend({}, $.fn.swiftypeSearch.defaults, options);

    return this.each(function () {
      var $this = $(this);
      var config = $.meta ? $.extend({}, options, $this.data()) : options;
      $this.data('swiftype-config-search', config);

      $this.selectedCallback = function (data) {
        return function (e) {
          var $el = $(this);
          e.preventDefault();
          Swiftype.pingSearchResultClick(config.engineKey, data['id'], function() {
            window.location = $el.attr('href');
          });
        };
      };

      $this.registerResult = function ($element, data) {
        $element.data('swiftype-item', data);
        $('a', $element).click($this.selectedCallback(data));
      };

      $this.getContentCache = function () {
        return $('#' + contentCacheId);
      };

      var $resultContainer = $(config.resultContainingElement),
        initialContentOfResultContainer = $resultContainer.html(),
        contentCacheId = 'st-content-cache',
        $contentCache = $this.getContentCache();

      var setSearchHash = function (query, page) {
          location.hash = "stq=" + encodeURIComponent(query) + "&stp=" + page;
        };

      var submitSearch = function (query, options) {
          options = $.extend({
            page: 1
          }, options);
          var params = {};

          if (!$contentCache.length) {
            $resultContainer.after("<div id='" + contentCacheId + "' style='display: none;'></div>");
            $contentCache.html(initialContentOfResultContainer).hide();
          }
          config.loadingFunction(query, $resultContainer);

          Swiftype.currentQuery = query;
          params['q'] = query;
          params['engine_key'] = config.engineKey;
          params['page'] = options.page;
          params['per_page'] = config.perPage;

          function handleFunctionParam(field) {
            if (field !== undefined) {
              var evald = field;
              if (typeof evald === 'function') {
                evald = evald.call();
              }
              return evald;
            }
            return undefined;
          }

          params['search_fields'] = handleFunctionParam(config.searchFields);
          params['fetch_fields'] = handleFunctionParam(config.fetchFields);
          params['filters'] = handleFunctionParam(config.filters);
          params['document_types'] = handleFunctionParam(config.documentTypes);
          params['functional_boosts'] = handleFunctionParam(config.functionalBoosts);
          params['sort_field'] = handleFunctionParam(config.sortField);
          params['sort_direction'] = handleFunctionParam(config.sortDirection);

          $.getJSON(Swiftype.root_url + "/api/v1/public/engines/search.json?callback=?", params).success(renderSearchResults);
        };

      $(window).hashchange(function () {
        var params = $.hashParams();
        if (params.stq) {
          submitSearch(params.stq, {
            page: params.stp
          });
        } else {
          var $contentCache = $this.getContentCache();
          if ($contentCache.length) {
            $resultContainer.html($contentCache.html());
            $contentCache.remove();
          }
        }
      });

      var $containingForm = $this.parents('form');
      if ($containingForm) {
        $containingForm.bind('submit', function (e) {
          e.preventDefault();
          var searchQuery = $this.val();
          setSearchHash(searchQuery, 1);
        });
      }

      $(document).on('click', '[data-hash][data-page]', function (e) {
        e.preventDefault();
        var $this = $(this);
        setSearchHash($.hashParams().stq, $this.data('page'));
      });

      var renderSearchResults = function (data) {
        if (typeof config.preRenderFunction === 'function') {
          config.preRenderFunction.call($this, data);
        }

        config.renderResultsFunction($this.getContext(), data);

        if (typeof config.postRenderFunction === 'function') {
          config.postRenderFunction.call($this, data);
        }
      };

      $this.getContext = function () {
        return {
          config: config,
          resultContainer: $resultContainer,
          registerResult: $this.registerResult
        };
      };

      $(window).hashchange(); // if the swiftype query hash is present onload (maybe the user is pressing the back button), submit a query onload
    });
  };

  var renderPagination = function (ctx, resultInfo) {
    var maxPagesType, maxPages = -1;
    $.each(resultInfo, function(documentType, typeInfo) {
      if (typeInfo.num_pages > maxPages) {
        maxPagesType = documentType;
        maxPages = typeInfo.num_pages;
      }
    });
    var currentPage = resultInfo[maxPagesType].current_page,
      totalPages = resultInfo[maxPagesType].num_pages;
    $(renderPaginationForType(maxPagesType, currentPage, totalPages)).appendTo(ctx.resultContainer);
  };

  var renderPaginationForType = function (type, currentPage, totalPages) {
      var pages = '<div class="st-page">',
        previousPage, nextPage;
      if (currentPage != 1) {
        previousPage = currentPage - 1;
        pages = pages + '<a href="#" class="st-prev" data-hash="true" data-page="' + previousPage + '">&laquo; previous</a>';
      }
      if (currentPage < totalPages) {
        nextPage = currentPage + 1;
        pages = pages + '<a href="#" class="st-next" data-hash="true" data-page="' + nextPage + '">next &raquo;</a>';
      }
      pages += '</div>';
      return pages;
    };

  var normalize = function (str) {
      return $.trim(str).toLowerCase();
    };

  function htmlEscape(str) {
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var defaultRenderResultsFunction = function (ctx, data) {
    var $resultContainer = ctx.resultContainer,
      config = ctx.config;

    $resultContainer.html('');

    $.each(data.records, function (documentType, items) {
      $.each(items, function (idx, item) {
        ctx.registerResult($(config.renderFunction(documentType, item)).appendTo($resultContainer), item);
      });
    });

    renderPagination(ctx, data.info);
  };

  var defaultRenderFunction = function (document_type, item) {
      return '<div class="st-result"><h3 class="title"><a href="' + item['url'] + '" class="st-search-result-link">' + htmlEscape(item['title']) + '</a></h3></div>';
    };

  var defaultLoadingFunction = function(query, $resultContainer) {
      $resultContainer.html('<p class="st-loading-message">loading...</p>');
    };

  var defaultPostRenderFunction = function(data) {
    var totalResultCount = 0;
    var $resultContainer = this.getContext().resultContainer;
    if (data['info']) {
      $.each(data['info'], function(index, value) {
        totalResultCount += value['total_result_count'];
      });
    }

    if (totalResultCount === 0) {
      $resultContainer.html("<div id='st-no-results' class='st-no-results'>No results found.</div>");
    }
  };

  $.fn.swiftypeSearch.defaults = {
    attachTo: undefined,
    documentTypes: undefined,
    filters: undefined,
    engineKey: undefined,
    searchFields: undefined,
    functionalBoosts: undefined,
    sortField: undefined,
    sortDirection: undefined,
    fetchFields: undefined,
    preRenderFunction: undefined,
    postRenderFunction: defaultPostRenderFunction,
    loadingFunction: defaultLoadingFunction,
    renderResultsFunction: defaultRenderResultsFunction,
    renderFunction: defaultRenderFunction,
    perPage: 10
  };
})(jQuery);
