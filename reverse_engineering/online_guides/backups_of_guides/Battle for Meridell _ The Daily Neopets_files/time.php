
var time = new Date(2019,01,17,07,32,26)

function run_clock()
{
	setTimeout('run_clock()', 1000)
	
	/* time's a tickin' */
	time.setTime(time.getTime()+1000)
	
	var hour = time.getHours()
	var mins = String(time.getMinutes())
	var secs = String(time.getSeconds())
	
	/* determine am or pm and convert to 12-hour format */
	if (hour > 12)
	{
		var hour = hour - 12
		var ampm = "pm"
	}
	else if (hour == 12)
	{
		var hour = "12"
		var ampm = "pm"
	}
	else if (hour == 0)
	{
		var hour = "12"
		var ampm = "am"
	}
	else
	{
		var hour = String(hour)
		var ampm = "am"
	}
	
	/* make mins and seconds look right */
	if (mins < 10)
	{
		var mins = "0"+mins
	}
	if (secs < 10)
	{
		var secs = "0"+secs
	}
	
	/* write it */
	var thetime = "Jan 17, "+hour+":"+mins+":"+secs+" "+ampm+" NST"
	document.getElementById('site_clock').innerHTML = thetime
}