To reverse engineer the game rules, I started from an open source version of the game made in Java by darkflagrance:

Source: https://drive.google.com/drive/folders/0B2Y0VMXUm08mRkNremE5ZVV0bnc
Download: https://drive.google.com/file/d/0B2Y0VMXUm08maEFyTE5meG9hOFk/view?usp=sharing
Announcement: http://www.bay12forums.com/smf/index.php?topic=154262.0

Starting with his base values for all missions, I then compared to all guides, screenshots, and videos of the game I can find online. I saved screenshots of all online sources in the game_data/map_layouts/ mission folders, you can review them there.

# Treasures

All treasures were correct in the Java version, verified by numerous screenshots online. No changes necessary.

# Potions

* Mission 1 = Health_Potion, verified in screenshots
* Mission 2 = Potion_of_Fortitude, verified in screenshots
* Mission 3 = Mega_Potion, verified in screenshots
* Mission 4 = Potion_of_Well-Being, verified in screenshots
* Mission 5 = Potion_of_Fortitude, verified in screenshots
* Mission 6 = Potion_of_Well-Being, verified in screenshots. Note Java version improperly puts Mega_Potion here.
* Mission 7 = Potion_of_Fortitude, verified in screenshots. Note Java version improperly puts Potion_of_Well-Being here.
* Mission 8 = Mega_Potion, verified in screenshots. Note Java version improperly puts Potion_of_Fortitude here.

Missions 9 and 10 lack screenshots. The Java version uses Mega_Potion for Mission 9 - but as we discovered, Mega_Potion was in Mission 8, and there is no spot in the first 8 missions where a mission uses the same potion from a previous mission... I felt Mega_Potion was probably wrong.

We do note a slight pattern... Excluding missions 1 (which uses a unique potion) and 2, the next 6 missions go Mega / Well-Being / Fortitude and then Well-Being / Fortitude / Mega.

Based on this, I did the following:

* Mission 9 = Potion_of_Well-Being. Note Java version uses Mega_Potion.
* Mission 10 = Potion_of_Fortitude. Note Java version uses Potion_of_Well-Being.

Note that in the end it's not super important, as I believe all potions have the same effect - it's merely a visual thing.

# Weapons

Every mission will spawn four items - two Attack items, and two Defense items.

There is some randomness in which weapon combinations will spawn. For example, in Mission 4 both the Magic_Force_Spell and the Bow are in the spawn pool - the possible spawns are two Bows, two Magic_Force_Spells, or one of each. Because of this, just because an item does not appear in a screenshot does not mean we can 100% rule it out.

* Mission 1 = ["Mace", "Broadsword"], verified in screenshots
* Mission 2 = ["Bow", "???Hammer???"]. Two screenshots have double bows. One screenshot shows a broadsword, which was likely picked up in Mission 1 and then dropped here when a new weapon was picked up. Unable to verify "Hammer".
* Mission 3 = ["Magic_Force_Spell", "Magic_Force_Spell"]. We have three unique game screenshots, all three of which have double Magic_Force_Spell spawned. The Java clone includes Berserker_Battleaxe as a possible spawn here - but I believe that is incorrect. None of our three unique screenshots support that. Also there is an advanced guide at http://www.neopets.com/~Demeanours which shows the items his team holds after beating Mission 3 and Mission 4, and in neither of them does any soldier have a Berserker_Battleaxe, even though it would be far better than the Magic_Force_Spell they are holding. So with that, I'm removing Berserker_Battleaxe from this spawn, and doing double Magic_Force_Spell, which fits all our screenshots and the guide.


    3 => ["Magic_Force_Spell", "Berserker_Battleaxe"],
    //TODO: review Berserker_Battleaxe
    //Magic_Force_Spell verified in text http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
    //Magic_Force_Spell verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
    //Berserker_Battleaxe unverified? Mission 3 here: http://www.neopets.com/~Demeanours shows team after successfully beating mission, nobody has Berserker_Battleaxe

    4 => ["Magic_Force_Spell", "Bow"],
    //Magic_Force_Spell verified http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
    //Magic_Force_Spell verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
    //Bow verified http://www.neopets.com/~Demeanours (http://i50.tinypic.com/358791z.jpg)
    //Text on this video implies Berserker Batleaxe should be here https://www.youtube.com/watch?v=644qdG2yd1w

    5 => ["Magic_Force_Spell", "Berserker_Battleaxe"],
    //Berserker_Battleaxe verified https://www.neofriends.net/threads/guide-invasion-of-meridell-in-depth.26528/
    //Berserker_Battleaxe verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
    //Berserker_Battleaxe verified http://www.neopets.com/~Demeanours

    6 => ["Sword_of_Deflection", "Sword_of_Deflection"],
    //Sword_of_Deflection verified in text http://www.neocodex.us/forum/topic/109241-invasion-of-meridell-guide/
    //Sword_of_Deflection verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
    //Sword_of_Deflection verified http://www.neopets.com/~Demeanours

    7 => ["Double_Sword", "Halberd"],
    //Halberd verified https://www.neofriends.net/threads/guide-invasion-of-meridell-in-depth.26528/
    //Halberd verified http://home.neopets.com/templates/homepage.phtml?pet_name=happylark
    //Halberd verified http://www.neopets.com/~Demeanours
    //Comment:  It is not necessary to get the Chainmails and Halberds (if any) since their attack and defence bonuses should be less than those that are already equipped by your fighters. from http://home.neopets.com/templates/homepage.phtml?pet_name=happylark

    8 => ["Magic_Lightening_Spell", "Magic_Lightening_Spell"],
    //text on this video https://www.youtube.com/watch?v=644qdG2yd1w says Get the new healer for your grundo. It packs a much nicer heal. However, there is one catch. It heals every friendly person in the same vertical column as the troop you select and takes as many moves as the troops it heals. So just try to keep any saved invaders away from accidental healing. Also, although the healing power is increased, the attack bonus is decreased by one.

    9 => ["Double_Axe", "Double_Axe"],

    10 => ["Double_Axe", "Magic_Lightening_Spell"],