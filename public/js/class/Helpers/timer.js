class Timer {
    constructor(round_time_ms) {
        this.round_time_ms = round_time_ms;
        this.isRunning = false;
        this.intervalId = null;
        this.elapsedTime = 0;
        this.factor = 1;
    }
    start(interval) {
        if (!this.isRunning) {
            this.isRunning = true;
            this.intervalId = setInterval(() => {
                this.elapsedTime += interval * this.factor;
                if (this.elapsedTime >= this.round_time_ms * 1000) {
                    this.stop();
                }
                this.update_view();
            }, interval);
        }
    }
    update_view() {
        $("#round_time_counter").text(to_MM_SS_MS(this.elapsedTime));
        $("#round_time_counter").attr("data-time-seconds", Math.floor(this.elapsedTime / 1000));
        $("#round_time_max").text(to_MM_SS_MS(this.round_time_ms * 1000));
    }
    rollback_seconds(seconds) {
        if (this.elapsedTime > seconds * 1000)
            this.elapsedTime -= seconds * 1000;
        else
            this.elapsedTime = 0;
    }
    forward_seconds(seconds) {
        if (this.elapsedTime < this.round_time_ms * 1000 - seconds * 1000)

            this.elapsedTime += seconds * 1000;
    }
    stop() {
        if (this.isRunning) {
            clearInterval(this.intervalId);
            this.isRunning = false;
        }
    }
    get_elapse_time() {
        return this.elapsedTime;
    }
    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.update_view();
    }
    finish() {
        this.stop();
        this.elapsedTime = this.round_time_ms * 1000;
        this.update_view();
    }

    set_factor(newFactor) {
        this.factor = newFactor;
    }
}