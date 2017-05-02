/*******************************************************************************
    Header section
  *****************************************************************************/

theme.HeaderSection = (function() {
  function HeaderSection(container) {
    var $container;
    this.$container = $container = this.$container = $(container);
    $container.find('ul.sf-menu').superfish({
      delay: 500,
      speed: 200,
    });
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