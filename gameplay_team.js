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
            window.turns_left = window.turns_left - 1;
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
            var drop_message = "";
            var pickup_message = "";

            //Pickup item
            if (clicked_square_html.attr('data-type') == 'attack_item') {

                if (team_member_data.attack_item_name) {
                    //team member already holding an item, so drop it.
                    drop_item_name = team_member_data.attack_item_name;
                    drop_item_img = team_member_data.attack_item_img;
                    drop_item_type = clicked_square_html.attr('data-type');
                    drop_item_i = selected_team_member_i;
                    drop_item_j = selected_team_member_j;
                    drop_message = selected_team_member.attr('data-name') + "'s " + item_lookup[drop_item_name].title + " is dropped";
                }

                team_member_data.attack_item_name = clicked_square_html.attr('data-name');
                team_member_data.attack_item_img = clicked_square_html.attr('src');
                pickup_message = selected_team_member.attr('data-name')+" picks up a "+item_lookup[clicked_square_html.attr('data-name')].title+" worth "+get_item_bonus(team_member_data.attack_item_name, team_member_data.breed)+" attack point(s)!";
            }
            if (clicked_square_html.attr('data-type') == 'defense_item') {
                if (team_member_data.defense_item_name) {
                    //team member already holding an item, so drop it.
                    drop_item_name = team_member_data.defense_item_name;
                    drop_item_img = team_member_data.defense_item_img;
                    drop_item_type = clicked_square_html.attr('data-type');
                    drop_item_i = selected_team_member_i;
                    drop_item_j = selected_team_member_j;
                    drop_message = selected_team_member.attr('data-name') + "'s " + item_lookup[drop_item_name].title + " is dropped";
                }

                team_member_data.defense_item_name = clicked_square_html.attr('data-name');
                team_member_data.defense_item_img = clicked_square_html.attr('src');
                pickup_message = selected_team_member.attr('data-name')+" picks up a "+item_lookup[clicked_square_html.attr('data-name')].title+" worth "+get_item_bonus(team_member_data.defense_item_name, team_member_data.breed)+" defense point(s)!";
            }
            render_pets_stats();

            //Move my character
            move_team_member(selected_team_member_i, selected_team_member_j, i, j);
            window.turns_left = window.turns_left - 1;

            //Drop old item (if necessary)
            if (drop_item_name) {
                drop_item(drop_item_name, drop_item_img, drop_item_type, drop_item_i, drop_item_j);
            }



            if (drop_message) {
                drop_message = `<li>${drop_message}</li>`;
            }
            if (pickup_message) {
                pickup_message = `<li>${pickup_message}</li>`;
            }
            var htmlz = "";
            if (drop_message || pickup_message) {
                htmlz += `
                <center>
                    <ul style='text-align:left'>
                        ${drop_message}
                        ${pickup_message}
                    </ul>
                    <br><br>
                </center>
                `;
            }
            $('#person_attack_text').html(htmlz);



        }

    }


    //If a potion item square was clicked
    else if (clicked_square_html.attr('data-type') == 'potion') {

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

            var pickup_message = "";
            var tm_health = team_member_data.health;

            //---During the First Wave (Missions 1-5) your troops can have a maximum of 18 points.
            //---During the Second Wave (Missions 6-10) your troops can have a maximum of 21 points.

            if ((tm_health >= 18 && mission <= 5) || tm_health >= 21) {
                pickup_message = selected_team_member.attr('data-name')+" consumes the "+clicked_square_html.attr('data-name').replace(/[_]/g, ' ').replace('-', ' ')+", but it has no effect (already at max health).";
            }
            else {
                var max_health = 21;
                if (mission <= 5) {
                    max_health = 18;
                }
                var health_gain = max_health - team_member_data.health;
                team_member_data.health = max_health;
                pickup_message = selected_team_member.attr('data-name')+" consumes the "+clicked_square_html.attr('data-name').replace(/[_]/g, ' ').replace('-', ' ')+", gaining "+health_gain+" health.";
            }

            render_pets_stats();

            //Move my character
            move_team_member(selected_team_member_i, selected_team_member_j, i, j);
            window.turns_left = window.turns_left - 1;

            var htmlz = "";
            if (pickup_message) {
                htmlz += `
                <center>
                    <ul style='text-align:left'>
                        <li>${pickup_message}</li>
                    </ul>
                    <br><br>
                </center>
                `;
            }
            $('#person_attack_text').html(htmlz);



        }

    }

    //If a treasure item square was clicked
    else if (clicked_square_html.attr('data-type') == 'treasure') {

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
            var treasure_name = clicked_square_html.attr('data-name');
            var treasure_name_formatted = treasure_name.replace(/[_]/g, ' ');
            var treasure_img = clicked_square_html.attr('src');

            if (!lost_items_retrieved.includes(treasure_name)) {
                for (var i=0; i<window.my_team.length; i++) {
                    window.my_team[i].base_attack_strength += 1;
                    window.my_team[i].bonus_attack_strength = attack_strength_bonus_calc(window.my_team[i].base_attack_strength);
                    window.my_team[i].base_defense_strength += 1;
                }
                lost_items_retrieved.push(treasure_name);
            }
            console.log("Selected team member...", selected_team_member.attr('data-name'), team_member_data)

            render_pets_stats();
            move_team_member(selected_team_member_i, selected_team_member_j, i, j);

            var htmlz = "";
            htmlz += `
            <center>
            <ul style='text-align:left'>
                <li>You found the ${treasure_name_formatted}! Hooray!</li>
            </ul>
                `;

            htmlz += `
<img src="${treasure_img}" border="2" height="50" width="50" style="border: 1px solid #0000FF;" onclick="clicked_item_popup('${treasure_name}')" class="clickable">
            `;

            htmlz += `
            <ul style='text-align:left'>
                <li>The returned lost item boosts everyone's attack and defence strength by 1 point!</li>
                <li>It also earns you 50 <span style='text-decoration:line-through'>neopoints</span> internet points!</li>
            </ul>

                <br><br>
            </center>
            `;
            $('#person_attack_text').html(htmlz);

            window.turns_left = window.turns_left - 1;


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
            window.turns_left = window.turns_left - 1;


            // Unselect this team member
            selected_team_member.attr('src', selected_team_member.attr('data-selected'));
            selected_team_member.removeAttr('data-selected');

        }
    }
    render_top_message();
}

