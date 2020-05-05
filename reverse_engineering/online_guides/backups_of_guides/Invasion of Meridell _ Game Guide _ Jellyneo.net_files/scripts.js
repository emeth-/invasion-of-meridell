/*
Main Site Calendar JS Coding
Copyright Jellyneo 2009 -- Do not take!
*/

var year = new Date;
var neoB = year.getFullYear() - 1999;
var jnB = year.getFullYear() - 2004;

var mData = new Array (12);
mData[1] = new Array('January', '1', 'Jan 3 - Aisha Day<br />Jan 6 - Gnorbu Day<br />Jan 11 - Buzz Day<br />Jan 14 - Sloth Day<br />Jan 16 - Elephante Day<br />Jan 29 - Kacheek Day');
mData[2] = new Array('February', '2', 'Feb 3 - Zafara Day<br />Feb 4 - <b style="color:purple;">Jhudora</b> <b style="color:green;">Day</b><br />Feb 12 - Lenny Day<br />Feb 14 - Valentine&#39;s<br />Feb 18 - Chia Day<br />Feb 21 - Tonu Day<br />Feb 22 - Mynci Day');
mData[3] = new Array('March', '3', 'March - Gadgadsbogen<br />Mar 2 - Uni Day<br />Mar 3 - Cancelled!<br />Mar 4 - Gadgadsbogen<br />Mar 6 - Gelert Day <br />Mar 14 - Scorchio Day<br />Mar 17 - <b style="color:green;">Illusen</b> <b style="color:brown;">Day</b><br />Mar 22 - Chomby Day');
mData[4] = new Array('April', '4', 'Apr 1 - April Fool&#39;s<br />Apr 2 - Shoyru Day<br />Apr 14 - <b style="color:gray;">Grey Day</b><br />Apr 16 - Krawk Day<br />Apr 19 - Lutari Day<br />Apr 22 - Kougra Day<br />Apr 27 - Cybunny Day');
mData[5] = new Array('May', '5', 'May 2 - Lupe Day<br />May 4 - Hissi Day<br />May 12 - Tyrannian Day<br />May 14 - Moehog Day<br />May 25 - Koi Day<br />May 28 - Yurble Day');
mData[6] = new Array('June', '6', 'June 2 - <b style="color:purple;">Fyora Day</b><br />June 6 - JubJub Day<br />June 8 - Petpet Day<br />June 13 - Quiggle Day<br />June 15 - Nimmo Day<br />June 19 - Kau Day<br />June 28 - Acara Day');
mData[7] = new Array('July', '7', 'July 3 - Flotsam Day<br />July 11 - Ixi Day<br />July 12 - Tuskaninny Day<br />July 17 - Kiko Day<br />July 26 - Peophin Day<br />July 29 - Ruki Day<br />July 30 - Meridell Day');
mData[8] = new Array("August", "8", "Aug 8 - Blumaroo Day<br />Aug 11 - Brightvale Day<br />Aug 18 - Meerca Day<br />Aug 20 - UsukiCon<br />Aug 22 - JN turns " + jnB + "!<br />Aug 24 - Grundo Day<br />Aug 25 - Mutant Day<br />Aug 29 - Kyrii Day");
mData[9] = new Array('September', '9', 'Sept 9 - Draik Day<br />Sept 13 - Techo Day<br />Sept 15 - Chocolate Ball<br />Sept 19 - Poogle Day<br />Sept 20 - Faerie Festival<br />Sept 23 - Gormball Comp<br />Sept 25 - Skeith Day');
mData[10] = new Array('October', '10', 'Oct 4 - Grarrl Day<br />Oct 10 - Eyrie Day<br />Oct 13 - Bori Day<br />Oct 16 - Jetsam Day<br />Oct 23 - Symol Day<br />Oct 26 - Korbat Day<br />Oct 31 - Halloween');
mData[11] = new Array('November', '11', "Nov 3 - Slorg Day<br />Nov 8 - Pteri Day<br />Nov 12 - Vandagyre Day<br />Nov 15 - Neopets turns " + neoB + "!<br />Nov 27 - Usul Day<br />Nov 29 - Xweetok Day");
mData[12] = new Array('December', '12', "Dec 5 - Bruce Day<br />Dec 12 - Wocky Day<br />Dec 20 - Borovan Day<br />Dec 25 - Day of Giving<br />Dec 28 - Ogrin Day<br />Dec 31 - New Year&#39;s Eve");

