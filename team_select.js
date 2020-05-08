function generate_enemy_from_conversion(breed, name) {

    var new_enemy = {
        "type": "enemy",
        "name": name,
        "breed": breed
    };

    if (breed == "Moehog") {
        new_enemy['image'] = "images/Draco_Moehog00.jpg";
        new_enemy['health'] = 8 + rand(0, 4); //8-12
        new_enemy['base_attack_strength'] = 5 + rand(0, 4); //5-9
        new_enemy['base_defense_strength'] = 6 + rand(0, 6); //6-12
    }

    if (breed == "Skeith") {
        new_enemy['image'] = "images/Draco_Skeith00.jpg";
        new_enemy['health'] = 12 + rand(0, 4); //12-16
        new_enemy['base_attack_strength'] = 9 + rand(0, 4); //9-13
        new_enemy['base_defense_strength'] = 8 + rand(0, 6); //8-14
    }

    if (breed == "Techo") {
        new_enemy['image'] = "images/Draco_Techo00.jpg";
        new_enemy['health'] = 12 + rand(0, 4); //12-16
        new_enemy['base_attack_strength'] = 9 + rand(0, 4); //9-13
        new_enemy['base_defense_strength'] = 8 + rand(0, 6); //8-14
    }

    if (breed == "Scorchio") {
        new_enemy['image'] = "images/Draco_Scorchio00.jpg";
        new_enemy['health'] = 14 + rand(0, 4); //14-18
        new_enemy['base_attack_strength'] = 12 + rand(0, 4); //12-16
        new_enemy['base_defense_strength'] = 12 + rand(0, 4); //12-16
    }

    if (breed == "Grundo") {
        new_enemy['image'] = "images/Draco_Grundo00.jpg";
        new_enemy['health'] = 15 + rand(0, 3); //15-18 (normally it's 15-19, but cheat here because of max 18 at early levels)
        new_enemy['base_attack_strength'] = 13 + rand(0, 3); //13-16
        new_enemy['base_defense_strength'] = 15 + rand(0, 2); //15-17
    }

    new_enemy['bonus_attack_strength'] = attack_strength_bonus_calc(new_enemy['base_attack_strength']);

    return new_enemy;
}

function generate_team_member(breed, name) {
    var new_team_member = {
        "breed": breed,
        "rank": "Villager",
        "name": name,
        "bonus_attack_strength": 0,
        "attack_item_name": "",
        "attack_item_img": "",
        "defense_item_name": "",
        "defense_item_img": "",
        "teleport_used": 0,
        "enchanted_no_teleport": 0,
        "enchanted_no_heal": 0,
        "saves": 0,
        "max_saves": 3,
        "moves_left": 0,
        "type": "team"
    };

    if (breed == "Moehog") {
        new_team_member['image'] = "images/Moeh00.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 7 + rand(0, 2); //7-9
        new_team_member['base_defense_strength'] = 9 + rand(0, 2); //9-11
        new_team_member['moves_left'] = 4;
    }

    if (breed == "Skeith") {
        new_team_member['image'] = "images/Skei01.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 15 + rand(0, 3); //15-18
        new_team_member['base_defense_strength'] = 8 + rand(0, 4); //8-12
        new_team_member['moves_left'] = 1;
    }

    if (breed == "Techo") {
        new_team_member['image'] = "images/Tech02.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 7 + rand(0, 4); //7-11
        new_team_member['base_defense_strength'] = 10 + rand(0, 2); //10-12
        new_team_member['moves_left'] = 2;
    }

    if (breed == "Scorchio") {
        new_team_member['image'] = "images/Scor03.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 11 + rand(0, 2); //11-13
        new_team_member['base_defense_strength'] = 10 + rand(0, 2); //10-12
        new_team_member['moves_left'] = 2;
    }

    if (breed == "Grundo") {
        new_team_member['image'] = "images/Grun04.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 12 + rand(0, 2); //12-14
        new_team_member['base_defense_strength'] = 11 + rand(0, 4); //11-14
        new_team_member['moves_left'] = 2;
    }

    new_team_member['bonus_attack_strength'] = attack_strength_bonus_calc(new_team_member['base_attack_strength']);

    return new_team_member;
}

function generate_new_team() {
    var soldiers = [];

    soldiers.push(generate_team_member("Moehog", "Soldier 0"));
    soldiers.push(generate_team_member("Skeith", "Soldier 1"));
    soldiers.push(generate_team_member("Techo", "Soldier 2"));
    soldiers.push(generate_team_member("Scorchio", "Soldier 3"));
    soldiers.push(generate_team_member("Grundo", "Soldier 4"));

    return soldiers;
}

