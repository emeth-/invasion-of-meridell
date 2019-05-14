function move_enemies() {

    var invaderz_htmlz = "";
    var sack_attempt, attack_attempt, move_attempt;

    var messages = [];

    for(var index=0; index<window.enemies.length; index++) {
        var e = window.enemies[index];
        var e_square = $('img[data-name="'+window.enemies[index].name+'"]');
        var e_i = parseInt(e_square.attr('data-boardi'));
        var e_j = parseInt(e_square.attr('data-boardj'));

        //j = horizontal
        //i = vertical

        //invader attack pattern...
        //1 = i-1
        //2 = i+1
        //3 = i-1, j-1
        //4 = j-1
        //5 = i+1, j-1
        //6 = i-1, j+1
        //7 = j+1
        //8 = i+1, j+1

        //alternate invader attack pattern
        //1 = i-1
        //2 = i+1
        //3 = i-1, j+1
        //4 = j+1
        //5 = i+1, j+1
        //6 = i+1, j-1
        //7 = j-1
        //8 = i-1, j-1


        //Steps...
        //Invader checks to see if any adjacent villages. If so, moves there.
        //Invader checks to see if any adjacent fighters. If so, attacks them.
        //Invader
        sack_attempt = invader_sack_attempt(e_i, e_j);
        if (sack_attempt) {
            messages.push(sack_attempt);
        }
        else {
            attack_attempt = invader_attack_attempt(e_i, e_j)
            if (attack_attempt) {
                messages.push(attack_attempt);
            }
            else {
                move_attempt = invader_move_attempt(e_i, e_j);
            }
        }

        //var convert_square = $('img[data-name="'+window.enemies[i].name+'"]');
        //set_square_to_blank(convert_square.attr('data-boardi'), convert_square.attr('data-boardj'));
    }

    console.log("****messages", messages);
    invaderz_htmlz += `
    <center>
        <ul style='text-align:left'>
            <li style="list-style:none;"><b>Invaders move.</b></li>`;

    for (var mi=0; mi<messages.length; mi++) {
        invaderz_htmlz += `<li>`+messages[mi]+`</li>`;
    }

    invaderz_htmlz += `
        </ul>
        <br><br>
    </center>
    `;
    $('#person_attack_text').html(invaderz_htmlz);

}

function invader_move_execute(from_i, from_j, to_i, to_j) {
    console.log("invader_move_execute", from_i, from_j, to_i, to_j);
    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');

    //new square is set to blank first
    set_square_to_blank(to_i, to_j);

    //Team member is now on new square
    to_square_html.attr('src', from_square_html.attr('src'));
    to_square_html.attr('data-type', from_square_html.attr('data-type'));
    to_square_html.attr('data-name', from_square_html.attr('data-name'));

    //Old square is set to blank
    set_square_to_blank(from_i, from_j);
}

function do_invader_attack(enemy_data, team_member_data) {
    var htmlz = "";
    var damage_message = " ";

    var roll = Math.floor(Math.random() * 20 + 1);
    console.log("enemy_data", enemy_data);
    var total_attack = enemy_data.bonus_attack_strength + roll;
    var total_damage = total_attack - team_member_data.base_defense_strength;

    if (total_damage < 0) {
        total_damage = 0;
    }
    team_member_data.health = team_member_data.health - total_damage;
    if (team_member_data.health < 0) {
        team_member_data.health = 0;
    }

    if (total_damage) {
        damage_message = `${enemy_data.name} has <b>struck ${team_member_data.name}</b> for ${total_damage} points!`;
    }
    else {
        damage_message = `${enemy_data.name} attacks and misses ${team_member_data.name}.`;
    }

    if (team_member_data.health == 0) {
        damage_message += ` </li><li><b>${team_member_data.name} has been converted!</b>`;
    }

    convert_team_members_at_zero_health();
    render_pets_stats();

    return damage_message;
}



function invader_attack_execute(i, j, test_i, test_j) {
    var enemy_name = $("#i"+i+"j"+j).find('img').attr('data-name');
    var team_member_name = $("#i"+test_i+"j"+test_j).find('img').attr('data-name');

    var team_member_data = get_team_member_by_name(team_member_name);
    var enemy_data = get_enemy_by_name(enemy_name);

    return do_invader_attack(enemy_data, team_member_data);
}

