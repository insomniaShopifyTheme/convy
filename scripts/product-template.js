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

theme.ProductPageSection = (function() {

  function ProductPageSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');

    this.theProduct = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);

    this.settings = {
      sectionId: sectionId,
      enableHistoryState: $container.data('enable-history-state') || false,
    };

    this.selectors = {
      originalSelectorId: '#ProductSelect-' + sectionId,
      singleOptionSelector: '.single-option-selector-' + sectionId,
      addToCart: '#AddToCart-' + sectionId,
      addToCartText: '#AddToCartText-' + sectionId,
      productPrices: '.product-info__price',
      originalPrice: '.product-price__price',
      comparePrice: '.product-price__old',
      discountPercent: '.product-price__percent',
      salePriceWrapper: '.product-price__sale',
      SKU: '.variant-sku',
    }

    // Thumbs & Slider
    var slider = this.slider = `#${sectionId}_images`;
    theme.sliders[slider] = new theme.ProductImagesSlider(slider);

    // Zoom image
    $('.product-images--single .product-images__image, .product-images__image li').each(function(idx, el) {
      var $img = $(el).find('img');
      $(el).zoom({ on: 'grab', url: $img.data('original') });
    });

    this._initVariants();
  }

  return ProductPageSection;
})();

theme.ProductPageSection.prototype = _.extend({}, theme.ProductPageSection.prototype, {
  onUnload: function() {
    delete theme.sliders[this.slider];
  },

  _initVariants: function() {
    var options = {
      $container: this.$container,
      enableHistoryState: this.$container.data('enable-history-state') || false,
      singleOptionSelector: this.selectors.singleOptionSelector,
      originalSelectorId: this.selectors.originalSelectorId,
      product: this.theProduct
    };

    this.variants = new theme.Variants(options);

    this.$container.on('variantChange', this._updateAddToCart.bind(this));
    this.$container.on('variantImageChange', this._switchImage.bind(this));
    this.$container.on('variantPriceChange', this._updatePrice.bind(this));
    this.$container.on('variantSKUChange', this._updateSKU.bind(this));
  },

  _updateAddToCart: function(evt) {
    var variant = evt.variant;

    if (variant) {
      this.$container.find(this.selectors.productPrices).removeClass('visibility-hidden');

      if (variant.available) {
        $(this.selectors.addToCart).prop('disabled', false);
        $(this.selectors.addToCartText).text(backend.strings.addToCart);
      } else {
        $(this.selectors.addToCart).prop('disabled', true);
        $(this.selectors.addToCartText).text(backend.strings.soldOut);
      }
    } else {
      // The variant doesn't exist
      $(this.selectors.addToCart).prop('disabled', true);
      $(this.selectors.addToCartText).text(backend.strings.unavailable);
      this.$container.find(this.selectors.productPrices).addClass('visibility-hidden');
    }
  },

  _switchImage: function(evt) {
    var variant = evt.variant;
    var $productImagesSlider = theme.sliders[this.slider];
    $productImagesSlider.$sliderImage.slick('slickGoTo', variant.featured_image.position - 1);
  },

  _updatePrice: function(evt) {
    var variant = evt.variant;

    // Update the product price
    this.$container.find(this.selectors.originalPrice).html(theme.Currency.formatMoney(variant.price, backend.moneyFormat));

    // Update and show the product's compare price if necessary
    if (variant.compare_at_price > variant.price) {
      var discountPercent = Math.round((variant.compare_at_price - variant.price) * 100 / variant.compare_at_price);
      this.$container.find(this.selectors.comparePrice)
        .html(theme.Currency.formatMoney(variant.compare_at_price, backend.moneyFormat));
      this.$container.find(this.selectors.discountPercent).html('-' + discountPercent + '%');
      this.$container.find(this.selectors.salePriceWrapper).removeClass('hide');
    } else {
      this.$container.find(this.selectors.salePriceWrapper).addClass('hide');
    }
  },

  _updateSKU: function(evt) {
    var variant = evt.variant;
    // Update the sku
    this.$container.find(this.selectors.SKU).html(variant.sku);
  },
});
