<?

//10 missions, 3 battles per mission, 30 battles total
/*
Mission 1 - Draco Moehogs
Mission 2 - Draco Techos
Mission 3 - Draco Skeith
Mission 4 - Draco Scorchio
Mission 5 - Draco Grundos
Mission 6 - Draco Moehogs + Draco Buzz
Mission 7 - Draco Moehogs + Draco Buzz
Mission 8 - Draco Grarrl
Mission 9 - (sorry haven't come this far yet)
Mission 10 - (sorry haven't come this far yet)



/////MISSION 1

*/

function set_up_treasure($board, $mission, $battle) {
    //Treasure

    if($mission == 1) {
        $image = "java-clone/game/MeriImages/Goblet.jpg";
    }
    elseif($mission == 2) {
        $image = "java-clone/game/MeriImages/Gold_Ixi.jpg";
    }
    elseif($mission == 3) {
        $image = "java-clone/game/MeriImages/Urn_of_Abundance.jpg";
    }
    elseif($mission == 4) {
        $image = "java-clone/game/MeriImages/Ancient_Book.jpg";
    }
    elseif($mission == 5) {
        $image = "java-clone/game/MeriImages/Crown.jpg";
    }
    elseif($mission == 6) {
        $image = "java-clone/game/MeriImages/Royal_Plate.jpg";
    }
    elseif($mission == 7) {
        $image = "java-clone/game/MeriImages/Royal_Tapestry.jpg";
    }
    elseif($mission == 8) {
        $image = "java-clone/game/MeriImages/Treasure_Chest.jpg";
    }
    elseif($mission == 9) {
        $image = "java-clone/game/MeriImages/Vase_of_Plenty.jpg";
    }
    elseif($mission == 10) {
        $image = "java-clone/game/MeriImages/Orb.jpg";
    }

    $board[0][4] = [
        "type" => "treasure",
        "image" => $image
    ];
    return $board;
}

