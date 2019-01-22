function start_mission() {
    board = [];
    board = set_up_treasure();
    board = set_up_enemies(board, mission, battle);
    board = set_up_mountains(board);
    board = set_up_villages(board);
    board = set_up_soldiers(board, my_team);
    board = set_up_items(board, mission, battle);
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

    board[0][4] = {
        "type": "treasure",
        "image": image
    };
    return board;
}