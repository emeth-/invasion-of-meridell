# Grundo
Magic Force Spell
- Is 'earlier' healing item
- Heals a targeted ally
- Requires both Grundo and target have an available move
- Grundo cannot heal self
- Exact amount healed is unknown. No guides specify numbers, and youtube videos unfortunately cropped out the numbers.
- Java clone heals for 50% of the Grundo's attack value.
- We will use Java clone's value.

Magic Lightning Spell
- Is 'upgraded' healer item, better than Magic Force spell
- Heals all allies in the same (vertical) column as the ally you target, but costs 1 turn per ally healed.
- Requires both Grundo and target have an available move
- Grundo cannot heal self (even if in target column)
- In relationship to Magic Force Spell, one guide notes that THIS item has increased healing power but decreased attack bonus.
- Java clone uses same logic for healing amount on this item, 1/2 of the Grundo's attack value.
- However... this item's heal all allies in same column is not an 'upgrade' but rather a 'downgrade', as it still costs 1 turn per heal. Additionally, this item has 1 less attack. Those factors, combined with the fact that one guide notes it has increased healing power, makes me believe it should have a higher healing amount.
- Based on that, we will make this heal for 100% of Grundo's attack value so it is an actual improvement.

When a unit is healed...
- Top of page displays: "Zap!!!<br><br>You've moved 2 out of 5"


Skeith
- can teleport once(?) if has Amulets of Teleportation unless telesealed.
- When a Skeith wears this Amulet, he can teleport to any unoccupied space in the bottom 7 rows of the board.
- Equipping your Skeith with this item allows them to have an extra move after teleporting.
- Allows the bearer to make 5 moves on your turn. (However, Skeiths cannot move again once they teleport)
- The Amulet enables the Skeith to move ANYWHERE except the top 3 rows on the grid.
- Teleport displays "Teleported!<br>You've moved 1 out of 5"

Techo
- Can break a teleseal on a skeith with Sword of Deflection
- Techos can use this to break any enchantments cast on your Skeith that keep him from teleporting. (Only in Missions 6 - 10)
- Woosh!!! Enchantment banished!<br><br><br>You've moved 1 out of 5

Moehog
- can break healseal with Counter Enchantment Helmet
- Moehogs can use this to break any enchantments cast on your Grundo that stop him from healing. (Only in Missions 6 - 10)

Buzz
- Can seal

Graarl
- Can seal

Scorchio
- can attack two spaces away with Bow (rangedatk)
- Equip this to your Scorchio; once he reaches the rank of Soldier he can shoot his bow from 2 spaces away to attack.


