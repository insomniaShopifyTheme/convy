/*******************************************************************************
 Cookie Manager
 *****************************************************************************/
theme.CookieManager = (function () {
    var CookieManager = function () {};
    CookieManager.prototype.set = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    CookieManager.prototype.get = function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    // When the cart content is already loaded
    CookieManager.prototype.check = function (cname) {
        var cname_ = this.get(cname);
        if(cname_ != "" && cname_ != null) {
            return true;
        } else {
            return false;
        }
    }

    CookieManager.prototype.remove = function (cname) {
        var d = new Date();
        d.setTime(d.getTime() + (-1000*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + 'deleted' + ";" + expires + ";path=/";
    };

    return CookieManager;
})();
