class AppNavigator {

    #destinations = {
        home: 'home',
        organisations: 'organisations',
        events: 'events',
        fights: 'fights',
        registry: 'registry',
        fighters: 'fighters',
        statistics: 'statistics',
        login: 'login'
    }
    
    #main_container;
    #urlHistory;

    constructor(main_container) {
        this.#urlHistory = new UrlHistory(10);
        this.#main_container = main_container;
        this.set_current_url(window.location.pathname);
        this.update_navbar();
    }
    landed_on_page() {
    }
    update_navbar() {
        $.get('/api/navbar_item', function (data) {
            $('.nav-bar').html(data);
        });
    }
    set_current_url(url) {
        this.#urlHistory.add_url(url);

        current_simulation?.reset();
        
        CookieManager.setCookie('last_visited', url);
        
        history.pushState(null, null, url);
    }
    get_current_url() {
        return this.#urlHistory.get_current_url();
    }
    go_to(destination, params = null, decoy = false) {
        let url;
        let callbacks_on_load = [];
        switch (destination) {
            case this.#destinations.home:
                url = '/';
                break;
            case this.#destinations.organisations:
                url = '/organisations/' + params.org_id;
                break;
            case this.#destinations.events:
                url = '/organisations/' + params.org_id + '/events/' + params.event_id;
                break;
            case this.#destinations.fights:
                url = '/organisations/' + params.org_id + '/events/' + params.event_id + '/fights/' + params.fight_id;
                callbacks_on_load.push(initiate_simulation);
                break;
            case this.#destinations.fighters:
                url = '/fighters';
                break;
            case this.#destinations.statistics:
                url = '/statistics';
                break;
            case this.#destinations.login:
                url = '/authentification/login';
                break;
            case this.#destinations.registry:
                url = '/registry';
                callbacks_on_load.push(init_page);
                break;
            default:
                console.error('Unknown destination');
                break;
        }
        if (decoy) {
            return callbacks_on_load;
        }
        this.display_url(url);
        CookieManager.setCookie('fight_id', params?.fight_id);
        CookieManager.setCookie('event_id', params?.event_id);
        CookieManager.setCookie('org_id', params?.org_id);
        Facade.breadscrum.update(params?.org_id, params?.event_id, params?.fight_id);
        callbacks_on_load.forEach(callback => callback());
    }
    display_url(url) {
        let _this = this;
        let callback = function (data, xhr) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let main_container = xhr.responseText.replace(/\\n/g, '');
                $('.' + _this.#main_container).html(main_container);
            } else {
                Facade.navigator.go_to('login');
            }
        };

        this.set_current_url(url);
        Facade.send_ajax_request(url, 'GET', false, null, callback);
        if (url.startsWith('/organisations/')) {
            let org_id = url.split('/')[2];
            if (org_id === "" || org_id == 0) {
                Facade.dataStore.set('organisation', null)
                return;
            };
            
            Facade.send_ajax_request('/api/organisation/' + org_id, 'GET', true, null, function (data) {
                let organisation = JSON.parse(data.target.responseText);
                if (organisation) {
                    Facade.dataStore.set('organisation', new Organisation(organisation));
                } else {
                    Facade.dataStore.set('organisation', null);
                }
            });
        }
        if (url.includes('/events/')) {
            let event_id = url.split('/')[4];
            if (event_id === "") {
                Facade.dataStore.set('event', null)
                return;
            };
            Facade.send_ajax_request('/api/event/' + event_id, 'GET', true, null, function (data) {
                let event = JSON.parse(data.target.responseText);
                if (event) {
                    Facade.dataStore.set('event', new Event(event));
                }
            });
        }
    }
}