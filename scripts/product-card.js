/*******************************************************************************
    Product card
  *****************************************************************************/
theme.ProductCard = (function () {

  var ProductCard = function ($card) {
    this.$card = $card;
    this.productId = $card.data('product-id');
    this.selectors = {
      variantSelector: '.product-form__variants',
      productJSON: 'ProductJson-product_' + this.productId,
      thumbsJSON: 'ProductImages-' + this.productId,
      imageTag: '.product-card__image img',
      originalPrice: '.product-price__price',
      comparePrice: '.product-price__old',
      discountPercent: '.product-discount',
      ribbon: '.ribbon',
      submitButton: '.product-form__cart-submit',
      form: '.product-form',
    };
    this.productJSON = JSON.parse(document.getElementById(this.selectors.productJSON).innerHTML);
    this.$variantSelector = $card.find(this.selectors.variantSelector);
    this.currentVariant = this._getCurrentVariant();

    this.$variantSelector.removeClass('hide').on('change', this._onVariantChange.bind(this));
    this.$card.find(this.selectors.submitButton).on('click', this._submitForm.bind(this));
  };

  ProductCard.prototype = _.extend({}, ProductCard.prototype, {

    _submitForm: function () {
      this.$card.find(this.selectors.form)[0].submit();
    },

    _getCurrentVariant: function () {
      var variantId = Number(this.$variantSelector.val());
      return variant = _.findWhere(this.productJSON.variants, { id: variantId });
    },

    _onVariantChange: function (evt) {
      var variant = this._getCurrentVariant();
      this._updateImages(variant);
      this._updatePrice(variant);
      this.currentVariant = variant;
    },

    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (!variant.featured_image || variantImage.src === currentVariantImage.src) {
        return;
      }

      if (!this.thumbs) {
        this.thumbs = JSON.parse(document.getElementById(this.selectors.thumbsJSON).innerHTML).thumbs;
      }

      var thumbUrl = this.thumbs[variant.featured_image.position - 1];
      this.$card.find(this.selectors.imageTag).attr('src', thumbUrl);
    },

    _updatePrice: function(variant) {
      // Update the product price
      this.$card.find(this.selectors.originalPrice).html(theme.Currency.formatMoney(variant.price, backend.moneyFormat));

      // // Update and show the product's compare price if necessary
      if (variant.compare_at_price > variant.price) {
        this.$card.find(this.selectors.originalPrice).addClass('product-price__sale');
        var discountPercent = Math.round((variant.compare_at_price - variant.price) * 100 / variant.compare_at_price);
        this.$card.find(this.selectors.discountPercent).html('-' + discountPercent + '%');
        this.$card.find(this.selectors.comparePrice).html(theme.Currency.formatMoney(variant.compare_at_price, backend.moneyFormat)).show();
        this.$card.find(this.selectors.ribbon).removeClass('hide');
      } else {
        this.$card.find(this.selectors.originalPrice).removeClass('product-price__sale');
        this.$card.find(this.selectors.comparePrice).hide();
        this.$card.find(this.selectors.ribbon).addClass('hide');
      }
    },

  });

  return ProductCard;
})();

theme.productCardInit = function () {
  $('.product-card .product-form[data-variants=true]').on('submit', function(e) {
    e.preventDefault();
    var $card = $(this).parents('.product-card').first();
    if (!$card.data('initialized')) {
      new theme.ProductCard($card);
    }
  });
};
