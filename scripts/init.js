theme.init = function () {
  FastClick.attach(document.body);
  theme.cacheSelectors();
  theme.drawersInit();
  theme.mobileNavInit();
  theme.loginForms();
  theme.setupMap();
  theme.productCardInit();
  $('ul.sf-menu').superfish({
    delay: 500,
    speed: 200,
  });
};

$(theme.init);

$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('slider-section', theme.SliderSection);
  sections.register('product-template', theme.ProductPageSection);
});