function invader_attack_attempt(i, j) {
    //j = horizontal
    //i = vertical

    //invader attack pattern...
    //1 = i-1
    //2 = i+1
    //3 = i-1, j-1
    //4 = j-1
    //5 = i+1, j-1
    //6 = i-1, j+1
    //7 = j+1
    //8 = i+1, j+1

    var test_i, test_j, to_square_datatype;

    //1 = i-1
    test_i = i-1;
    test_j = j;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }

    //2 = i+1
    test_i = i+1;
    test_j = j;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }

    //3 = i-1, j-1
    test_i = i-1;
    test_j = j-1;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }

    //4 = j-1
    test_i = i;
    test_j = j-1;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }

    //5 = i+1, j-1
    test_i = i+1;
    test_j = j-1;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }

    //6 = i-1, j+1
    test_i = i-1;
    test_j = j+1;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }

    //7 = j+1
    test_i = i;
    test_j = j+1;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }

    //8 = i+1, j+1
    test_i = i+1;
    test_j = j+1;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "team") {
        return invader_attack_execute(i, j, test_i, test_j);
    }



    //NOTE - an alternate attack pattern exists.
    //It's not as common, and seems to be randomly assigned to certain enemies.
    //We'll ignore it for now, other than noting it here in the comments.


    //alternate invader attack pattern
    //1 = i-1
    //2 = i+1
    //3 = i-1, j+1
    //4 = j+1
    //5 = i+1, j+1
    //6 = i+1, j-1
    //7 = j-1
    //8 = i-1, j-1



    return false;
}

function invader_sack_attempt(i, j) {
    console.log("invader_sack", i, j);
    //Invader move pattern
    //1 = i+1
    //2 = i+1, j + or - 1 (random)
    //3 = j + or - 1 (random)
    //return true if move made, false if no move made

    var test_i, test_j, to_square_datatype;


    var enemy_name = $("#i"+i+"j"+j).find('img').attr('data-name');
    var enemy_data = get_enemy_by_name(enemy_name);

    //1 = i+1
    test_i = i+1;
    test_j = j;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "village") {
        invader_move_execute(i, j, test_i, test_j);
        return `${enemy_data.name} <b>sacked a village</b>!`;
    }

    //2 = i+1, j + or - 1 (random)
    test_i = i+1;
    rand_j_delta = random_1_or_n1();
    test_j = j+rand_j_delta;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "village") {
        invader_move_execute(i, j, test_i, test_j);
        return `${enemy_data.name} <b>sacked a village</b>!`;
    }

    test_i = i+1;
    test_j = j+(rand_j_delta*-1);

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "village") {
        invader_move_execute(i, j, test_i, test_j);
        return `${enemy_data.name} <b>sacked a village</b>!`;
    }

    //3 = j + or - 1 (random)
    test_i = i;
    rand_j_delta = random_1_or_n1();
    test_j = j+rand_j_delta;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "village") {
        invader_move_execute(i, j, test_i, test_j);
        return `${enemy_data.name} <b>sacked a village</b>!`;
    }

    test_i = i;
    test_j = j+(rand_j_delta*-1);

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "village") {
        invader_move_execute(i, j, test_i, test_j);
        return `${enemy_data.name} <b>sacked a village</b>!`;
    }

    return false;
}

function invader_move_attempt(i, j) {
    console.log("invader_move", i, j);
    //Invader move pattern
    //1 = i+1
    //2 = i+1, j + or - 1 (random)
    //3 = j + or - 1 (random)
    //return true if move made, false if no move made


    var test_i, test_j, to_square_datatype;

    //1 = i+1
    test_i = i+1;
    test_j = j;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "blank" || to_square_datatype == "potion" || to_square_datatype == "attack_item" || to_square_datatype == "defense_item") {
        invader_move_execute(i, j, test_i, test_j);
        return true;
    }

    //2 = i+1, j + or - 1 (random)
    test_i = i+1;
    rand_j_delta = random_1_or_n1();
    test_j = j+rand_j_delta;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "blank" || to_square_datatype == "potion" || to_square_datatype == "attack_item" || to_square_datatype == "defense_item") {
        invader_move_execute(i, j, test_i, test_j);
        return true;
    }

    test_i = i+1;
    test_j = j+(rand_j_delta*-1);

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "blank" || to_square_datatype == "potion" || to_square_datatype == "attack_item" || to_square_datatype == "defense_item") {
        invader_move_execute(i, j, test_i, test_j);
        return true;
    }

    //3 = j + or - 1 (random)
    test_i = i;
    rand_j_delta = random_1_or_n1();
    test_j = j+rand_j_delta;

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "blank" || to_square_datatype == "potion" || to_square_datatype == "attack_item" || to_square_datatype == "defense_item") {
        invader_move_execute(i, j, test_i, test_j);
        return true;
    }

    test_i = i;
    test_j = j+(rand_j_delta*-1);

    to_square_datatype = $("#i"+test_i+"j"+test_j).find('img').attr('data-type');
    if (to_square_datatype == "blank" || to_square_datatype == "potion" || to_square_datatype == "attack_item" || to_square_datatype == "defense_item") {
        invader_move_execute(i, j, test_i, test_j);
        return true;
    }

    return false;
}

