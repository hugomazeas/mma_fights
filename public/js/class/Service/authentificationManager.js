class AuthentificationManager {
    constructor() {
        this.user = null;
        this.token = null;
        this.is_admin = false;
        this.is_logged = false;
    }
    is_authenticated() {

        Facade.dataStore.get("token") ? this.is_logged = true : this.is_logged = false;
        Facade.dataStore.get("user") ? this.user = Facade.dataStore.get("user") : this.user = null;
        let datastore_token = Facade.dataStore.get("token");
        if (datastore_token) {
            this.token = datastore_token;
            this.is_logged = true;
        }
        else {
            this.is_logged = false;
        }
        Facade.send_ajax_request('/authentification/check_token', 'POST', true, { token: this.token }, function (data) {
            let response_data = JSON.parse(data.target.response);
            if (!response_data.valid) {
                console.log(response_data);
                return;
            }
            Facade.navigator.set_current_url(CookieManager.get_cookie("last_visited"));
        });
    }

    login() {
        const email = $("#email").val();
        const password = $("#password").val();
        if (email === "" || password === "") return;
        let _this = this;
        Facade.send_ajax_request('/authentification/login', 'POST', true, { email, password }, function (data) {
            let response_data = JSON.parse(data.target.response);
            if (response_data.error) {
                console.log(response_data.error);
                return;
            }
            _this.user = response_data.user;
            _this.token = response_data.token;
            _this.is_logged = true;
            Facade.dataStore.set("user", _this.user);
            Facade.dataStore.set("token", _this.token);
            Facade.navigator.go_to_home();
        });
    }
    logout() {
        this.user = null;
        this.token = null;
        this.is_admin = false;
        this.is_logged = false;
        this.is_authenticated = false;
        CookieManager.deleteCookie("user");
        CookieManager.deleteCookie("token");
        CookieManager.deleteCookie("is_admin");
    }
}