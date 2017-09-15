/*******************************************************************************
    Featured Product section
  *****************************************************************************/

theme.FeaturedProductSection = (function() {

  function FeaturedProductSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    this.theProduct = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);

    this.settings = {
      sectionId: sectionId,
      enableHistoryState: $container.data('enable-history-state') || false,
    };

    this.selectors = {
      originalSelectorId: '#ProductSelect-' + sectionId,
      singleOptionSelector: '.product-options__selector-' + sectionId,
      addToCart: '#' + sectionId + ' .product-form__cart-submit',
      addToCartText: '#' + sectionId + ' .product-form__cart-submit-text',
      productPrices: '.product-info .product-price',
      originalPrice: '.product-info .product-price__price',
      comparePrice: '.product-info .product-price__old',
      discountPercent: '.product-info .product-price__percent',
      salePriceWrapper: '.product-info .product-price__sale'
    }

    // Thumbs & Slider
    var slider = this.slider = '#' + sectionId + '_images';
    theme.sliders[slider] = new theme.ProductImagesSlider(slider);

    var relSlider = this.relSlider = '#slider_related-products';
    theme.sliders[relSlider] = new theme.RelatedProductsSlider(relSlider);
    theme.productCardsInit($container);

    // Zoom image
    $container.find('.product-images--single .product-images__image, .product-images__image li').each(function(idx, el) {
      var $img = $(el).find('img');
      $(el).zoom({ on: $img.data('zoom-type'), url: $img.data('original') });
    });

    this._initVariants();
    theme.initSwatches();
  }

  return FeaturedProductSection;
})();

theme.FeaturedProductSection.prototype = _.extend({}, theme.FeaturedProductSection.prototype, {

  onUnload: function() {
    delete theme.sliders[this.slider];
    delete theme.sliders[this.relSlider];
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
  },

  _updateAddToCart: function(evt) {
    var variant = evt.variant;

    if (variant) {
      this.$container.find(this.selectors.productPrices).removeClass('visibility-hidden');

      if (variant.available) {
        $(this.selectors.addToCart).prop('disabled', false);
        $(this.selectors.addToCartText).text($(this.selectors.addToCartText).data('original-text'));
      } else {
        $(this.selectors.addToCart).prop('disabled', true);
        $(this.selectors.addToCartText).text(backend.strings.soldOut);
      }

      // There are two separated variant selectors for mobile and desktop
      // So it needs to be updated manually
      $(this.selectors.originalSelectorId + '--desktop').val(variant.id)

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
    var variantPrice = theme.Currency.formatMoney(variant.price, backend.moneyFormat),
        $pricesRef,
        $inCurrency,
        compareAtPriceInCurrency;

    // Convert currency when price is changed after changing variant
    var isCurrencyEnabled = (new String("{{settings.show_multiple_currencies}}")) == "true";
    if (isCurrencyEnabled) {
      $pricesRef = this.$container.find(".product-variant-prices-ref");
      inCurrency = $pricesRef.find("[data-variant-id=" + variant.id + "]").html();
      // price|compare_at_price
      inCurrencyParts = inCurrency.split("|");
      variantPrice = inCurrencyParts[0];
      compareAtPriceInCurrency = inCurrencyParts[1];
    }

    // Update the product price
    this.$container.find(this.selectors.originalPrice).html(variantPrice);

    // Update and show the product's compare price if necessary
    if (variant.compare_at_price > variant.price) {
      var discountPercent = Math.round((variant.compare_at_price - variant.price) * 100 / variant.compare_at_price);
      if (!compareAtPriceInCurrency) {
        compareAtPriceInCurrency = theme.Currency.formatMoney(variant.compare_at_price, backend.moneyFormat);
      }
      this.$container.find(this.selectors.comparePrice).html(compareAtPriceInCurrency);
      this.$container.find(this.selectors.discountPercent).html('-' + discountPercent + '%');
      this.$container.find(this.selectors.salePriceWrapper).removeClass('hide');
    } else {
      this.$container.find(this.selectors.salePriceWrapper).addClass('hide');
    }
  },

});
