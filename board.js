//HTML board is truth
//Team is kept in window.my_team
//Enemies are kept in window.enemies

function render_top_message(special_message) {
    var moves_made = 5-window.turns_left;
    var htmlz = "";

    if ($('img[data-type="village"]').length <= 2) {
        htmlz += `
    <div style="display: inline-block; background: #DDDDDD">
        You lost too many villages, losing the battle!<br>
        <a href='javascript: void(0)' onclick="restart_mission()">Click here to restart the current Mission at Battle 1</a></b>
    </div><br><br>`;
        window.turns_left = 0;
    }
    else if (window.my_team.length <= 0) {
        htmlz += `
    <div style="display: inline-block; background: #DDDDDD">
        You lost all your troops, losing the battle!<br>
        <a href='javascript: void(0)' onclick="restart_mission()">Click here to restart the current Mission at Battle 1</a></b>
    </div><br><br>`;
        window.turns_left = 0;
    }
    else if (window.enemies.length <= 0) {
        htmlz += `
    <div style="display: inline-block; background: #DDDDDD">
        You converted all the invaders and won this battle!<br>
        <a href='javascript: void(0)' onclick="team_select()">Click here to prepare for the next battle</a></b>
    </div><br><br>`;
    }
    else if (window.turns_left <= 0) {
        htmlz += `
    <div style="display: inline-block; background: #DDDDDD">
        <b>- Invaders Turn -<br>
        <a href='javascript: void(0)' onclick="move_enemies()">Click here to continue</a></b>
    </div><br><br>`;
    }
    else if (special_message) {
        htmlz += `
    <div style="display: inline-block; background: #DDDDDD">
        <b>
        ${special_message}
        You've moved ${moves_made} out of 5</b>
    </div><br><br>`;
    }
    else {
        htmlz += `<b>You've moved ${moves_made} out of 5</b>`;
    }

    $("#moves_left_text_area").html(htmlz);
}

function save_team_and_start_mission() {
    window.villages_unturned += 6;
    window.villages_total += 6;
    window.saved_details['my_team'] = JSON.stringify(window.my_team);
    window.saved_details['villages_unturned'] = window.villages_unturned;
    window.saved_details['villages_total'] = window.villages_total;
    window.saved_details['mission'] = window.mission;
    localStorage.setItem('saved_ls_session', JSON.stringify(window.saved_details));
    start_mission();
}

