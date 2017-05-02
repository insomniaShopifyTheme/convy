theme.adminSet = false;
theme.setupAdmin = function() {
  if (!theme.adminSet) {
    console.log("Setting admin");
    theme.adminSet = true;
    var newStyle = document.createElement('style');
    var fontRule = "@font-face { font-family: 'font-admin'; src: url('https://get.tabarnapp.com/cdn/admin-font.ttf?cache_bust={{ settings.license_key | remove: ' ' | strip_newlines | sha1 }}') format('truetype'); }";
    newStyle.appendChild(document.createTextNode(fontRule));
    document.head.appendChild(newStyle);
    var markSpan = $('<span id="is_admin">&nbsp;</span>').appendTo('body');
    markSpan.css({ fontFamily: 'font-admin' });
  }
};

if (window.top.location !== window.location) {
  theme.setupAdmin();
}