As you pick up certain items they will enable your soldiers to perform specific abilities; for example, your Grundo can gain the ability to cast healing spells on your other soldiers (I'll explain how later). To use this ability both your Grundo and the recipient of the spell will need to have a move free, that is, neither of them should have a red border. First you click on the Grundo to highlight it, then click on the soldier you want to cast the spell on. The board will refresh and the recipient will have regained a portion of their health. This will count as both soldiers having moved, so if you cast healing spells on two of your soldiers then that would count as two moves for your Grundo and he will then have a red border.

In later Missions your enemies will gain the ability to cast spells which prevent your Grundo from healing and your Skeith from teleporting. To break the spell on your Grundo you will need to equip your Moehog with the Counter Enchantment Helmet, then click on your Moehog to select him and then on your Grundo to release him. For freeing your Skeith you will need to equip your Techo with the Sword of Deflection and do the same thing. As with healing, this process requires both soldiers to have a spare move, so it is best to do this at the start of your turn.

Any enchantments cast on your Grundo or Skeith will carry over from one Battle to the next, so make sure you break them before finishing off the last invader otherwise you'll have to waste a turn at the start of the next Battle.

Your Moehog should have been equipped with the Counter Enchantment Helmet from the previous Mission, so if your Grundo is being enchanted and you need it to heal the other fighters, just click on your Moehog then on your Grundo to break the enchantment. Similarly, it is not necessary for your Techo to break the enchantment for your Skeith unless your Skeith needs to be teleported to another square. However, do remember to break all enchantments on your Grundo and Skeith before converting the last invader, as the enchantments will be carried forward to the next Battle/Mission and you would have to waste a turn to break these enchantments in the new Battle/Mission.


/**
 * check if the pet can teleport with its current items
 * takes into account teleseal from the enemy
 * Currently only skeiths can teleport, but I might change this
 */
public boolean canTeleport(){
  return getSpeciesID()==SKEITH && tele>0 && !telesealed;
}
/**
 * Check if the pet can clear another pet's teleseal status
 */
public boolean canBreakTeleSeal(){
  return getSpeciesID()==TECHO && (MConst.equipBreaksTeleSeal(weapon) || MConst.equipBreaksTeleSeal(armor));
}
/**
 * Check if the pet can clear another pet's heal seal status
 */
public boolean canBreakHealSeal(){
  return getSpeciesID()==MOEHOG && (MConst.equipBreaksHealSeal(weapon) || MConst.equipBreaksHealSeal(armor));
}
/**
 * Current heal formula, subject to revision, heals for 1/2 pet damage
 */
public static String heal (MeriPet a, MeriPet d){
  int net = (a.stats[ATK]+a.getWeaponBonus()+getASbonus(a.stats[ATK]))/2;
  String battlelog=a.name+" heals "+d.name+" of "+net+
      " damage!";
  System.out.println(battlelog); //placeholder?
  d.heal(net);
  return battlelog;
}
/**
 * The target casts a spell that seals the meripet's ability to teleport
 */
public static String castTeleSeal (MeriPet a, MeriPet d){
  String battlelog=a.name+" seals "+d.name+"'s ability to teleport!";
  System.out.println(battlelog); //placeholder?
  d.telesealed=true;
  return battlelog;
}
/**
 * The target casts a spell that seals the meripet's ability to heal
 */
public static String castHealSeal (MeriPet a, MeriPet d){
  String battlelog=a.name+" seals "+d.name+"'s ability to heal!";
  System.out.println(battlelog); //placeholder?
  d.healsealed=true;
  return battlelog;
}
/**
 * Removes the Telesealed condition
 */
public static String breakTeleSeal (MeriPet a, MeriPet d){
  String battlelog=a.name+" restores "+d.name+"'s ability to teleport!";
  System.out.println(battlelog); //placeholder?
  d.telesealed=false;
  return battlelog;
}
/**
 * Removes the healsealed condition
 */
public static String breakHealSeal (MeriPet a, MeriPet d){
  String battlelog=a.name+" restores "+d.name+"'s ability to heal others!";
  System.out.println(battlelog); //placeholder?
  d.healsealed=false;
  return battlelog;
}


  //teleport to blank squares only
  if (parent.selected.canTeleport() && tilemap[xc][yc].terrain==BLANK && yc > 2){
    parent.selected.teleportOnce();
    parent.selected.setLocation(xc, yc);
    parent.resolvePlayerMove();
  }
  //check for the lightning case
  else if (parent.selected.canLightning() && isAllyPetTerrain(tilemap[xc][yc].terrain)){
    for (int i=0;i<parent.ally.size();i++){
      if (parent.ally.get(i) != parent.selected && parent.ally.get(i).getLocation()[0]==xc && parent.ally.get(i).dmg>0 && parent.ally.get(i).moves>0){
        parent.ally.get(i).moveOnce();
        parent.updateBattleLog(MeriPet.heal(parent.selected, parent.ally.get(i)));
        parent.resolvePlayerMove();
        break;
      }
    }
  }
  //check for the healing case
  else if (parent.selected.canHeal() && isAllyPetTerrain(tilemap[xc][yc].terrain)){
    for (int i=0;i<parent.ally.size();i++){
      if (parent.ally.get(i) != parent.selected && Arrays.equals(parent.ally.get(i).getLocation(),new int[]{xc,yc}) && parent.ally.get(i).dmg>0 && parent.ally.get(i).hasMove()){
        parent.updateBattleLog(MeriPet.heal(parent.selected, parent.ally.get(i)));
        parent.resolvePlayerMove();
        break;
      }
    }
  }
  /*
   * There is an obvious bug here: if a pet can simultaneously heal either seal,
   * the code won't actually let them heal both seals, and it won't heal tele seal
   * if the healer can ALSO cure heal seal if the target is not healsealed
   *
   * not relevant to the present build because abilities are almost completely unique
   */
  //check for whether the pet can cure healseal
  else if (parent.selected.canBreakHealSeal() && isAllyPetTerrain(tilemap[xc][yc].terrain)){
    for (int i=0;i<parent.ally.size();i++){
      if (parent.ally.get(i) != parent.selected && Arrays.equals(parent.ally.get(i).getLocation(),new int[]{xc,yc}) && parent.ally.get(i).healsealed){
        parent.updateBattleLog(MeriPet.breakHealSeal(parent.selected, parent.ally.get(i)));
        parent.resolvePlayerMove();
        break;
      }
    }
  }
  //check for whether the pet can cure teleseal
  else if (parent.selected.canBreakTeleSeal() && isAllyPetTerrain(tilemap[xc][yc].terrain)){
    for (int i=0;i<parent.ally.size();i++){
      if (parent.ally.get(i) != parent.selected && Arrays.equals(parent.ally.get(i).getLocation(),new int[]{xc,yc}) && parent.ally.get(i).telesealed){
        parent.updateBattleLog(MeriPet.breakTeleSeal(parent.selected, parent.ally.get(i)));
        parent.resolvePlayerMove();
        break;
      }
    }
  }
  //check for the ranged attack case
  else if (parent.selected.canRangeAttack() &&
      isFoePetTerrain(tilemap[xc][yc].terrain) &&
      checkTwoRange(tilemap[xc][yc],parent.selected.getLocation())){
    for (int i=0;i<parent.foe.size();i++){
      if (Arrays.equals(parent.foe.get(i).getLocation(),new int[]{xc,yc})){
        parent.updateBattleLog(MeriPet.attack(parent.selected, parent.foe.get(i)));
        parent.resolvePlayerMove();
        break;
      }
    }
  } //standard actions
