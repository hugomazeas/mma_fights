class StrikeTimeline {
    static timelines = {};

    static init_timeline(fighter_number) {
        // Initialize timeline
        $("#strikes_progressbar_" + fighter_number).empty();
        let container = document.getElementById('strikes_progressbar_' + fighter_number);
        let items = new vis.DataSet([]);

        // Calculate minutes and seconds for 5 minutes
        let startTime = vis.moment().hours(0).minutes(0).seconds(0).milliseconds(0);
        let endTime = vis.moment(startTime).add(5, 'minutes'); // Ensure 5 minutes are added

        // Configuration for the Timeline
        let options = {
            showCurrentTime: false,
            start: startTime,
            end: endTime,
            editable: false,
            zoomable: false,
            moveable: false,
            format: {
                minorLabels: function(date, scale, step) {
                    // Format minor labels to show minutes and seconds
                    return vis.moment(date).format('mm:ss');
                },
                majorLabels: function(date, scale, step) {
                    // Optionally, adjust major labels if needed
                    return vis.moment(date).format('mm:ss');
                }
            },
        };

        let timeline = new vis.Timeline(container, items, options);
        timeline.setWindow(startTime, endTime);

        StrikeTimeline.timelines[fighter_number] = { items, timeline };

    }

    static add_strike(fighter_number, strike) {
        let timelineData = StrikeTimeline.timelines[fighter_number];
        if (!timelineData) {
            console.error("Timeline not initialized for fighter number:", fighter_number);
            return;
        }

        let items = timelineData.items;


        var strikeTime = vis.moment().add(strike.round_time, 'seconds'); // Use round_time directly in seconds
        var description = `${strike.action.toUpperCase()} to ${strike.strike_target?.toUpperCase()} (${strike.sig_strike ? 'Successful' : 'Unsuccessful'})`;

        items.add({
            id: items.length + 1, // Incremental ID based on the length of the dataset
            content: description,
            start: strikeTime
        });
23    }
    static add_strikes(fighter_number, strikes) {
        let timelineData = StrikeTimeline.timelines[fighter_number];
        let timeline = timelineData.timeline;
        strikes.forEach(strike => {
            this.add_strike(fighter_number, strike);
        });
        timeline.redraw();

    }
    static clear_timeline(fighter_number) {
        let timelineData = StrikeTimeline.timelines[fighter_number];
        if (!timelineData) {
            console.error("Timeline not initialized for fighter number:", fighter_number);
            return;
        }

        timelineData.items.clear();
    }
}
