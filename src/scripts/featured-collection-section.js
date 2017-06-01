/*******************************************************************************
    Featured Collection section
  *****************************************************************************/

theme.FeaturedCollectionSection = (function() {
  function FeaturedCollectionSection(container) {
    var $container = $(container);
    theme.productCardsInit($container);

  }

  return FeaturedCollectionSection;
})();