function start_mission() {

    refresh_myteam_moves();

    var board = [];
    for($i=0; $i<10; $i++) {
        board[$i] = [];
        for($j=0; $j<10; $j++) {
            board[$i][$j] = {
                "type": "blank",
                "image": "images/blank.png"
            };
        }
    }
    board = set_up_treasure(board);
    board = set_up_enemies(board);
    board = set_up_mountains(board);
    board = set_up_villages(board);
    board = set_up_soldiers(board);
    board = set_up_items(board);

    var htmlz = `
<table width=100% border=0 style="border:0px">
    <tr>
        <td style="border:0px; text-align:center;vertical-align:top;">

<center>
<div id='moves_left_text_area'>
<b>You've moved 0 out of 5</b>
</div>

<table border=1 id="board">`;

    for(var i=0; i<10; i++) {
        htmlz += `<tr>`;
        for(var j=0; j<10; j++) {

            htmlz += `<td id='i${i}j${j}'>`;

            var image = "images/blank.png";
            var data_type = "blank";
            var name = "";
            var background_color = "";

            if (board[i][j]['image']) {
                image = board[i][j]['image'];
            }

            if (board[i][j]['type']) {
                data_type = board[i][j]['type'];
            }

            if (board[i][j]['name']) {
                name = board[i][j]['name'];
            }


            htmlz += "<img src='"+image+"' border=2 data-type='"+data_type+"' data-name='"+name+"' height=32 width=32 onclick='board_click("+i+", "+j+")' data-boardi='"+i+"' data-boardj='"+j+"' title='"+name+"'>";

            htmlz += `</td>`;
        }
        htmlz += `</tr>`;
    }

    htmlz += `</table>`;

    htmlz += `
    <br><br>

    <table style="width:390px">
        <tr>
            <td colspan=2 id='person_attack_text'></td>
        </tr>
        <tr>
            <td>
                <span style="font-size:13px;line-height: 10px;">
                Click for item info:
                </span>
            </td>
            <td>
                <span id='items_on_map'></span>
            </td>
        </tr>
    </table>

<br>
<span style="font-size:10px;line-height: 10px;">
Maximum moves total per turn: 5<br>
Maximum moves total per pet:
</span>
<table style="border: 1px solid #000000;padding:0px;border-collapse: collapse;">
    <tr>
        <td style="border: 3px solid #000000;">
            <img src='images/Moeh00.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            4
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Tech02.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            2
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Scor03.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            2
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Grun04.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            2
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Skei01.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;border-right: 3px solid #AAAAAA">
            1
        </td>
    </tr>
</table>
<br>
<table>
    <tr>
        <td style="border:0px">
            <img src='images/blank.png' border=3 style="border-color: red;">
        </td>
        <td style="border:0px">
            <span style="font-size:10px;line-height: 10px;">
            A red background means the maximum moves for that piece <br>have been reached.
            </span>
        </td>
    </tr>
</table>

<span style="font-size:12px;line-height: 10px;font-weight:bold;">
<a target='_blank' href='https://emeth-.github.io/iom-reverse-engineering/online_guides/backups_of_guides/happylark.html' class='plain_link'>HappyLark's Guide</a> | <a href='https://emeth-.github.io/iom-reverse-engineering/online_guides/backups_of_guides/demeanours%20got%20their%20homepage%20at%20Neopets.com.html' class='plain_link' target='_blank'>Demeanor's Guide</a> | <a href='http://www.jellyneo.net/?go=invasion_of_meridell' class='plain_link' target='_blank'>JellyNeo's Guide</a>
</span>

<br><br>

<span style="font-size:12px;line-height: 10px;">
<a href='#' class='plain_link' onclick='move_enemies();' title='Shortcut: Tap the P key'>End Turn Now</a>
</span>
        </center>
        </td>
        <td style="border:0px;vertical-align:top;text-align:right">
        <div id='my_pets_stats'>

`;
    //stats

    var lost_item_found = "Not found";
    if(window.lost_items_retrieved_by_mission[window.mission]) {
      lost_item_found = "Found";
    }

    var current_shield = get_current_shield();

    htmlz += `
    </div>
    <br><br>
    <table id='bottomright'>
    <tr>
    <td>
    <img src='images/${current_shield}.jpg'>
    <br><b>${current_shield}</b>
    </td>
    <td>
    Mission<br>${mission}<br>Battle<br>${battle}
    </td>
    </tr>
    <tr>
    <td colspan=2>
    Lost Item: <span class='lost_item_found_text'>${lost_item_found}</span> for this mission!
    </td>
    </tr>
    </table>
<br><br>
<center>
<span style="font-size:12px;line-height: 10px;">
<a class="plain_link" href='javascript: void(0)' onclick="restart_mission()">Restart THIS Mission</a>
<br><br>
<a class="plain_link" href='javascript: void(0)' onclick="reset_game_completely()">Restart at Mission 1</a>
</span>
</center>
    </td></tr></table>`;

    $('#content').html(htmlz);
    render_pets_stats();
    add_item_help_links();
}

function reset_game_completely() {
    if(window.confirm("Are you absolutely sure? This will completely reset your game, starting from scratch!")) {
        localStorage.removeItem("saved_ls_session");
        window.location.href = window.location.href;
    }
}

