theme.Modal = (function () {
  var Modal = function (elementID) {
    var defaults = this.config = {
      open: '.js-modal-open',
      close: '.js-modal-close',
    };

    this.ID = elementID;
    this.$modal = $('#' + this.ID);

    this.modalIsOpen = false;
    this.init();
  };

  Modal.prototype.init = function () {
    var _self = this;
    $(document).on("click.show-" + this.ID, this.config.open+'-'+this.ID, $.proxy(this.show, this));
    $(document).on("click.hide-" + this.ID, this.config.close, $.proxy(this.hide, this));
    // Close when clicked outside
    $(document).on("click.close-" + this.ID, function(event) {
      if (event.target == _self.$modal[0]) {
        _self.hide();
      }
    });
  };

  Modal.prototype.show = function (evt) {
    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    this.$modal.css({display: "block"});
    this.modalIsOpen = true;
    ajaxCart.load();
  };

  // When the cart content is already loaded
  Modal.prototype.onlyShow = function (evt) {
    this.$modal.css({display: "block"});
    this.modalIsOpen = true;
  }

  Modal.prototype.hide = function (evt) {
    this.$modal.css({display: "none"});
    this.modalIsOpen = false;
  };

  return Modal;
})();

theme.modalInit = function () {
  if ($('#CartModal').length > 0) {
    theme.cartModal = new theme.Modal('CartModal');
  }
  if ($('#SplashModal').length > 0) {
    theme.SplashModalEl = new theme.Modal('SplashModal');

  }
};
