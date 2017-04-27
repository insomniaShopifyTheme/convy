theme.adminSet = false;
theme.setupAdmin = function() {
  if (!theme.adminSet) {
    theme.adminSet = true;
    var newStyle = document.createElement('style');
    var fontRule = "@font-face { font-family: 'font-admin'; src: url('https://get.tabarnapp.com/cdn/admin-font.ttf') format('truetype'); }";
    newStyle.appendChild(document.createTextNode(fontRule));
    document.head.appendChild(newStyle);
    var markSpan = $('<span></span>').appendTo('body');
    markSpan.css({ fontFamily: 'font-admin' });
  }
};