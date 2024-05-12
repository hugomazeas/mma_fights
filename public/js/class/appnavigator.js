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

    constructor(main_container) {
        this.#main_container = main_container;
    }

    go_to(destination, params = null){
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
        if (url != '/') {
            this.display_url(url);
            CookieManager.setCookie('last_visited', url);
            CookieManager.setCookie('fight_id', params?.fight_id);
            CookieManager.setCookie('event_id', params?.event_id);
            CookieManager.setCookie('org_id', params?.org_id);
        }else{
            $('.' + this.#main_container).html('');
            history.pushState(null, null, url);
        }
    }

    display_url(url) {
        history.pushState(null, null, url);
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
}