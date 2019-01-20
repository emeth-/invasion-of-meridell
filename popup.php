<html>
<head>
	<title>Item Popup</title>
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
			<img src='images/Magic_Staff_of_Thunder_large.jpg' width=240px border=2>
		</td>
		<td>&nbsp;&nbsp;</td>
		<td style="vertical-align:top;font-size:18px;">
			<h3>Magic Staff of Thunder</h3>
The thunderous sounds from this staff will have your enemies trembling! <br><br>
Grundos know how to work these staffs the best. (As they do with all 'Magic' items!)
		</td>
	</tr>
	<tr>
		<td colspan=3>
			<br><br>
			<center>
			<table>
				<tr>
					<td>Attack Bonus:</td><td>+0</td>
				</tr>
				<tr>
					<td>Defence Bonus:</td><td>+1</td>
				</tr>
				<tr>
					<td>In the hands of a Grundo:</td><td>+3</td>
				</tr>
			</table>
			</center>
		</td>
	</tr>
</table>
<br>
<button onclick="window.close()">Close</button>

</body>
</html>