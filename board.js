function start_mission() {
    window.board = [];
    for($i=0; $i<10; $i++) {
        window.board[$i] = [];
        for($j=0; $j<10; $j++) {
            window.board[$i][$j] = {
                "type": "blank",
                "image": "images/blank.png"
            };
        }
    }
    set_up_treasure();
    set_up_enemies();
    set_up_mountains();
    set_up_villages();
    set_up_soldiers();
    set_up_items();

    var htmlz = `
<table width=100% border=0 style="border:0px">
    <tr>
        <td style="border:0px; text-align:center;vertical-align:top;">

<center>
<b>You've moved 4 out of 5</b>

<table border=1 id="board">`;

    for(var i=0; i<10; i++) {
        htmlz += `<tr>`;
        for(var j=0; j<10; j++) {
            htmlz += `<td id='i${i}j${j}'>`;
            if (board[i][j]['image']) {
                htmlz += "<img src='"+board[i][j]['image']+"' border=2 data-type='"+board[i][j]['type']+"' height=32 width=32>";
            }
            else {
                htmlz += `<img src='images/blank.png' border=2>`;
            }

            htmlz += `</td>`;
        }
        htmlz += `</tr>`;
    }

    htmlz += `</table>`;

    htmlz += `
    <br><br>
    <table>
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
`;








    $('#content').html(htmlz);
    add_item_help_links();
}

function clicked_item_popup(item_url) {
    window.open('popup.php?item='+item_url, 'Item Popup', 'status=1, height=450, width=550, left=100, top=100, resizable=0');
}

function add_item_help_links() {

    var items = {};
    $('img[data-type=treasure], img[data-type=item]').each(function() {
        var item_image_url = $(this).attr('src');

        if (!items[item_image_url]) { //only want to show each item once
            var htmlz = `<img src='${item_image_url}' border=2 height=32 width=32 style='border: 1px solid #0000FF;' onclick='clicked_item_popup("${item_image_url}")' class='clickable'>&nbsp;`;
            $('#items_on_map').append(htmlz);
            items[item_image_url] = 1;
        }
    });

}

function set_up_treasure() {
    var image = "images/blank.png";

    if(mission == 1) {
        image = "images/Goblet.jpg";
    }
    else if(mission == 2) {
        image = "images/Gold_Ixi.jpg";
    }
    else if(mission == 3) {
        image = "images/Urn_of_Abundance.jpg";
    }
    else if(mission == 4) {
        image = "images/Ancient_Book.jpg";
    }
    else if(mission == 5) {
        image = "images/Crown.jpg";
    }
    else if(mission == 6) {
        image = "images/Royal_Plate.jpg";
    }
    else if(mission == 7) {
        image = "images/Royal_Tapestry.jpg";
    }
    else if(mission == 8) {
        image = "images/Treasure_Chest.jpg";
    }
    else if(mission == 9) {
        image = "images/Vase_of_Plenty.jpg";
    }
    else if(mission == 10) {
        image = "images/Orb.jpg";
    }

    window.board[0][4] = {
        "type": "treasure",
        "image": image
    };
}


function attack_strength_bonus_calc(base_attack_strength) {
    bonus_attack_strength = 0
    if (base_attack_strength >= 9 && base_attack_strength <= 11) {
        bonus_attack_strength = 1;
    }

    if (base_attack_strength >= 12 && base_attack_strength <= 14) {
        bonus_attack_strength = 2;
    }

    if (base_attack_strength >= 15 && base_attack_strength <= 17) {
        bonus_attack_strength = 3;
    }

    if (base_attack_strength == 18) {
        bonus_attack_strength = 4;
    }

    if (base_attack_strength == 19) {
        bonus_attack_strength = 5;
    }
    return bonus_attack_strength;
}

