

/*******************************************************************************
    Slider section
  *****************************************************************************/

theme.Slider = (function() {
  this.$slider = null;
  var classes = {
    wrapper: 'slider-wrapper',
    slider: 'slider',
    currentSlide: 'slick-current'
  };

  function slider(el, $container) {
    this.$slider = $(el);
    this.$wrapper = this.$slider.closest('.' + classes.wrapper);
    this.$pause = this.$wrapper.find('.' + classes.pauseButton);

    var fullWidth = this.$slider.data('content-slider');

    this.settings = {
      dots: !!this.$slider.data('slider-dots'),
      fade: this.$slider.data('slider-effect') == 'fade',
      speed: 500,
      infinite: true,
      speed: 300,
      slidesToShow: fullWidth ? 1 : 4,
      slidesToScroll: fullWidth ? 1 : 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: fullWidth ? 1 : 3,
            slidesToScroll: fullWidth ? 1 : 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: fullWidth ? 1 : 2,
            slidesToScroll: fullWidth ? 1 : 2
          }
        }
      ]
    };

    this.$slider.slick(this.settings);
    theme.productCardsInit(this.$wrapper);

    // When there are less than 4 items in featured products section
    // we display simple grid. Inititalize product cards for it too:
    var $productGrid = $container.find('.no-slider--grid');
    if ($productGrid.length > 0) {
      theme.productCardsInit($productGrid);
    }
  }

  return slider;
})();

theme.sliders = {};

theme.SliderSection = (function() {
  function SliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var slider = this.slider = '#slider_' + sectionId;
    theme.sliders[slider] = new theme.Slider(slider, $container);
  }

  return SliderSection;
})();

theme.SliderSection.prototype = _.extend({}, theme.SliderSection.prototype, {
  onUnload: function() {
    delete theme.sliders[this.slider];
  },

  onBlockSelect: function(evt) {
    var $slider = $(this.slider);

    // Ignore the cloned version
    var $slide = $('.slider__slide--' + evt.detail.blockId + ':not(.slick-cloned)');
    var slideIndex = $slide.data('slick-index');

    // Go to selected slide, pause autoplay
    $slider.slick('slickGoTo', slideIndex).slick('slickPause');
  },

  onBlockDeselect: function() {
    // Resume autoplay
    $(this.slider).slick('slickPlay');
  }
});