function switch_month(id) {
      
      var prev = id - 1;
      var next = id + 1;
      if(next == 13) { next = 1; }
      if(prev == 0) { prev = 12; }
      document.getElementById('calmon').innerHTML = mData[id][0];
      document.getElementById('calimg').alt = mData[id][0];
      document.getElementById('calimg').src = '/images/jn/calendar_' + mData[id][1] + '.gif';
      document.getElementById('caldata').innerHTML = mData[id][2];
      document.getElementById('calless').href = "javascript:switch_month(" + prev  + ");";
      document.getElementById('calmore').href = "javascript:switch_month(" + next  + ");";

}


/* Site Theme Changer */
/* Can access from any page to change the theme for a particular page. */

function changeStyle(id, cookie) {
      
      // Set the new stylesheet
      document.getElementById('themesheet').href = "/images/style/layout_" + id.toLowerCase() + ".css";
      
      // Do cookie
      if(cookie) {
        expireDate = new Date;
        expireDate.setMonth(expireDate.getMonth() + 6);
        document.cookie = "jnsitetheme=" + id + ";expires=" + expireDate.toGMTString() + ";path=/;domain=.jellyneo.net";
      }
      
      //alert("Congrats! Your new site theme has been chosen!");
      
}

/* JN Affiliate Box Functions */

function toggleAffBox() {

affBox = document.getElementById("affbox");
if(affBox.style.display == "none") {
  showAffBox();
} else {
  hideAffBox();
}

}

function showAffBox() {

// Load in the hover button & affbox
obj = document.getElementById("morelinksbutton");
affBox = document.getElementById("affbox");

// Find out where the hover button is on the page
left = 0;
top = 0;
if(obj.offsetParent) {
do {
left += obj.offsetLeft;
top += obj.offsetTop;
} while (obj = obj.offsetParent);
}

// Adjust the numbers
left += 50;
//height = affBox.style.height.substring(0, height.indexOf("px"));
top -= parseFloat(affBox.style.height);

// Unhide the box
affBox.style.top = top + "px";
affBox.style.left = left + "px";
affbox.style.display = "inline";

}

function hideAffBox() {
affBox = document.getElementById("affbox");
affbox.style.display = "none";
}

/***********************************************
* Bookmark site script- ? Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

/* Modified to support Opera */
function bookmarksite(title,url){
if (window.sidebar) // firefox
  window.sidebar.addPanel(title, url, "");
else if(window.opera && window.print){ // opera
  var elem = document.createElement('a');
  elem.setAttribute('href',url);
  elem.setAttribute('title',title);
  elem.setAttribute('rel','sidebar');
  elem.click();
} 
else if(document.all)// ie
  window.external.AddFavorite(url, title);
}

/*===========================================
Drop Down Menus
From: http://www.leigeber.com/2008/04/sliding-javascript-dropdown-menu/
===========================================*/

var DDSPEED = 5;
var DDTIMER = 15;

// main function to handle the mouse events //
function ddMenu(id,d){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearInterval(c.timer);
  if(d == 1){
    clearTimeout(h.timer);
    if(c.maxh && c.maxh <= c.offsetHeight){return}
    else if(!c.maxh){
      c.style.display = 'block';
      c.style.height = 'auto';
      c.maxh = c.offsetHeight;
      c.style.height = '0px';
      if(navigator.appName != "Microsoft Internet Explorer") { c.style.left = String(document.getElementById(id + '-ddheader').offsetLeft - 30)  + 'px'; }
    }
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }else{
    h.timer = setTimeout(function(){ddCollapse(c)},50);
  }
}

// collapse the menu //
function ddCollapse(c){
  c.timer = setInterval(function(){ddSlide(c,-1)},DDTIMER);
}

// cancel the collapse if a user rolls over the dropdown //
function cancelHide(id){
  var h = document.getElementById(id + '-ddheader');
  var c = document.getElementById(id + '-ddcontent');
  clearTimeout(h.timer);
  clearInterval(c.timer);
  if(c.offsetHeight < c.maxh){
    c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
  }
}

// incrementally expand/contract the dropdown and change the opacity //
function ddSlide(c,d){
  var currh = c.offsetHeight;
  var dist;
  if(d == 1){
    dist = (Math.round((c.maxh - currh) / DDSPEED));
  }else{
    dist = (Math.round(currh / DDSPEED));
  }
  if(dist <= 1 && d == 1){
    dist = 1;
  }
  c.style.height = currh + (dist * d) + 'px';
  c.style.opacity = currh / c.maxh;
  c.style.filter = 'alpha(opacity=' + (currh * 100 / c.maxh) + ')';
  if((currh < 2 && d != 1) || (currh > (c.maxh - 2) && d == 1)){
    clearInterval(c.timer);
  }
}