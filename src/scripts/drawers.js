/*============================================================================
  Drawer modules
  - Docs http://shopify.github.io/Timber/#drawers
==============================================================================*/
theme.Drawers = (function () {
  var Drawer = function (id, position, options) {
    var defaults = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-' + position,
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + position
    };

    this.mobileBreakpoint = 1024;

    this.$nodes = {
      parent: $('body, html'),
      page: $('#page_container'),
      moved: $('.is-moved-by-drawer')
    };

    this.config = $.extend(defaults, options);
    this.position = position;

    this.$drawer = $('#' + id);

    if (!this.$drawer.length) {
      return false;
    }

    this.drawerIsOpen = false;
    this.init();
  };

  Drawer.prototype.init = function () {
    $(this.config.open).on('click', $.proxy(this.open, this));
    this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
    // public API for closing the drawer
    var _self = this;
    theme.closeCartDrawer = function() {
      _self.close();
    };
  };

  Drawer.prototype.open = function (evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // If drawer disabled for mobile, just go to cart page
    if ('{{ settings.ajax_cart_method }}' == 'page') { //  && theme.cache.$body.width() < this.mobileBreakpoint
      return true;
    }

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the drawer opens, the click event bubbles up to $nodes.page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.$activeSource = $(evt.currentTarget);
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }

    // Notify the drawer is going to open
    theme.cache.$body.trigger('beforeDrawerOpen.theme', this);

    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    this.$nodes.moved.addClass('is-transitioning');
    this.$drawer.prepareTransition();

    this.$nodes.parent.addClass(this.config.openClass + ' ' + this.config.dirOpenClass);
    this.drawerIsOpen = true;

    // Set focus on drawer
    if (theme.cache.$body.width() < this.mobileBreakpoint) {
      this.trapFocus(this.$drawer, 'drawer_focus');
    }

    // Run function when draw opens if set
    if (this.config.onDrawerOpen && typeof(this.config.onDrawerOpen) == 'function') {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'true');
    }

    // Lock scrolling on mobile
    this.$nodes.page.on('touchmove.drawer', function () {
      return false;
    });

    this.$nodes.page.on('click.drawer', $.proxy(function () {
      this.close();
      return false;
    }, this));

    // Notify the drawer has opened
    theme.cache.$body.trigger('afterDrawerOpen.theme', this);
  };

  Drawer.prototype.close = function () {
    if (!this.drawerIsOpen) { // don't close a closed drawer
      return;
    }

    // Notify the drawer is going to close
    theme.cache.$body.trigger('beforeDrawerClose.theme', this);

    // deselect any focused form elements
    $(document.activeElement).trigger('blur');

    // Ensure closing transition is applied to moved elements, like the nav
    this.$nodes.moved.prepareTransition({ disableExisting: true });
    this.$drawer.prepareTransition({ disableExisting: true });

    this.$nodes.parent.removeClass(this.config.dirOpenClass + ' ' + this.config.openClass);

    this.drawerIsOpen = false;

    // Remove focus on drawer
    this.removeTrapFocus(this.$drawer, 'drawer_focus');

    this.$nodes.page.off('.drawer');

    // Notify the drawer is closed now
    theme.cache.$body.trigger('afterDrawerClose.theme', this);
  };

  Drawer.prototype.trapFocus = function ($container, eventNamespace) {
    var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

    $container.attr('tabindex', '-1');

    $container.focus();

    $(document).on(eventName, function (evt) {
      if ($container[0] !== evt.target && !$container.has(evt.target).length) {
        $container.focus();
      }
    });
  };

  Drawer.prototype.removeTrapFocus = function ($container, eventNamespace) {
    var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

    $container.removeAttr('tabindex');
    $(document).off(eventName);
  };

  return Drawer;
})();

theme.drawersInit = function () {
  theme.DesktopLeftDrawer = new theme.Drawers('DesktopNavDrawer', 'desktop-left');
  theme.LeftDrawer = new theme.Drawers('NavDrawer', 'left');
  theme.RightDrawer = new theme.Drawers('CartDrawer', 'right', {
    'onDrawerOpen': ajaxCart.load
  });
  theme.cache.$body.on('beforeDrawerOpen.theme', function() {
    if (theme.LeftDrawer.drawerIsOpen) {
      theme.LeftDrawer.close();
    } else if(theme.RightDrawer.drawerIsOpen) {
      theme.RightDrawer.close();
    } else if(theme.DesktopLeftDrawer.drawerIsOpen) {
      theme.DesktopLeftDrawer.close();
    }
  });
};
