class Breadscrum {
    constructor(breadscrum_container) {
        this.breadscrum_container = breadscrum_container;
    }
    update(org_id, event_id, fight_id) {
        this.set_organisation(org_id);
        this.set_event(event_id);
        this.set_fight(fight_id);
    }
    set_organisation(org_id) {
        if(!org_id) return;
        let _this = this;
        AppNavigator.send_ajax_request('/api/organisation/' + org_id, 'GET', true, null, function (data) {
            $("." + _this.breadscrum_container).empty().html(
                `<li class="mr-2"><a href="#" class="hover:text blue-500">${capitalize_first_letter(data.name)}</a></li>`
            );
        });
    }
    set_event(event_id) {
        if(!event_id) return;
        let _this = this;
        AppNavigator.send_ajax_request('/api/event/' + event_id, 'GET', true, null, function (data) {
            $("." + _this.breadscrum_container).append(
                ` <li class="mr-2"><a href="#" class="hover:text blue-500"> < ${capitalize_first_letter(data.name)}</a></li>`
            );
        });
    }
    set_fight(fight_id) {
        if(!fight_id) return;
        let _this = this;
        AppNavigator.send_ajax_request('/api/fight/' + fight_id, 'GET', true, null, function (data) {
            $("." + _this.breadscrum_container).append(
                `<li class="mr-2"><a href="#" class="hover:text blue-500"> < ${capitalize_first_letter(data.fight_name)}</a></li>`
            );
        });
    }
    set_fighter(fighter) {
        
    }
    set_statistics(statistics) {
    }
}	