class StrikeRegister {
    static display_strike_registers() {
        this.clear_strike_registers();
        $(".fighter1_strike_card").append(this.get_base_html(1));
        $(".fighter2_strike_card").append(this.get_base_html(2));
    }
    static get_base_html(fighter_number) {
        return `
            <div class="strikeregister">
                <h1 class="text-center text-4xl">Strike Bar <small>- Press z to cancel last strike</small></h2>
                <div class="w-130 h-80 overflow-auto border border-gray-700 rounded-md scrollbar bg-gray-800 text-white"
                id="strikeregister_${fighter_number}">

                </div>
            </div>`;
    }
    static add_strike_to_strikeregister(fighter_number, strike) {
        let selector = "#strikeregister_" + fighter_number;
        let length_strikes = current_simulation.strikes.length - 1;
        $(selector).prepend(strike.build_html_display(length_strikes));
    }
    static add_strikes_to_strikeregister(fighter_number, strikes) {
        strikes.forEach(strike => {
            this.add_strike_to_strikeregister(fighter_number, strike);
        });
    }
    static delete_strike(index) {
        current_simulation.strikes.splice(index, 1);
        $(`.delete-btn[data-index="${index}"]`).parent().remove();
    }
    static clear_strike_registers() {
        $(".strikeregister").remove();
    }
    static empty_strike_registers(fighter_number) {
        $("#strikeregister_" + fighter_number).empty();
    }
    
}