class CookieManager {
    static setCookie(name, value) {
        var expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Expires far in the future
        document.cookie = name + "=" + value + expires + "; path=/";
        console.log("Cookie set. Name: " + name + ", Value: " + value);
    }

    static getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    static eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}
