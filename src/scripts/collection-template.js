/*******************************************************************************
    Collection Template section
  *****************************************************************************/

theme.CollectionTemplate = (function() {
  function CollectionTemplate(container) {
    var $container = $(container);
    theme.productCardsInit($container);

    $container.find('.collection-filter__items--tags input').change(this.filterUpdate.bind(this));
  }

  return CollectionTemplate;
})();

theme.CollectionTemplate.prototype = _.extend({}, theme.CollectionTemplate.prototype, {

  filterUpdate: function(e) {
    var $filterLink = $(e.target).parent().find('a');
    window.location = $filterLink.prop('href');
  },

});