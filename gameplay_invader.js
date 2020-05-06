function move_enemies() {

    var invaderz_htmlz = "";
    var sack_attempt, attack_attempt, move_attempt;

    var messages = [];

    //Enemies cast enchantments
    for(var index=0; index<window.enemies.length; index++) {
        var e = window.enemies[index];

        if(e.breed == 'Grarrl' || e.breed == 'Buzz') {
            //Has chance to cast enchantment
            var mti = rand(1,5) - 1;
            console.log("**sb1", mti, window.my_team, window.my_team[mti]);
            var mt = window.my_team[mti];
            if(mt) {
                if(mt.breed == 'Grundo' && !mt.enchanted_no_heal) {
                    mt.enchanted_no_heal = 1;
                    messages.push(`${e.name} <b>enchants</b> ${mt.name}, blocking their ability to <b>heal</b>!`);
                }
                if(mt.breed == 'Skeith' && !mt.enchanted_no_teleport) {
                    mt.enchanted_no_teleport = 1;
                    messages.push(`${e.name} <b>enchants</b> ${mt.name}, blocking their ability to <b>teleport</b>!`);
                }
            }
        }
    }

    //Enemies move/sack villages/attack
    var enemies_length = window.enemies.length;
    for(var index=0; index<enemies_length; index++) {
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

    if ($('img[data-type="village"]').length >= 2) {
        refresh_myteam_moves();
    }
    render_top_message();
}


function invader_move_execute(from_i, from_j, to_i, to_j) {
    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');

    //new square is set to blank first
    set_square_to_blank(to_i, to_j);

    //Team member is now on new square
    to_square_html.attr('src', from_square_html.attr('src'));
    to_square_html.attr('data-type', from_square_html.attr('data-type'));
    to_square_html.attr('data-name', from_square_html.attr('data-name'));
    to_square_html.attr('title', from_square_html.attr('title'));

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
        window.villages_unturned = window.villages_unturned - 1;
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
