
$(document).ready(function(){
 
 	// ----------------------------------------------------
 	// Tick tok on da clokc
 	// ----------------------------------------------------
 	
	run_clock()
	
	// ----------------------------------------------------
	// Nav links
	// ----------------------------------------------------
	
    $('ul#navlinks').superfish({ 
        hoverClass:  'hover',
        delay:       550,
        animation:   {opacity:'show',height:'show'},
        speed:       'fast',
        disableHI:   true,
        autoArrows:  false
    });
    
	// ----------------------------------------------------
    // Sidebar tabs
	// ----------------------------------------------------
	
    $('#tabs').tabs({fx:{height:'toggle',opacity:'toggle',duration:150}});
    $('#tabs').show();
	 
	// ----------------------------------------------------
	// Render min-height
	// ----------------------------------------------------
	
	var height = $('#right_pad').height();
	var height = height * 1 - 195;
	$('#content_pad').css('min-height', height+'px');
    
	// ----------------------------------------------------
    // Show image
	// ----------------------------------------------------
	
	$("a.show_in_fb").fancybox({
		'titleShow'     : false,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'easingIn'      : 'easeOutBack',
		'easingOut'     : 'easeInBack',
		'overlayColor'  : '#000',
		'overlayOpacity': '.35'
	});
	
	// ----------------------------------------------------
	// NeoAvatars frames
	// ----------------------------------------------------
	
	$("a.frame").fancybox({
		'width'				: 500,
		'height'			: 340,
        'autoScale'     	: false,
		'transitionIn'	    : 'elastic',
		'transitionOut'	    : 'elastic',
		'easingIn'          : 'easeOutBack',
		'easingOut'         : 'easeInBack',
		'type'				: 'iframe',
		'overlayColor'      : '#000',
		'overlayOpacity'    : '.35'
	});
	
	// ----------------------------------------------------
	// CURSE YOU MICROSOFT, CURSE YOU IE
	// ----------------------------------------------------
	
	$('#content_pad').corner('3px');
	$('#footer').corner('3px');
	
	// ----------------------------------------------------
	// AJAX READY
	// ----------------------------------------------------
	
	$('#ajax_notice').ajaxStart(function() {
		$.fancybox.showActivity();
	});
	$('#ajax_notice').ajaxStop(function() {
		$.fancybox.hideActivity();
	});
});

function test_ajax()
{

	$.ajax({
	  url: "/welcome/test_ajax",
	  cache: false
	}).done(function( html ) {
	  //$("#results").append(html);
	});

}

function close_alert(id)
{
	// Do cookie
	expireDate = new Date;
	expireDate.setMonth(expireDate.getMonth() + 6);
	document.cookie = "tdnalertcookie=" + id + ";expires=" + expireDate.toGMTString() + ";path=/;domain=.thedailyneopets.com";
	$('.global-alert').slideUp();
}

// ----------------------------------------------------
// Calendar
// ----------------------------------------------------

