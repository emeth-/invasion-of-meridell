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




function set_up_enemies() {

    //Also note max is 8, don't add_each_wave if already 8 enemies
    var enemies_by_mission = {
        1: {
            "foes": ["Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00"],
            "add_each_wave": "Draco_Moehog00"
        },
        2: {
            "foes": ["Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00"],
            "add_each_wave": "Draco_Techo00"
        },
        3: {
            "foes": ["Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00"],
            "add_each_wave": "Draco_Skeith00"
        },
        4: {
            "foes": ["Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00"],
            "add_each_wave": "Draco_Scorchio00"
        },
        5: {
            "foes": ["Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00"]
        },
        6: {
            "foes": ["Draco_Buzz00", "Draco_Buzz00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00"]
        },
        7: {
            "foes": ["Draco_Buzz00", "Draco_Buzz00", "Draco_Buzz00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00"]
        },
        8: {
            "foes": ["Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00"]
        },
        9: {
            "foes": ["Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00"]
        },
        10: {
            "foes": ["Draco_Buzz00", "Draco_Buzz00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00"]
        },
    };

    var enemies_obj = enemies_by_mission[mission];

    var enemies_to_add_in_wave = battle - 1;
    while(enemies_obj['foes'].length < 8 && enemies_to_add_in_wave > 0) {
        //In each wave, add an additional enemy if less than 8 foes
        enemies_obj['foes'].push(enemies_obj['add_each_wave']);
        enemies_to_add_in_wave = enemies_to_add_in_wave - 1;
    }

    window.board[0][1] = {
        "type": "enemy",
        "image": "images/".enemies_obj['foes'][0].".jpg"
    };
    window.board[0][3] = {
        "type": "enemy",
        "image": "images/".enemies_obj['foes'][1].".jpg"
    };
    window.board[0][5] = {
        "type": "enemy",
        "image": "images/".enemies_obj['foes'][2].".jpg"
    };
    window.board[0][7] = {
        "type": "enemy",
        "image": "images/".enemies_obj['foes'][3].".jpg"
    };
    window.board[0][9] = {
        "type": "enemy",
        "image": "images/".enemies_obj['foes'][4].".jpg"
    };
    if(enemies_obj['foes'][5]) {
        window.board[2][2] = {
            "type": "enemy",
            "image": "images/".enemies_obj['foes'][5].".jpg"
        };
    }
    if(enemies_obj['foes'][6]) {
        window.board[2][4] = {
            "type": "enemy",
            "image": "images/".enemies_obj['foes'][6].".jpg"
        };
    }
    if(enemies_obj['foes'][7]) {
        window.board[2][6] = {
            "type": "enemy",
            "image": "images/".enemies_obj['foes'][7].".jpg"
        };
    }
}


function set_up_mountains() {
    //Notes... mountains can be overwritten by items AND villages
    for(var i=0; i<4; i++) {
        var mtn = [
            "type" => "mountain",
            "image" => "images/mtn.jpg"
        ];
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
            "image": soldier[i]['image']
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
        "image": "images/".potions_by_mission[mission].".jpg"
    };
    window.board[5][6] = {
        "type": "potion",
        "image": "images/".potions_by_mission[mission].".jpg"
    };

    empty_spaces_for_item_spawns = [];
    for(i=4; i<9; i++) {
        for(j=0; j<10; j++) {
            if(!window.board[i][j]['type']) {
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
        "image": "images/".attack_items_by_mission[mission][attack_item_key_one].".jpg"
    };

    board[item_2_spawn[0]][item_2_spawn[1]] = {
        "type": "item",
        "image": "images/".attack_items_by_mission[mission][attack_item_key_two].".jpg"
    };

    board[item_3_spawn[0]][item_3_spawn[1]] = {
        "type": "item",
        "image": "images/".defense_items_by_mission[mission][defense_item_key_one].".jpg"
    };

    board[item_4_spawn[0]][item_4_spawn[1]] = {
        "type": "item",
        "image": "images/".defense_items_by_mission[mission][defense_item_key_two].".jpg"
    };
}










start_mission();
