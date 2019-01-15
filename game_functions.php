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

    if($mission == 1) {
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

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[2]][0]][$empty_spaces[$rand_keys[2]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Mace.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[2]][0]][$empty_spaces[$rand_keys[2]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Broadsword.jpg"
            ];
        }

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[3]][0]][$empty_spaces[$rand_keys[3]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Mace.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[3]][0]][$empty_spaces[$rand_keys[3]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Broadsword.jpg"
            ];
        }
    }
    elseif($mission == 2) {

        //potions
        $board[5][4] = [
            "type" => "potion",
            "image" => "java-clone/game/MeriImages/Mega_Potion.jpg"
        ];
        $board[5][6] = [
            "type" => "potion",
            "image" => "java-clone/game/MeriImages/Mega_Potion.jpg"
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

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[0]][0]][$empty_spaces[$rand_keys[0]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Magic_Force_Spell.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[0]][0]][$empty_spaces[$rand_keys[0]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Berserker_Battleaxe.jpg"
            ];
        }

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[1]][0]][$empty_spaces[$rand_keys[1]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Magic_Force_Spell.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[1]][0]][$empty_spaces[$rand_keys[1]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Berserker_Battleaxe.jpg"
            ];
        }

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[2]][0]][$empty_spaces[$rand_keys[2]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Helmet.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[2]][0]][$empty_spaces[$rand_keys[2]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Shield.jpg"
            ];
        }

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[3]][0]][$empty_spaces[$rand_keys[3]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Helmet.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[3]][0]][$empty_spaces[$rand_keys[3]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Shield.jpg"
            ];
        }
    }
    elseif($mission == 3) {

        //potions
        $board[5][4] = [
            "type" => "potion",
            "image" => "java-clone/game/MeriImages/Potion_of_Well-Being.jpg"
        ];
        $board[5][6] = [
            "type" => "potion",
            "image" => "java-clone/game/MeriImages/Potion_of_Well-Being.jpg"
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



        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[0]][0]][$empty_spaces[$rand_keys[0]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Magic_Force_Spell.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[0]][0]][$empty_spaces[$rand_keys[0]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Bow.jpg"
            ];
        }

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[1]][0]][$empty_spaces[$rand_keys[1]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Magic_Force_Spell.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[1]][0]][$empty_spaces[$rand_keys[1]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Bow.jpg"
            ];
        }

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[2]][0]][$empty_spaces[$rand_keys[2]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Amulet_of_Teleportation.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[2]][0]][$empty_spaces[$rand_keys[2]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Magic_Cloak_of_Invisibility.jpg"
            ];
        }

        if(rand(1,2) == 1) {
            $board[$empty_spaces[$rand_keys[3]][0]][$empty_spaces[$rand_keys[3]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Amulet_of_Teleportation.jpg"
            ];
        }
        else {
            $board[$empty_spaces[$rand_keys[3]][0]][$empty_spaces[$rand_keys[3]][1]] = [
                "type" => "item",
                "image" => "java-clone/game/MeriImages/Magic_Cloak_of_Invisibility.jpg"
            ];
        }
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

    /*
	Scenario M4=new Scenario("Mission 5",CROWN_,P_FORT,new int[]{SFORC,WBBAX,DHELM,DSHIE},new int[][]{
		new int[]{D_GRU,15,19,13,16,15,17}
	},8);
	Scenario M5=new Scenario("Mission 6",ROYPLA,P_MEGA,new int[]{WDEFL,WDEFL,DCOUN,DCOUN},new int[][]{
		new int[]{D_BUZ,21,21,21,21,21,21},
		new int[]{D_BUZ,21,21,21,21,21,21},
		new int[]{D_MOE,17,17,17,17,17,17}
	},8,2);
	Scenario M6=new Scenario("Mission 7",ROYTAP,P_WELL,new int[]{WDSWO,WHALB,DCHAI,DLEAT},new int[][]{
		new int[]{D_BUZ,29,29,25,25,25,25},
		new int[]{D_BUZ,21,21,21,21,21,21},
		new int[]{D_BUZ,21,21,21,21,21,21},
		new int[]{D_TEC,18,18,18,18,18,18}
	},8,2);
	Scenario M7=new Scenario("Mission 8",TRECHE,P_FORT,new int[]{SLIGH,SLIGH,DPLAT,DCHAI},new int[][]{
		new int[]{D_GRA,23,23,21,21,21,21},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_GRA,23,23,21,21,21,21},
		new int[]{D_SKE,19,19,19,19,19,19}
	},8,2);
	Scenario M8=new Scenario("Mission 9",VASPLE,P_MEGA,new int[]{WDAXE,WDAXE,DTELE,DCHAI},new int[][]{
		new int[]{D_GRA,29,29,26,26,26,26},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_SCO,20,20,20,20,20,20}
	},8,2);
	Scenario M9=new Scenario("Mission 10",VICORB,P_WELL,new int[]{WDAXE,SLIGH,DPLAT,DCHAI},new int[][]{
		new int[]{D_BUZ,29,29,27,27,27,27},
		new int[]{D_BUZ,21,21,21,21,21,21},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_GRA,22,22,22,22,22,22},
		new int[]{D_GRA,29,29,27,27,27,27},
		new int[]{D_GRU,23,23,23,23,23,23}
	},8,2);
	*/


    /*
    tileGraphicMap.put(WMACE, ImageIO.read(new File("./MeriImages/Mace.jpg")));
    tileGraphicMap.put(WBSWO, ImageIO.read(new File("./MeriImages/Broadsword.jpg")));
    tileGraphicMap.put(WHAMM, ImageIO.read(new File("./MeriImages/Hammer.jpg")));
    tileGraphicMap.put(WBBAX, ImageIO.read(new File("./MeriImages/Berserker_Battleaxe.jpg")));
    tileGraphicMap.put(WBOW_, ImageIO.read(new File("./MeriImages/Bow.jpg")));
    tileGraphicMap.put(SFORC, ImageIO.read(new File("./MeriImages/Magic_Force_Spell.jpg")));
    tileGraphicMap.put(WDSWO, ImageIO.read(new File("./MeriImages/Double_Sword.jpg")));
    tileGraphicMap.put(WHALB, ImageIO.read(new File("./MeriImages/Halberd.jpg")));
    tileGraphicMap.put(WDAXE, ImageIO.read(new File("./MeriImages/Double_Axe.jpg")));
    tileGraphicMap.put(SLIGH, ImageIO.read(new File("./MeriImages/Magic_Lightening_Spell.jpg")));

    tileGraphicMap.put(DTHUN, ImageIO.read(new File("./MeriImages/Magic_Staff_of_Thunder.jpg")));
    tileGraphicMap.put(DTELE, ImageIO.read(new File("./MeriImages/Amulet_of_Teleportation.jpg")));
    tileGraphicMap.put(DHELM, ImageIO.read(new File("./MeriImages/Helmet.jpg")));
    tileGraphicMap.put(DINVI, ImageIO.read(new File("./MeriImages/Magic_Cloak_of_Invisibility.jpg")));
    tileGraphicMap.put(DSHIE, ImageIO.read(new File("./MeriImages/Shield.jpg")));
    tileGraphicMap.put(DLEAT, ImageIO.read(new File("./MeriImages/Leather_Armor.jpg")));
    tileGraphicMap.put(DCHAI, ImageIO.read(new File("./MeriImages/Chainmail.jpg")));
    tileGraphicMap.put(DPLAT, ImageIO.read(new File("./MeriImages/Plate_Armor.jpg")));
    tileGraphicMap.put(WDEFL, ImageIO.read(new File("./MeriImages/Sword_of_Deflection.jpg")));
    tileGraphicMap.put(DCOUN, ImageIO.read(new File("./MeriImages/Counter_Enchantment_Helmet.jpg")));
    */

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