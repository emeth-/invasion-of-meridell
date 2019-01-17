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

Missions 9 and 10 lack screenshots. The Java version uses Mega_Potion for Mission 9 - but as we discovered, Mega_Potion was in Mission 8, and there is no spot in the first 8 missions where a mission uses the same potion from a previous mission.

We do note a slight pattern... Excluding missions 1 (which uses a unique potion) and 2, the next 6 missions go Mega / Well-Being / Fortitude and then Well-Being / Fortitude / Mega.

Based on this, I did the following:

* Mission 9 = Potion_of_Well-Being. Note Java version uses Mega_Potion.
* Mission 10 = Potion_of_Fortitude. Note Java version uses Potion_of_Well-Being.

Note that in the end it's not super important, as I believe all potions have the same effect - it's merely a visual thing.
