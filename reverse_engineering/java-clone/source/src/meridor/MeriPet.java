package meridor;
import java.io.Serializable;
import static meridor.MConst.*;

/**
 * The class that contains the features of player and enemy neopets
 * This class also handles combat calculations
 */
public class MeriPet implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	final static int []STATCAPS={18,18,14};
	final static int []STATCAPS2={21,19,14};
	final static int[] CAMPAIGNS[]={STATCAPS,STATCAPS2};
	final static String [] RANKS={
			"Villager",
			"Defender",
			"Warrior",
			"Lieutenant",
			"Captain",
			"Guardian"
	};
	final static int[]RANKREQS={3,9,32,64,96}; //the saves needed to get to each rank (listed above)
	
	final static Species [] SPEC ={
			new Species (MOEHOG,"Moehog",3,15,8,8),
			new Species (SKEITH,"Skeith",1,15,15,8),
			new Species (TECHO,"Techo",2,15,8,8),
			new Species (SCORCH,"Scorchio",2,15,10,8),
			new Species (GRUNDO,"Grundo",2,15,10,8),
			
			new Species (D_MOE,"Draco Moehog",3,15,8,9),
			new Species (D_SKE,"Draco Skeith",1,15,15,9),
			new Species (D_TEC,"Draco Techo",2,15,8,9),
			new Species (D_SCO,"Draco Scorchio",2,15,10,9),
			new Species (D_GRU,"Draco Grundo",2,15,10,9),
			new Species (D_BUZ,"Draco Buzz",2,15,10,9),
			new Species (D_GRA,"Draco Grarrl",2,15,10,9)
	};

	final static int HP = 0;
	final static int ATK = 1;
	final static int DEF = 2;
	
	final static int VILLAGER = -1;
	
	String name;
	final Species species; //contains racial information for the pet
	int[] stats={10,5,5}; //contains current base stats
	int dmg; //current damage taken by the pet
