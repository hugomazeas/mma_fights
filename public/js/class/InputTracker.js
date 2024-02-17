class InputTracker {
    #tracking_fighter_number;
    #stranding_key = "q";
    #clinch_key = "w";
    #ground_key = "e";
    #takedown_key = "Tab";
    #takedown_result_success = "CapsLock";
    #takedown_result_fail = "Shift";
    #fighter1_key = "1";
    #fighter2_key = "2";
    #select_elbow_map = "a";
    #select_punch_map = "s";
    #select_knee_map = "d";
    #select_kick_map = "f";
    #select_head_strike = "z";
    #select_body_strike = "x";
    #select_leg_strike = "c";

    #possible_keys = [];
    constructor() {
        this.setTrackingFighterNumber(1);
    }
    activeTracker() {
        // _this is used to access the class properties in the event handler
        let _this = this;
        $(document).keydown(function (e) {
            let key = e.key;
            let fighter_number = _this.getTrackingFighterNumber();
            close_destination_map();
            
            switch (key) {
                case _this.#stranding_key:
                    $(".fight_status_fighter" + fighter_number).removeClass("fight_status_active");
                    $("#fighter" + fighter_number + "_status_standing").addClass("fight_status_active");
                    break;
                case _this.#clinch_key:
                    $(".fight_status_fighter" + fighter_number).removeClass("fight_status_active");
                    $("#fighter" + fighter_number + "_status_clinch").addClass("fight_status_active");
                    break;
                case _this.#ground_key:
                    $(".fight_status_fighter" + fighter_number).removeClass("fight_status_active");
                    $("#fighter" + fighter_number + "_status_ground").addClass("fight_status_active");
                    break;
                case _this.#takedown_key:
                    e.preventDefault();
                    $(".takedown_result").addClass("hidden");
                    $("#takedown_result_fighter" + fighter_number).removeClass("hidden");
                    break;
                case _this.#fighter1_key:
                    $(".fighters_strike_cards").attr("data-fighter-selected", 1);
                    _this.setTrackingFighterNumber(1);
                    break;
                case _this.#fighter2_key:
                    $(".fighters_strike_cards").attr("data-fighter-selected", 2);
                    _this.setTrackingFighterNumber(2);
                    break;
                case _this.#select_elbow_map:
                    activate_strike_card("elbow", fighter_number);
                    break;
                case _this.#select_punch_map:
                    activate_strike_card("punch", fighter_number);
                    break;
                case _this.#select_knee_map:
                    activate_strike_card("knee", fighter_number);
                    break;
                case _this.#select_kick_map:
                    activate_strike_card("kick", fighter_number);
                    break;
                case _this.#select_head_strike:
                    $(".fighter" + fighter_number + "_strike_card").find(".strike_destination").attr("data-strike-target", "head");
                    add_new_strike.call(this);
                    break;
                case _this.#select_body_strike:
                    $(".fighter" + fighter_number + "_strike_card").find(".strike_destination").attr("data-strike-target", "body");
                    add_new_strike.call(this);
                    break;
                case _this.#select_leg_strike:
                    $(".fighter" + fighter_number + "_strike_card").find(".strike_destination").attr("data-strike-target", "leg");
                    add_new_strike.call(this);
                    break;
                case _this.#takedown_result_success:
                    add_new_strike.call(this);
                    break;
                case _this.#takedown_result_fail:
                    add_new_strike.call(this);
                    break;
                case _this.#select_body_strike:
                    add_new_strike.call(this);
                    break;
                case _this.#select_leg_strike:
                    add_new_strike.call(this);
                    break;
                case _this.#takedown_result_success:
                    add_new_strike.call(this);
                    break;
                case _this.#takedown_result_fail:
                    add_new_strike.call(this);
                    break;
            }
        });
    }
    setTrackingFighterNumber(fighter_number) {
        this.#tracking_fighter_number = fighter_number;

        let other_fighter = fighter_number == 1 ? 2 : 1;
        
        $("#fighter" + other_fighter + "_img").css("opacity", "20%");
        $("#fighter" + other_fighter + "_img").css("border", "none");

        $("#fighter" + fighter_number + "_img").css("opacity", "100%");
        $("#fighter" + fighter_number + "_img").css("border", "5px solid green")
    }
    getTrackingFighterNumber() {
        return this.#tracking_fighter_number;
    }
}