<?

function set_up_treasure($board) {
    //Treasure
    $board[0][4] = [
        "type" => "treasure",
        "image" => "java-clone/game/MeriImages/Goblet.jpg"
    ];
    return $board;
}

function set_up_enemies($board) {
    //Enemies
    for($i=0; $i<5; $i++) {
        $board[0][($i*2)+1] = [
            "type" => "enemy",
            "image" => "java-clone/game/MeriImages/Draco_Moehog00.jpg"
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







?>