function board_click(i, j) {

    var clicked_square_html = $("#i"+i+"j"+j).find('img');

    console.log("board clicked", i, j, clicked_square_html);

    console.log(clicked_square_html.attr('data-type'), " CLICKED");

    //If a member of my team was clicked
    if (clicked_square_html.attr('data-type') == 'team') {

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

        //If I have a member of my team selected.
        var selected_team_member = $('img[data-selected]');
        if (selected_team_member.length) {

            //Move them
            var selected_team_member_i = selected_team_member.attr('data-boardi');
            var selected_team_member_j = selected_team_member.attr('data-boardj');

            var error = is_invalid_move(selected_team_member_i, selected_team_member_j, i, j);
            if (error) {
                alert(error);
                return;
            }

            move_team_member(selected_team_member_i, selected_team_member_j, i, j);
        }
    }

    //If an attack/defense item square was clicked
    else if (clicked_square_html.attr('data-type') == 'attack_item' || clicked_square_html.attr('data-type') == 'defense_item') {

        //If I have a member of my team selected.
        var selected_team_member = $('img[data-selected]');
        if (selected_team_member.length) {

            var selected_team_member_i = selected_team_member.attr('data-boardi');
            var selected_team_member_j = selected_team_member.attr('data-boardj');

            var error = is_invalid_move(selected_team_member_i, selected_team_member_j, i, j);
            if (error) {
                alert(error);
                return;
            }

            var team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));
            console.log("Selected team member...", selected_team_member.attr('data-name'), team_member_data)

            var drop_item_name = "";
            var drop_item_img = "";
            var drop_item_type = "";
            var drop_item_i = "";
            var drop_item_j = "";

            //Pickup item
            if (clicked_square_html.attr('data-type') == 'attack_item') {

                if (team_member_data.attack_item_name) {
                    //team member already holding an item, so drop it.
                    drop_item_name = team_member_data.attack_item_name;
                    drop_item_img = team_member_data.attack_item_img;
                    drop_item_type = clicked_square_html.attr('data-type');
                    drop_item_i = selected_team_member_i;
                    drop_item_j = selected_team_member_j;
                }

                team_member_data.attack_item_name = clicked_square_html.attr('data-name');
                team_member_data.attack_item_img = clicked_square_html.attr('src');
            }
            if (clicked_square_html.attr('data-type') == 'defense_item') {
                if (team_member_data.defense_item_name) {
                    //team member already holding an item, so drop it.
                    drop_item_name = team_member_data.defense_item_name;
                    drop_item_img = team_member_data.defense_item_img;
                    drop_item_type = clicked_square_html.attr('data-type');
                    drop_item_i = selected_team_member_i;
                    drop_item_j = selected_team_member_j;
                }

                team_member_data.defense_item_name = clicked_square_html.attr('data-name');
                team_member_data.defense_item_img = clicked_square_html.attr('src');
            }
            render_pets_stats();

            //Move my character
            move_team_member(selected_team_member_i, selected_team_member_j, i, j);

            //Drop old item (if necessary)
            if (drop_item_name) {
                drop_item(drop_item_name, drop_item_img, drop_item_type, drop_item_i, drop_item_j);
            }



        }

    }

    //If an enemy was clicked
    else if (clicked_square_html.attr('data-type') == 'enemy') {

        //If I have a member of my team selected.
        var selected_team_member = $('img[data-selected]');
        if (selected_team_member.length) {

            //Move them
            var selected_team_member_i = selected_team_member.attr('data-boardi');
            var selected_team_member_j = selected_team_member.attr('data-boardj');

            //Commented out for ease of testing
            /*
            var error = is_invalid_move(selected_team_member_i, selected_team_member_j, i, j);
            if (error) {
                alert(error);
                return;
            }
            */
            var team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));
            var enemy_data = get_enemy_by_name(clicked_square_html.attr('data-name'));
            console.log( team_member_data, enemy_data  );
            do_attack(team_member_data, enemy_data);
            convert_enemies_at_zero_health();
            render_pets_stats();


            // Unselect this team member
            selected_team_member.attr('src', selected_team_member.attr('data-selected'));
            selected_team_member.removeAttr('data-selected');

        }
    }
}

function convert_team_members_at_zero_health() {
    for (var i=0; i<window.my_team.length; i++) {
        if (window.my_team[i].health <= 0) {
            //Add enemy
            var new_soldier = generate_enemy_from_conversion(window.my_team[i].breed, window.my_team[i].name, window.my_team[i].base_attack_strength, window.my_team[i].base_defense_strength)
            window.enemies.push(new_soldier);

            //my team member location
            var convert_square = $('img[data-name="'+window.my_team[i].name+'"]');
            set_square_to_blank(convert_square.attr('data-boardi'), convert_square.attr('data-boardj'));

            //insert our new enemy at this blank square
            convert_square.attr('src', new_soldier['image']);
            convert_square.attr('data-type', new_soldier['type']);
            convert_square.attr('data-name', new_soldier['name']);

            //Remove my team member
            window.my_team.splice(i, 1);
        }
    }
}

