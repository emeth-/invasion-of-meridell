Skeith
- can teleport once(?) if has appropriate item unless telesealed.

Grundo
- Can heal...

Techo
- Can break a teleseal on a skeith if it has appropriate armor/weapon

Moehog
- can break healseal with appropriate armor/weapon

Buzz
- Can seal

Graarl
- Can seal

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
