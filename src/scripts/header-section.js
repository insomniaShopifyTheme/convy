/*******************************************************************************
    Header section
  *****************************************************************************/
;( function( window ) {
	
	'use strict';

	var document = window.document;

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function cbpHorizontalSlideOutMenu( el, options ) {	
		this.el = el;
		this.options = extend( this.defaults, options );
		this._init();
	}

	cbpHorizontalSlideOutMenu.prototype = {
		defaults : {},
		_init : function() {
			this.current = -1;
			this.touch = Modernizr.touch;
			this.menu = this.el.querySelector( '.cbp-hsmenu' );
			this.menuItems = this.el.querySelectorAll( '.cbp-hsmenu > li' );
			this.menuBg = document.createElement( 'div' );
			this.menuBg.className = 'cbp-hsmenubg';
			this.el.appendChild( this.menuBg );
			this._initEvents();
		},
		_openMenu : function( el, ev ) {

			var self = this,
				item = el.parentNode,
				items = Array.prototype.slice.call( this.menuItems ),
				submenu = item.querySelector( '.cbp-hssubmenu' ),
				closeCurrent = function( current ) {
					var current = current || self.menuItems[ self.current ];
					current.className = '';
					current.setAttribute( 'data-open', '' );	
				},
				closePanel = function() {
					self.current = -1;
					self.menuBg.style.height = '0px';
				};

			//workaround to center the product menu
			var offsetLeft = $(submenu).offset().left;
			$(submenu).css('margin-left', -offsetLeft);

			if( submenu ) {

				ev.preventDefault();

				if( item.getAttribute( 'data-open' ) === 'open' ) {
					closeCurrent( item );
					closePanel();
				}
				else {
					item.setAttribute( 'data-open', 'open' );
					if( self.current !== -1 ) {
						closeCurrent();
					}
					self.current = items.indexOf( item );
					item.className = 'cbp-hsitem-open';
					self.menuBg.style.height = submenu.offsetHeight + 'px';
				}
			}
			else {
				if( self.current !== -1 ) {
					closeCurrent();
					closePanel();
				}
			}

		},
		_initEvents : function() {
			
			var self = this;

			Array.prototype.slice.call( this.menuItems ).forEach( function( el, i ) {
				var trigger = el.querySelector( 'a' );
				if( self.touch ) {
					trigger.addEventListener( 'touchstart', function( ev ) { self._openMenu( this, ev ); } );
				}
				else {
					trigger.addEventListener( 'click', function( ev ) { self._openMenu( this, ev ); } );	
				}
			} );
			
			window.addEventListener( 'resize', function( ev ) { self._resizeHandler(); } );

		},
		_resizeHandler : function() {
			var self = this;
			function delayed() {
				self._resize();
				self._resizeTimeout = null;
			}

			if ( this._resizeTimeout ) {
				clearTimeout( this._resizeTimeout );
			}

			this._resizeTimeout = setTimeout( delayed, 50 );
		},
		_resize : function() {
			if( this.current !== -1 ) {
				this.menuBg.style.height = this.menuItems[ this.current ].querySelector( '.cbp-hssubmenu' ).offsetHeight + 'px';
			}
		}
	}

	window.cbpHorizontalSlideOutMenu = cbpHorizontalSlideOutMenu;

} )( window );
theme.HeaderSection = (function() {
  function HeaderSection(container) {
    var $container;
    var menu_type;
    this.$container = $container = this.$container = $(container);
    menu_type = $container.data("menu-type");
    if(menu_type == "text-menu") {
      $container.find('ul.sf-menu').superfish({
        delay: 500,
        speed: 200,
      });
    } else {
		  var menu = new cbpHorizontalSlideOutMenu( document.getElementById( 'cbp-hsmenu-wrapper' ) );
    }
    $container.find('.js-expand-search').on('click', this._toggleSearchField.bind(this));
    var _self = this;
    $container.find('.header-search').on('keyup', function(e) {
      if (e.key === "Escape") {
        _self._toggleSearchField();
      }
    });
  }

  HeaderSection.prototype = _.extend({}, HeaderSection.prototype, {

	_toggleSearchField: function() {
		$search = this.$container.find(".header-search");
		if ($search.hasClass('header-search--active')) {
			$search.removeClass('header-search--active');
		} else {
			$search.addClass('header-search--active');
			$search.find('input').focus();
		}
	},

	onUnload: function() {
		this.cleanUp();
	},

	cleanUp: function() {}

  });

  return HeaderSection;
})();