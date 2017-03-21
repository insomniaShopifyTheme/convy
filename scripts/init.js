theme.init = function () {
  FastClick.attach(document.body);
  theme.cacheSelectors();
  theme.drawersInit();
  theme.mobileNavInit();
  theme.loginForms();
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
  sections.register('collection-template', theme.CollectionTemplate);
  sections.register('contact-template', theme.ContactTemplate);
  sections.register('featured-product-section', theme.FeaturedProductSection);
});
