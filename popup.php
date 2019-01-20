<html>
<head>
	<title>Item Popup</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>

function image_to_name(img) {
    //Input = "images/Chainmail.jpg"
    //Output = "Chainmail"
    return img.split('/').reverse()[0].split('.')[0];
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
var item_url = findGetParameter('item');
var item_name = image_to_name(item_url);
var clean_item_name = item_name.replace(/[_]/g, ' ');
document.title = clean_item_name;
</script>
</head>
<body>

<table>
	<tr>
		<td>
			<img id='image_content' src='' width=240px border=2>
		</td>
		<td>&nbsp;&nbsp;</td>
		<td style="vertical-align:top;font-size:18px;">
			<h3 id='title_content'>Placeholder</h3>
<span id='text_content'>
</span>
		</td>
	</tr>
	<tr>
		<td colspan=3>
			<br><br>
			<center id='stats_content'>
			</center>
		</td>
	</tr>
</table>
<br>
<button onclick="window.close()">Close</button>
<script>
content = {


	"Mace": {
		"image": "images/Mace.jpg",
		"title": "Mace",
		"text": "This weapon is often affectionately refered to as 'The Smasher', 'The Destroyer', 'The Crusher', 'The Evil Neopet Mincer'... well, there are too many names to list here, but you get the idea!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+1</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr></table>"
	},

	"Magic_Staff_of_Thunder": {
		"image": "images/Magic_Staff_of_Thunder_large.jpg",
		"title": "Magic Staff of Thunder",
		"text": "The thunderous sounds from this staff will have your enemies trembling! <br><br> Grundos know how to work these staffs the best. (As they do with all 'Magic' items!)",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+1</td></tr><tr><td>In the hands of a Grundo:</td><td>+3</td></tr></table>"
	},

	"Broadsword": {
		"image": "images/Broadsword.jpg",
		"title": "Broad Sword",
		"text": "This handy weapon was once a plough for tilling fields, but when dark times beset Meridell, it was forged into a Broadsword. <br><br>Techos like these weapons very much indeed!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+1</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr><tr><td>In the hands of a Techo:</td><td>+3</td></tr></table>"
	},

	"Hammer": {
		"image": "images/Hammer.jpg",
		"title": "Hammer",
		"text": "Ideal for pets that like to smash things. You not only get to bash the invaders with it, you get to feel good doing it, too!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+2</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr></table>"
	},

	"Berserker_Battleaxe": {
		"image": "images/Berserker_Battleaxe_large.jpg",
		"title": "Berserker Battleaxe",
		"text": "Heavy weaponry only the strong dare brandish! <br><br>When a Skeith has this Battleaxe along with teleportation power... whoa!!!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+5</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr></table>"
	},

	"Bow": {
		"image": "images/Bow_large.jpg",
		"title": "Bow",
		"text": "Once a Scorchio gains the experience of a Warrior, he can shoot his bow from 2 spaces away!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+2</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr><tr><td>In the hands of a Scorchio:</td><td>+4</td></tr></table>"
	},

	"Magic_Force_Spell": {
		"image": "images/Magic_Force_Spell_large.jpg",
		"title": "Magic Force Spell",
		"text": "Zap adjacent enemies with the power of the Magic Force Spell to inflict massive damage! <br><br>In the hands of a Grundo, you can not only zap your enemies, but you can zap a fellow trooper from anywhere to heal them. (Requires both pieces to have an available move).",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+3</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr><tr><td>In the hands of a Grundo:</td><td>+5</td></tr></table>"
	},

	"Double_Sword": {
		"image": "images/Double_Sword.jpg",
		"title": "Double Sword",
		"text": "This weapon has a very nice special ability: whenever it hits it is guaranteed to do at least six points of damage. (Unfortunately it is not guaranteed to hit...)",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+4</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr><tr><td>In the hands of a Techo:</td><td>+6</td></tr></table>"
	},

	"Halberd": {
		"image": "images/Halberd.jpg",
		"title": "Halberd",
		"text": "Touched with the Magic of Meridell, this item grants its owner unlimited moves (Max 5)!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+5</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr></table>"
	},

	"Double_Axe": {
		"image": "images/Double_Axe.jpg",
		"title": "Double Axe",
		"text": "Guaranteed to do at least 5 points of damage when it hits (is not guaranteed to hit).",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+5</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr></table>"
	},

	"Magic_Lightening_Spell": {
		"image": "images/Magic_Lightening_Spell.jpg",
		"title": "Magic Lightening Spell",
		"text": "Zap Invaders with a lightning bolt! <br><br>When used by Grundos, this powerful spell can attack Invaders from 2 spaces away! It can also heal multiple fellow fighters in the same column! To use the healing power, click a fellow fighter in the column you wish to target. (Costs 1 move per healing).",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+2</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr><tr><td>In the hands of a Grundo:</td><td>+4</td></tr></table>"
	},

	"Amulet_of_Teleportation": {
		"image": "images/Amulet_of_Teleportation_large.jpg",
		"title": "Amulet of Teleportation",
		"text": "When a Skeith wears this Amulet, he can teleport to any unoccupied space in rows 3 through 10!<br><br>It also provides +2 defence points when worn by Skeiths and non-Skeiths alike!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+2</td></tr><tr><td>In the hands of a Skeith:</td><td>+4</td></tr></table>"
	},

	"Amulet_of_Teleportation": {
		"image": "images/Amulet_of_Teleportation_large.jpg",
		"title": "Amulet of Teleportation",
		"text": "When a Skeith wears this Amulet, he can teleport to any unoccupied space in rows 3 through 10!<br><br>It also provides +2 defence points when worn by Skeiths and non-Skeiths alike!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+2</td></tr><tr><td>In the hands of a Skeith:</td><td>+4</td></tr></table>"
	},

	"Helmet": {
		"image": "images/Helmet_large.jpg",
		"title": "Helmet",
		"text": "When a Moehog wears this helmet, it provides some extra protection to that skull he loves to fight with!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+3</td></tr><tr><td>In the hands of a Moehog:</td><td>+5</td></tr></table>"
	},

	"Magic_Cloak_of_Invisibility": {
		"image": "images/Magic_Cloak_of_Invisibility.jpg",
		"title": "Cloak of Invisibility",
		"text": "When a Grundo wears this cloak, he becomes invisible, making it nearly impossible to hit him!<br><br>Many battles are won and lost depending on whether the Grundo has this item and the Magic Force Spell!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+3</td></tr><tr><td>In the hands of a Grundo:</td><td>+5</td></tr></table>"
	},

	"Shield": {
		"image": "images/Shield.jpg",
		"title": "Shield",
		"text": "Techos know how to put these shields to good use!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+4</td></tr><tr><td>In the hands of a Techo:</td><td>+6</td></tr></table>"
	},

	"Leather_Armor": {
		"image": "images/Leather_Armor.jpg",
		"title": "Leather Armor",
		"text": "The lightest armor, but still offering good protection! All Meridellians can wear it.",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+3</td></tr><tr><td>In the hands of a Scorchio:</td><td>+5</td></tr></table>"
	},

	"Chainmail": {
		"image": "images/Chainmail.jpg",
		"title": "Chainmail",
		"text": "Affords the best movement with the best protection! All Meridellians can wear it.",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+4</td></tr></table>"
	},

	"Plate_Armor": {
		"image": "images/Plate_Armor.jpg",
		"title": "Plate Armor",
		"text": "The strongest armor, but a bit cumbersome. All Meridellians can wear it.",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+5</td></tr></table>"
	},

	"Sword_of_Deflection": {
		"image": "images/Sword_of_Deflection_large.jpg",
		"title": "Sword of Deflection",
		"text": "Techos use this sword to deflect the enchantments cast upon Skeiths by the evil Invaders! <br><br>Click on the Techo that carries this sword then click on the enchanted Skeith to free him!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+4</td></tr><tr><td>Defence Bonus:</td><td>+0</td></tr><tr><td>In the hands of a Techo:</td><td>+6</td></tr></table>"
	},

	"Counter_Enchantment_Helmet": {
		"image": "images/Counter_Enchantment_Helmet_large.jpg",
		"title": "Counter Enchantment Helmet",
		"text": "Moehogs can use the magical power of this helmet to deflect the enchantments cast upon Grundos by the evil Invaders! <br><br>If a Grundo is enchanted, click on the Moehog that wears this helmet and then click on the enchanted Grundo to free him!",
		"stats": "<table><tr><td>Attack Bonus:</td><td>+0</td></tr><tr><td>Defence Bonus:</td><td>+3</td></tr><tr><td>In the hands of a Moehog:</td><td>+5</td></tr></table>"
	},

}
$('#stats_content').html(content[item_name].stats);
$('#text_content').html(content[item_name].text);
$('#title_content').html(content[item_name].title);
$('#image_content').attr('src', content[item_name].image);

</script>
</body>
</html>