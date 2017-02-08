/*******************************************************************************
    Product page section
  *****************************************************************************/
theme.ProductImagesSlider = (function() {
  this.$sliderThumbs = null;
  this.$sliderImage = null;

  var classes = {
    thumbs: 'js-product-thumbs',
    image: 'js-product-image'
  };

  function productImagesSlider(el) {
    $wrapper = $(el);
    if ($wrapper.hasClass('product-images--single')) {
      return false;
    }
    var sliderId = $wrapper.attr('id');
    this.$sliderThumbs = $wrapper.find('.' + classes.thumbs);
    this.$sliderImage = $wrapper.find('.' + classes.image);
    this.thumbsSettings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: `#${sliderId} .${classes.image}`,
      dots: false,
      arrows: false,
      centerMode: false,
      focusOnSelect: true,
      vertical: true,
      verticalSwiping: true
    };
    this.imageSettings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true,
      asNavFor: `#${sliderId} .${classes.thumbs}`
    };

    var imageHeight = this.$sliderImage.height();
    this.$sliderThumbs.css({'max-height': `${imageHeight}px`});
    this.$sliderThumbs.slick(this.thumbsSettings);
    this.$sliderImage.slick(this.imageSettings);
  }

  return productImagesSlider;
})();

theme.sliders = {};

theme.ProductPageSection = (function() {

  function ProductPageSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var slider = this.slider = `#${sectionId}_images`;
    theme.sliders[slider] = new theme.ProductImagesSlider(slider);

    $('.product-images--single .product-images__image, .product-images__image li').each(function(idx, el) {
      var $img = $(el).find('img');
      $(el).zoom({ on: 'grab', url: $img.data('original') });
    });

  }

  return ProductPageSection;
})();

theme.ProductPageSection.prototype = _.extend({}, theme.ProductPageSection.prototype, {
  onUnload: function() {
    delete theme.sliders[this.slider];
  },
});
