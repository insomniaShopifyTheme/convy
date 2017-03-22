/*******************************************************************************
    Product card
  *****************************************************************************/
theme.productCardsInit = function ($scope) {

  var selectors = {
    variantSelector: '.product-form__variants',
    form: '.product-form',
  };

  $scope.find('.product-card ' + selectors.variantSelector).on('change', function(e) {
    var $card = $(this).parents('.product-card').first();
    $card.find(selectors.form).trigger('submit');
    // Return select back
    setTimeout(function() {
      var $selector = $card.find(selectors.variantSelector);
      if ($selector.hasClass('product-form__variants--has-variants')) {
        $selector.prop('selectedIndex', 0).selectric('refresh');
      }
    }, 500);
  });

  $scope.find('.product-card--hoverable ' + selectors.variantSelector + ':not(.hide)').selectric({
    maxHeight: 145,
    openOnHover: true,
    direction: 'bottom',
    hoverIntentTimeout: 200
  });

  $scope.find('.product-card--no-hover ' + selectors.variantSelector + ':not(.hide)').selectric({
    maxHeight: 210,
    openOnHover: false,
    direction: 'top'
  });
};