var mission_to_enemy_name_lookup = {
  1: "Invader Moehog",
  2: "Invader Techo",
  3: "Invader Skeith",
  4: "Invader Scorchio",
  5: "Invader Grundo",
  6: "Invader Moehog",
  7: "Invader Techo",
  8: "Invader Skeith",
  9: "Invader Scorchio",
  10: "Invader Grundo",
}

var mission_to_wave_lookup = {
  1: "Mission",
  2: "Mission",
  3: "Mission",
  4: "Mission",
  5: "Mission",
  6: "Second Wave Mission",
  7: "Second Wave Mission",
  8: "Second Wave Mission",
  9: "Second Wave Mission",
  10: "Second Wave Mission",
}

function validate_names(callback) {
  //callback function will be executed if validation passes.
  /*
  - loop through everything with .pet_name_input
  - attr('data-previousvalue')
  - .val()
  - update previous pet 'name' value to this new pet 'name' value
  - throw error and stop everything if all names aren't unique
  */
  var unique_names = {};
  var pass = 1;
  $('.pet_name_input').each(function(){
    var tv = $(this).val();
    if(tv in unique_names) {
      pass = 0;
    }
    else {
      unique_names[tv] = 1;
    }
  });
  if(pass) {
    //update all names based on values
    $('.pet_name_input').each(function(){
      var tv = $(this).val();
      var pv = $(this).attr('data-previousvalue');
      if(tv != pv) {
          for(var i=0; i<window.my_team.length; i++) {
              var s = window.my_team[i];
              if (s.name == pv) {
                s.name = tv;
              }
          }
      }
    });
    callback();
  }
  else {
    alert("Error! All names must be unique!");
  }
}

