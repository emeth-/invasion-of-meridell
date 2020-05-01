# invasion-of-meridell
clone of neopet's old game that they [removed](https://clraik.com/forum/showthread.php?30654-Invasion-of-Meridell/page2), rewritten

Things to do in the future:
- Each member of your army can only gain one rank per Mission, and once they have been promoted any other Neopets they save will not count towards their total number of saves until the next Mission begins. For example, if your Scorchio saves its ninth invader in Mission 2 Battle 1 then it will rank up to become a Defender. However after this no matter how many invaders it vanquishes, its total number of saves will remain at 9 until you begin Mission 3 Battle 1, at which point its saves will resume being counted.
- In each mission there are 4 of the main species. The main species are the same as those in the Wave 1, and in the same order. However, in each mission there are Buzzes OR Grarrls equal to the mission number + 1. So Mission 1 has 2 Buzzes OR Grarrls, Mission 2 has 3, etc.
-
  //split the priorities of dark lords and invaders
  //dark lords attempt to move down first and attack if they cannot
  //invaders attack first and move down if there are no foes in range

  //both invader/dark lord will use the sme algorithm to check for targets
  ArrayList<MeriPet> targets=bm.findNextFoeTarget(chosen.getLocation()[0], chosen.getLocation()[1]);
  ArrayList<MeriPet> horitargets=bm.findHoriFoeTarget(chosen.getLocation()[0], chosen.getLocation()[1]);
  //invader decision tree
  if (MConst.isDarkLordTerrain(chosen.getSpeciesID())){
    //first: attempt to cast a seal
    //this is the only time random is called in a critical function
    boolean teleseal=random.nextBoolean();
    MeriPet sealtarget=ally.get(random.nextInt(ally.size()));
    System.out.println(sealtarget.name+" "+teleseal);
    if (teleseal && sealtarget.canTeleport()){
      updateBattleLog(MeriPet.castTeleSeal(chosen, sealtarget));
    } else if (!teleseal && (sealtarget.canHeal() || sealtarget.canLightning())){
      updateBattleLog(MeriPet.castHealSeal(chosen, sealtarget));
    }



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
