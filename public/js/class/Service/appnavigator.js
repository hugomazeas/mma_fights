class AppNavigator {

    #main_container;
    #urlHistory;

    constructor(main_container) {
        this.#urlHistory = new UrlHistory(10);
        this.#main_container = main_container;
        this.set_current_url(window.location.pathname);
        this.update_navbar();
    }
    update_navbar() {
        $.get('/api/navbar_item', function (data) {
            $('.nav-bar').html(data);
        });
    }
    set_current_url(url) {
        this.#urlHistory.add_url(url);

        current_simulation?.reset();
        
        CookieManager.set_cookie('last_visited', url);
        
        history.pushState(null, null, url);
    }
    get_current_url() {
        return this.#urlHistory.get_current_url();
    }
    display_url(url) {
        let _this = this;
        let callback = function (data, xhr) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let main_container = xhr.responseText.replace(/\\n/g, '');
                $('.' + _this.#main_container).html(main_container);
            } else {
                console.error('Error loading page: ', xhr.status, xhr.responseText);
                Facade.navigator.go_to_login();
            }
        };

        this.set_current_url(url);
        Facade.send_ajax_request(url, 'GET', false, null, callback);
    }
    go_to_organisations() {
        this.display_url('/views/organisations');
    }
    go_to_organisations_details(org_id) {
        this.display_url('/views/organisations/' + org_id);
    }
    go_to_events() {
        this.display_url('/views/events');
    }
    go_to_event_detail(event_id) {
        this.display_url('/views/events/' + event_id);
    }
    go_to_fights() {
        this.display_url('/views/fights/');
        init_page();
    }
    go_to_fight_detail(fight_id) {
        this.display_url('/views/fights/' + fight_id);
        initiate_simulation(fight_id);
    }
    go_to_fighters() {
        this.display_url('/views/fighters/');
    }
    go_to_home() {
        this.display_url('/');
    }
    go_to_login() {
        // this.display_url('/views/login');
    }
    go_back() {
        this.display_url(this.#urlHistory.get_previous_url());
    }
}