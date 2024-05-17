class AppNavigator {
    #destinations = {
        home: 'home',
        organisations: 'organisations',
        events: 'events',
        fights: 'fights',
        fighters: 'fighters',
        statistics: 'statistics',
    }

    #main_container;
    #current_url;

    constructor(main_container) {
        this.#main_container = main_container;
        this.#current_url = this.set_current_url(window.location.pathname);
        this.insert_navbar();
    }
    insert_navbar() {
        $.get('/api/navBar', function (data) {
            $('nav').html(data);
        });
    }
    set_current_url(url) {
        current_simulation?.reset();
        this.#current_url = url;
        CookieManager.setCookie('last_visited', url);
        history.pushState(null, null, url);
        if (url.includes("fight")) {
            initiate_simulation();
            select_round(0);
        }
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
            default:
                console.error('Unknown destination');
                break;
        }

        this.display_url(url);
        CookieManager.setCookie('fight_id', params?.fight_id);
        CookieManager.setCookie('event_id', params?.event_id);
        CookieManager.setCookie('org_id', params?.org_id);
        breadscrum.update(params?.org_id, params?.event_id, params?.fight_id);
        this.set_current_url(url);
        this.send_location_objects_to_local_storage(params?.org_id, params?.event_id, params?.fight_id);
    }
    send_location_objects_to_local_storage(org_id, event_id, fight_id) {
        if(!org_id) return;
        $.get('/api/organisation/' + org_id).done(function (data) {
            localStorageManager.setItem('organisation', data);
        });
        if(!event_id) return;
        $.get('/api/event/' + event_id).done(function (data) {
            localStorageManager.setItem('event', data);
        });
        if(!fight_id) return;
        $.get('/api/fighter/' + fight_id).done(function (data) {
            localStorageManager.setItem('fight', data);
        });
    }
    display_url(url) {
        if (url == '/') {
            $('.' + this.#main_container).html('');
            return;
        }
        let _this = this;
        $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function (htmlResponse) {
                let main_container = htmlResponse.replace(/\\n/g, '');
                $('.' + _this.#main_container).html(main_container);
            }
        });
    }
    sent_ajax_request(url, type, data, success_callback) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            cache: false,
            contentType: 'application/json',
            success: success_callback
        });
    }
}