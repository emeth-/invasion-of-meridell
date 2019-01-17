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

# Attack Items

Every mission will spawn four items - two Attack items, and two Defense items.

There is some randomness in which weapon combinations will spawn. For example, in Mission 4 both the Magic_Force_Spell and the Bow are in the spawn pool - the possible spawns are two Bows, two Magic_Force_Spells, or one of each. Because of this, just because an item does not appear in a screenshot does not mean we can 100% rule it out.

* Mission 1 = ["Mace", "Broadsword"]. Verified in screenshots

* Mission 2 = ["Bow", "Hammer"]. Two screenshots have double bows. One screenshot shows a broadsword, which was likely picked up in Mission 1 and then dropped here when a new weapon was picked up. The Java clone includes Hammer, which we are unable to verify, but we include it here because it's the same base stat-line as bow and if we don't put it here it wouldn't fit anywhere.

* Mission 3 = ["Magic_Force_Spell", "Magic_Force_Spell"]. We have three unique game screenshots, all three of which have double Magic_Force_Spell spawned. The Java clone includes Berserker_Battleaxe as a possible spawn here - but I believe that is incorrect. None of our three unique screenshots support that. Also there is an advanced guide at http://www.neopets.com/~Demeanours which shows the items his team holds after beating Mission 3 and Mission 4, and in neither of them does any soldier have a Berserker_Battleaxe, even though it would be far better than the Magic_Force_Spell they are holding. So with that, I'm removing Berserker_Battleaxe from this spawn, and doing double Magic_Force_Spell, which fits all our screenshots and the guide.

