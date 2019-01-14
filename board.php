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
    #board td {
        width: 32px;
        height: 32px;
        text-align:center;
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
    </style>
</head>
<body>
<?
include("board_helpers.php");
$board = [];
$board = set_up_treasure($board);
$board = set_up_enemies($board);
$board = set_up_mountains($board);
$board = set_up_villages($board);




?>

<table border=1 id="board">
    <?
    for($i=0; $i<10; $i++) {
        print "<tr>";
        for($j=0; $j<10; $j++) {
            if ($board[$i][$j]['type'] == 'treasure') {
                    print "<td id='i{$i}j{$j}' style='background-position: center; background-image:url({$board[$i][$j]['image']});background-repeat:no-repeat;background-size:32px 32px;'>";
            }
            else {
                print "<td id='i{$i}j{$j}'>";
                if ($board[$i][$j]['image']) {
                    print "<img src='{$board[$i][$j]['image']}' border=2>";
                }
                else {
                    print "<img src='java-clone/game/MeriImages/blank.png' border=2>";
                }
            }

            print "</td>";
        }
        print "</tr>";
    }
    ?>
</table>
</body>
</html>