function set_up_items($board, $mission, $battle) {

    $potions_by_mission = [
        1 => "Health_Potion",
        2 => "Potion_of_Fortitude",
        3 => "Mega_Potion",
        4 => "Potion_of_Well-Being",
        5 => "Potion_of_Fortitude",
        6 => "Mega_Potion",
        7 => "Potion_of_Well-Being",
        8 => "Potion_of_Fortitude",
        9 => "Mega_Potion",
        10 => "Potion_of_Well-Being",
    ];

    $attack_items_by_mission = [
        1 => ["Mace", "Broadsword"],
        2 => ["Bow", "Hammer"],
        3 => ["Magic_Force_Spell", "Berserker_Battleaxe"],
        4 => ["Magic_Force_Spell", "Bow"],
        5 => ["Magic_Force_Spell", "Berserker_Battleaxe"],
        6 => ["Sword_of_Deflection", "Sword_of_Deflection"],
        7 => ["Double_Sword", "Halberd"],
        8 => ["Magic_Lightening_Spell", "Magic_Lightening_Spell"],
        9 => ["Double_Axe", "Double_Axe"],
        10 => ["Double_Axe", "Magic_Lightening_Spell"],
    ];

    $defense_items_by_mission = [
        1 => ["Magic Staff of Thunder", "Magic Staff of Thunder"],
        2 => ["Amulet_of_Teleportation", "Amulet_of_Teleportation"],
        3 => ["Helmet", "Shield"],
        4 => ["Amulet_of_Teleportation", "Magic_Cloak_of_Invisibility"],
        5 => ["Helmet", "Shield"],
        6 => ["Counter_Enchantment_Helmet", "Counter_Enchantment_Helmet"],
        7 => ["Chainmail", "Leather_Armor"],
        8 => ["Plate_Armor", "Chainmail"],
        9 => ["Amulet_of_Teleportation", "Chainmail"],
        10 => ["Plate_Armor", "Chainmail"],
    ];

    //potions
    $board[5][4] = [
        "type" => "potion",
        "image" => "java-clone/game/MeriImages/".$potions_by_mission[$mission].".jpg"
    ];
    $board[5][6] = [
        "type" => "potion",
        "image" => "java-clone/game/MeriImages/".$potions_by_mission[$mission].".jpg"
    ];

    $empty_spaces_for_item_spawns = [];
    for($i=4; $i<9; $i++) {
        for($j=0; $j<10; $j++) {
            if(!$board[$i][$j]['type']) {
                $empty_spaces_for_item_spawns[]=[$i, $j];
            }
        }
    }

    //Returns a random key to an empty space
    $item_spawn_spaces = array_rand($empty_spaces_for_item_spawns, 4);

    $attack_item_key_one = rand(0,1);
    $attack_item_key_two = rand(0,1);
    $defense_item_key_one = rand(0,1);
    $defense_item_key_two = rand(0,1);

    $item_1_spawn = $empty_spaces_for_item_spawns[$item_spawn_spaces[0]]; //Coordinate point, e.g. [4,5]
    $item_2_spawn = $empty_spaces_for_item_spawns[$item_spawn_spaces[1]];
    $item_3_spawn = $empty_spaces_for_item_spawns[$item_spawn_spaces[2]];
    $item_4_spawn = $empty_spaces_for_item_spawns[$item_spawn_spaces[3]];

    $board[$item_1_spawn[0]][$item_1_spawn[1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/".$attack_items_by_mission[$mission][$attack_item_key_one].".jpg"
    ];

    $board[$item_2_spawn[0]][$item_2_spawn[1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/".$attack_items_by_mission[$mission][$attack_item_key_two].".jpg"
    ];

    $board[$item_3_spawn[0]][$item_3_spawn[1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/".$defense_items_by_mission[$mission][$defense_item_key_one].".jpg"
    ];

    $board[$item_4_spawn[0]][$item_4_spawn[1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/".$defense_items_by_mission[$mission][$defense_item_key_two].".jpg"
    ];

    return $board;
}

function set_up_enemies($board, $mission, $battle) {

    //Mission 1, Battle 1
    if($mission == 1 && $battle == 1) {
        for($i=0; $i<5; $i++) {
            $board[0][($i*2)+1] = [
                "type" => "enemy",
                "image" => "java-clone/game/MeriImages/Draco_Moehog00.jpg"
            ];
        }
    }
    return $board;
}

function set_up_mountains($board) {
    //Notes... mountains can be overwritten by items AND villages
    //Top row of mountains
    for($i=0; $i<4; $i++) {
        $mtn = [
            "type" => "mountain",
            "image" => "java-clone/game/MeriImages/mtn.jpg"
        ];
        $mtn_layout = rand(1,3);
        if ($mtn_layout == 1) {
            $board[($i+1)*2][0] = $mtn;
            $board[($i+1)*2][9] = $mtn;
        }
        elseif ($mtn_layout == 2) {
            $board[($i+1)*2][1] = $mtn;
            $board[($i+1)*2][8] = $mtn;
        }
        elseif ($mtn_layout == 3) {
            $board[($i+1)*2][5] = $mtn;
            //...
            if($i>0) {
                //In first mountain row, this is skipped because an invader can spawn here...
                //Note my board layouts are incomplete, it's possible this spawns and can just be overwritten by invader
                //UNKNOWN
                $board[($i+1)*2][4] = $mtn;
            }
        }
    }
    return $board;
}

function set_up_villages($board) {
    $vlg = [
        "type" => "village",
        "image" => "java-clone/game/MeriImages/vlg.jpg"
    ];
    $board[6][rand(0,4)] = $vlg;
    $board[7][rand(0,4)] = $vlg;
    $board[8][rand(0,4)] = $vlg;
    $board[6][rand(0,4)+5] = $vlg;
    $board[7][rand(0,4)+5] = $vlg;
    $board[8][rand(0,4)+5] = $vlg;
    return $board;
}

function set_up_soldiers($board, $soldiers) {
    for($i=0; $i<5; $i++) {
        $soldier = $soldiers[$i];
        $board[9][$i*2] = [
            "type" => "team",
            "image" => $soldiers[$i]['image']
        ];
    }
    return $board;
}

function get_team() {
    $soldiers = [
        [
            "image" => "java-clone/game/MeriImages/Moeh00.jpg",
            "breed" => "Moehog",
            "rank" => "Villager",
            "name" => "Soldier 0",
            "health" => 16,
            "base_attack_strength" => 8,
            "bonus_attack_strength" => 0,
            "attack_item" => "",
            "base_defense_strength" => 9,
            "bonus_defense_strength" => 0,
            "defense_item" => "",
            "saves" => 0,
        ],
        [
            "image" => "java-clone/game/MeriImages/Skei01.jpg",
            "breed" => "Skeith",
            "rank" => "Villager",
            "name" => "Soldier 1",
            "health" => 17,
            "base_attack_strength" => 18,
            "bonus_attack_strength" => 4,
            "attack_item" => "",
            "base_defense_strength" => 8,
            "bonus_defense_strength" => 0,
            "defense_item" => "",
            "saves" => 0,
        ],
        [
            "image" => "java-clone/game/MeriImages/Tech02.jpg",
            "breed" => "Techo",
            "rank" => "Villager",
            "name" => "Soldier 2",
            "health" => 14,
            "base_attack_strength" => 9,
            "bonus_attack_strength" => 1,
            "attack_item" => "",
            "base_defense_strength" => 12,
            "bonus_defense_strength" => 0,
            "defense_item" => "",
            "saves" => 0,
        ],
        [
            "image" => "java-clone/game/MeriImages/Scor03.jpg",
            "breed" => "Scorchio",
            "rank" => "Villager",
            "name" => "Soldier 3",
            "health" => 16,
            "base_attack_strength" => 13,
            "bonus_attack_strength" => 2,
            "attack_item" => "",
            "base_defense_strength" => 12,
            "bonus_defense_strength" => 0,
            "defense_item" => "",
            "saves" => 0,
        ],
        [
            "image" => "java-clone/game/MeriImages/Grun04.jpg",
            "breed" => "Grundo",
            "rank" => "Villager",
            "name" => "Soldier 4",
            "health" => 15,
            "base_attack_strength" => 13,
            "bonus_attack_strength" => 2,
            "attack_item" => "",
            "base_defense_strength" => 13,
            "bonus_defense_strength" => 0,
            "defense_item" => "",
            "saves" => 0,
        ]
    ];
    return $soldiers;
}







?>