function team_select() {
    var mission_text = mission_to_wave_lookup[mission];
    var invader_text = mission_to_enemy_name_lookup[mission];
    var too_many_troops = `<br><span style='color:red'>You must have only 5 troops in order to enter onto the battlefield. <br>Please remove `+(window.my_team.length-5)+` fighter(s) in order to continue to the next battlefield.</span> <br>(Once you remove them, they're gone for good!)`;
    if(window.my_team.length <= 5) {
      too_many_troops = "<br><br><a href='javascript: void(0)' onclick='validate_names(save_team_and_start_mission)'>Click here</a> when you are ready!";
    }
    var current_shield = get_current_shield();
    var heal_text = 'The health of the troops may have received a boost since the last battle.<br><br>';
    if(window.mission == 1 && window.battle == 1) {
        heal_text = '';
    }

    var avatar_text = '';
    if(window.mission == 8 && window.battle == 1) {
      avatar_text = `
      <table>
      <tr>
        <td colspan=2 style="background-color:#ffffcb">
          <center><b>Something Has Happened!</b></center>
        </td>
      </tr>
      <tr>
        <td>
          <img src='images/avatar.gif'>
        </td>
        <td>
          You are now eligible to use '<b>IOM Moehog</b>' as an<br>
          avatar on the <a href='#' style='text-decoration: none; font-weight: bold;'>Neoboards</a>!
        </td>
      </tr>
      </table><br><br>
      `;
    }

    var htmlz = `<center><br>
    ${avatar_text}
    ${heal_text}
    <b>${mission_text}:</b> defeat the <b>${invader_text}s!</b> You are on Mission ${mission} Battle ${battle}.${too_many_troops}<br><br>
    <table border=0 style="text-align:center;border: 2px solid #000000;" width="50%" cellpadding=4 bgcolor="#FFCC00">
        <tr>
            <td width=33%>
                <img src='images/jubjub.gif' border=2 style='border: 2px solid #000000;'>
            </td>

            <td width=33%>
            <b>${window.player_name}</b><br>
            <img src='images/${current_shield}.jpg' border=2 style='border: 2px solid #000000;'><br>
            <b>${current_shield}</b><br>
            <b>Villages Unturned: </b><br>
            <b>${window.villages_unturned}</b> (Out of ${window.villages_total})

            </td>

            <td width=33%>
                <table class='lost_items' bgcolor="#FFFFFF" width=100%>
                    <tr>
                        <td class='lost_items' style="text-align:center" colspan=4>
                            <b>Lost Items Recovered</b>
                        </td>
                    </tr>`;
                        //window.lost_items_retrieved_by_mission[1]
                        //"images/"+name+".jpg";
                    for (var ind=0; ind<5; ind++) {
                      var missionl = ind+1;
                      htmlz += `
                      <tr>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">
                            Mission:<br>
                            `+(missionl)+`
                        </td>
                        <td class='lost_items' width=32px>`;
                        if(window.lost_items_retrieved_by_mission[missionl]) {
                            htmlz += `<img src='images/`+window.lost_items_retrieved_by_mission[missionl]+`.jpg' border=1 style='border: 1px solid #000000;' width=32px height=32px>`;
                        }
                        else {
                            htmlz += `<img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>`;
                        }

                      missionl = ind+6;
                      htmlz += `</td>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">`+(missionl)+`</td>
                        <td class='lost_items' width=32px>`;
                        if(window.lost_items_retrieved_by_mission[missionl]) {
                            htmlz += `<img src='images/`+window.lost_items_retrieved_by_mission[missionl]+`.jpg' border=1 style='border: 1px solid #000000;' width=32px height=32px>`;
                        }
                        else {
                            htmlz += `<img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>`;
                        }
                        htmlz += `</td>
                      </tr>
                      `;
                    }
                        htmlz += `

                </table>
            </td>
        </tr>
    </table>`;
    var remove_column = '';
    if(window.my_team.length > 5) {
      remove_column = `<td class='team_select' bgcolor="#DDDDDD">Remove</td>`;
    }
    htmlz += `<table class='team_select' border=1 style="text-align:center" width="50%" cellpadding=4>
        <tr>
            ${remove_column}
            <td class='team_select' bgcolor="#DDDDDD">
                Pet<br>
                .:Rank:.
            </td>
            <td class='team_select' bgcolor="#DDDDDD" style="text-align:left">
                Name
            </td>
            <td class='team_select' bgcolor="#DDDDDD">
                Health
            </td>
            <td class='team_select' bgcolor="#DDDDDD">
                Attack<br>
                Strength
            </td>
            <td class='team_select' bgcolor="#DDDDDD">
                Attack<br>
                Item
            </td>
            <td class='team_select' bgcolor="#DDDDDD">
                Defense<br>
                Strength
            </td>
            <td class='team_select' bgcolor="#DDDDDD">
                Defense<br>
                Item
            </td>
            <td class='team_select' bgcolor="#DDDDDD">
                Saves
            </td>
        </tr>
    `;

    for(var i=0; i<window.my_team.length; i++) {
        var s = window.my_team[i];

        var bonus_attack_strength_string = "";
        if(s['bonus_attack_strength']) {
            bonus_attack_strength_string = `<span style='font-size:12px'>(+${s['bonus_attack_strength']})</span>`;
        }

        var remove_checkbox = '';
        if(window.my_team.length > 5) {
          remove_checkbox = `<td class='team_select'>
            <input type='checkbox' class='remove_fig_checkbox' data-petname='${s['name']}'>
          </td>`;
        }

        htmlz += `
         <tr>
            ${remove_checkbox}
            <td class='team_select' bgcolor="`+rank_to_color[s['rank']]+`" style="color:white">
                <img src='${s['image']}'><br>
                ${s['breed']}<br>
                .:${s['rank']}:.
            </td>
            <td class='team_select' style="text-align:left">
                <input type='text' value='${s['name']}' class='pet_name_input' data-previousvalue='${s['name']}'>
            </td>
            <td class='team_select'>
                ${s['health']}
            </td>
            <td class='team_select'>
                ${s['base_attack_strength']}
                ${bonus_attack_strength_string}
            </td>
            <td class='team_select'>
                <img src='${s['attack_item_img']}'>
            </td>
            <td class='team_select'>
                ${s['base_defense_strength']}
            </td>
            <td class='team_select'>
                <img src='${s['defense_item_img']}'>
            </td>
            <td class='team_select'>
                <center>
                    <table border=1 width=40% cellpadding=4 class='team_select'><tr><td class='team_select'><center>
                    ${s['saves']}
                    </center></td></tr></table>
                </center>
            </td>
        </tr>
        `;

    }

    htmlz += `</table><br>`;
    if(window.my_team.length > 5) {
      htmlz += `<button onclick='remove_selected_fighters()'>Remove Selected Fighters</button>`;
    }
    htmlz += `</center>`;
    $('#content').html(htmlz);
}

function remove_selected_fighters() {
    $('.remove_fig_checkbox:checked').each(function() {
        if(window.my_team.length > 5) {
          var pet_name_to_delete = $(this).attr('data-petname');
          for (var i=0; i<window.my_team.length; i++) {
              if (window.my_team[i].name == pet_name_to_delete) {
                  //Remove my team member
                  window.my_team.splice(i, 1);
              }
          }
        }
    });
    team_select();
}