function render_pets_stats() {
    var htmlz = '';
    htmlz += `
            <!--////////////////////////////
            //Right Side
            ////////////////////////////-->

            <span style="visibility:hidden;">Minimal Stats</span>




            <table id='pets' width=100%>

                <tr>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        Name<br>
                        .:Rank:.
                    </td>
                    <td>
                        Health<br>
                        max<br>
                        18
                    </td>
                    <td>
                        Attack<br>
                        Strength
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        Defence<br>
                        Strength
                    </td>
                    <td>
                         &nbsp;
                    </td>
                    <td>
                        Saves
                    </td>
                </tr>
    `;


    var my_pets_html = "";
    for (var i=0; i<window.my_team.length; i++) {
        var pet = window.my_team[i];

        var weapon_bonus = get_item_bonus(pet.attack_item_name, pet.breed);

        var bonus_attack_strength_string = "";
        var bonus_attack_num = weapon_bonus;
        if (pet.bonus_attack_strength) {
            bonus_attack_num += pet.bonus_attack_strength;
        }

        if(bonus_attack_num) {
            bonus_attack_strength_string = `<span style='font-size:12px'>(+${bonus_attack_num})</span>`;
        }

        var armor_bonus = get_item_bonus(pet.defense_item_name, pet.breed);

        var bonus_defense_strength_string = "";
        var bonus_defense_num = armor_bonus;
        if (pet.bonus_defense_strength) {
            bonus_defense_num += pet.bonus_defense_strength;
        }

        if(bonus_defense_num) {
            bonus_defense_strength_string = `<span style='font-size:12px'>(+${bonus_defense_num})</span>`;
        }

        attack_image_html = "<span>-</span>";
        if(pet.attack_item_img) {
            attack_image_html = `<img src='${pet.attack_item_img}' border=2 height=32 width=32 style='border: 1px solid #000000;' onclick='clicked_item_popup("${pet.attack_item_name}")' class='clickable'>`;
        }

        defense_image_html = "<span>-</span>";
        if(pet.defense_item_img) {
            defense_image_html = `<img src='${pet.defense_item_img}' border=2 height=32 width=32 style='border: 1px solid #000000;' onclick='clicked_item_popup("${pet.defense_item_name}")' class='clickable'>`;
        }

        my_pets_html += `
         <tr class='my_team_row' data-name='${pet.name}'>
            <td style="width: 30px;height: 30px;">
                <img src='${pet.image}'>
            </td>
            <td>
                ${pet.name}<br>
                <span style='color:`+rank_to_color[pet.rank]+`'>${pet.rank}</span>
            </td>
            <td>
                ${pet.health}
            </td>
            <td>
                ${pet.base_attack_strength}
                ${bonus_attack_strength_string}
            </td>
            <td style="width: 30px;height: 30px;" class='attack_item'>
                ${attack_image_html}
            </td>
            <td>
                ${pet.base_defense_strength}
                ${bonus_defense_strength_string}
            </td>
            <td style="width: 30px;height: 30px;" class='defense_item'>
                ${defense_image_html}
            </td>
            <td>
                ${pet.saves}
            </td>
        </tr>
        `;
    }

    var foe_pets_html = "";
    for (var i=0; i<window.enemies.length; i++) {

        var enemy_pet = window.enemies[i];

        var bonus_attack_strength_string = "";
        if(enemy_pet.bonus_attack_strength) {
            bonus_attack_strength_string = `<span style='font-size:12px'>(+${enemy_pet.bonus_attack_strength})</span>`;
        }

        foe_pets_html += `
         <tr>
            <td style="width: 30px;height: 30px;">
                <img src='${enemy_pet.image}'>
            </td>
            <td>
                ${enemy_pet.name}
            </td>
            <td>
                ${enemy_pet.health}
            </td>
            <td>
                ${enemy_pet.base_attack_strength}
                ${bonus_attack_strength_string}
            </td>
            <td style="width: 30px;height: 30px;">
                <img src='images/blank.png'>
            </td>
            <td>
                ${enemy_pet.base_defense_strength}
            </td>
            <td style="width: 30px;height: 30px;">
                <img src='images/blank.png'>
            </td>
            <td>
                0
            </td>
        </tr>
        `;
    }

    htmlz += my_pets_html;

    htmlz += `
                <tr>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        Name
                    </td>
                    <td>
                        Health
                    </td>
                    <td>
                        Attack
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        Defence
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        &nbsp;
                    </td>
                </tr>
    `;

    htmlz += foe_pets_html;

    htmlz += `</table>`;
    $('#my_pets_stats').html(htmlz);
}

function clicked_item_popup(item_name) {
    window.open('popup.html?item='+item_name, item_name, 'status=1, height=450, width=550, left=100, top=100, resizable=0');
}

function add_item_help_links() {

    var items = {};
    $('img[data-type=potion], img[data-type=treasure], img[data-type=attack_item], img[data-type=defense_item]').each(function() {
        var item_image_url = $(this).attr('src');
        var item_name = $(this).attr('data-name');

        if (!items[item_image_url]) { //only want to show each item once
            var htmlz = `<img src='${item_image_url}' border=2 height=32 width=32 style='border: 1px solid #0000FF;' onclick='clicked_item_popup("${item_name}")' class='clickable'>&nbsp;`;
            $('#items_on_map').append(htmlz);
            items[item_image_url] = 1;
        }
    });

}

