class SimulationPanel {
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
    static select_sig_strike_card(sig_strike) {
        $(".significant_strike_option").css("opacity", "50%").removeClass("significant_strike_option_active");
        if (sig_strike) {
            $(".significant_strike_option[data-strike-sig='" + sig_strike + "']").addClass("significant_strike_option_active");
            $(".significant_strike_option[data-strike-sig='" + sig_strike + "']").css("opacity", "100%");
        }
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
}