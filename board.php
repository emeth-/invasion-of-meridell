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
    #board {
        border: 3px solid #AAAAAA;
        border-collapse: collapse;
    }
    #board td {
        width: 32px;
        height: 32px;
        text-align:center;
    }
    #pets, #pets td{
        text-align:center;
        border:2px solid #AAAAAA;
        border-collapse: collapse;
        font-size: 12px;
    }
    img {
        border-color: lightgrey;
    }
    img .active {
        border-color: green;
    }
    img .inactive {
        border-color: black;
    }
    .plain_link {
        text-decoration: none;
    }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
<?
include("game_functions.php");
$board = [];
$mission = rand(1,10);
$battle = rand(1,3);
//$mission = 7;
//$battle = 2;
$board = set_up_treasure($board, $mission, $battle);
$board = set_up_enemies($board, $mission, $battle);
$board = set_up_mountains($board);
$board = set_up_villages($board);
$soldiers = get_team();
$board = set_up_soldiers($board, $soldiers);
$board = set_up_items($board, $mission, $battle);

print "<h3>Mission: {$mission} / Battle: {$battle}</h3>";
?>
<table width=100% border=0 style="border:0px">
    <tr>
        <td style="border:0px; text-align:center;vertical-align:top;">

<center>
<b>You've moved 4 out of 5</b>

<table border=1 id="board">
    <?
    for($i=0; $i<10; $i++) {
        print "<tr>";
        for($j=0; $j<10; $j++) {
            print "<td id='i{$i}j{$j}'>";
            if ($board[$i][$j]['image']) {
                print "<img src='{$board[$i][$j]['image']}' border=2 data-type='{$board[$i][$j]['type']}' height=32 width=32>";
            }
            else {
                print "<img src='images/blank.png' border=2>";
            }

            print "</td>";
        }
        print "</tr>";
    }
    ?>
</table>

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

<br><br>
<span style="font-size:10px;line-height: 10px;">
Maximum moves total per turn: 5<br>
Maximum moves total per pet:
</span>
<table style="border: 1px solid #000000;padding:0px;border-collapse: collapse;">
    <tr>
        <td style="border: 3px solid #000000;">
            <img src='images/Moeh00.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            4
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Tech02.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            2
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Scor03.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            2
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Grun04.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;">
            2
        </td>
        <td style="border: 3px solid #000000;">
            <img src='images/Skei01.jpg'>
        </td>
        <td width=25px style="text-align:center; border: 0px; border-top: 3px solid #AAAAAA;border-bottom: 3px solid #AAAAAA;border-right: 3px solid #AAAAAA">
            1
        </td>
    </tr>
</table>
<br>
<table>
    <tr>
        <td style="border:0px">
            <img src='images/blank.png' border=3 style="border-color: red;">
        </td>
        <td style="border:0px">
            <span style="font-size:10px;line-height: 10px;">
            A red background means the maximum moves for that piece <br>have been reached.
            </span>
        </td>
    </tr>
</table>

<span style="font-size:12px;line-height: 10px;font-weight:bold;">
<a href='#' class='plain_link'>Instructions</a> | <a href='#' class='plain_link'>Strategy Guide</a> | <a href='#' class='plain_link'>Troops</a>
</span>

<br><br>

<span style="font-size:12px;line-height: 10px;">
<a href='#' class='plain_link'>End Turn Now</a>
</span>
</center>

        </td>
        <td style="border:0px;vertical-align:top;text-align:right">
            <!--////////////////////////////
            //Right Side
            ////////////////////////////-->

            Minimal Stats




            <table id='pets' width=100%>

                <tr>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        Name<br>
                        .:Rank:.
                    </td>
                    <td>
                        Health<br>
                        max<br>
                        18
                    </td>
                    <td>
                        Attack<br>
                        Strength
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        Defence<br>
                        Strength
                    </td>
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        Saves
                    </td>
                </tr>

<?
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

$attack_image = "images/blank.png";
if($s['attack_item']) {
    $attack_image = "...?";
}

$defense_image = "images/blank.png";
if($s['defense_item']) {
    $defense_image = "...?";
}

print <<<EOF
                <tr>
                    <td style="width: 30px;height: 30px;">
                        <img src='{$s['image']}'>
                    </td>
                    <td>
                        {$s['breed']}<br>
                        .:{$s['rank']}:.
                    </td>
                    <td>
                        {$s['health']}
                    </td>
                    <td>
                        {$s['base_attack_strength']}
                        {$bonus_attack_strength_string}
                    </td>
                    <td style="width: 30px;height: 30px;">
                        <img src='{$attack_image}'>
                    </td>
                    <td>
                        {$s['base_defense_strength']}
                        {$bonus_defense_strength_string}
                    </td>
                    <td style="width: 30px;height: 30px;">
                        <img src='{$defense_image}'>
                    </td>
                    <td>
                        0
                    </td>
                </tr>

EOF;
}
?>

            </table>











        </td>
    </tr>
</table>


<script>

function clicked_item_popup(item_url) {
    window.open('popup.php?item='+item_url, 'Item Popup', 'status=1, height=450, width=550, left=100, top=100, resizable=0');
}

function add_item_help_links() {

    var items = {};
    $('img[data-type=treasure], img[data-type=item]').each(function() {
        var item_image_url = $(this).attr('src');

        if (!items[item_image_url]) { //only want to show each item once
            var htmlz = `<img src='${item_image_url}' border=2 height=32 width=32 style='border: 1px solid #0000FF;' onclick='clicked_item_popup("${item_image_url}")'>&nbsp;`;
            $('#items_on_map').append(htmlz);
            items[item_image_url] = 1;
        }
    });

}

add_item_help_links();
</script>
</body>
</html>