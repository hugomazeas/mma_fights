class Fighter {
    constructor(first_name, last_name, nickname, weight, height, stance, reach, background, behavior_tags, moves, fighter_id = null) {
        if (!first_name || first_name === "") {
            throw new Error("First name is required");
        }
        if (!last_name || last_name === "") {
            throw new Error("Last name is required");
        }
        if (!nickname || nickname === "") {
            throw new Error("Nickname is required");
        }
        if (!weight || weight === "") {
            throw new Error("Weight is required");
        }
        if (!height || height === "") {
            throw new Error("Height is required");
        }
        if (!stance || stance === "") {
            throw new Error("Stance is required");
        }
        if (!reach || reach === "") {
            throw new Error("Reach is required");
        }
        if (!background || background === "") {
            throw new Error("Background is required");
        }
        if (isNaN(weight)) {
            throw new Error("Weight must be a number");
        }
        if (isNaN(reach)) {
            throw new Error("Reach must be a number");
        }

        this.fighter_id = fighter_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.nickname = nickname;
        this.weight = weight;
        this.height = height;
        this.stance = stance;
        this.reach = reach;
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
        if(confirm("Are you sure you want to delete this fighter?") === false) return;
        Facade.send_ajax_request('/api/fighter/' + fighter_id, 'DELETE', true, null, function () {
            Facade.refresh_page();
        });
    }
}