$(function() {

	var fixedNavHeight = 160;

	var linkify = function() {
		var anchorForId = function (id) {
			var anchor = document.createElement("a");
			anchor.className = "header-link";
			anchor.href      = "#" + id;
			anchor.innerHTML = "<i class=\"fa fa-link\"></i>";
			return anchor;
		};

		var linkifyAnchors = function (level, container) {

			var headers = container.getElementsByTagName("h" + level);
			for (var h = 0; h < headers.length; h++) {
				var header = headers[h];

				if (typeof header.id !== "undefined" && header.id !== "" && header.className.indexOf("no-link") !== 0) {
					header.appendChild(anchorForId(header.id), header);
				}
			}
		};

		var body = document.getElementById('docs-body');
		for (var level = 1; level <= 6; level++) {
			linkifyAnchors(level, body);
		}
	}();

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

			window.location.hash = this.hash;
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').scrollTop(target.offset().top - fixedNavHeight);
				return false;
			}
		}
	});

	if ($(location.href.split("#")[1])) {
		var anchor = location.href.split("#")[1];
		if (anchor) {
			var target = $('#' + anchor);
			if (target.length) {
				$('html,body').scrollTop(target.offset().top - fixedNavHeight);
			}
		}
	};



	/*!
	 * Scroll Lock v2.2.0
	 * https://github.com/MohammadYounes/jquery-scrollLock
	 *
	 * Copyright (c) 2016 Mohammad Younes
	 * Licensed under the MIT license.
	 */
	(function(n){typeof define=="function"&&define.amd?define(["jquery"],n):n(jQuery)})(function(n){"use strict";var t=function(i,r){this.$element=i;this.options=n.extend({},t.DEFAULTS,this.$element.data(),r);this.enabled=!0;this.startClientY=0;this.$element.on(t.CORE.wheelEventName+t.NAMESPACE,this.options.selector,n.proxy(t.CORE.handler,this));if(this.options.touch){this.$element.on("touchstart"+t.NAMESPACE,this.options.selector,n.proxy(t.CORE.touchHandler,this));this.$element.on("touchmove"+t.NAMESPACE,this.options.selector,n.proxy(t.CORE.handler,this))}},i;t.NAME="ScrollLock";t.VERSION="2.1.0";t.NAMESPACE=".scrollLock";t.ANIMATION_NAMESPACE=t.NAMESPACE+".effect";t.DEFAULTS={strict:!1,strictFn:function(n){return n.prop("scrollHeight")>n.prop("clientHeight")},selector:!1,animation:!1,touch:"ontouchstart"in window};t.CORE={wheelEventName:"onmousewheel"in window?"ActiveXObject"in window?"wheel":"mousewheel":"DOMMouseScroll",animationEventName:["webkitAnimationEnd","mozAnimationEnd","MSAnimationEnd","oanimationend","animationend"].join(t.ANIMATION_NAMESPACE+" ")+t.ANIMATION_NAMESPACE,handler:function(i){var r,s,h,o;if(this.enabled&&!i.ctrlKey&&(r=n(i.currentTarget),this.options.strict!==!0||this.options.strictFn(r))){i.stopPropagation();var f=r.scrollTop(),c=r.prop("scrollHeight"),l=r.prop("clientHeight"),e=i.originalEvent.wheelDelta||-1*i.originalEvent.detail||-1*i.originalEvent.deltaY,u=0;i.type==="wheel"?(s=r.height()/n(window).height(),u=i.originalEvent.deltaY*s):this.options.touch&&i.type==="touchmove"&&(e=i.originalEvent.changedTouches[0].clientY-this.startClientY);((h=e>0&&f+u<=0)||e<0&&f+u>=c-l)&&(i.preventDefault(),u&&r.scrollTop(f+u),o=h?"top":"bottom",this.options.animation&&setTimeout(t.CORE.animationHandler.bind(this,r,o),0),r.trigger(n.Event(o+t.NAMESPACE)))}},touchHandler:function(n){this.startClientY=n.originalEvent.touches[0].clientY},animationHandler:function(n,i){var r=this.options.animation[i],u=this.options.animation.top+" "+this.options.animation.bottom;n.off(t.ANIMATION_NAMESPACE).removeClass(u).addClass(r).one(t.CORE.animationEventName,function(){n.removeClass(r)})}};t.prototype.toggleStrict=function(){this.options.strict=!this.options.strict};t.prototype.enable=function(){this.enabled=!0};t.prototype.disable=function(){this.enabled=!1};t.prototype.destroy=function(){this.disable();this.$element.off(t.NAMESPACE);this.$element=null;this.options=null};i=n.fn.scrollLock;n.fn.scrollLock=function(i){return this.each(function(){var u=n(this),f=typeof i=="object"&&i,r=u.data(t.NAME);(r||"destroy"!==i)&&(r||u.data(t.NAME,r=new t(u,f)),typeof i=="string"&&r[i]())})};n.fn.scrollLock.defaults=t.DEFAULTS;n.fn.scrollLock.noConflict=function(){return n.fn.scrollLock=i,this}});

	$(document).ready(function() {

		var isMobile   = window.getComputedStyle(document.body,':before').content.includes("toc-mobile");
		var noToc      = $("html").hasClass("no-toc");
		var offset     = 140;
		var headerData = [];

		var $window    = $(window);
		var $body      = $('html, body');
		var $footer    = $('.Footer');
		var $header    = $('#header');
		var $page      = $('.PageContent');
		var $sidebar   = $('.Sidebar');
		var $content   = $('.PageContent-main');
		var $headers   = [];
		var $toc       = ($('.TableOfContents').length > 0 || noToc) ? $('.TableOfContents') : $('<div>').addClass('TableOfContents').appendTo($page);
		var $tocItems  = [];
		var $indicator = $('<div>').addClass('TableOfContents-indicator').appendTo($toc);

		// Unhide beta if necessary
		var query = window.location.search.substring(1);
		var params = query.split("&");
		for (i in params) {
			if (params[i].split('=')[0] === 'beta') {
				$('.beta').show();
				$('.hide-beta').hide();
			}
		}

		var buildTOC = function() {
			if (noToc) {
				return;
			}

			$toc.removeClass('TableOfContentsPreload');

			if (!$content.children('h1:first-child').length && $('.is-level1').length == 0) {
				var $menuItem = $('<div>');
				var text = document.title.split('|')[0].trim();

				$menuItem
					.data('level', 1)
					.addClass('TableOfContents-item')
					.addClass('is-level1')
					.text(text)
					.appendTo($toc);
			}

			// due to limited space for default TOC header add extra room for a wrapped title if it is longer than 50 characters
			if (document.title.length > 50) {
				$('.TableOfContents').addClass('large-header');
			}

			var $items   = $('h1, h2, h3, h4.api.api-operation, h4:not(.api), h5.api.api-operation, h5:not(.api), h6.api.api-operation, h6:not(.api)', $content);
			var pageEle  = $page[0];
			var pageRect = pageEle.getBoundingClientRect();

			$.each($items, function(index, value) {

				var $this = $items.eq(index);
				var level = ($this.prop('tagName').substr(1, 2) > 1) ? $this.prop('tagName').substr(1, 2) : 2;
				var text = $this.text();
				var thisEle = $this[0];
				var thisRect = thisEle.getBoundingClientRect();
				var sectionHeight = 0;
				var $menuItem;

				if (index < $items.length - 1) {
					var nextEle = $items.eq(index + 1)[0];
					var nextRect = nextEle.getBoundingClientRect();
					sectionHeight = nextRect.top - thisRect.top;
				} else {
					sectionHeight = pageRect.bottom - thisRect.top;
				}

				if (level == 1) {
					$menuItem = $('<div>');
				} else {
					$menuItem = $('<a>').attr('href', '#' + $this.attr('id'));
				}

				$menuItem
					.data('level', level)
					.addClass('TableOfContents-item')
					.addClass('is-level' + level)
					.text(text);

				$toc.append($menuItem);

				if (level > 1) {
					$menuItem.on('click', goToSection.bind($this[0]));

					if ($headers.length) {
						$headers = $headers.add($this);
						$tocItems = $tocItems.add($menuItem);
					} else {
						$headers = $this;
						$tocItems = $menuItem;
					}
				}

				headerData.push({
					'headerEle': $this[0],
					'menuItemEle': $menuItem[0],
					'height': sectionHeight
				});

			});

			$toc.append('<div class="TableOfContents-footer"><a href="#">Top of Page</a></div>');

		};

		var init = function() {

			$page.addClass('has-tableOfContents');
			// Defined in _sass/okta/components/_Sidebar.scss
			// See also: _source/_sass/okta/_/base/_variables.scss:66
			if (! isMobile) {
				$toc.scrollLock('enable');
			}
		};

		var goToSection = function() {
			$body.animate({
				scrollTop: $(this).offset().top - offset
			});
		};

		var onScroll = function() {

			for (var i = 0; i < headerData.length; i++) {
				var ele = headerData[i].headerEle;
				var rect = ele.getBoundingClientRect();

				if (rect.top > offset + ($window.height() - offset) / 2) {
					setActiveItem(i - 1);
					break;
				} else if (rect.bottom > offset) {
					setActiveItem(i);
					break;
				}
			}

			footerRect = $footer[0].getBoundingClientRect();

			if (footerRect.top < $window.height()) {
				$toc.css({
					'bottom': ($window.height() - footerRect.top) + 'px',
					'top': "auto"
				});
			} else {
				$toc.css({
					'bottom': 0,
					'top': "100px"
				})
			}

		};

		var setActiveItem = function(i) {

			if (! isMobile) {
				var $activeItem  = $($tocItems[i]);
				var thisLevel    = parseInt($activeItem.data('level'));
				var currentLevel = thisLevel;

				for (var j = i; j > 0; j--) {
					var $sibling = $($tocItems[j]);
					var siblingLevel = parseInt($sibling.data('level'));

					if (siblingLevel < currentLevel) {
						currentLevel = siblingLevel;
					}

					if (siblingLevel == currentLevel) {
						$sibling.css('display', 'block');
					} else {
						$sibling.hide();
					}
				}

				if (i < $tocItems.length - 1) {
					currentLevel = $($tocItems[i + 1]).data('level');

					for (var j = (i + 1); j < $tocItems.length; j++) {
						var $sibling = $($tocItems[j]);
						var siblingLevel = parseInt($sibling.data('level'));

						if (siblingLevel < currentLevel) {
							currentLevel = siblingLevel;
						}

						if (siblingLevel == currentLevel) {
							$sibling.css('display', 'block');
						} else {
							$sibling.hide();
						}
					}
				}

				var nextClasses = [];

				for (var i = $activeItem.data('level'); i > 0; i--) {
					nextClasses.push('.is-level' + i);
				}

				var $nextItem = $activeItem.nextAll(nextClasses.join(', ')).eq(0);

				var scrollTop = $toc.scrollTop();

				var firstEle = $tocItems[0];
				var firstRect = firstEle.getBoundingClientRect();

				var activeEle = $activeItem[0];
				var activeRect = activeEle.getBoundingClientRect();

				var tocEle = $toc[0];
				var tocRect = tocEle.getBoundingClientRect();

				var tocOffset = scrollTop + activeRect.top - tocRect.top - 60;

				var nextEle;
				var nextRect;
				var scale;
				var marginTop = 0;
				var indicatorOffset = (activeRect.top - firstRect.top);

				if ($nextItem.length) {
					nextEle = $nextItem[0];
					nextRect = nextEle.getBoundingClientRect();
					scale = (nextRect.top - activeRect.top);
				} else {
					scale = (activeRect.bottom - activeRect.top);
				}

				$indicator.css({
					'height': scale + 'px',
					'transform': 'translate(0, ' + indicatorOffset + 'px)'
				});

				$tocItems.removeClass('is-active');
				$activeItem.addClass('is-active');

				if (scrollTop != tocOffset) {
					$toc.scrollTop(tocOffset);
				}
			}
			else {
				// comment out to keep mobile TOC limited to level1 items visible only
				// or change selector to display/hide varying levels of depth
				$('.is-level2, .is-level3, .is-level4, .is-level5, .is-level6').css({'display':'block'});
			}
		};

		$(window).on('resize', function(){
			isMobile = window.getComputedStyle(document.body,':before').content.includes("toc-mobile");

			if (isMobile) {
				$toc.scrollLock('disable');
			}
			else {
				$toc.scrollLock('enable');
			}
		});
		$(window).on('scroll', onScroll);
		$(window).on('resize', onScroll);

		buildTOC();
		init();
		onScroll();

		if (window.location.hash) {
			$('html,body').scrollTop($(window.location.hash).offset().top - offset);
		}

	});
}());