function set_up_treasure(board) {
    var name = "blank";
    var image = "images/blank.png";

    if(mission == 1) {
        name = "Goblet";
        image = "images/"+name+".jpg";
    }
    else if(mission == 2) {
        name = "Gold_Ixi";
        image = "images/"+name+".jpg";
    }
    else if(mission == 3) {
        name = "Urn_of_Abundance";
        image = "images/"+name+".jpg";
    }
    else if(mission == 4) {
        name = "Ancient_Book";
        image = "images/"+name+".jpg";
    }
    else if(mission == 5) {
        name = "Crown";
        image = "images/"+name+".jpg";
    }
    else if(mission == 6) {
        name = "Royal_Plate";
        image = "images/"+name+".jpg";
    }
    else if(mission == 7) {
        name = "Royal_Tapestry";
        image = "images/"+name+".jpg";
    }
    else if(mission == 8) {
        name = "Treasure_Chest";
        image = "images/"+name+".jpg";
    }
    else if(mission == 9) {
        name = "Vase_of_Plenty";
        image = "images/"+name+".jpg";
    }
    else if(mission == 10) {
        name = "Orb";
        image = "images/"+name+".jpg";
    }

    if (!window.lost_items_retrieved_by_mission[window.mission]) {
        board[0][4] = {
            "type": "treasure",
            "image": image,
            "name": name
        };
    }
    return board;
}



