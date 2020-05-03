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
        "type": "team"
    };

    if (breed == "Moehog") {
        new_team_member['image'] = "images/Moeh00.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 7 + rand(0, 2); //7-9
        new_team_member['base_defense_strength'] = 9 + rand(0, 2); //9-11
    }

    if (breed == "Skeith") {
        new_team_member['image'] = "images/Skei01.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 15 + rand(0, 3); //15-18
        new_team_member['base_defense_strength'] = 8 + rand(0, 4); //8-12
    }

    if (breed == "Techo") {
        new_team_member['image'] = "images/Tech02.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 7 + rand(0, 4); //7-11
        new_team_member['base_defense_strength'] = 10 + rand(0, 2); //10-12
    }

    if (breed == "Scorchio") {
        new_team_member['image'] = "images/Scor03.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 11 + rand(0, 2); //11-13
        new_team_member['base_defense_strength'] = 10 + rand(0, 2); //10-12
    }

    if (breed == "Grundo") {
        new_team_member['image'] = "images/Grun04.jpg";
        new_team_member['health'] = 15 + rand(0, 3); //15-18
        new_team_member['base_attack_strength'] = 12 + rand(0, 2); //12-14
        new_team_member['base_defense_strength'] = 11 + rand(0, 4); //11-14
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

function team_select() {
    var htmlz = `<center>
    <table border=0 style="text-align:center;border: 2px solid #000000;" width="50%" cellpadding=4 bgcolor="#FFCC00">
        <tr>
            <td width=33%>
                <img src='images/jubjub.gif' border=2 style='border: 2px solid #000000;'>
            </td>

            <td width=33%>
            <b>YOURNAME</b><br>
            <img src='images/Duke.jpg' border=2 style='border: 2px solid #000000;'><br>
            <b>Stablehand</b><br>
            <b>Villages Unturned: </b><br>
            <b>6</b> (Out of 6)

            </td>

            <td width=33%>
                <table class='lost_items' bgcolor="#FFFFFF" width=100%>
                    <tr>
                        <td class='lost_items' style="text-align:center" colspan=4>
                            <b>Lost Items Recovered</b>
                        </td>
                    </tr>
                    <tr>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">
                            Mission:<br>
                            1
                        </td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">6</td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                    </tr>
                    <tr>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">
                            Mission:<br>
                            2
                        </td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">7</td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                    </tr>
                    <tr>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">
                            Mission:<br>
                            3
                        </td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">8</td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                    <tr>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">
                            Mission:<br>
                            4
                        </td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">9</td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                    <tr>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">
                            Mission:<br>
                            5
                        </td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                        <td class='lost_items' style="text-align:center" bgcolor="#DDDDDD">10</td>
                        <td class='lost_items' width=32px>
                            <img src='images/questionmark.png' border=1 style='border: 1px solid #000000;' width=32px height=32px>
                        </td>
                    </tr>
                    </tr>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table class='team_select' border=1 style="text-align:center" width="50%" cellpadding=4>
        <tr>
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

    window.my_team = generate_new_team();

    for(var i=0; i<window.my_team.length; i++) {
        var s = window.my_team[i];

        var bonus_attack_strength_string = "";
        if(s['bonus_attack_strength']) {
            bonus_attack_strength_string = `<span style='font-size:12px'>(+${s['bonus_attack_strength']})</span>`;
        }

        htmlz += `
         <tr>
            <td class='team_select' bgcolor="#821B80" style="color:white">
                <img src='${s['image']}'><br>
                ${s['breed']}<br>
                .:${s['rank']}:.
            </td>
            <td class='team_select' style="text-align:left">
                <input type='text' value='${s['name']}'>
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

    htmlz += `</table><br><button onclick='start_mission()'>Submit Team & Go To Next Mission</button></center>`;
    $('#content').html(htmlz);
}


team_select();
