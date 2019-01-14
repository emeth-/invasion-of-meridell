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

function set_up_treasure($board) {
    //Treasure
    $board[0][4] = [
        "type" => "treasure",
        "image" => "java-clone/game/MeriImages/Goblet.jpg"
    ];
    return $board;
}

function set_up_items($board, $mission, $battle) {

    //potions
    $board[5][4] = [
        "type" => "potion",
        "image" => "java-clone/game/MeriImages/Health_Potion.jpg"
    ];
    $board[5][6] = [
        "type" => "potion",
        "image" => "java-clone/game/MeriImages/Health_Potion.jpg"
    ];

    $empty_spaces = [];
    for($i=4; $i<9; $i++) {
        for($j=0; $j<10; $j++) {
            if(!$board[$i][$j]['type']) {
                $empty_spaces[]=[$i, $j];
            }
        }
    }

    $rand_keys = array_rand($empty_spaces, 4);

    $board[$empty_spaces[$rand_keys[0]][0]][$empty_spaces[$rand_keys[0]][1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/Magic_Staff_of_Thunder.jpg"
    ];
    $board[$empty_spaces[$rand_keys[1]][0]][$empty_spaces[$rand_keys[1]][1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/Magic_Staff_of_Thunder.jpg"
    ];
    $board[$empty_spaces[$rand_keys[2]][0]][$empty_spaces[$rand_keys[2]][1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/Mace.jpg"
    ];
    $board[$empty_spaces[$rand_keys[3]][0]][$empty_spaces[$rand_keys[3]][1]] = [
        "type" => "item",
        "image" => "java-clone/game/MeriImages/Mace.jpg"
    ];

    return $board;
}

function set_up_enemies($board, $mission, $battle) {

    if(!$mission) {
        $mission = 1;
    }

    if(!$battle) {
        $battle = 1;
    }

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