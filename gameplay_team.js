function board_click(i, j) {

    var special_top_message = '';
    var clicked_square_html = $("#i"+i+"j"+j).find('img');

    //If a member of my team was clicked
    if (clicked_square_html.attr('data-type') == 'team') {

        var clicked_team_member_data = get_team_member_by_name(clicked_square_html.attr('data-name'));

        if(window.turns_left <= 0) {
           return;
        }
        if(clicked_team_member_data.moves_left <= 0) {
           return;
        }

        //If they were previously selected, unselect them.
        if (clicked_square_html.attr('data-selected')) {
             clicked_square_html.attr('src', clicked_square_html.attr('data-selected'));
             clicked_square_html.removeAttr('data-selected');
        }
        else { //Else...

            var selected_team_member = $('img[data-selected]');
            var selected_team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));

            if(selected_team_member.length && selected_team_member_data.breed == 'Grundo' && selected_team_member_data.attack_item_name == 'Magic_Lightning_Spell') {
              //Grundo Magic_Lightning_Spell healing (Column)

              if(selected_team_member_data.enchanted_no_heal) {
                    render_top_message("Error - Grundo is enchanted and cannot heal!<br>");
                    return;
              }

              var max_health = 21;
              if (mission <= 5) {
                  max_health = 18;
              }

              var heal_amount_base = selected_team_member_data.base_attack_strength + selected_team_member_data.bonus_attack_strength + get_item_bonus(selected_team_member_data.attack_item_name, selected_team_member_data.breed);

              special_top_message = 'Zzzap!!!<br><br>';
              var heal_message = '';
              var attack_text_htmlz = '';
              attack_text_htmlz += `
              <center>
                  <ul style='text-align:left'>
              `;

              $("img[data-type='team'][data-boardj='"+clicked_square_html.attr('data-boardj')+"']").each(function(){
                  var heal_amount = heal_amount_base;
                  var ally_square = $(this);

                  //If ally we are looking at is NOT the grundo casting the heal... heal this ally
                  if(selected_team_member.attr('data-boardi') != ally_square.attr('data-boardi') || selected_team_member.attr('data-boardj') != ally_square.attr('data-boardj') ) {

                    var ally_data = get_team_member_by_name(ally_square.attr('data-name'));
                    var max_health_gain_possible = max_health - ally_data.health;

                    if(max_health_gain_possible < heal_amount) {
                      heal_amount = max_health_gain_possible;
                    }

                    ally_data.health += heal_amount;

                    attack_text_htmlz += "<li>"+selected_team_member.attr('data-name')+" <b>healed "+ally_square.attr('data-name')+"</b> for "+heal_amount+" health.</li>";

                    window.turns_left = window.turns_left - 1;
                  }
              });

              attack_text_htmlz += `
                  </ul>
                  <br><br>
              </center>
              `;
              $('#person_attack_text').html(attack_text_htmlz);

              selected_team_member_data.moves_left -= 1;
              if(selected_team_member_data.attack_item_name == 'Halberd') {
                selected_team_member_data.moves_left += 1;
              }

              // Unselect any other team members that were selected...
              $('img[data-selected]').each(function(){
                  $(this).attr('src', $(this).attr('data-selected'));
                  $(this).removeAttr('data-selected');
              });

              render_pets_stats();

            }
            else if(selected_team_member.length && selected_team_member_data.breed == 'Grundo' && selected_team_member_data.attack_item_name == 'Magic_Force_Spell') {
              //Grundo Magic_Force_Spell healing (Single)

                if(selected_team_member_data.enchanted_no_heal) {
                      render_top_message("Error - Grundo is enchanted and cannot heal!<br>");
                      return;
                }

                var max_health = 21;
                if (mission <= 5) {
                    max_health = 18;
                }

                var grundo_attack_value = selected_team_member_data.base_attack_strength + selected_team_member_data.bonus_attack_strength + get_item_bonus(selected_team_member_data.attack_item_name, selected_team_member_data.breed);
                var heal_amount = parseInt(grundo_attack_value/2);
                var max_health_gain_possible = max_health - clicked_team_member_data.health;

                if(max_health_gain_possible < heal_amount) {
                  heal_amount = max_health_gain_possible;
                }

                clicked_team_member_data.health += heal_amount;

                // Unselect any other team members that were selected...
                $('img[data-selected]').each(function(){
                    $(this).attr('src', $(this).attr('data-selected'));
                    $(this).removeAttr('data-selected');
                });

                var heal_message = selected_team_member.attr('data-name')+" <b>healed "+clicked_square_html.attr('data-name')+"</b> for "+heal_amount+" health.";
                special_top_message = 'Zap!!!<br><br>';

                var htmlz = "";
                htmlz += `
                <center>
                    <ul style='text-align:left'>
                        <li>${heal_message}</li>
                    </ul>
                    <br><br>
                </center>
                `;
                $('#person_attack_text').html(htmlz);
                render_pets_stats();

                selected_team_member_data.moves_left -= 1;
                if(selected_team_member_data.attack_item_name == 'Halberd') {
                  selected_team_member_data.moves_left += 1;
                }
                window.turns_left = window.turns_left - 1;

            }
            else if(selected_team_member.length && selected_team_member_data.breed == 'Techo' && selected_team_member_data.attack_item_name == 'Sword_of_Deflection' && clicked_team_member_data.enchanted_no_teleport) {

                clicked_team_member_data.enchanted_no_teleport = 0;

                // Unselect any other team members that were selected...
                $('img[data-selected]').each(function(){
                    $(this).attr('src', $(this).attr('data-selected'));
                    $(this).removeAttr('data-selected');
                });

                var banish_message = selected_team_member.attr('data-name')+" <b>banished the enchantment</b> on "+clicked_square_html.attr('data-name')+"</b>.";
                special_top_message = 'Woosh!!! Enchantment banished!<br><br><br>';

                var htmlz = "";
                htmlz += `
                <center>
                    <ul style='text-align:left'>
                        <li>${banish_message}</li>
                    </ul>
                    <br><br>
                </center>
                `;
                $('#person_attack_text').html(htmlz);
                render_pets_stats();

                selected_team_member_data.moves_left -= 1;
                if(selected_team_member_data.attack_item_name == 'Halberd') {
                  selected_team_member_data.moves_left += 1;
                }
                window.turns_left = window.turns_left - 1;

            }
            else if(selected_team_member.length && selected_team_member_data.breed == 'Moehog' && selected_team_member_data.defense_item_name == 'Counter_Enchantment_Helmet' && clicked_team_member_data.enchanted_no_heal) {

                clicked_team_member_data.enchanted_no_heal = 0;

                // Unselect any other team members that were selected...
                $('img[data-selected]').each(function(){
                    $(this).attr('src', $(this).attr('data-selected'));
                    $(this).removeAttr('data-selected');
                });

                var banish_message = selected_team_member.attr('data-name')+" <b>banished the enchantment</b> on "+clicked_square_html.attr('data-name')+"</b>.";
                special_top_message = 'Woosh!!! Enchantment banished!<br><br><br>';

                var htmlz = "";
                htmlz += `
                <center>
                    <ul style='text-align:left'>
                        <li>${banish_message}</li>
                    </ul>
                    <br><br>
                </center>
                `;
                $('#person_attack_text').html(htmlz);
                render_pets_stats();

                selected_team_member_data.moves_left -= 1;
                if(selected_team_member_data.attack_item_name == 'Halberd') {
                  selected_team_member_data.moves_left += 1;
                }
                window.turns_left = window.turns_left - 1;

            }
            else {
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
    }

    //If an empty square was clicked
    else if (clicked_square_html.attr('data-type') == 'blank') {

        //If I have a member of my team selected.
        var selected_team_member = $('img[data-selected]');
        if (selected_team_member.length) {

            var was_a_teleport_move = 0;

            //Move them
            var selected_team_member_i = selected_team_member.attr('data-boardi');
            var selected_team_member_j = selected_team_member.attr('data-boardj');

            var selected_team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));
            var error = '';
            error = is_invalid_move(selected_team_member_i, selected_team_member_j, i, j);
            if (error) {
                if(selected_team_member_data.breed == 'Skeith' && selected_team_member_data.defense_item_name == 'Amulet_of_Teleportation' && selected_team_member_data.teleport_used == 0) {
                    if(selected_team_member_data.enchanted_no_teleport) {
                          render_top_message("Error - Skeith is enchanted and cannot teleport!<br>");
                          return;
                    }
                    //Allows teleporting once per turn.
                    error = is_invalid_move_teleport(selected_team_member_i, selected_team_member_j, i, j);
                    if (error) {
                        render_top_message("Cannot teleport to top 3 rows.<br>");
                        return;
                    }
                    selected_team_member_data.teleport_used = 1;
                    was_a_teleport_move = 1;
                    special_top_message = 'Teleported!<br>';
                }
                else {
                    render_top_message("You can only move one square at a time<br>or target is out of range.<br>");
                    return;
                }
            }



            move_team_member(selected_team_member_i, selected_team_member_j, i, j);
            selected_team_member_data.moves_left -= 1;
            if(was_a_teleport_move) {
              if(selected_team_member_data.breed == 'Skeith' && selected_team_member_data.attack_item_name == 'Berserker_Battleaxe') {
                  selected_team_member_data.moves_left += 1;
              }
            }
            if(selected_team_member_data.attack_item_name == 'Halberd') {
                selected_team_member_data.moves_left += 1;
            }
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
                render_top_message("You can only move one square at a time<br>or target is out of range.<br>");
                return;
            }

            var team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));

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
            team_member_data.moves_left -= 1;
            if(team_member_data.attack_item_name == 'Halberd') {
              team_member_data.moves_left += 1;
            }
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
                render_top_message("You can only move one square at a time<br>or target is out of range.<br>");
                return;
            }

            var team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));

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
            team_member_data.moves_left -= 1;
            if(team_member_data.attack_item_name == 'Halberd') {
              team_member_data.moves_left += 1;
            }
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
                render_top_message("You can only move one square at a time<br>or target is out of range.<br>");
                return;
            }

            var team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));
            var treasure_name = clicked_square_html.attr('data-name');
            var treasure_name_formatted = treasure_name.replace(/[_]/g, ' ');
            var treasure_img = clicked_square_html.attr('src');

            if (!window.saved_details.lost_items_retrieved_by_mission[window.mission]) {
                for (var indx=0; indx<window.my_team.length; indx++) {
                    window.my_team[indx].base_attack_strength += 1;
                    window.my_team[indx].bonus_attack_strength = attack_strength_bonus_calc(window.my_team[indx].base_attack_strength);
                    window.my_team[indx].base_defense_strength += 1;
                }
                window.saved_details.lost_items_retrieved_by_mission[window.mission] = treasure_name;
                $('.lost_item_found_text').text("Found");
            }

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

            team_member_data.moves_left -= 1;
            if(team_member_data.attack_item_name == 'Halberd') {
              team_member_data.moves_left += 1;
            }
            window.turns_left = window.turns_left - 1;


        }

    }

    //If an enemy was clicked
    else if (clicked_square_html.attr('data-type') == 'enemy') {

        //If I have a member of my team selected.
        var selected_team_member = $('img[data-selected]');
        if (selected_team_member.length) {

            var selected_team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));

            //Move them
            var selected_team_member_i = selected_team_member.attr('data-boardi');
            var selected_team_member_j = selected_team_member.attr('data-boardj');
            if(selected_team_member_data.breed == 'Grundo' && selected_team_member_data.attack_item_name == 'Magic_Lightning_Spell') {
                var error = is_invalid_attack_twoblocks(selected_team_member_i, selected_team_member_j, i, j);
                if (error) {
                    render_top_message("You can only move one square at a time<br>or target is out of range.<br>");
                    return;
                }
            }
            else if(selected_team_member_data.breed == 'Scorchio' && selected_team_member_data.attack_item_name == 'Bow' && selected_team_member_data.saves >= 9) {
                var error = is_invalid_attack_twoblocks(selected_team_member_i, selected_team_member_j, i, j);
                if (error) {
                    render_top_message("You can only move one square at a time<br>or target is out of range.<br>");
                    return;
                }
            }
            else {
              var error = is_invalid_attack(selected_team_member_i, selected_team_member_j, i, j);
              if (error) {
                  render_top_message("You can only move one square at a time<br>or target is out of range.<br>");
                  return;
              }
            }
            var team_member_data = get_team_member_by_name(selected_team_member.attr('data-name'));
            var enemy_data = get_enemy_by_name(clicked_square_html.attr('data-name'));

            do_attack(team_member_data, enemy_data);
            var enemy_saved = convert_enemies_at_zero_health();
            if(enemy_saved) {
              if (team_member_data.saves == team_member_data.max_saves) {
                  //Do nothing, saves maxed out for this unit until next mission
              }
              else {
                  team_member_data.saves += 1;
                  if (team_member_data.saves == team_member_data.max_saves) {
                      //upgrade unit
                      team_member_data.base_attack_strength += 1;
                      team_member_data.bonus_attack_strength = attack_strength_bonus_calc(team_member_data.base_attack_strength);
                      team_member_data.base_defense_strength += 1;
                      team_member_data.rank = saves_to_pet_rank(team_member_data.saves);
                      var after_htmlz = `<li>${team_member_data.name}'s rank has upgraded to ${team_member_data.rank}, gaining a boost to attack and defence strength by 1 point!</li>`;
                      $('#saved_invader_text').after(after_htmlz);
                  }
              }

            }
            render_pets_stats();
            team_member_data.moves_left -= 1;
            if(team_member_data.attack_item_name == 'Halberd') {
              team_member_data.moves_left += 1;
            }
            window.turns_left = window.turns_left - 1;


            // Unselect this team member
            selected_team_member.attr('src', selected_team_member.attr('data-selected'));
            selected_team_member.removeAttr('data-selected');

        }
    }


    /*
    Loop through all team members... any with moves_left <= 0, set their background to red
    */
    for (var i=0; i<window.my_team.length; i++) {
        if (window.my_team[i].moves_left <= 0 || window.turns_left <= 0) {
            $('img[data-name="'+window.my_team[i].name+'"]').attr('style', "border-color: red;");
        }
    }

    render_top_message(special_top_message);
    add_item_help_links();
}

