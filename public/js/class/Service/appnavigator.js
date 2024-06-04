class AppNavigator {

    #destinations = {
        home: 'home',
        organisations: 'organisations',
        events: 'events',
        fights: 'fights',
        fighters: 'fighters',
        statistics: 'statistics',
        login: 'login'
    }
    #main_container;
    #current_url;

    constructor(main_container) {
        this.#main_container = main_container;
        this.set_current_url(window.location.pathname);
        this.insert_navbar();
    }
    insert_navbar() {
        $.get('/api/navbar_item', function (data) {
            $('nav').html(data);
        });
    }
    set_current_url(url) {
        current_simulation?.reset();
        this.#current_url = url;
        CookieManager.setCookie('last_visited', url);
        history.pushState(null, null, url);
    }
    get_current_url() {
        return this.#current_url;
    }
    go_to(destination, params = null) {
        let url;
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
            default:
                console.error('Unknown destination');
                break;
        }

        this.display_url(url);
        CookieManager.setCookie('fight_id', params?.fight_id);
        CookieManager.setCookie('event_id', params?.event_id);
        CookieManager.setCookie('org_id', params?.org_id);
        Facade.breadscrum.update(params?.org_id, params?.event_id, params?.fight_id);
        // this.push_info_to_datastore(params?.org_id, params?.event_id, params?.fight_id);
    }
    push_info_to_datastore(org_id, event_id, fight_id) {
        if (!org_id) return;
        Facade.send_ajax_request('/api/organisation/' + org_id, 'GET', true, null, function (data) {
            if (data) {
                Facade.dataStore.set('organisation', new Organisation(data));
            } else {
                Facade.dataStore.set('organisation', null);
            }
        });
        if (!event_id) return;
        Facade.send_ajax_request('/api/event/' + event_id, 'GET', true, null, function (data) {
            let event = JSON.parse(data.target.responseText);
            if (event) {
                Facade.dataStore.set('event', new Event(data));
            } else {
                Facade.dataStore.set('event', null);
            }
        });
        if (!fight_id) return;
        Facade.send_ajax_request('/api/fight/' + fight_id, 'GET', true, null, function (data) {
            if (data) {
                Facade.dataStore.set('fight', new Fight(data));
            } else {
                Facade.dataStore.set('fight', null);
            }
        });
    }
    display_url(url) {
        if (url === '/') {
            $('.' + this.#main_container).html('');
            return;
        }
        let _this = this;
        let callback = function (data, xhr) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let main_container = xhr.responseText.replace(/\\n/g, '');
                $('.' + _this.#main_container).html(main_container);
                if (url.includes("fight")) {
                    initiate_simulation();
                }
            } else {
                Facade.navigator.go_to('login');
            }
        };
        this.set_current_url(url);
        Facade.send_ajax_request(url, 'GET', true, null, callback);
        if (url.startsWith('/organisations/')) {
            let org_id = url.split('/')[2];
            if (org_id === "") {
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