var calendar = new Array();
calendar[0] = '<b>Jan 1st</b> - New Year\'s<br><b>Jan 3rd</b> - Aisha Day<br><b>Jan 6th</b> - Gnorbu Shearing Day<br><b>Jan 11th</b> - Festival of Buzz<br><b>Jan 14th</b> - Sloth Appreciation Day<br><b>Jan 16th</b> - Elephante Day<br><b>Jan 29th</b> - Kacheek Day';
calendar[1] = '<b>Feb 3rd</b> - Zafara Day<br><b>Feb 4th</b> - Jhudora Day<br><b>Feb 12th</b> - Lenny Festival<br><b>Feb 14th</b> - Valentine\'s Day<br><b>Feb 18th</b> - Chocolate Chia Day<br><b>Feb 21st</b> - Tonu Day<br><b>Feb 22nd</b> - Mynci Day';
calendar[2] = '<b>March</b> - Gadgadsbogen<br><b>Mar 2nd</b> - Uni Day<br><b>Mar 6th</b> - Gelert Day<br><b>Mar 14th</b> - Scorchio Day<br><b>Mar 17th</b> - Illusen Day<br><b>Mar 22nd</b> - Chomby Day';
calendar[3] = '<b>Apr 1st</b> - April Fool\'s Day<br><b>Apr 2nd</b> - Shoyru Day<br><b>Apr 14th</b> - Grey Day<br><b>Apr 16th</b> - Krawk Day<br><b>Apr 19th</b> - Lutari Day<br><b>Apr 22nd</b> - Kougra Day<br><b>Apr 27th</b> - Cybunny Carnival';
calendar[4] = '<b>May 2nd</b> - Lupe Day<br><b>May 4th</b> - Hissi Day<br><b>May 12th</b> - Tyrannian Victory Day<br><b>May 14th</b> - Moehog Day<br><b>May 25th</b> - Koi Day<br><b>May 28th</b> - Yurble Day';
calendar[5] = '<b>June 2nd</b> - Fyora Day<br><b>Jun 6th</b> - JubJub Day<br><b>Jun 8th</b> - Petpet Appreciation Day<br><b>Jun 13th</b> - Quiggle Day<br><b>Jun 15th</b> - Nimmo Day<br><b>Jun 19th</b> - Kau Day<br><b>Jun 28th</b> - Acara Aquatic Festival';
calendar[6] = '<b>July 3rd</b> - Flotsam Day<br><b>Jul 11th</b> - Ixi Day<br><b>Jul 12th</b> - Tuskaninny Day<br><b>Jul 17th</b> - Kiko Day<br><b>Jul 26th</b> - Peophin Day<br><b>Jul 29th</b> - Ruki Day<br><b>Jul 30th</b> - Discovery of Meridell';
calendar[7] = '<b>Aug 8th</b> - Blumaroo Day<br><b>Aug 11th</b> - Discovery of Brightvale<br><b>Aug 18th</b> - Meerca Day<br><b>Aug 20th</b> - Usuki Doll Convention<br><b>Aug 24th</b> - Grundo Day<br><b>Aug 25th</b> - Mutant Day<br><b>Aug 29th</b> - Kyrii Day';
calendar[8] = '<b>Sep 9th</b> - Draik Day<br><b>Sep 13th</b> - Techo Day<br><b>Sep 15th</b> - The Annual Chocolate Ball<br><b>Sep 19th</b> - Poogle Parade<br><b>Sep 20th</b> - Faerie Festival<br><b>Sep 23rd</b> - Gormball Championships<br><b>Sep 25th</b> - Skeith Day';
calendar[9] = '<b>Oct 4th</b> - Grarrl Day<br><b>Oct 10th</b> - Eyrie Day<br><b>Oct 13th</b> - Bori Day<br><b>Oct 16th</b> - Jetsam Day<br><b>Oct 23rd</b> - Symol Day<br><b>Oct 26th</b> - Korbat Day<br><b>Oct 31st</b> - Halloween';
calendar[10] = '<b>Nov 3rd</b> - Slorg Day<br><b>Nov 8th</b> - Pteri Day<br><b>Nov 15th</b> - Neopets\' Birthday<br><b>Nov 27th</b> - Usul Day<br><b>Nov 29th</b> - Xweetok Day';
calendar[11] = '<b>Dec 5th</b> - Bruce Day<br><b>Dec 12th</b> - Wocky Day<br><b>Dec 20th</b> - Borovan Day<br><b>Dec 25th</b> - Day of Giving<br><b>Dec 28th</b> - Ogrin Day<br><b>Dec 31st</b> - New Year\'s';

var months = new Array();
months[0] = 'January';
months[1] = 'February';
months[2] = 'March';
months[3] = 'April';
months[4] = 'May';
months[5] = 'June';
months[6] = 'July';
months[7] = 'August';
months[8] = 'September';
months[9] = 'October';
months[10] = 'November';
months[11] = 'December';

var current_month = 0;

function switch_month(change)
{
	if (change != 'forward' && change != 'backward')
	{
		current_month = change;
		$('#calendar_container').html(calendar[change]);	
		//$('#calendar_month').html(months[change]);
	}
	else if (change == 'forward')
	{
		if (current_month == 11)
		{
			current_month = 0;
			$('#calendar_container').html(calendar[current_month]);
		}
		else
		{
			current_month = current_month + 1;	
			$('#calendar_container').html(calendar[current_month]);
		}
		
		//$('#calendar_month').html(months[current_month]);
	}
	else if (change == 'backward')
	{
		if (current_month == 0)
		{
			current_month = 11;
			$('#calendar_container').html(calendar[current_month]);
		}
		else
		{
			current_month = current_month - 1;	
			$('#calendar_container').html(calendar[current_month]);
		}
		
		//$('#calendar_month').html(months[current_month]);
	}
}