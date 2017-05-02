/*******************************************************************************
    Contact Template section
  *****************************************************************************/

theme.ContactTemplate = (function() {
  function ContactTemplate(container) {
    var $container = $(container);
    theme.productCardsInit($container);
    theme.setupMap($container);
  }

  return ContactTemplate;
})();