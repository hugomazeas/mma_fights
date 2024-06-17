class Fighter {
    constructor(first_name, last_name, nickname, weight, height, stance, reach, background, behavior_tags, moves, fighter_id = null) {
        if (!first_name || first_name === "") {
            throw new Error("First name is required");
        }
        if (!last_name || last_name === "") {
            throw new Error("Last name is required");
        }

        this.weight = weight;
        this.height = height; 
        this.reach = reach;
        if (!weight || weight === "") {
            this.weight = 0;
        }
        if (!height || height === "") {
            this.height = 0;
        }
        if (!reach || reach === "") {
            this.reach = 0;
        }

        this.fighter_id = fighter_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.nickname = nickname;
        this.stance = stance;
        this.background = background;
        this.behavior_tags = behavior_tags;
        this.moves_tags = moves;
        this.full_name = first_name + " " + last_name;
    }
    static submit_form() {
        let behavior_tags = [];
        $(".behavior_tags").find(".tags.selected").each(function () {
            behavior_tags.push($(this).attr('data-move-id'));
        });
        let moves = [];
        $(".moves_tags").find(".tags.selected").each(function () {
            moves.push($(this).attr('data-move-id'));
        });
        let fighter;
        try {
            fighter = new Fighter(
                $("[name='first_name']").val(),
                $("[name='last_name']").val(),
                $("[name='nickname']").val(),
                $("[name='weight']").val(),
                $("[name='height']").val(),
                $("[name='stance']").val(),
                $("[name='reach']").val(),
                $("[name='background']").val(),
                behavior_tags.join(","),
                moves.join(",")
            );
        } catch (error) {
            alert(error);
            return;
        }
        Facade.send_ajax_request('/api/fighter', 'POST', true, fighter, function () {
            Facade.refresh_page();
        });
    }
    static delete_fighter(fighter_id) {
        if (confirm("Are you sure you want to delete this fighter?") === false) return;
        Facade.send_ajax_request('/api/fighter/' + fighter_id, 'DELETE', true, null, function () {
            Facade.refresh_page();
        });
    }
}