function set_up_enemies() {

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
                "base_attack_strength": 21,
                "bonus_attack_strength": 0,
                "base_defense_strength": 21
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
        var thise = {
            "type": "enemy",
            "image": "images/Draco_Buzz00.jpg",
            "name": "Dark Lord Buzz 00",
            "breed": "Buzz",
            "health": 29,
            "base_attack_strength": 25,
            "bonus_attack_strength": 0,
            "base_defense_strength": 25
        };
        thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
        e.push(thise);

        for (var i=0; i<2; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Buzz00.jpg",
                "name": "Dark Lord Buzz 0"+(i+1),
                "breed": "Buzz",
                "health": 21,
                "base_attack_strength": 21,
                "bonus_attack_strength": 0,
                "base_defense_strength": 21
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

        for (var i=0; i<2; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grarrl00.jpg",
                "name": "Dark Master Grarrl 0"+i,
                "breed": "Grarrl",
                "health": 22,
                "base_attack_strength": 22,
                "bonus_attack_strength": 0,
                "base_defense_strength": 22
            };
            thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
            e.push(thise);
        }

        for (var i=0; i<2; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grarrl00.jpg",
                "name": "Dark Master Grarrl 0"+(i+2),
                "breed": "Grarrl",
                "health": 23,
                "base_attack_strength": 21,
                "bonus_attack_strength": 0,
                "base_defense_strength": 21
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

        var thise = {
            "type": "enemy",
            "image": "images/Draco_Grarrl00.jpg",
            "name": "Dark Master Grarrl 00",
            "breed": "Grarrl",
            "health": 29,
            "base_attack_strength": 26,
            "bonus_attack_strength": 0,
            "base_defense_strength": 26
        };
        thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
        e.push(thise);

        for (var i=0; i<4; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grarrl00.jpg",
                "name": "Dark Master Grarrl 0"+(i+1),
                "breed": "Grarrl",
                "health": 22,
                "base_attack_strength": 22,
                "bonus_attack_strength": 0,
                "base_defense_strength": 22
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

        var thise = {
            "type": "enemy",
            "image": "images/Draco_Buzz00.jpg",
            "name": "Dark Lord Buzz 00",
            "breed": "Buzz",
            "health": 29,
            "base_attack_strength": 27,
            "bonus_attack_strength": 0,
            "base_defense_strength": 27
        };
        thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
        e.push(thise);

        var thise = {
            "type": "enemy",
            "image": "images/Draco_Buzz00.jpg",
            "name": "Dark Lord Buzz 01",
            "breed": "Buzz",
            "health": 21,
            "base_attack_strength": 21,
            "bonus_attack_strength": 0,
            "base_defense_strength": 21
        };
        thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
        e.push(thise);

        var thise = {
            "type": "enemy",
            "image": "images/Draco_Grarrl00.jpg",
            "name": "Dark Master Grarrl 00",
            "breed": "Grarrl",
            "health": 29,
            "base_attack_strength": 27,
            "bonus_attack_strength": 0,
            "base_defense_strength": 27
        };
        thise['bonus_attack_strength'] = attack_strength_bonus_calc(thise['base_attack_strength']);
        e.push(thise);

        for (var i=0; i<2; i++) {
            var thise = {
                "type": "enemy",
                "image": "images/Draco_Grarrl00.jpg",
                "name": "Dark Master Grarrl 0"+(i+1),
                "breed": "Grarrl",
                "health": 22,
                "base_attack_strength": 22,
                "bonus_attack_strength": 0,
                "base_defense_strength": 22
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

    window.board[0][1] = e[0];
    window.board[0][3] = e[1];
    window.board[0][5] = e[2];
    window.board[0][7] = e[3];
    window.board[0][9] = e[4];
    if(e[5]) {
        window.board[2][2] = e[5];
    }
    if(e[6]) {
        window.board[2][4] = e[6];
    }
    if(e[7]) {
        window.board[2][6] = e[7];
    }
}


function set_up_mountains() {
    //Notes... mountains can be overwritten by items AND villages
    for(var i=0; i<4; i++) {
        var mtn = {
            "type": "mountain",
            "image": "images/mtn.jpg"
        };
        var mtn_layout = rand(1,3);
        if (mtn_layout == 1) {
            window.board[(i+1)*2][0] = mtn;
            window.board[(i+1)*2][9] = mtn;
        }
        else if (mtn_layout == 2) {
            window.board[(i+1)*2][1] = mtn;
            window.board[(i+1)*2][8] = mtn;
        }
        else if (mtn_layout == 3) {
            window.board[(i+1)*2][5] = mtn;
            if(i>0) {
                //In first mountain row, this is skipped because an invader can spawn here...
                window.board[(i+1)*2][4] = mtn;
            }
        }
    }
}


function set_up_villages() {
    var vlg = {
        "type": "village",
        "image": "images/vlg.jpg"
    };
    window.board[6][rand(0,4)] = vlg;
    window.board[7][rand(0,4)] = vlg;
    window.board[8][rand(0,4)] = vlg;
    window.board[6][rand(0,4)+5] = vlg;
    window.board[7][rand(0,4)+5] = vlg;
    window.board[8][rand(0,4)+5] = vlg;
}


function set_up_soldiers() {
    for(var i=0; i<5; i++) {
        var soldier = window.my_team[i];
        window.board[9][i*2] = {
            "type": "team",
            "image": soldier['image']
        };
    }
}


function set_up_items() {

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
        10: "Potion_of_Fortitude",
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
    window.board[5][4] = {
        "type": "potion",
        "image": "images/"+potions_by_mission[mission]+".jpg"
    };
    window.board[5][6] = {
        "type": "potion",
        "image": "images/"+potions_by_mission[mission]+".jpg"
    };

    empty_spaces_for_item_spawns = [];
    for(i=4; i<9; i++) {
        for(j=0; j<10; j++) {
            if(window.board[i][j]['type']=="blank") {
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
        "type": "item",
        "image": "images/"+attack_items_by_mission[mission][attack_item_key_one]+".jpg"
    };

    board[item_2_spawn[0]][item_2_spawn[1]] = {
        "type": "item",
        "image": "images/"+attack_items_by_mission[mission][attack_item_key_two]+".jpg"
    };

    board[item_3_spawn[0]][item_3_spawn[1]] = {
        "type": "item",
        "image": "images/"+defense_items_by_mission[mission][defense_item_key_one]+".jpg"
    };

    board[item_4_spawn[0]][item_4_spawn[1]] = {
        "type": "item",
        "image": "images/"+defense_items_by_mission[mission][defense_item_key_two]+".jpg"
    };
}










start_mission();
