/*******************************************************************************
    Page Template section
  *****************************************************************************/

theme.PageTemplate = (function() {
  function PageTemplate(container) {
    var $container = $(container);
    theme.productCardsInit($container);
  }

  return PageTemplate;
})();