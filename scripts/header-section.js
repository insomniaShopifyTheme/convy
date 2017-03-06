/*******************************************************************************
    Header section
  *****************************************************************************/

theme.HeaderSection = (function() {
  function HeaderSection(container) {
    var $container = this.$container = $(container);
    $('ul.sf-menu').superfish({
      delay: 500,
      speed: 200,
    });
  }

  return HeaderSection;
})();
