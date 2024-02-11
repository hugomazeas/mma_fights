class InputTracker {
    #tracking_fighter_number;
    constructor() {
        this.setTrackingFighterNumber(1);
    }
    activeTracker() {
        let _this = this;
        $(document).keydown(function (e) {
            let key = e.key;
            let fighter_number = _this.getTrackingFighterNumber();
            switch (key) {
                case 'q':
                    $(".fight_status_fighter" + fighter_number).removeClass("fight_status_active");
                    $("#fighter" + fighter_number + "_status_standing").addClass("fight_status_active");
                    break;
                case 'w':
                    $(".fight_status_fighter" + fighter_number).removeClass("fight_status_active");
                    $("#fighter" + fighter_number + "_status_clinch").addClass("fight_status_active");
                    break;
                case 'e':
                    $(".fight_status_fighter" + fighter_number).removeClass("fight_status_active");
                    $("#fighter" + fighter_number + "_status_ground").addClass("fight_status_active");
                    break;
                case 'Shift':
                    $(".takedown_result").addClass("hidden");
                    $("#takedown_result_fighter" + fighter_number).removeClass("hidden");
                    break;
                case '1':
                    _this.setTrackingFighterNumber(1);
                    break;
                case '2':
                    _this.setTrackingFighterNumber(2);
                    break;
            }
        });
    }
    setTrackingFighterNumber(fighter_number) {
        this.#tracking_fighter_number = fighter_number;
        console.log("Tracking fighter number: " + this.#tracking_fighter_number);
    }
    getTrackingFighterNumber() {
        return this.#tracking_fighter_number;
    }
}