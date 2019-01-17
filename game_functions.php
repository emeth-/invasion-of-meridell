<?

/*
Next steps...

Board states = items, enemies, token up top
1) Compare board states to those in java app
2) Compare board states to images
*/

/*
Notes on enemy movement...

https://www.neofriends.net/threads/guide-invasion-of-meridell-in-depth.26528/
- Observe that enemies never move backwards, so after sacking all villages they just chill and do nothing


Invaders always target villages to sack them first, but if there's no village adjacent (even diagonally) to them they'll always attack your army with the same priorities (assume X is the invader) -
3 1 6
4 X 7
5 2 8
(sometimes 345/678 is swapped)

On invader stats, video description (https://www.youtube.com/watch?v=QJCtRCyfVww):
-The larger number in the attack strength colum, from 7 to 19, does not actually factor directly into your fighting. That is explained in the instructions.
-The damage you deal is actually the sum of the number in parenthesis in that column, the dice roll (1-20), and any weapon bonus you have, minus the enemies defense.
-In missions 1-5, the different attackers have different attack and defense stats from each other. It is smart to target the ones with weakest defense first, or if they have the same, the one with strongest attack first.
- In missions 6+, the basic attackers all have identical stats so just try to defeat the ones that may be ganging up on a single troop of yours.

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
        6 => "Potion_of_Well-Being",
        7 => "Potion_of_Fortitude",
        8 => "Mega_Potion",
        9 => "Potion_of_Well-Being",
        10 => "Potion_of_Fortitude",

    ];

    $attack_items_by_mission = [
        1 => ["Mace", "Broadsword"],
        2 => ["Bow", "Hammer"],
        3 => ["Magic_Force_Spell", "Magic_Force_Spell"],
        4 => ["Magic_Force_Spell", "Bow"],
        5 => ["Berserker_Battleaxe", "Berserker_Battleaxe"],
        6 => ["Sword_of_Deflection", "Sword_of_Deflection"],
        7 => ["Double_Sword", "Halberd"],
        8 => ["Magic_Lightening_Spell", "Magic_Lightening_Spell"],
        9 => ["Double_Axe", "Double_Axe"],
        10 => ["Double_Axe", "Magic_Lightening_Spell"],
    ];

    $defense_items_by_mission = [
        1 => ["Magic_Staff_of_Thunder", "Magic_Staff_of_Thunder"],
        //Magic_Staff_of_Thunder verified http://www.jellyneo.net/images/guides/game_iom_04.png

        2 => ["Amulet_of_Teleportation", "Amulet_of_Teleportation"],
        //Amulet_of_Teleportation verified http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
        //Double Amulet_of_Teleportation verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark

        3 => ["Helmet", "Shield"],
        //Helmet verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
        //Shield verified in Mission 3 team items here: http://www.neopets.com/~Demeanours (http://i54.tinypic.com/28mmsz8.jpg)

        4 => ["Amulet_of_Teleportation", "Magic_Cloak_of_Invisibility"],
        //TODO, fix
        //JAVA GAME ERROR - Does not include Plate_Armor here
        //Plate_Armor verified http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
        //Plate_Armor verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
        //Magic_Cloak_of_Invisibility verified in team items on http://www.neopets.com/~Demeanours (http://i54.tinypic.com/33bfl83.jpg)

        5 => ["Counter_Enchantment_Helmet", "Shield"],
        //TODO, fix
        //JAVA GAME ERROR - improperly puts "Helmet" here
        //Counter_Enchantment_Helmet verified https://www.neofriends.net/threads/guide-invasion-of-meridell-in-depth.26528/
        //Counter_Enchantment_Helmet verified in text http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
        //Counter_Enchantment_Helmet verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
        //Counter_Enchantment_Helmet verified http://www.neopets.com/~Demeanours

        6 => ["Counter_Enchantment_Helmet", "Counter_Enchantment_Helmet"],
        //TODO, fix
        //JAVA GAME ERROR - Does not include Plate_Armor here
        //Plate_Armor verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
        //Plate_Armor verified http://www.neopets.com/~Demeanours

        7 => ["Chainmail", "Leather_Armor"],
        //Chainmail verified https://www.neofriends.net/threads/guide-invasion-of-meridell-in-depth.26528/
        //Chainmail verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
        //Chainmail verified http://i53.tinypic.com/j9r147.jpg (http://www.neopets.com/~Demeanours)
        //Comment:  It is not necessary to get the Chainmails and Halberds (if any) since their attack and defence bonuses should be less than those that are already equipped by your fighters. from http://home.neopets.com/templates/homepage.phtml?pet_name=happylark

        8 => ["Plate_Armor", "Chainmail"],
        //TODO, fix
        //JAVA GAME ERROR - Does not include Leather_Armor here
        //Leather_Armor verified on screenshot at  http://www.jellyneo.net/?go=invasion_of_meridell

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

    //Also note max is 8, don't add_each_wave if already 8 enemies
    $enemies_by_mission = [
        1 => [
            "foes" => ["Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00"],
            "add_each_wave" => "Draco_Moehog00"
        ],
        2 => [
            "foes" => ["Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00"],
            "add_each_wave" => "Draco_Techo00"
        ],
        3 => [
            "foes" => ["Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00"],
            "add_each_wave" => "Draco_Skeith00"
        ],
        4 => [
            "foes" => ["Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00"],
            "add_each_wave" => "Draco_Scorchio00"
        ],
        5 => [
            "foes" => ["Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00"]
        ],
        6 => [
            "foes" => ["Draco_Buzz00", "Draco_Buzz00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00", "Draco_Moehog00"]
        ],
        7 => [
            "foes" => ["Draco_Buzz00", "Draco_Buzz00", "Draco_Buzz00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00", "Draco_Techo00"]
        ],
        8 => [
            "foes" => ["Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00", "Draco_Skeith00"]
        ],
        9 => [
            "foes" => ["Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Scorchio00", "Draco_Scorchio00", "Draco_Scorchio00"]
        ],
        10 => [
            "foes" => ["Draco_Buzz00", "Draco_Buzz00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grarrl00", "Draco_Grundo00", "Draco_Grundo00", "Draco_Grundo00"]
        ],
    ];

    $enemies_obj = $enemies_by_mission[$mission];

    $enemies_to_add_in_wave = $battle - 1;
    while(count($enemies_obj['foes']) < 8 && $enemies_to_add_in_wave > 0) {
        //In each wave, add an additional enemy if less than 8 foes
        $enemies_obj['foes'][] = $enemies_obj['add_each_wave'];
        $enemies_to_add_in_wave = $enemies_to_add_in_wave - 1;
    }

    $board[0][1] = [
        "type" => "enemy",
        "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][0].".jpg"
    ];
    $board[0][3] = [
        "type" => "enemy",
        "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][1].".jpg"
    ];
    $board[0][5] = [
        "type" => "enemy",
        "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][2].".jpg"
    ];
    $board[0][7] = [
        "type" => "enemy",
        "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][3].".jpg"
    ];
    $board[0][9] = [
        "type" => "enemy",
        "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][4].".jpg"
    ];
    if($enemies_obj['foes'][5]) {
        $board[2][2] = [
            "type" => "enemy",
            "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][5].".jpg"
        ];
    }
    if($enemies_obj['foes'][6]) {
        $board[2][4] = [
            "type" => "enemy",
            "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][6].".jpg"
        ];
    }
    if($enemies_obj['foes'][7]) {
        $board[2][6] = [
            "type" => "enemy",
            "image" => "java-clone/game/MeriImages/".$enemies_obj['foes'][7].".jpg"
        ];
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