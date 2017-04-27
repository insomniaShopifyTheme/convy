theme.Swatches = (function () {
  var Swatches = function (el) {
    this.$swatch = $(el);
    this.$form = this.$swatch.parents('form').first();
    this.$swatch.find('input').change($.proxy(this.onChange, this));
  };

  Swatches.prototype.onChange = function (e) {
    var $input = $(e.target);
    var optionIndex = this.$swatch.data('index');
    var optionValue = $input.val();
    this.$form.find('.product-options__selector[data-index="option' + optionIndex + '"]')
              .val(optionValue)
              .trigger('change');
    // Highlight
    this.$swatch.find('.swatches__option').removeClass('swatches__option--selected');
    $input.parents('.swatches__option').first().addClass('swatches__option--selected');
  };

  return Swatches;
})();

theme.initSwatches = function () {
  $('.swatches').each(function(idx, el) {
    new theme.Swatches(el);
  });
  $('[data-color-tooltip!=""]').qtip({
    content: {attr: 'data-color-tooltip'},
    style: {classes: 'qtip-light qtip-shadow'}
  });

};
