function generate_new_team() {
    var soldiers = [
        {
            "image": "images/Moeh00.jpg",
            "breed": "Moehog",
            "rank": "Villager",
            "name": "Moehog",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 7 + rand(0, 2), //7-9
            "bonus_attack_strength": 0,
            "attack_item_name": "",
            "attack_item_img": "",
            "base_defense_strength": 9 + rand(0, 2), //9-11
            "defense_item_name": "",
            "defense_item_img": "",
            "saves": 0,
            "type": "team"
        },
        {
            "image": "images/Skei01.jpg",
            "breed": "Skeith",
            "rank": "Villager",
            "name": "Skeith",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 15 + rand(0, 3), //15-18
            "bonus_attack_strength": 0,
            "attack_item_name": "",
            "attack_item_img": "",
            "base_defense_strength": 8 + rand(0, 4), //8-12
            "defense_item_name": "",
            "defense_item_img": "",
            "saves": 0,
            "type": "team"
        },
        {
            "image": "images/Tech02.jpg",
            "breed": "Techo",
            "rank": "Villager",
            "name": "Techo",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 7 + rand(0, 4), //7-11
            "bonus_attack_strength": 0,
            "attack_item_name": "",
            "attack_item_img": "",
            "base_defense_strength": 10 + rand(0, 2), //10-12
            "defense_item_name": "",
            "defense_item_img": "",
            "saves": 0,
            "type": "team"
        },
        {
            "image": "images/Scor03.jpg",
            "breed": "Scorchio",
            "rank": "Villager",
            "name": "Scorchio",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 11 + rand(0, 2), //11-13
            "bonus_attack_strength": 0,
            "attack_item_name": "",
            "attack_item_img": "",
            "base_defense_strength": 10 + rand(0, 2), //10-12
            "defense_item_name": "",
            "defense_item_img": "",
            "saves": 0,
            "type": "team"
        },
        {
            "image": "images/Grun04.jpg",
            "breed": "Grundo",
            "rank": "Villager",
            "name": "Grundo",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 12 + rand(0, 2), //12-14
            "bonus_attack_strength": 0,
            "attack_item_name": "",
            "attack_item_img": "",
            "base_defense_strength": 11 + rand(0, 4), //11-14
            "defense_item_name": "",
            "defense_item_img": "",
            "saves": 0,
            "type": "team"
        }
    ];


    for(var i=0; i<soldiers.length; i++) {
        soldiers[i]['bonus_attack_strength'] = 0;

        if (soldiers[i]['base_attack_strength'] >= 9 && soldiers[i]['base_attack_strength'] <= 11) {
            soldiers[i]['bonus_attack_strength'] = 1;
        }

        if (soldiers[i]['base_attack_strength'] >= 12 && soldiers[i]['base_attack_strength'] <= 14) {
            soldiers[i]['bonus_attack_strength'] = 2;
        }

        if (soldiers[i]['base_attack_strength'] >= 15 && soldiers[i]['base_attack_strength'] <= 17) {
            soldiers[i]['bonus_attack_strength'] = 3;
        }

        if (soldiers[i]['base_attack_strength'] == 18) {
            soldiers[i]['bonus_attack_strength'] = 4;
        }

        if (soldiers[i]['base_attack_strength'] == 19) {
            soldiers[i]['bonus_attack_strength'] = 5;
        }

    }

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