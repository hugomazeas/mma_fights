class InputTracker {
    #tracking_fighter_number;
    #stranding_key = "q";
    #clinch_key = "w";
    #ground_key = "e";
    #takedown_key = "g";
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
    #delete_last_strike = "Backspace";
    #toggle_time = " ";

    constructor() {
        this.setTrackingFighterNumber(1);
    }
    desactivate_tracker(){
        $(document).off("keydown");
    }
    activate_tracker() {
        // _this is used to access the class properties in the event handler
        let _this = this;
        $(document).keydown(function (e) {
            let key = e.key;
            let fighter_number = _this.getTrackingFighterNumber();
            SimulationPanel.close_destination_map();
            SimulationPanel.close_significant_strike_option();
            console.log(key);
            switch (key) {
                case _this.#stranding_key:
                    SimulationPanel.select_fight_status("standing");
                    break;
                case _this.#clinch_key:
                    SimulationPanel.select_fight_status("clinch");
                    break;
                case _this.#ground_key:
                    SimulationPanel.select_fight_status("ground");
                    break;
                case _this.#takedown_key:
                    e.preventDefault();
                    SimulationPanel.select_strike_card("takedown");
                    SimulationPanel.open_significant_strike_option();
                    break;
                case _this.#select_elbow_map:
                    SimulationPanel.select_strike_card("elbow");
                    SimulationPanel.open_significant_strike_option();
                    break;
                case _this.#select_punch_map:
                    SimulationPanel.select_strike_card("punch");
                    SimulationPanel.open_significant_strike_option();
                    break;
                case _this.#select_knee_map:
                    SimulationPanel.select_strike_card("knee");
                    SimulationPanel.open_significant_strike_option();
                    break;
                case _this.#select_kick_map:
                    SimulationPanel.select_strike_card("kick");
                    SimulationPanel.open_significant_strike_option();
                    break;
                case "ArrowUp" || "ArrowDown":
                    e.preventDefault();
                    SimulationPanel.toggle_sig_strike_card();
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
                case _this.#fighter1_key:
                    $(".fighters_strike_cards").attr("data-fighter-selected", 1);
                    _this.setTrackingFighterNumber(1);
                    break;
                case _this.#fighter2_key:
                    $(".fighters_strike_cards").attr("data-fighter-selected", 2);
                    _this.setTrackingFighterNumber(2);
                    break;
                case _this.#delete_last_strike:
                    $("#strikeregister_" + fighter_number).find(".delete-btn").first().click();
                case _this.#toggle_time:
                    e.preventDefault();
                    toggle_pause_play_simulation();
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