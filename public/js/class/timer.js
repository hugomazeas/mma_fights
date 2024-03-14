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
                if(this.elapsedTime >= this.round_time_ms){
                    this.stop();
                }
                $("#round_time").text(to_MM_SS_MS(this.elapsedTime));
                console.log(`Elapsed time: ${this.elapsedTime}ms`);
            }, interval);
        }
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
    }

    set_factor(newFactor) {
        this.factor = newFactor;
    }
}