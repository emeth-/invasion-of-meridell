
function board_click(i, j) {

    var clicked_square_html = $("#i"+i+"j"+j).find('img');

    console.log("board clicked", i, j, clicked_square_html);

    //If a member of my team was clicked
    if (clicked_square_html.attr('data-type') == 'team') {
        console.log("TEAM MEMBER CLICKED");
        //If they were previously selected, unselect them.
        if (clicked_square_html.attr('data-selected')) {
            clicked_square_html.attr('src', clicked_square_html.attr('data-selected'));
            clicked_square_html.removeAttr('data-selected');
        }
        else { //Else...

            // Unselect any other team members that were selected...
            $('img[data-selected]').each(function(){
                $(this).attr('src', $(this).attr('data-selected'));
                $(this).removeAttr('data-selected');
            });

            // Select this team member
            clicked_square_html.attr('data-selected', clicked_square_html.attr('src'));
            clicked_square_html.attr('src', 'images/grey.png');
        }
    }

    //If an empty square was clicked
    else if (clicked_square_html.attr('data-type') == 'blank') {
        console.log("BLANK SQUARE CLICKED");

        //If I have a member of my team selected.
        var selected_team_member = $('img[data-selected]');
        if (selected_team_member.length) {

            //Move them
            var selected_team_member_i = selected_team_member.attr('data-boardi');
            var selected_team_member_j = selected_team_member.attr('data-boardj');
            move_team_member(selected_team_member_i, selected_team_member_j, i, j);

        }
    }

    //If an attack item square was clicked
    else if (clicked_square_html.attr('data-type') == 'attack_item' || clicked_square_html.attr('data-type') == 'defense_item') {
        console.log("Attack/Defense Item SQUARE CLICKED");

        //If I have a member of my team selected.
        var selected_team_member = $('img[data-selected]');
        if (selected_team_member.length) {

            var selected_team_member_i = selected_team_member.attr('data-boardi');
            var selected_team_member_j = selected_team_member.attr('data-boardj');

            var team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));
            console.log("Selected team member...", selected_team_member.attr('data-name'), team_member_data)
            //Pickup item
            if (clicked_square_html.attr('data-type') == 'attack_item') {
                team_member_data.attack_item_name = clicked_square_html.attr('data-name');
                team_member_data.attack_item_img = clicked_square_html.attr('src');
            }
            if (clicked_square_html.attr('data-type') == 'defense_item') {
                team_member_data.defense_item_name = clicked_square_html.attr('data-name');
                team_member_data.defense_item_img = clicked_square_html.attr('src');
            }
            render_pets_stats();

            //Move my character
            move_team_member(selected_team_member_i, selected_team_member_j, i, j);

            //Drop old item (if necessary)
            //TODO


        }

    }

    //defense_item
}

function move_team_member(from_i, from_j, to_i, to_j) {

    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');
    var error = "";

    //Confirm the movement is a max of 1 unit in any direction.
    if (Math.abs(from_i - to_i) > 1 || Math.abs(from_j - to_j) > 1) {
        error = "Unit cannot move more than one square in any direction."
    }

    //Move my selected team member to that square.
    if (!error) {
        //Team member is now on new square
        to_square_html.attr('src', from_square_html.attr('data-selected'));
        to_square_html.attr('data-type', from_square_html.attr('data-type'));
        to_square_html.attr('data-name', from_square_html.attr('data-name'));

        //Old square is set to blank
        from_square_html.attr('src', 'images/blank.png');
        from_square_html.attr('data-type', 'blank');
        from_square_html.attr('data-name', '');
        from_square_html.removeAttr('data-selected');
    }
    else {
        alert(error);
        return false;
    }

    return true;
}


function get_team_member_by_name(name) {
    for (var i=0; i<window.my_team.length; i++) {
        if (window.my_team[i].name == name) {
            return window.my_team[i];
        }
    }
}

function get_enemy_by_name(name) {
    for (var i=0; i<window.enemies.length; i++) {
        if (window.enemies[i].name == name) {
            return window.enemies[i];
        }
    }
}
