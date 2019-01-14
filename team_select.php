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
include('game_functions.php');
$soldiers = get_team();

foreach($soldiers as $s) {
$bonus_attack_strength_string = "";
if($s['bonus_attack_strength']) {
    $bonus_attack_strength_string = "<span style='font-size:12px'>(+{$s['bonus_attack_strength']})</span>";
}
$bonus_defense_strength_string = "";
if($s['bonus_defense_strength']) {
    $bonus_defense_strength_string = "<span style='font-size:12px'>(+{$s['bonus_defense_strength']})</span>";
}
print <<<EOF
    <tr>
        <td bgcolor="#821B80" style="color:white">
            <img src='{$s['image']}'><br>
            {$s['breed']}<br>
            .:{$s['rank']}:.
        </td>
        <td style="text-align:left">
            <input type='text' value='{$s['name']}'>
        </td>
        <td>
            {$s['health']}
        </td>
        <td>
            {$s['base_attack_strength']}
            {$bonus_attack_strength_string}
        </td>
        <td>
            {$s['attack_item']}
        </td>
        <td>
            {$s['base_defense_strength']}
            {$bonus_defense_strength_string}
        </td>
        <td>
            {$s['defense_item']}
        </td>
        <td>
            <center>
                <table border=1 width=40% cellpadding=4><tr><td><center>
                {$s['saves']}
                </center></td></tr></table>
            </center>
        </td>
    </tr>
EOF;
}
?>
</table>
</body>
</html>