function set_up_enemies(board) {

    //Also note max is 8, don't add_each_wave if already 8 enemies
    var e = []
    if (mission == 1) {
        var total_enemies = 5;
        if (battle == 2) {
            total_enemies = 6;
        }
        if (battle == 3) {
            total_enemies = 7;
        }
        for (var i=0; i<total_enemies; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Moehog00.jpg",
                "name": "Invader Moehog 0"+i,
                "breed": "Moehog",
                "health": 8 + rand(0, 4), //8-12
                "base_attack_strength": 5 + rand(0, 4), //5-9
                "bonus_attack_strength": 0,
                "base_defense_strength": 6 + rand(0, 6), //6-12
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 2) {
        var total_enemies = 6;
        if (battle == 2) {
            total_enemies = 7;
        }
        if (battle == 3) {
            total_enemies = 8;
        }
        for (var i=0; i<total_enemies; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Techo00.jpg",
                "name": "Invader Techo 0"+i,
                "breed": "Techo",
                "health": 12 + rand(0, 4), //12-16
                "base_attack_strength": 9 + rand(0, 4), //9-13
                "bonus_attack_strength": 0,
                "base_defense_strength": 8 + rand(0, 6), //8-14
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 3) {
        var total_enemies = 6;
        if (battle == 2) {
            total_enemies = 7;
        }
        if (battle == 3) {
            total_enemies = 8;
        }
        for (var i=0; i<total_enemies; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Skeith00.jpg",
                "name": "Invader Skeith 0"+i,
                "breed": "Skeith",
                "health": 12 + rand(0, 4), //12-16
                "base_attack_strength": 9 + rand(0, 4), //9-13
                "bonus_attack_strength": 0,
                "base_defense_strength": 8 + rand(0, 6), //8-14
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 4) {
        var total_enemies = 7;
        if (battle == 2 || battle == 3) {
            total_enemies = 8;
        }
        for (var i=0; i<total_enemies; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Scorchio00.jpg",
                "name": "Invader Scorchio 0"+i,
                "breed": "Scorchio",
                "health": 14 + rand(0, 4), //14-18
                "base_attack_strength": 12 + rand(0, 4), //12-16
                "bonus_attack_strength": 0,
                "base_defense_strength": 12 + rand(0, 4), //12-16
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 5) {
        var total_enemies = 8;
        for (var i=0; i<total_enemies; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grundo00.jpg",
                "name": "Invader Grundo 0"+i,
                "breed": "Grundo",
                "health": 15 + rand(0, 4), //15-19
                "base_attack_strength": 13 + rand(0, 3), //13-16
                "bonus_attack_strength": 0,
                "base_defense_strength": 15 + rand(0, 2), //15-17
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 6) {
        for (var i=0; i<2; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Buzz00.jpg",
                "name": "Dark Lord Buzz 0"+i,
                "breed": "Buzz",
                "health": 21,
                "base_attack_strength": 18,
                "bonus_attack_strength": 0,
                "base_defense_strength": 25
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }

        for (var i=0; i<6; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Moehog00.jpg",
                "name": "Invader Moehog 0"+i,
                "breed": "Moehog",
                "health": 17,
                "base_attack_strength": 17,
                "bonus_attack_strength": 0,
                "base_defense_strength": 17
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 7) {

        for (var i=0; i<3; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Buzz00.jpg",
                "name": "Dark Lord Buzz 0"+i,
                "breed": "Buzz",
                "health": 21,
                "base_attack_strength": 18,
                "bonus_attack_strength": 0,
                "base_defense_strength": 25
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }

        for (var i=0; i<5; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Techo00.jpg",
                "name": "Invader Techo 0"+i,
                "breed": "Techo",
                "health": 18,
                "base_attack_strength": 18,
                "bonus_attack_strength": 0,
                "base_defense_strength": 18
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 8) {

        for (var i=0; i<4; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grarrl00.jpg",
                "name": "Dark Master Grarrl 0"+i,
                "breed": "Grarrl",
                "health": 21,
                "base_attack_strength": 25,
                "bonus_attack_strength": 0,
                "base_defense_strength": 18
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }

        for (var i=0; i<4; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Skeith00.jpg",
                "name": "Invader Skeith 0"+i,
                "breed": "Skeith",
                "health": 19,
                "base_attack_strength": 19,
                "bonus_attack_strength": 0,
                "base_defense_strength": 19
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 9) {

        for (var i=0; i<5; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grarrl00.jpg",
                "name": "Dark Master Grarrl 0"+i,
                "breed": "Grarrl",
                "health": 23,
                "base_attack_strength": 21,
                "bonus_attack_strength": 0,
                "base_defense_strength": 21
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }

        for (var i=0; i<3; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Scorchio00.jpg",
                "name": "Invader Scorchio 0"+i,
                "breed": "Scorchio",
                "health": 20,
                "base_attack_strength": 20,
                "bonus_attack_strength": 0,
                "base_defense_strength": 20
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    } else if (mission == 10) {

        for (var i=0; i<2; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Buzz00.jpg",
                "name": "Dark Lord Buzz 0"+i,
                "breed": "Buzz",
                "health": 21,
                "base_attack_strength": 18,
                "bonus_attack_strength": 0,
                "base_defense_strength": 25
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }

        for (var i=0; i<3; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grarrl00.jpg",
                "name": "Dark Master Grarrl 0"+i,
                "breed": "Grarrl",
                "health": 21,
                "base_attack_strength": 25,
                "bonus_attack_strength": 0,
                "base_defense_strength": 18
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }

        for (var i=0; i<3; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grundo00.jpg",
                "name": "Invader Grundo 0"+i,
                "breed": "Grundo",
                "health": 23,
                "base_attack_strength": 23,
                "bonus_attack_strength": 0,
                "base_defense_strength": 23
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }
    }

    window.enemies = e;

    board[0][1] = e[0];
    board[0][3] = e[1];
    board[0][5] = e[2];
    board[0][7] = e[3];
    board[0][9] = e[4];
    if(e[5]) {
        board[2][2] = e[5];
    }
    if(e[6]) {
        board[2][4] = e[6];
    }
    if(e[7]) {
        board[2][6] = e[7];
    }
    return board;
}


function set_up_mountains(board) {
    //Notes... mountains can be overwritten by items AND villages
    for(var i=0; i<4; i++) {
        var mtn = {
            "type": "mountain",
            "image": "images/mtn.jpg"
        };
        var mtn_layout = rand(1,3);
        if (mtn_layout == 1) {
            board[(i+1)*2][0] = mtn;
            board[(i+1)*2][9] = mtn;
        }
        else if (mtn_layout == 2) {
            board[(i+1)*2][1] = mtn;
            board[(i+1)*2][8] = mtn;
        }
        else if (mtn_layout == 3) {
            board[(i+1)*2][5] = mtn;
            if(i>0) {
                //In first mountain row, this is skipped because an invader can spawn here...
                board[(i+1)*2][4] = mtn;
            }
        }
    }
    return board;
}


function set_up_villages(board) {
    var vlg = {
        "type": "village",
        "image": "images/vlg.jpg"
    };
    board[6][rand(0,4)] = vlg;
    board[7][rand(0,4)] = vlg;
    board[8][rand(0,4)] = vlg;
    board[6][rand(0,4)+5] = vlg;
    board[7][rand(0,4)+5] = vlg;
    board[8][rand(0,4)+5] = vlg;
    return board;
}


function set_up_soldiers(board) {
    for(var i=0; i<5; i++) {
        var soldier = window.my_team[i];
        board[9][i*2] = soldier;
    }
    return board;
}


function set_up_items(board) {

    potions_by_mission = {
        1: "Health_Potion",
        2: "Potion_of_Fortitude",
        3: "Mega_Potion",
        4: "Potion_of_Well-Being",
        5: "Potion_of_Fortitude",
        6: "Potion_of_Well-Being",
        7: "Potion_of_Fortitude",
        8: "Mega_Potion",
        9: "Potion_of_Well-Being",
        10: "Health_Potion",
    };

    attack_items_by_mission = {
        1: ["Mace", "Broadsword"],
        2: ["Bow", "Hammer"],
        3: ["Magic_Force_Spell", "Magic_Force_Spell"],
        4: ["Magic_Force_Spell", "Bow"],
        5: ["Berserker_Battleaxe", "Berserker_Battleaxe"],
        6: ["Sword_of_Deflection", "Sword_of_Deflection"],
        7: ["Double_Sword", "Halberd"],
        8: ["Magic_Lightening_Spell", "Magic_Lightening_Spell"],
        9: ["Double_Axe", "Double_Axe"],
        10: ["Double_Axe", "Magic_Lightening_Spell"],
    };

    defense_items_by_mission = {
        1: ["Magic_Staff_of_Thunder", "Magic_Staff_of_Thunder"],
        2: ["Amulet_of_Teleportation", "Amulet_of_Teleportation"],
        3: ["Helmet", "Shield"],
        4: ["Plate_Armor", "Magic_Cloak_of_Invisibility"],
        5: ["Counter_Enchantment_Helmet", "Counter_Enchantment_Helmet"],
        6: ["Plate_Armor", "Plate_Armor"],
        7: ["Chainmail", "Chainmail"],
        8: ["Leather_Armor", "Leather_Armor"],
        9: ["Amulet_of_Teleportation", "Chainmail"],
        10: ["Plate_Armor", "Chainmail"],
    };

    //potions
    board[5][4] = {
        "type": "potion",
        "image": "images/"+potions_by_mission[mission]+".jpg",
        "name": potions_by_mission[mission]
    };
    board[5][6] = {
        "type": "potion",
        "image": "images/"+potions_by_mission[mission]+".jpg",
        "name": potions_by_mission[mission]
    };

    empty_spaces_for_item_spawns = [];
    for(i=4; i<9; i++) {
        for(j=0; j<10; j++) {
            if(board[i][j]['type']=="blank") {
                empty_spaces_for_item_spawns.push([i, j]);
            }
        }
    }

    //Returns a random key to an empty space
    item_spawn_spaces = array_rand(empty_spaces_for_item_spawns, 4);

    attack_item_key_one = rand(0,1);
    attack_item_key_two = rand(0,1);
    defense_item_key_one = rand(0,1);
    defense_item_key_two = rand(0,1);

    item_1_spawn = empty_spaces_for_item_spawns[item_spawn_spaces[0]]; //Coordinate point, e.g. [4,5]
    item_2_spawn = empty_spaces_for_item_spawns[item_spawn_spaces[1]];
    item_3_spawn = empty_spaces_for_item_spawns[item_spawn_spaces[2]];
    item_4_spawn = empty_spaces_for_item_spawns[item_spawn_spaces[3]];

    board[item_1_spawn[0]][item_1_spawn[1]] = {
        "type": "attack_item",
        "image": "images/"+attack_items_by_mission[mission][attack_item_key_one]+".jpg",
        "name": attack_items_by_mission[mission][attack_item_key_one]
    };

    board[item_2_spawn[0]][item_2_spawn[1]] = {
        "type": "attack_item",
        "image": "images/"+attack_items_by_mission[mission][attack_item_key_two]+".jpg",
        "name": attack_items_by_mission[mission][attack_item_key_two]
    };

    board[item_3_spawn[0]][item_3_spawn[1]] = {
        "type": "defense_item",
        "image": "images/"+defense_items_by_mission[mission][defense_item_key_one]+".jpg",
        "name": defense_items_by_mission[mission][defense_item_key_one]
    };

    board[item_4_spawn[0]][item_4_spawn[1]] = {
        "type": "defense_item",
        "image": "images/"+defense_items_by_mission[mission][defense_item_key_two]+".jpg",
        "name": defense_items_by_mission[mission][defense_item_key_two]
    };

    return board;
}
