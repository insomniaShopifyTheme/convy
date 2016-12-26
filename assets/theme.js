// Theme functions
window.theme = window.theme || {};

theme.cacheSelectors = function () {
  theme.cache = {
    // General
    $html : $('html'),
    $body : $(document.body)
  };
};

theme.init = function () {
  FastClick.attach(document.body);
  theme.cacheSelectors();
};

$(theme.init);