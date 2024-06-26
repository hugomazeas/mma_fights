class SimulationPanel {

    static select_fight_status(status) {
        let fighter_number = $(".fighters_strike_cards").attr("data-fighter-selected");
        $(".fight_status_fighter" + fighter_number).removeClass("fight_status_active");
        $("#fighter" + fighter_number + "_status_" + status).addClass("fight_status_active");
    }
    static select_strike_target(target) {
        $(".strike_possible_destination").removeClass("strike_possible_destination_active");
        if (target) {
            $(".strike_card_selected").attr("data-strike-target", target);
            $(".strike_card_selected").parent().find(".strike_possible_destination[data-strike-target='" + target + "']").addClass("strike_possible_destination_active");
        }
    }
    static select_strike_card(action) {
        $(".strike_card_item").removeClass("strike_card_selected");
        if (action) {
            let fighter_number = $(".fighters_strike_cards").attr("data-fighter-selected");
            $("#fighter" + fighter_number + "_" + action + "_line").find(".strike_card_item[data-strike-type='" + action + "']").addClass("strike_card_selected");
        }
    }
    static toggle_sig_strike_card() {
        $(".significant_strike_option").toggleClass("significant_strike_option_active");
    }
    static get_current_fighter_line() {
        let fighter_number = $(".fighters_strike_cards").attr("data-fighter-selected");
        let strike_action = $(".strike_card_selected").attr("data-strike-type");
        return $(`#fighter${fighter_number}_${strike_action}_line`);
    }
    static close_significant_strike_option() {
        $(".significant_strike_option").removeClass("significant_strike_option_active");
        SimulationPanel.get_current_fighter_line().find(".significant_strike").addClass("hidden");
    }
    static open_significant_strike_option() {
        SimulationPanel.get_current_fighter_line().find(".significant_strike").removeClass("hidden");
    }
    static close_destination_map() {
        $(".strike_possible_destination").removeClass("strike_possible_destination_active");
        SimulationPanel.get_current_fighter_line().find(".strike_map_destination").addClass("hidden");
    }
    static open_destination_map() {
        SimulationPanel.get_current_fighter_line().find(".strike_map_destination").removeClass("hidden");
    }
    static hide_simulation_active() {
        simulation_active = false;
        this.close_destination_map();
        this.close_significant_strike_option();
        $(".strike_card_item").removeClass("strike_card_selected");
        $(".time_control_banner").addClass("hidden");
        $(".fighter_body_image").removeClass("hidden");
        $("#btn_start_simulation").text("Start Simulation");
        $(".round_selector_section").removeClass("disabled");
        $(".fight_status_section").addClass("hidden");
        $(".fighter_hits_info").removeClass("hidden");
        $(".miscellaneous_strikes").addClass("hidden");
    }
    static show_simulation_active() {
        simulation_active = true;
        $(".time_control_banner").removeClass("hidden");
        $(".fighter_body_image").addClass("hidden");
        $("#btn_start_simulation").text("Stop simulation");
        $(".round_selector_section").addClass("disabled");
        $(".fight_status_section").removeClass("hidden");
        $(".fighter_hits_info").addClass("hidden");
        $(".miscellaneous_strikes").removeClass("hidden");
        $(".strikeregister").removeClass("hidden");
    }
    static fetch_strike_attributs() {
        let fighter_number = $(".strike_card_selected").attr("data-fighter-number");
        let action = $(".strike_card_selected").attr("data-strike-type");
        let target = $(".strike_card_selected").attr("data-strike-target");
        let sig_strike = $(".significant_strike_option_active").attr("data-strike-sig");
        let fight_status = $(".fight_status_active").attr("data-fight-status");
        let round_time = $("#round_time_counter").attr("data-time-seconds");
        return { fighter_number, action, target, sig_strike, fight_status, round_time };
    }
    static abort_simulation_active() {
        this.hide_simulation_active();
        $(".strikeregister").addClass("hidden");
        $("#simulation_resume_modal").addClass("hidden");
    }
    static pause_simulation() {
        // $(".strike_card").addClass("disabled");
        $(".icon_pause").addClass("hidden");
        $(".icon_play").removeClass("hidden");
        $("#btn_start_simulation").removeClass("disabled");
    }
    static resume_simulation() {
        // $(".strike_card").removeClass("disabled");
        $(".icon_pause").removeClass("hidden");
        $(".icon_play").addClass("hidden");
        $("#btn_start_simulation").addClass("disabled");
    }
    static select_round(round_id) {

        if (round_id == 0) {
            $("#round_number").text("All");
            $("#btn_start_simulation").addClass("disabled");
        } else {
            $("#round_number").text(round_id);
            $("#btn_start_simulation").removeClass("disabled");
        }
        $(".round_selector").removeClass("current_round");
        $("#round_selector_" + round_id).addClass("current_round");
    }
    static highlight_rollback() {
        $(".timer").removeClass("highlight-removed");
        $(".timer").addClass("highlight");
        setTimeout(() => {
            $(".timer").addClass("highlight-removed");
        }, 300);
    }
}