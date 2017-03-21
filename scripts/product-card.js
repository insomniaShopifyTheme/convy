/*******************************************************************************
    Product card
  *****************************************************************************/
theme.productCardsInit = function ($scope) {
  $scope.find('.product-card .product-form__variants').on('change', function(e) {
    var $card = $(this).parents('.product-card').first();
    $card.find('.product-form')[0].submit();
  });
  $scope.find('.product-card--hoverable .product-form__variants:not(.hide)').selectric({
    maxHeight: 145,
    openOnHover: true,
    direction: 'bottom',
    hoverIntentTimeout: 200
  });
  $scope.find('.product-card--no-hover .product-form__variants:not(.hide)').selectric({
    maxHeight: 210,
    openOnHover: false,
    direction: 'top'
  });
};
