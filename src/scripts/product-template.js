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
      asNavFor: '#' + sliderId + ' .' + classes.image,
      dots: false,
      arrows: this.$sliderThumbs.data('arrows'),
      centerMode: false,
      focusOnSelect: true,
      vertical: true,
      verticalSwiping: true
    };
    this.imageSettings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: this.$sliderImage.data('arrows'),
      dots: false,
      fade: true,
      asNavFor: '#' + sliderId + ' .' + classes.thumbs,
      swipe: false,
      swipeToSlide: false,
    };

    var imageHeight = this.$sliderImage.height();
    //this.$sliderThumbs.css({'max-height': imageHeight + 'px'});
    this.$sliderThumbs.slick(this.thumbsSettings);
    this.$sliderImage.slick(this.imageSettings);
  }

  return productImagesSlider;
})();

theme.RelatedProductsSlider = (function() {
  this.$relSlider = null;
  var classes = {
    wrapper: 'slider-wrapper',
    slider: 'slider',
    currentSlide: 'slick-current'
  };

  function slider(el) {
    this.$relSlider = $(el);

    this.settings = {
      dots: false,
      fade: false,
      speed: 500,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };

    this.$relSlider.slick(this.settings);
  }

  return slider;
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
      singleOptionSelector: '.product-options__selector-' + sectionId,
      addToCart: '#' + sectionId + ' .product-form__cart-submit',
      addToCartText: '#' + sectionId + ' .product-form__cart-submit-text',
      productPrices: '.product-info .product-price',
      originalPrice: '.product-info .product-price__price',
      comparePrice: '.product-info .product-price__old',
      discountPercent: '.product-info .product-price__percent',
      salePriceWrapper: '.product-info .product-price__sale',
      SKU: '.variant-sku',
      qty: '.variant-qty',
      inPageCartButton: '#' + sectionId + ' .product-form__cart',
      stickyBtnStart: '#' + sectionId + ' .js-sticky-btn-start',
      stickyCartButton: 'body > .product-form__cart',
      stickyCartButtonText: 'body > .product-form__cart button > span',
      cartFormMobile: '#' + sectionId + ' .product-form--mobile',
      readMoreBtn: '.product-template .product-info__more',
      productDescription: '.product-template .product-info__description',
      productFullDescription: '.product-template .product-info__full_description',
      accordion: '#' + sectionId + ' .accordion',
      productInfo: '.product-info',
      productVariants: '.content-product-variants',
      productInfoDesktop: '.product-info-desktop',
      addToCartBar: '.product-add-to-cart-bar ',
      addToCartBarBtn: '.product-add-to-cart-bar .btn--add-to-cart',
      addToCartBarBtnText: '.product-add-to-cart-bar .btn--add-to-cart .product-form__cart-submit-text',
      addToCartBarPrice: '.product-add-to-cart-bar .product-price',
      countDownOffer: '.countdown-offer-clock'

    };

    // Thumbs & Slider
    var slider = this.slider = '#' + sectionId + '_images';
    theme.sliders[slider] = new theme.ProductImagesSlider(slider);

    var relSlider = this.relSlider = '#slider_related-products';
    theme.sliders[relSlider] = new theme.RelatedProductsSlider(relSlider);
    theme.productCardsInit($container);

    // Zoom image
    $('.product-images--single .product-images__image, .product-images__image li').each(function(idx, el) {
      var $img = $(el).find('img');
      if(theme.isMobile()){
        new RTP.PinchZoom($img, {});
      }else{
        $(el).zoom({ on: $img.data('zoom-type'), url: $img.data('original') });
      }
    });

    $('#tab-container').easytabs();

    // Switch image when variant is changed
    this._initVariants();
    // Switch variant when image is changed
    if (theme.sliders[this.slider].$sliderImage) {
      var $imgSlider = theme.sliders[this.slider].$sliderImage;
      $imgSlider.on('beforeChange', this._matchVariantForCurrentSlide.bind(this));
    }

    this._stickyCartBtn();
    this._readMore();
    this._removeReviewsDuplicate();
    theme.initSwatches();
    this._initAccordion();
    this._initCountDownOffer();
  }

  return ProductPageSection;
})();

