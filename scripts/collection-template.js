/*******************************************************************************
    Collection Template section
  *****************************************************************************/

theme.CollectionTemplate = (function() {
  function CollectionTemplate(container) {
    var $container = $(container);
    theme.productCardsInit($container);
  }

  return CollectionTemplate;
})();
