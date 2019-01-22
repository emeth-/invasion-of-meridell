function rand(min,max) {
    // From https://stackoverflow.com/a/7228322/8967723
    // min and max included
    //mimics php's rand(min, max)
    return Math.floor(Math.random()*(max-min+1)+min);
}

function generate_new_team() {
    var soldiers = [
        {
            "image": "images/Moeh00.jpg",
            "breed": "Moehog",
            "rank": "Villager",
            "name": "Soldier 0",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 7 + rand(0, 2), //7-9
            "bonus_attack_strength": 0,
            "attack_item": "",
            "base_defense_strength": 9 + rand(0, 2), //9-11
            "bonus_defense_strength": 0,
            "defense_item": "",
            "saves": 0,
        },
        {
            "image": "images/Skei01.jpg",
            "breed": "Skeith",
            "rank": "Villager",
            "name": "Soldier 1",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 15 + rand(0, 3), //15-18
            "bonus_attack_strength": 4,
            "attack_item": "",
            "base_defense_strength": 8 + rand(0, 4), //8-12
            "bonus_defense_strength": 0,
            "defense_item": "",
            "saves": 0,
        },
        {
            "image": "images/Tech02.jpg",
            "breed": "Techo",
            "rank": "Villager",
            "name": "Soldier 2",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 7 + rand(0, 4), //7-11
            "bonus_attack_strength": 1,
            "attack_item": "",
            "base_defense_strength": 10 + rand(0, 2), //10-12
            "bonus_defense_strength": 0,
            "defense_item": "",
            "saves": 0,
        },
        {
            "image": "images/Scor03.jpg",
            "breed": "Scorchio",
            "rank": "Villager",
            "name": "Soldier 3",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 11 + rand(0, 2), //11-13
            "bonus_attack_strength": 2,
            "attack_item": "",
            "base_defense_strength": 10 + rand(0, 2), //10-12
            "bonus_defense_strength": 0,
            "defense_item": "",
            "saves": 0,
        },
        {
            "image": "images/Grun04.jpg",
            "breed": "Grundo",
            "rank": "Villager",
            "name": "Soldier 4",
            "health": 15 + rand(0, 3), //15-18
            "base_attack_strength": 12 + rand(0, 2), //12-14
            "bonus_attack_strength": 2,
            "attack_item": "",
            "base_defense_strength": 11 + rand(0, 4), //11-14
            "bonus_defense_strength": 0,
            "defense_item": "",
            "saves": 0,
        }
    ];
    return soldiers;
}

function team_select() {
    var htmlz = `
    <table border=1 style="text-align:center" width="50%" cellpadding=4>
        <tr>
            <td bgcolor="#DDDDDD">
                Pet<br>
                .:Rank:.
            </td>
            <td bgcolor="#DDDDDD" style="text-align:left">
                Name
            </td>
            <td bgcolor="#DDDDDD">
                Health
            </td>
            <td bgcolor="#DDDDDD">
                Attack<br>
                Strength
            </td>
            <td bgcolor="#DDDDDD">
                Attack<br>
                Item
            </td>
            <td bgcolor="#DDDDDD">
                Defense<br>
                Strength
            </td>
            <td bgcolor="#DDDDDD">
                Defense<br>
                Item
            </td>
            <td bgcolor="#DDDDDD">
                Saves
            </td>
        </tr>
    `;

    my_team = generate_new_team();

    for(var i=0; i<my_team.length; i++) {
        var s = my_team[i];

        var bonus_attack_strength_string = "";
        if(s['bonus_attack_strength']) {
            bonus_attack_strength_string = `<span style='font-size:12px'>(+${s['bonus_attack_strength']})</span>`;
        }

        var bonus_defense_strength_string = "";
        if(s['bonus_defense_strength']) {
            bonus_defense_strength_string = `<span style='font-size:12px'>(+${s['bonus_defense_strength']})</span>`;
        }

        htmlz += `
         <tr>
            <td bgcolor="#821B80" style="color:white">
                <img src='${s['image']}'><br>
                ${s['breed']}<br>
                .:${s['rank']}:.
            </td>
            <td style="text-align:left">
                <input type='text' value='${s['name']}'>
            </td>
            <td>
                ${s['health']}
            </td>
            <td>
                ${s['base_attack_strength']}
                ${bonus_attack_strength_string}
            </td>
            <td>
                ${s['attack_item']}
            </td>
            <td>
                ${s['base_defense_strength']}
                ${bonus_defense_strength_string}
            </td>
            <td>
                ${s['defense_item']}
            </td>
            <td>
                <center>
                    <table border=1 width=40% cellpadding=4><tr><td><center>
                    ${s['saves']}
                    </center></td></tr></table>
                </center>
            </td>
        </tr>
        `;

    }

    htmlz += `</table>`;
    $('#content').html(htmlz);
}