theme.ProductPageSection.prototype = _.extend({}, theme.ProductPageSection.prototype, {

  onLoad: function() {
    if (_.isFunction(ajaxCart.qtySelectors)) {
      ajaxCart.qtySelectors();
    }
    this._initAddToCartStickyBar();
  },

  onUnload: function() {
    delete theme.sliders[this.slider];
    delete theme.sliders[this.relSlider];
    $(document).off('touchmove.track-add-to-cart-btn');
    $(document).off('scroll.track-add-to-cart-btn');
  },

  _stickyCartBtn: function() {
    if($('.product-template').data('lock-atc-btn') == true){
      var $stickyBtn = $(this.selectors.stickyCartButton);
      $stickyBtn.addClass('stuck');
    }else{
      if ($(this.selectors.stickyCartButton).length > 0) {
        $(this.selectors.stickyCartButton).on('click', this._submitCartForm.bind(this));
        $(document).on('touchmove.track-add-to-cart-btn', this._trackScrolling.bind(this));
        $(document).on('scroll.track-add-to-cart-btn', this._trackScrolling.bind(this));
        this._trackScrolling();
      }
    }
  },

  _submitCartForm: function() {
    $(this.selectors.cartFormMobile).trigger('submit');
  },

  _trackScrolling: function() {
    // only for mobile
    if (theme.cache.$body.width() <= 767) {
      var $stickyBtn = $(this.selectors.stickyCartButton);
      var startPosition = $(this.selectors.stickyBtnStart).position();
      var distanceYBottom = window.pageYOffset + theme.cache.$window.height();
      var stickAt = distanceYBottom + 450;
      if (startPosition.top <= stickAt) {
        $stickyBtn.addClass('stuck');
      } else {
        $stickyBtn.removeClass('stuck');
      }
    }
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
    var qty;

    if (variant) {
      this.$container.find(this.selectors.productPrices).removeClass('visibility-hidden');

      if (variant.available) {
        $(this.selectors.addToCart).prop('disabled', false);
        $(this.selectors.addToCartText).text(backend.strings.addToCart);
      } else {
        $(this.selectors.addToCart).prop('disabled', true);
        $(this.selectors.addToCartText).text(backend.strings.soldOut);
      }

      // Update left in stock label
      if (variant.inventory_quantity > 0) {
        qty = variant.inventory_quantity;
      } else {
        if (variant.available) {
          qty = 1;
        } else {
          qty = 0;
        }
      }
      this.$container.find(this.selectors.qty).html(qty);

      // There are two separated variant selectors for mobile and desktop
      // So it needs to be updated manually
      $(this.selectors.originalSelectorId + '--desktop').val(variant.id)

    } else {
      // The variant doesn't exist
      $(this.selectors.addToCart).prop('disabled', true);
      $(this.selectors.addToCartText).text(backend.strings.unavailable);
      this.$container.find(this.selectors.productPrices).addClass('visibility-hidden');
      this.$container.find(this.selectors.qty).html('-');
    }
    // Update sticky button
    $(this.selectors.stickyCartButtonText).text($(this.selectors.addToCartText).text());
    $(this.selectors.stickyCartButton).find('button').prop('disabled', $(this.selectors.addToCart).prop('disabled'));

    //Update Add to cart bar
    $(this.selectors.addToCartBarBtn).prop('disabled', $(this.selectors.addToCart).prop('disabled'))
    $(this.selectors.addToCartBarBtnText).text($(this.selectors.addToCartText).text());
    if(this.$container.find(this.selectors.productPrices).hasClass('visibility-hidden')){
      $(this.selectors.addToCartBarPrice).addClass('visibility-hidden').css('width', 0);
    }else{
      $(this.selectors.addToCartBarPrice).removeClass('visibility-hidden').css('width', 'auto');
    }
  },

  _switchImage: function(evt) {
    var variant = evt.variant;
    var $productImagesSlider = theme.sliders[this.slider];
    $productImagesSlider.$sliderImage.slick('slickGoTo', variant.featured_image.position - 1);
  },

  _matchVariantForCurrentSlide: function(event, slick, currentSlide, nextSlide) {
    var imageIdx = nextSlide + 1;
    var variant = _.find(this.theProduct.variants, function(v) {
      if (v.featured_image) {
        return v.featured_image.position == imageIdx;
      }
      return false;
    });

    if (!variant) { return false; }

    var variantSelector = $(this.selectors.originalSelectorId);
    var _self = this;
    if (variantSelector.val() != variant.id) {
      _.each(variant.options, function(opt, idx) {
        var optIdx = idx + 1;
        var optName = 'option-' + optIdx;
        // If swatches
        var $swatches = _self.$container.find('.swatches[data-index=' + optIdx + ']');
        if ($swatches.length > 0) {
          $swatches.find('input[name=' + optName + ']').each(function(idx, el) {
            if ($(el).val() == opt) {
              $(el).trigger('click');
              return true;
            }
          });
        } else {
          $dropdown = _self.$container.find('.product-options__selector[data-index=option' + optIdx + ']');
          $dropdown.val(opt).trigger('change');
          return true;
        }
      });
    }

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

  // Initialize read more button to expand/collapse hidden text
  // do not truncate if the hidden part is going to be too small
  _readMore: function() {
    var minToHide = '20'; // percent
    this.$description = $(this.selectors.productDescription);
    this.descriptionHeight = Number($(this.selectors.productFullDescription).height());
    var blockHeight = this.$description.height();
    var hasDescription = this.descriptionHeight > 0;
    var hasEnoughToHide = hasDescription && (100 - blockHeight / (this.descriptionHeight / 100)) > minToHide;

    if (theme.isDesktop()) {
      this.descriptionHeight = null;
      this._disableReadMore();
    } else if (hasDescription && hasEnoughToHide) {
      this.$readMoreBtn = $(this.selectors.readMoreBtn);
      $(this.selectors.readMoreBtn).on('click', this._toggleReadMore.bind(this));
    } else {
      this._disableReadMore();
    }
  },

  _toggleReadMore: function() {
    if (this.$description.hasClass('product-info__description--shrunk')) {
      this._expandDescription();
    } else {
      this._collapseDescription();
   }
  },

  _expandDescription: function() {
    this.$description.animate({'height': this.descriptionHeight + 'px'}, 300)
                     .removeClass('product-info__description--shrunk');
    $(this.selectors.readMoreBtn).find('.icon').removeClass('icon-chevron-thin-down')
                                               .addClass('icon-chevron-thin-up');
  },

  _collapseDescription: function() {
    theme.smoothScroll(this.$description, 300, -120);
    this.$description.animate({'height': this.$description.data('original-height')}, 300)
                     .addClass('product-info__description--shrunk');
    $(this.selectors.readMoreBtn).find('.icon').removeClass('icon-chevron-thin-up')
                                               .addClass('icon-chevron-thin-down');
  },

  _disableReadMore: function() {
    if (this.descriptionHeight) {
      this.$description.css('height', this.descriptionHeight + 20 + 'px');
    } else {
      this.$description.css('height', '100%');
    }
    this.$description.removeClass('product-info__description--shrunk');
    $(this.selectors.readMoreBtn).remove();
  },

  _removeReviewsDuplicate: function() {
    // As #shopify-product-reviews must be unique block for the page
    // we delete its duplicate depending on which version loaded
    // TODO: I think there might be a race condition in mobile version
    if (theme.cache.$body.width() <= 767) {
      $('.medium-down--hide .js-delete--mobile').remove();
    } else {
      $('.large--hide .js-delete--desktop').remove();
    }
  },

  _initAccordion: function() {
    var $accordion = $(this.selectors.accordion);
    var $allPanels = $accordion.find('dd').hide();
    $(this.selectors.accordion + ' > dt:first-child').next().addClass('active').slideDown();
    $(this.selectors.accordion + ' > .accordion__tab-title').click(function() {
      $this = $(this);
      $target =  $this.next();
      if($target.hasClass('active')){
        $target.removeClass('active').slideUp();
      } else {
        if (theme.cache.$body.scrollTop() > $accordion.offset().top) {
          theme.smoothScroll($accordion, 1000);
        }
        $allPanels.removeClass('active').slideUp();
        $target.addClass('active').slideDown();
      }
      return false;
    });
  },

  _initAddToCartStickyBar: function() {

    var $window = $(window),
        $addToCartBarBtn = $(this.selectors.productInfoDesktop).find('.product-form__cart-submit'),
        addToCartBtnOffsetFromTop = $(this.selectors.addToCart).offset().top,
        $bar = $(this.selectors.addToCartBar),
        $barAddToCartBtn = $(this.selectors.addToCartBarBtn);

    $window.scroll(function(){
      if ($window.scrollTop() > addToCartBtnOffsetFromTop) {
        $bar.addClass('shown');
      }else {
        $bar.removeClass('shown');
      }
    });

    $barAddToCartBtn.on('click', function(event){
      $addToCartBarBtn.click();
      $('html, body').animate({ scrollTop: 0 }, 'fast');
      event.preventDefault();
    });

    /**
     * Reflect product variants with Add to cart bar variants
     **/

    var $topbarProductQuantityMinus = $bar.find('.js-qty__adjust--minus');
    var $topbarProductQuantityPlus = $bar.find('.js-qty__adjust--plus');
    var $topbarProductQuantityNum = $bar.find('.js-qty__num');
    var $productQuantityMinus = $(this.selectors.productInfo).find('.js-qty__adjust--minus');
    var $productQuantityPlus = $(this.selectors.productInfo).find('.js-qty__adjust--plus');
    var $productQuantityNum = $(this.selectors.productInfo).find('.js-qty__num');
    var hasSwatches = $(this.selectors.productVariants).hasClass('product-options--swatches');

    $topbarProductQuantityMinus.click(matchQuantityInputs);
    $topbarProductQuantityPlus.click(matchQuantityInputs);
    $productQuantityMinus.click(matchQuantityInputs);
    $productQuantityPlus.click(matchQuantityInputs);

    function matchQuantityInputs(){
      //if is topbar
      if($(this).closest('.product-add-to-cart-bar')[0] != undefined){
        $productQuantityNum.val($topbarProductQuantityNum.val());
      }else{
        $topbarProductQuantityNum.val($productQuantityNum.val());
      }
    }

    $bar.find('.product-options__selector').each(function(i, v){
      var topBarSelect = $(this);
      matchSelectValues($('.product-info').find('.product-options__selector').eq(i), topBarSelect);
    });

    function matchSelectValues(el1, el2){
      el1.change(function(){
        if(el1.val() != 'non'){
          el2.val(el1.val());
        }
      });
      el2.change(function(){
        if(el2.val() != 'non'){
          el1.val(el2.val()).trigger('change');
        }
      });
    }

    if(hasSwatches){
      $bar.find('.product-options__selector').each(function(i, v){
        var topBarSelect = $(this);
        var index = $(this).attr('data-index').replace('option', '').trim();
        topBarSelect.change(function(){
          $('.swatches__option.swatches__option-index-'+index+'.swatches__option--'+$(this).val().replace(/\s+/g, '-').toLowerCase()).click();
        })
      });
    }
  },

  

  _initCountDownOffer: function() {
    var _restart = '{{ settings.countdown_offer_repeat }}';

    var timers = {
      coc: $('.countdown-offer-clock'),
      show : function () {
        this.coc.removeClass('hide');
      },
      hide : function () {
        this.coc.addClass('hide');
      }
    };

    // Cookie 
    var _cookie = new theme.CookieManager();

    // If the array contain str string return first val found
    function arrayContain(arr, str) {
      var ret = null;
      $.each(arr, function (i, v) {
        if(v.includes(str)){
          ret = v;
        }
      });
      if(ret){
        return ret;
      }else{
        return false;
      }
    }

    // Countdown timer
    function countDownOfferTimer(toDateSplittedStr, productId, $element) {
      var timer;
      var cookieName = "endDate" + productId;
      var endDate = null;


      //Check if cookie already exists
      if(_cookie.check(cookieName)){
        var part = _cookie.get(cookieName).split('-');
        var timestamp = part[0];
        if(part[1] == parseInt(toDateSplittedStr[0], 10) + parseInt(toDateSplittedStr[1], 10) +parseInt(toDateSplittedStr[2], 10)){
          endDate = new Date(parseInt(timestamp));
        }else{
          createOrUpdate();
        }
      }else{
        createOrUpdate();
      }

      //create or update cookie
      function createOrUpdate() {
        var now = new Date();
        endDate = now.addDays(parseInt(toDateSplittedStr[0], 10)).addHours(parseInt(toDateSplittedStr[1], 10)).addMinutes(parseInt(toDateSplittedStr[2], 10));
        _cookie.set(cookieName, endDate.getTime()+'-'+parseInt(toDateSplittedStr[0], 10) + parseInt(toDateSplittedStr[1], 10) +parseInt(toDateSplittedStr[2], 10), 30);
      }


      //restart timer
      function restart() {
        //console.log('restart');
        timers.hide();
        if(_restart == 'true') {
          createOrUpdate();
          interval();
        }
      }



      //Timer interval
      function interval() {
        setTimeout(function () {
          timers.show();
        }, 1000);
        var currentDate = new Date();
        var difference = endDate.getTime() - currentDate.getTime();
        timer = setInterval(function() {
          var diff = difference;
          if (diff < 0) {
            clearInterval(timer);
            restart();
          } else {
            var seconds = Math.floor(diff / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            hours %= 24;
            minutes %= 60;
            seconds %= 60;
            days %= 24;
            $element.text(days+ 'd ' +hours+ 'h ' +minutes + 'm ' +seconds+ 's ');
          }
          difference -= 1000;
        }, 1000);
      }
      interval();
    }

    //if setting is enabled
    if('{{ settings.countdown_offer_enabled }}' == 'true'){

      var $countDownOffer = $(this.selectors.countDownOffer);
      var api_endpoint = window.location.href +'.json';

      //Get product data from product json
      var data = $.parseJSON($.ajax({
        url:  api_endpoint,
        dataType: "json",
        async: false
      }).responseText);

      var productId = data.product.id;
      var tags = data.product.tags.split(', ');
      var toDate = arrayContain(tags, 'countdown-');//return first tag with 'countdown-' str


      //if tag 'countdown-' exists show timer else remove cookie
      if(toDate){

        //style it (not sure about this)
        $countDownOffer.css('display', 'block')
            .css('text-transform','lowercase')
            .css('font-size', '13px');

        if($countDownOffer.parents('.product-form__cart--sticky').length == 1){
          $countDownOffer.parents('.product-form__cart--sticky')
              .find(this.selectors.countDownOffer)
              .css('margin-top', '-20px');
        }
        var toDateSplittedStr = toDate.split('-'); // days-hours-minutes
        toDateSplittedStr.shift();//remove first elem from array

        //Initialize countdown
        countDownOfferTimer(toDateSplittedStr, productId, $('.countdown-offer-clock .countdown-clock'))

      }else{
        _cookie.remove('endDate'+ productId);
      }
    }
  }

});
