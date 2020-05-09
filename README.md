# Invasion of Meridell

## Game Timeline
* <2005: Invasion of Meridell v1 (first wave / first five missions only)
* ~2005: Invasion of Meridell v2 (second wave added, no concept of enchantments)
* ~2006-2011: Invasion of Meridell v3 (enchantments added, Buzz/Grarrl stats changed with Buzz defense-heavy and Grarrl attack-heavy)
* 2011: Invasion of Meridell is [taken down](http://www.neopets.com/games/play.phtml?game_id=182), game page is replaced with message "Invasion of Meridell is down for maintenance. We apologize for the inconvenience. Why not try one of our many other games?"
* Sept 2011: TheNeopetsTeam breaks radio silence and in NT Editorial #511 explains why the game was taken down: "We talked to a programmer and there was some kind of glitch with it. It's been taken down indefinitely. We'll talk amongst ourselves to figure out if we want to put the time in to fix the game. If not, we may release the associated avatar in a different way, or retire it. We'll update you once we reach a decision."
* Jan 2012: An XSS attack/exploit was found on IOM and [published publicly](http://xssed.com/mirror/64791/). Had been found in 2009, and remained unpublished until Neopets removed the game. Unclear if Neopets became aware of it and it contributed to their decision to take the game down.
* Dec 2013: Forum member "Infamous Joe" [gives details](https://clraik.com/forum/showthread.php?30654-Invasion-of-Meridell/page2) of the IOM exploit. In short, IOM was web-based, as opposed to the rest of Neopets games which were flash-based. It appears that some of the api calls IOM used could be executed without actually playing the game, and earn a person up to 250k Neopets a day automatically. The exploit was released in the form of a downloadable tool that one group of forum members shared, then one of those members reverse engineered it, built it into a new tool allowing it to be used on multiple accounts, and released it on another forum where it then said widespread usage (and presumably came to Neopets attention).



### A note on IOM Versions
As I reviewed the guides still available, I noted something unexpected.

There appear to have been multiple iterations of IOM. 

The first version was just what we now call 'wave 1', missing missions 6-10. It seemed to last for only a short time, as it's only mentioned briefly in a single guide.

The second version added 'wave 2', and it's state is best described in [this guide](http://www.neopets.com/~GoldEyeGriffin) - it's divergences from version 3 (the final version) are that it appears Grarrl/Buzz couldn't enchant and block skeith teleport and grundo heal, and as a result moehog/techo couldn't disenchant those enchantments, and thus it made more sense to ditch your weak units (as opposed to version 3, where you virtually always keep your original units). This second version seemed to exist for some time, as I found 2 guides explicitly following it, and a few others that could be pointing to it.

The third version appears to have added the enchantment concept, and made a slight tweak to item spawns. Additionally, I *think* but cannot verify that Grarrl/Buzz stats were changed - instead of being identical, Buzz was changed to strong defense / weak attack, and Grarrl was made strong attack / weak defense. This third version also existed for a while, as it has the most guides describing it.

This clone attempts to match the third version of the game. 

Note, the Java Clone author also [notes these differences](https://tdnforums.com/topic/45831-im-rebuilding-invasion-of-meridell-as-its-own-program/), saying "There have been multiple versions of Invasion of Meridell over the years, with different mechanics and items sets."

### Old 



Things to do in the future:
- reset mission may bring back converted units or something? Some kind of glitch. (duplicate by getting to mission 2, then clicking reset mission several times)
- release game with link to github source
- github contains issue for each unknown
- github contains link in readme to reverse engineering app

Old guides:
http://www.jellyneo.net/?go=invasion_of_meridell
http://www.thedailyneopets.com/neopets-games/invasion-of-meridell/
https://www.neofriends.net/threads/guide-invasion-of-meridell-in-depth.26528/
http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
http://neopointsdeals.com/neopets-invasion-of-meridell-guide/
http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
http://www.neopets.com/~Demeanours
http://www.angelfire.com/pop2/krillin373/invasionm.html
https://www.pinkpt.com/neodex/index.php?title=Invasion_of_Meridell


Videos:
https://www.youtube.com/watch?v=QJCtRCyfVww (levels 1, 2, 3)
https://www.youtube.com/watch?v=644qdG2yd1w

Correct stat numbers:
http://www.neopets.com/~Demeanours

Much appreciation to darkflagrance, the author of the Java clone of this game which helped me get started. See Java_Clone.md for more details on his version.