* Mission  4 = ["Magic_Force_Spell", "Bow"]. Both Magic_Force_Spell and Bow are verified in screenshots showing the start of a Mission 4 level, giving us a high degree of certainty. The only variable is that the text in the description/guide on this video (https://www.youtube.com/watch?v=644qdG2yd1w) suggests a Berserker_Battleaxe should spawn in this level. We're going to assume that textual guide was in error, and trust the screenshots.

* Mission 5 = ["Berserker_Battleaxe", "Berserker_Battleaxe"]. The Java clone includes Magic_Force_Spell as a possible spawn here. I believe that is incorrect - all three unique game screenshots we have include double Berserker_Battleaxe. In Mission 3 we concluded that the Java Clone removed one Magic_Force_Spell spawn and replaced it with a Berserker_Battleaxe spawn, so it's not far-fetched to believe it did the opposite here - and our screenshots support the theory.

* Mission 6 = ["Sword_of_Deflection", "Sword_of_Deflection"]. Our one start of match screenshot has double Sword_of_Deflection. On a mid-game screenshot, a Berserker_Battleaxe is seen. However, it is within the path of the Techo, who likely dropped it to pickup a Sword_of_Deflection - so I believe the Berserker_Battleaxe was not spawned in this Mission, but just carried over from the previous mission and then dropped.

* Mission 7 = ["Double_Sword", "Halberd"]. We have two Mission 7 screenshots, and both are double Halberds. The guide at http://home.neopets.com/templates/homepage.phtml?pet_name=happylark notes that it's unnecessary to pick up Halberds here, as their attack bonuses (+4) aren't any better than what you already have. The Java clone includes "Double_Sword" here, which is identical in stats to the Sword of Deflection from the last level but without the ability to disenchant. I elected to keep this spawn chance here, even though not supported by screenshots, because the java game has it, and it fits in with the guide's note that the weapons here aren't worth picking up because they aren't better than what you already have (so gameplay is unchanged if I'm wrong and its Halberd). Also if Double_Sword does not go here... then it doesn't have a mission it spawns in.

* Mission 8 = ["Magic_Lightening_Spell", "Magic_Lightening_Spell"]. Single screenshot we have shows double Magic_Lightening_Spell. Text on video https://www.youtube.com/watch?v=644qdG2yd1w notes that you need to pickup a Magic_Lightening_Spell here for your Grundo. Java clone includes double "Magic_Lightening_Spell", so we'll roll with it.

* Mission 9 = ["Double_Axe", "Double_Axe"]. We have no screenshots or guides for this, so we'll just accept the Java clone's value.

* Mission 10 = ["Double_Axe", "Magic_Lightening_Spell"]. We have no screenshots or guides for this, so we'll just accept the Java clone's value.




# Defense Items

* Mission 1 = ["Magic_Staff_of_Thunder", "Magic_Staff_of_Thunder"]. All screenshots and guides show double Magic_Staff_of_Thunder, as does the Java clone.

* Mission 2 = ["Amulet_of_Teleportation", "Amulet_of_Teleportation"]. All start of game screenshots show double Amulet_of_Teleportation. Some mid game screenshots show Magic_Staff_of_Thunder, which we assume was dropped to pick up an Amulet_of_Teleportation.

* Mission 3 = ["Helmet", "Shield"]. We have 3 unique screenshots, all of which show double Helmet. However the guide at http://www.neopets.com/~Demeanours shows his team with Shields after beating Mission 3. Therefore, we accept the Java clone value of Helmet and Shield.

* Mission 4 = ["Plate_Armor", "Magic_Cloak_of_Invisibility"]. We have three unique screenshots of this Mission, all of which show double Plate_Armor here. The Java clone does not include Plate_Armor as a spawn option, including instead Amulet_of_Teleportation and Magic_Cloak_of_Invisibility. The guide at http://www.neopets.com/~Demeanours shows his team with a Magic_Cloak_of_Invisibility after beating this mission. Therefore, we take the Java clone value, but swap Amulet_of_Teleportation for Plate_Armor.

* Mission 5 = ["Counter_Enchantment_Helmet", "Counter_Enchantment_Helmet"]. We have three screenshots here, all of which show only Counter_Enchantment_Helmet. The Java clone uses (normal) Helmet and Shield as spawn options. We know "Helmet" is wrong and should be "Counter_Enchantment_Helmet". The only evidence for "Shield" is that the Java clone includes it, but since we already know the Java clone is wrong, we'll just go double "Counter_Enchantment_Helmet" here (which matches all screenshots). This makes up for the next mission, where the Java clone spawns too many Counter_Enchantment_Helmet so we need to reduce them.

* Mission 6 = ["Plate_Armor", "Plate_Armor"]. All screenshots solely support Plate_Armor spawning here. The Java clone has a double Counter_Enchantment_Helmet here. We'll roll with double Plate_Armor to support the screenshots.

* Mission 7 = ["Chainmail", "Chainmail"]. We have only 2 screenshots, which both have double Chainmail. The guide at http://home.neopets.com/templates/homepage.phtml?pet_name=happylark notes that it's unnecessary to pick up Chainmails here, as their defense bonuses (+4) aren't any better than what you already have. The Java clone includes Leather_Armor here alongside Chainmail. Leather_Armor is supposed to be in Mission 8 according to screenshots, but the Java clone is missing it - so assume the Java clone is wrong here and misplaced Leather_Armor, but it's really supposed to be double Chainmail.

* Mission 8 = ["Leather_Armor", "Leather_Armor"]. Our sole screenshot has double Leather_Armor. The Java clone has Plate_Armor and Chainmail as the spawn options, so it's wrong for leaving out Leather_Armor. We cannot know whether double Leather_Armor or Leather_Armor + X is correct here. I elect to go with double Leather_Armor to match the screenshots. The core concept seems to be that this armor (at +3) is worse than what you already have, but better than nothing. Including Plate_Armor (+5) or Chainmail (+4) would go against that concept.

* Mission 9 = ["Amulet_of_Teleportation", "Chainmail"]. We have no screenshots or guides for this, so we'll just accept the Java clone's value.

* Mission 10 = ["Plate_Armor", "Chainmail"]. We have no screenshots or guides for this, so we'll just accept the Java clone's value.
