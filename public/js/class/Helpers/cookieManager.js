class CookieManager {
    static set_cookie(name, value) {
        if (value === "/authentification/login") return;
        if (!value)
            value = "";
        var expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Expires far in the future
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    static get_cookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    static decode_cookie(string) {
        if(string == "undefined") return null;
        var decodedString = decodeURIComponent(string);

        if (decodedString.startsWith('j:')) {
            decodedString = decodedString.substring(2);
        }
        var jsonObject = JSON.parse(decodedString);
        return jsonObject;
    }
}