//	int rank; //the current level of the npet, max is 5
	int saves; //the stat for experience
	int weapon; //the id of the item equipped
	int armor; //id of the item equipped
	int moves; //current amount of moves; base stored in species
	int tele; //amount of teleports; this is 1 per turn
	private int[]location;
	boolean promoted; //whether the pet has been promoted in the current set of battles CLEAR AFTER EACH SET
	boolean movesealed,healsealed,telesealed; //status effects that can be inflicted on a pet
	
	/**
	 * Minimum constructor for a generic npet includes:
	 * name
	 * species (id)
	 * spawn condition (ally, or foe of various battles)
	 * 
	 * @param n
	 * @param sid
	 * @param sc
	 */
	public MeriPet (String n, int sid, int sc){
		name=n;
		species=SPEC[sid];
		saves=0;
		weapon=-1;
		armor=-1;
		dmg=0;
		moves=0;
		tele=0;
		
		promoted=false;
		movesealed=false;
		healsealed=false;
		telesealed=false;

		for (int i=0;i<stats.length;i++){
			stats[i]=Math.min(
					STATCAPS[i],
					species.basestats[i]+random.nextInt(5)
			);
		}
	}
	/**
	 * Constructor for specific scenario enemies
	 * Stats are passed directly to the pet
	 * the int[] consists of: species, minhp,maxhp,minatk,maxatk,mindef,maxdef
	 * needs to be at least 7 long
	 */
	public MeriPet (String n, int[] st){
		name=n;
		species=SPEC[st[0]];
		saves=0;
		weapon=-1;
		armor=-1;
		dmg=0;
		moves=0;
		tele=0;
		
		promoted=false;
		movesealed=false;
		healsealed=false;
		telesealed=false;
		
		int hp=0;
		int at=0;
		int de=0;
		
		if (st[1]==st[2]){
			hp=st[1];
		} else {
			hp=st[1]+random.nextInt(st[2]-st[1]);
		}
		if (st[3]==st[4]){
			at=st[3];
		} else {
			at=st[3]+random.nextInt(st[4]-st[3]);
		}
		if (st[5]==st[6]){
			de=st[5];
		} else {
			de=st[5]+random.nextInt(st[6]-st[5]);
		}
		
		stats=new int[]{hp,at,de};

	}
	/**
	 * This constructor returns a new meripet that duplicates the original but is of a different species
	 */
	public MeriPet (MeriPet other, int sid){
		species=SPEC[sid];
		name=other.name;

		saves=0;
		weapon=-1;
		armor=-1;
		dmg=0;
		moves=0;
		tele=0;
		
		setLocation(other.getLocation());
		promoted=false;
		movesealed=false;
		healsealed=false;
		telesealed=false;
		
		stats=other.stats;
	}
	/**
	 * This constructor returns a new meripet that duplicates the original
	 */
	public MeriPet (MeriPet other){
		species=SPEC[other.getSpeciesID()];
		name=other.name;

		saves=other.saves+0;
		weapon=other.weapon+0;
		armor=other.armor+0;
		dmg=0;
		moves=0;
		tele=0;
		
		setLocation(other.getLocation());
		promoted=other.promoted && true;
		movesealed=false;
		healsealed=false;
		telesealed=false;
		
		stats=other.stats.clone();
	}
	/**
	 * The passed int is the campaignID; reference it for limits on stats if rank up
	 * Only one promotion per mission; ranking up tells a pet that it has been promoted,
	 * which needs to be reset
	 * Increases saves by 1 (rank is dynamically calc'd based on saves)
	 */
	public void gainSave(int campaign){
		if (!promoted){
			saves++;
			for (int i=0;i<RANKREQS.length;i++){
				if (saves==RANKREQS[i]){
					gainStats(campaign);
					promoted=true;
				}
			}
		} else {
			boolean canGain=true;
			for (int i=0;i<RANKREQS.length;i++){
				if (saves+1==RANKREQS[i]){
					canGain=false;
				}
			}
			if (canGain)
				saves++;
		}
	}
	/**
	 * I pass the campaign ID so that the game knows whether to use the high or
	 * low stat caps. This method raises all stats by 1 unless the pet has reached
	 * the stat cap.
	 */
	public void gainStats(int campaign){
		int [] caps=STATCAPS2;
		if (campaign==1){
			caps=STATCAPS;
		}
		for (int i=0;i<stats.length;i++){
			if (stats[i]<caps[i]){
				stats[i]++;
			}
		}
	}
	/**
	 * I pass the campaign ID so that the game knows whether to use the high or
	 * low stat caps. This method raises all stats by 1 unless the pet has reached
	 * the stat cap.
	 */
	public void gainTreasureBoost(int campaign){
		int [] caps=STATCAPS2;
		if (campaign==1){
			caps=STATCAPS;
		}
		for (int i=1;i<stats.length;i++){
			if (stats[i]<caps[i]){
				stats[i]++;
			}
		}
	}
	//***lazy initialization pattern

	/**
	 * Lazy initialization
	 * returns an "array-tuple" 2 units long, corresponding to x and y value
	 * 
	 * 	I'm not sure about the implementation of location as an array
	 * 	this implementation is intended to require the gamestate to
	 * 	loop through list of player/foe pets to see which coord lines up with a click
	 */
	public int[] getLocation(){
		if (location==null){
			location=new int []{0,0};
		}
		return location;
	}
	/**
	 * Set the xy coordinates on the map of the meripet
	 * no guarantees the tile is not shared with something else
	 */
	public void setLocation(int x,int y){
		if (location==null){
			location=new int []{x,y};
		}
		location[0]=x;
		location[1]=y;
	}
	/**
	 * Lazy initialization
	 * takes an "array-tuple" 2 units long, corresponding to x and y value
	 */
	public void setLocation(int[] coords){
		if (location==null){
			location=new int []{coords[0],coords[1]};
		}
		location[0]=coords[0];
		location[1]=coords[1];
	}
	/**
	 * Returns the amount of additional attack gained due to raw attack stat
	 * Tentatively adding the calculation for extra weapon attack here
	 */
	public static int getASbonus (int a){
		int b=0;
		if (a>8){
			b++;
		}
		if (a>11){
			b++;
		}
		if (a>14){
			b++;
		}
		if (a>17){
			b++;
		}
		if (a>18){
			b++;
		}
		return b;
	}
	/**
	 * Print the name of the pet's species
	 */
	public String getSpeciesName(){
		return species.name;
	}
	/**
	 * Static reference to a pet's species name based on passed tileID (based on an implementation I dislike
	 * This is required because when this method was written, only the MeriPet class knows the actual string names
	 * of species
	 */
	public static String getSpeciesName(int sid){
		for (int i=0;i<SPEC.length;i++){
			if (SPEC[i].spid==sid){
				return SPEC[i].name;
			}
		}
		return "Unknown";
	}
	/**
	 * Print the name and rank separated by return
	 */
	public String getNameNRank(){
		return name+"/"+getRank();
	}
	/**
	 * Returns the string description of the pet's rank
	 */
	public String getRank(){
		return RANKS[calcRank()];
	}
	private int calcRank(){
		int rank=0;
		if (saves>=3){
			rank++;
			if (saves>=9){
				rank++;
				if (saves>=32){
					rank++;
					if (saves>=64){
						rank++;
						if (saves>=96){
							rank++;
						}
					}
				} 
			}
		}
		return rank;
	}
	/**
	 * Print the currhp and hp separated by slash
	 */
	public String getDmgNHealth(){
		return (getCurrHealth()+"/"+stats[HP]);
	}
	public int getCurrHealth(){
		return stats[HP]-dmg;
	}
	//needs to be updated for equipped weapons
	public String getAttackString(){
		return stats[ATK]+"+"+(getASbonus(stats[ATK])+getWeaponBonus());
	}
	//needs to be updated for equipped weapons
	public String getDefenseString(){
		if (getArmorBonus()>0)
			return (stats[DEF]+"+"+getArmorBonus());
		else
			return stats[DEF]+"";
	}
	public String getSavesString(){
		return saves+"";
	}
	public void setWeapon(int w){
		weapon=w;
	}
	public void setArmor(int a){
		armor=a;
	}
	/**
	 * Checks the currently equipped weapon, and gets its species-specific attack
	 * bonus
	 * crossrefs constants
	 * might be incorporated into asbonus
	 * fails with error for debug purposes
	 */
	public int getWeaponBonus(){
		if (weapon>-1)
			return MConst.equipMap.get(weapon).getAtkBonus(getSpeciesID());
		else
			return 0;
	}
	/**
	 * Checks the currently equipped weapon, and gets its species-specific 
	 * defense bonus
	 * crossrefs constants
	 * might be incorporated into attack calc
	 * fails with error for debug purposes
	 */
	public int getArmorBonus(){
		if (armor>-1)
			return MConst.equipMap.get(armor).getDefBonus(getSpeciesID());
		else
			return 0;
	}
	public int getTotalArmor(){
		return getArmorBonus()+stats[DEF];
	}
	/**
	 * checks if either if the pet's items give it the ability to heal
	 * takes into account healseal by the enemy
	 */
	public boolean canHeal(){
		return getSpeciesID()==GRUNDO && !healsealed && MConst.equipCanHeal(weapon) || MConst.equipCanHeal(armor);
	}
	/**
	 * checks if either if the pet's items give it the ability to use lightning
	 */
	public boolean canLightning(){
		return getSpeciesID()==GRUNDO && MConst.equipCanLightning(weapon) || MConst.equipCanLightning(armor);
	}
	/**
	 * checks if either if the pet's items give it the ability to heal
	 */
	public boolean canRangeAttack(){
		return (getSpeciesID()==GRUNDO || getSpeciesID()==SCORCH) && MConst.equipCanRange(weapon) && calcRank()>=2;
	}
	/**
	 * check if the pet can teleport with its current items
	 * takes into account teleseal from the enemy
	 * Currently only skeiths can teleport, but I might change this
	 */
	public boolean canTeleport(){
		return getSpeciesID()==SKEITH && tele>0 && !telesealed;
	}
	/**
	 * Checks if attacks and moves cost no move
	 */
	public boolean canFreeMove(){
		return MConst.equipHasFreeMove(weapon) || MConst.equipHasFreeMove(armor);
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
	 *An attempt at the damage formula; might want to export this method to const
	 */
	public static String attack (MeriPet a, MeriPet d){
		int roll=random.nextInt(20)+1;
		int damage = getASbonus(a.stats[ATK])+a.getWeaponBonus()+roll;
		int net = Math.max(0, damage-d.getTotalArmor());
		if (net>0){
			net=Math.max(net, MConst.getEquipMinDmg(a.weapon));
		}
		String battlelog=a.name+" attacked "+d.name+" for "+damage+
				", dealing "+net+" total! (Rolled "+roll+")";
		System.out.println(battlelog); //placeholder?
		d.injure(net);
		return battlelog;
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
	/**
	 * Use to turn a meripet to the opposite allegiance
	 * Returns a completely different meripet with the same name and stats, clears equips
	 * Returns null if conversion is invalid
	 */
	public MeriPet convert (){
		if (isAllyPetTerrain(getSpeciesID())){
			return new MeriPet(this,getFoeVersionOfAlly(getSpeciesID()));
		} else {
			int sid=getAllyVersionOfFoe(getSpeciesID());
			if (sid>=0){
				return new MeriPet(this,getAllyVersionOfFoe(getSpeciesID()));
			} else {
				return null;
			}
		}
	}
	public String printStats(){
		return name
				+ " the "+getRank()+" "+species.name
				+ " HP:"+stats[HP]
				+ " ATK:"+stats[ATK]+"+"+getASbonus(stats[ATK])
				+ " DEF:"+stats[DEF];
				
	}
	/**
	 * Used to see if the npet has available individual moves left
	 */
	public boolean hasMove (){
		return moves>0;
	}
	/**
	 * Use to change equipped weapon, previous is overwritten
	 */
	public void gainWeapon (int i){
		weapon=i; //there needs to be a comparison method
	}
	public void gainArmor (int i){
		armor=i; //there needs to be a comparison method
	}
	/**
	 * removes one current move point from the npet
	 */
	public void moveOnce (){
		if (!canFreeMove()){
			moves=Math.max(moves-1, 0);
		}
//		System.out.println(name+" has "+moves+" moves left.");
	}
	/**
	 * removes one teleport point from the pet (and seals its movement?)
	 */
	public void teleportOnce(){
		tele=Math.max(tele-1, 0);
		if (MConst.equipHasFreeTele(weapon) || MConst.equipHasFreeTele(armor)){
			moves++; //to negate the loss in move from moving once
			movesealed=true;
		} 
	}
	/**
	 * returns true if dmg>health
	 */
	public boolean checkDead (){
		return dmg>=stats[HP];
	}
	/**
	 * Use to deal damage to the npet
	 */
	public void injure (int i){
		if (i>0)
			dmg+=i;
	}
	/**
	 * Restores health to meripet, cannot restore above max
	 */
	public void heal (int i){
		dmg=Math.max(dmg-i, 0);
	}
	/**
	 * Use this to clear any mission specific attrition
	 * hp, move, status effects
	 */
	public void refreshTotal(){
		healsealed=false;
		telesealed=false;
		refreshMove();
		refreshHP();
	}
	/**
	 * Use this to heal health between missions
	 */
	public void refreshHP (){
		dmg=0;
	}
	/**
	 * Use this to restore move at the start of every turn
	 */
	public void refreshMove (){
		moves=species.moves+0;
		tele=MConst.gainTeleFromEquip(weapon)+MConst.gainTeleFromEquip(armor);
		movesealed=false;
	}
	/**
	 * The returned ID should be the one referenced in MConst
	 */
	public int getSpeciesID(){
		return species.spid;
	}
	/**
	 * returns the max moves for a pet's species
	 */
	public int getMaxMove(){
		return species.moves;
	}
	/**
	 * Use this to set stats for enemy pets
	 */
	public void setStats(int[]nstats){
		if (nstats.length==3){
			stats=nstats;
		}
	}
	private static class Species implements Serializable {
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		/*
		 * contains the race wide attributes of each neopet
		 * Moves per turn
		 * Image
		 * Powers
		 * Base stats
		 */
		int spid; //species id, determines whether it can use powers
		String name;
		int moves;
		int[]basestats;
		
		public Species (int id, String n, int m, int h, int a, int d){
			spid=id;
			name=n;
			moves=m;
			basestats=new int[3];
			basestats[HP]=h;
			basestats[ATK]=a;
			basestats[DEF]=d;
		}
	}
}
