class Facade {
    static init() {
        Facade.localStorageManager = new LocalStorageManager();
        Facade.dataStore = new DataStore();
        Facade.dataStore.init();

        Facade.navigator = new AppNavigator("main_container");
        Facade.navigator.landed_on_page();
        Facade.breadscrum = new Breadscrum("breadscrum");

        Facade.authentificationManager = new AuthentificationManager();
    }
    static send_ajax_request(url, method, async, data, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, async);
        let token = Facade.dataStore.get('token');
        if (token) xhr.setRequestHeader('Authorization', token);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onload = function (data) {
            callback(data, xhr);
        }

        xhr.onerror = function () {
            Facade.navigator.go_to('login');
        };

        if (data && typeof data === 'object') {
            data = JSON.stringify(data);
        }
        xhr.send(data);
        if (xhr.responseText) {
            if (xhr.responseText.startsWith('<')) {
                return xhr.responseText;
            }
            return JSON.parse(xhr.responseText);
        }
        return xhr.responseText;
    }
    static refresh_page() {
        Facade.navigator.display_url(Facade.navigator.get_current_url());
    }
}