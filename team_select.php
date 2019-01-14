<html>
<head>
    <style>
    body {
        font-family: TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif;
        font-style: normal;
        font-variant: normal;
        font-weight: 400;
        line-height: 18.5714px;
    }
    table, th, td {
        border: 3px solid #AAAAAA;
        border-collapse: collapse;
    }
    </style>
</head>
<body>
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
<?

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

?>

<?
foreach($soldiers as $s) {
    ?>
    <tr>
        <td bgcolor="#821B80" style="color:white">
            <img src='<?=$s['image']?>'><br>
            <?=$s['breed']?><br>
            .:<?=$s['rank']?>:.
        </td>
        <td style="text-align:left">
            <input type='text' value='<?=$s['name']?>'>
        </td>
        <td>
            <?=$s['health']?>
        </td>
        <td>
            <?=$s['base_attack_strength']?>
            <?
            if($s['bonus_attack_strength']) {
                ?>
                <span style='font-size:12px'>(+<?=$s['bonus_attack_strength']?>)</span>
                <?
            }
            ?>
        </td>
        <td>
            <?=$s['attack_item']?>
        </td>
        <td>
            <?=$s['base_defense_strength']?>
            <?
            if($s['bonus_defense_strength']) {
                ?>
                <span style='font-size:12px'>(+<?=$s['bonus_defense_strength']?>)</span>
                <?
            }
            ?>
        </td>
        <td>
            <?=$s['defense_item']?>
        </td>
        <td>
            <center>
                <table border=1 width=40% cellpadding=4><tr><td><center>
                <?=$s['saves']?>
                </center></td></tr></table>
            </center>
        </td>
    </tr>
    <?
}
?>
</table>
</body>
</html>