function convert_team_members_at_zero_health() {
    for (var i=0; i<window.my_team.length; i++) {
        if (window.my_team[i].health <= 0) {
            //Add enemy
            var new_soldier = generate_enemy_from_conversion(window.my_team[i].breed, get_next_available_enemy_name(window.my_team[i].breed))
            window.enemies.push(new_soldier);

            //my team member location
            var convert_square = $('img[data-name="'+window.my_team[i].name+'"]');
            set_square_to_blank(convert_square.attr('data-boardi'), convert_square.attr('data-boardj'));

            //insert our new enemy at this blank square
            convert_square.attr('src', new_soldier['image']);
            convert_square.attr('data-type', new_soldier['type']);
            convert_square.attr('data-name', new_soldier['name']);
            convert_square.attr('title', new_soldier['name']);

            //Remove my team member
            window.my_team.splice(i, 1);
        }
    }
}

function convert_enemies_at_zero_health() {
    var enemy_converted = 0;
    for (var i=0; i<window.enemies.length; i++) {
        if (window.enemies[i].health <= 0) {
          enemy_converted = 1;
          if(window.enemies[i].breed == 'Buzz' || window.enemies[i].breed == 'Grarrl') {
              //enemy location
              var convert_square = $('img[data-name="'+window.enemies[i].name+'"]');
              set_square_to_blank(convert_square.attr('data-boardi'), convert_square.attr('data-boardj'));

              //insert a smoking crater at this blank square
              convert_square.attr('src', 'images/Smoking_Crater.jpg');
              convert_square.attr('data-type', 'crater');
              convert_square.attr('title', 'Smoking Crater');

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
            convert_square.attr('title', new_soldier['name']);

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

    if (window.enemies.length <= 0) {
        //If no enemies left, show 'won' message, decrease turns to 0, etc
        window.turns_left = 0;
        battle += 1;
        if (battle > 3) {
            battle = 1;
            mission += 1;

            for(var i=0; i<window.my_team.length; i++) {
                var s = window.my_team[i];
                if (s.saves == s.max_saves) {
                  if(s.max_saves == 3) {
                    s.max_saves = 9;
                  }
                  else if(s.max_saves == 9) {
                    s.max_saves = 32;
                  }
                  else if(s.max_saves == 32) {
                    s.max_saves = 64;
                  }
                  else if(s.max_saves == 64) {
                    s.max_saves = 96;
                  }
                  else if(s.max_saves == 96) {
                    s.max_saves = 999;
                  }
                }
            }
        }

        var max_health = 21;
        if (mission <= 5) {
            max_health = 18;
        }
        for (var indx=0; indx<window.my_team.length; indx++) {
            window.my_team[indx].health = max_health;
        }
        if(mission == 11) {
          alert("Congrats... you won the game!");
          mission = 1;
          battle = 1;
        }
    }
    return enemy_converted;
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

    if(team_member_data.attack_item_name == 'Double_Sword') {
        if(total_damage > 0 && total_damage < 6) {
            total_damage = 6;
        }
    }

    if(team_member_data.attack_item_name == 'Double_Axe') {
        if(total_damage > 0 && total_damage < 5) {
            total_damage = 5;
        }
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
            <li id='saved_invader_text'>${team_member_data.name} has saved an Invader!</li>
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

function is_invalid_attack_twoblocks(from_i, from_j, to_i, to_j) {
    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');

    //Confirm the movement is a max of 2 unit in any direction.
    if (Math.abs(from_i - to_i) > 2 || Math.abs(from_j - to_j) > 2) {
        return true;
    }
    return false;
}

function is_invalid_attack(from_i, from_j, to_i, to_j) {
    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');

    //Confirm the movement is a max of 1 unit in any direction.
    if (Math.abs(from_i - to_i) > 1 || Math.abs(from_j - to_j) > 1) {
        return true;
    }
    return false;
}

function is_invalid_move(from_i, from_j, to_i, to_j) {
    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');
    var error = "";

    //Confirm the movement is a max of 1 unit in any direction.
    if (Math.abs(from_i - to_i) > 1 || Math.abs(from_j - to_j) > 1) {
        return true;
    }
    return false;
}

function is_invalid_move_teleport(from_i, from_j, to_i, to_j) {
    //- Can teleport to any row except top 3 rows (put another way, can teleport to bottom 7 rows) that is unoccupied.
    var error = "";
    if(to_i < 3) {
        return true;
    }
    return false;
}

function move_team_member(from_i, from_j, to_i, to_j) {

    var to_square_html = $("#i"+to_i+"j"+to_j).find('img');
    var from_square_html = $("#i"+from_i+"j"+from_j).find('img');

    //Team member is now on new square
    to_square_html.attr('src', from_square_html.attr('data-selected'));
    to_square_html.attr('data-type', from_square_html.attr('data-type'));
    to_square_html.attr('data-name', from_square_html.attr('data-name'));
    to_square_html.attr('title', from_square_html.attr('title'));

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
    square_html.attr('style', '');
    square_html.attr('title', '');
    square_html.removeAttr('data-selected');
}


function refresh_myteam_moves() {
  window.turns_left = 5;
  for (var i=0; i<window.my_team.length; i++) {
      if(window.my_team[i].breed == 'Moehog') {
          window.my_team[i].moves_left = 4;
      }
      if(window.my_team[i].breed == 'Skeith') {
          window.my_team[i].moves_left = 1;
      }
      if(window.my_team[i].breed == 'Techo') {
          window.my_team[i].moves_left = 2;
      }
      if(window.my_team[i].breed == 'Scorchio') {
          window.my_team[i].moves_left = 2;
      }
      if(window.my_team[i].breed == 'Grundo') {
          window.my_team[i].moves_left = 2;
      }
      window.my_team[i].teleport_used = 0;
  }

  for (var i=0; i<window.my_team.length; i++) {
      $('img[data-name="'+window.my_team[i].name+'"]').attr('style', "");
  }
}


function restart_mission() {
  window.battle = 1;
  window.my_team = JSON.parse(window.saved_details['my_team']);
  window.villages_unturned = window.saved_details['villages_unturned'];
  window.villages_total = window.saved_details['villages_total'];
  start_mission();
}