function convert_enemies_at_zero_health() {
    for (var i=0; i<window.enemies.length; i++) {
        if (window.enemies[i].health <= 0) {
            //Add ally
            var new_soldier = generate_team_member(window.enemies[i].breed, get_next_available_team_name(window.my_team.length));
            window.my_team.push(new_soldier);

            //enemy location
            var convert_square = $('img[data-name="'+window.enemies[i].name+'"]');
            set_square_to_blank(convert_square.attr('data-boardi'), convert_square.attr('data-boardj'));

            //insert our new team member at this blank square
            convert_square.attr('src', new_soldier['image']);
            convert_square.attr('data-type', new_soldier['type']);
            convert_square.attr('data-name', new_soldier['name']);

            //Remove enemy
            window.enemies.splice(i, 1);
        }
    }
}

function do_attack(team_member_data, enemy_data) {
    var htmlz = "";
    var damage_message = "";

    var roll = Math.floor(Math.random() * 20 + 1);
    var weapon_bonus = get_item_bonus(team_member_data.attack_item_name, team_member_data.breed);
    var total_attack = team_member_data.bonus_attack_strength + weapon_bonus + roll;
    var total_damage = total_attack - enemy_data.base_defense_strength;
    if (total_damage < 0) {
        total_damage = 0;
    }
    enemy_data.health = enemy_data.health - total_damage;
    if (enemy_data.health < 0) {
        enemy_data.health = 0;
    }

    if (total_damage) {
        damage_message = `${team_member_data.name} has struck ${enemy_data.name} for ${total_damage} points.`;
    }
    else {
        damage_message = `${team_member_data.name} attacks and misses ${enemy_data.name}`;
    }

    var saved_message = "";
    if (enemy_data.health == 0) {
        saved_message = `<ul style='text-align:left'>
            <li>${team_member_data.name} has saved an Invader!</li>
        </ul>`;
    }

    htmlz += `
    <center>
        <ul style='text-align:left'>
            <li>${damage_message}</li>
        </ul>
        <table class="attack_table">
            <tr>
                <td>Attack Str. Bonus</td>
                <td>Weapon Bonus</td>
                <td>Roll (1-20)</td>
                <td>Total</td>
            </tr>
            <tr>
                <td>${team_member_data.bonus_attack_strength}</td>
                <td>${weapon_bonus}</td>
                <td>${roll}</td>
                <td>${total_attack}</td>
            </tr>
            <tr>
                <td colspan=3 style="text-align:right">${enemy_data.name} Defence:</td>
                <td>${enemy_data.base_defense_strength}</td>
            </tr>
            <tr>
                <td colspan=3 style="text-align:right">Damage:</td>
                <td>${total_damage}</td>
            </tr>
            <tr>
                <td colspan=3 style="text-align:right">${enemy_data.name} Health:</td>
                <td>${enemy_data.health}</td>
            </tr>
        </table>
        ${saved_message}
        <br><br>
    </center>
    `;
    $('#person_attack_text').html(htmlz);
}

function drop_item(item_name, item_img, item_type, i, j) {

    var square_html = $("#i"+i+"j"+j).find('img');

    set_square_to_blank(i, j);

    //Team member is now on new square
    square_html.attr('src', item_img);
    square_html.attr('data-type', item_type);
    square_html.attr('data-name', item_name);
}

function is_invalid_move(from_i, from_j, to_i, to_j) {
    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');
    var error = "";

    //Confirm the movement is a max of 1 unit in any direction.
    if (Math.abs(from_i - to_i) > 1 || Math.abs(from_j - to_j) > 1) {
        error = "Unit cannot move more than one square in any direction."
    }
    if (!error) {
        return false;
    }
    else {
        return error;
    }
}

function move_team_member(from_i, from_j, to_i, to_j) {

    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');

    //Team member is now on new square
    to_square_html.attr('src', from_square_html.attr('data-selected'));
    to_square_html.attr('data-type', from_square_html.attr('data-type'));
    to_square_html.attr('data-name', from_square_html.attr('data-name'));

    //Old square is set to blank
    set_square_to_blank(from_i, from_j);

    //Clear any old attack text
    $('#person_attack_text').html('');
}

function set_square_to_blank(i, j) {

    var square_html = $("#i"+i+"j"+j).find('img');

    square_html.attr('src', 'images/blank.png');
    square_html.attr('data-type', 'blank');
    square_html.attr('data-name', '');
    square_html.removeAttr('data-selected');
}
