theme.init = function () {
  FastClick.attach(document.body);
  theme.cacheSelectors();
  theme.drawersInit();
  theme.mobileNavInit();
  theme.loginForms();
  theme.setupMap();
  theme.productCardInit();
};

// Blog: filter by tag
(function() {
  var $filterBy = $('#BlogTagFilter');
  if (!$filterBy.length) {
    return;
  }
  $filterBy.on('change', function() {
    location.href = $(this).val();
  });
})();

$(theme.init);

$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('header-section', theme.HeaderSection);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('slider-section', theme.SliderSection);
  sections.register('product-template', theme.ProductPageSection);
});
