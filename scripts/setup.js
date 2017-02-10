// Theme functions
window.theme = window.theme || {};

theme.cacheSelectors = function () {
  theme.cache = {
    // General
    $window : $(window),
    $html : $('html'),
    $body : $(document.body)
  };
};

theme.sliders = {};
theme.debug = {};