function convert_team_members_at_zero_health() {
    for (var i=0; i<window.my_team.length; i++) {
        if (window.my_team[i].health <= 0) {
            //Add enemy
            var new_soldier = generate_enemy_from_conversion(window.my_team[i].breed, window.my_team[i].name)
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
          if(window.enemies[i].breed == 'Buzz') {
              //enemy location
              var convert_square = $('img[data-name="'+window.enemies[i].name+'"]');
              set_square_to_blank(convert_square.attr('data-boardi'), convert_square.attr('data-boardj'));

              //insert a smoking crater at this blank square
              convert_square.attr('src', 'images/Smoking_Crater.jpg');
              convert_square.attr('data-type', 'crater');

              //Remove enemy
              window.enemies.splice(i, 1);
          }
          else {
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

    if (window.enemies.length < 2) {
        var treasure = $("img[data-type=treasure]");
        if (treasure && treasure.attr('data-boardi')) {
            set_square_to_blank(treasure.attr('data-boardi'), treasure.attr('data-boardj'));
        }
    }
}

function do_attack(team_member_data, enemy_data) {
    var htmlz = "";
    var damage_message = "";

    var roll = Math.floor(Math.random() * 20 + 1);
    roll = 20;
    var weapon_bonus = get_item_bonus(team_member_data.attack_item_name, team_member_data.breed);
    weapon_bonus = 10;
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
