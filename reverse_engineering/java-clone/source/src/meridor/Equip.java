package meridor;
import static meridor.MConst.equipDescMap;

public class Equip {

	int imageID;
	String name;
	String desc; //meaningless text string to describe item to user
	int waID; //used to identity the weapon/draw image by the program
	int def, atk, sdef, satk, minDamage, teleport;
	int effectID;
	int[] restrictedSpecies;//if a species of this id picks up the item, destroy it
	boolean equipType, freeAttack, freeTele;
	int [] bonusSpecies, destroySpecies;

	/*
	 * prototype initializer
	 * boolean:
	 * uses attack/defense slot?
	 * does not consume petmove to attack?
	 * teleport does not consume petmove?
	 * ints
	 * attack, defense, spatk, spdef, mindmg, teleport stat
	 * ability id:
	 * none, heal, or lightning (could code fireballs or blizzard)
	 * also: bowshot, breakteleseal, breakhealseal
	 * [healseal, healseal omega?)
	 * (teleseal, moveseal, attackseal?)
	 * -resolving healseal and teleseal: randomly choose a pet, 
	 * then if it has the item, apply the condition
	 * (note: heals do not target self!!!)
	 * int []
	 * bonusspecies, destroyspecies
	 * 
	 */
	/**
	 * Simple constructor that makes a generic item
	 */
	public Equip (String n, int id,
			boolean ad, 
			int a, int d, int md){
		name=n;
		waID=id;
		equipType=ad;
		freeAttack=false;
		freeTele=false;
		atk=a;
		def=d;
		satk=a;
		sdef=d;
		minDamage=md;
		teleport=0;
		effectID=-1;
		bonusSpecies=new int[]{};
		destroySpecies=new int[]{};
	}
	/**
	 * Full constructor for every variable
	 */
	public Equip (String n, int id,
			boolean ad, boolean fatk, boolean ftele,
			int a, int d, int sa, int sd, int md, int tele, int aid,
			int [] bs, int [] ds){
		name=n;
		waID=id;
		equipType=ad;
		freeAttack=fatk;
		freeTele=ftele;
		atk=a;
		def=d;
		satk=sa;
		sdef=sd;
		minDamage=md;
		teleport=tele;
		effectID=aid;
		bonusSpecies=bs;
		destroySpecies=ds;
	}
	public String getDesc(){
		if (desc ==null){
			if (equipDescMap.containsKey(waID)){
				setDesc(equipDescMap.get(waID));
			} else {
				desc="";
			}
			return desc;
		} else {
			return desc;
		}
	}
	public void setDesc(String s){
		desc=s;
	}
	public boolean checkDestroySpecies(int pid){
		for (int i=0;i<destroySpecies.length;i++){
			if (pid-destroySpecies[i]==0){
				return true;
			}
		}
		return false;
	}
	private boolean checkBonusSpecies(int pid){
		for (int i=0;i<bonusSpecies.length;i++){
			if (pid-bonusSpecies[i]==0){
				return true;
			}
		}
		return false;		
	}
	/**
	 * Returns the string used to describe item stats on the battle map tooltip
	 */
	public String getToolTipStats(){
		if (getBonusSpecies()>=0){
			return name+": "+atk+"/"+def+" | "+MeriPet.getSpeciesName(getBonusSpecies())+" :"+satk+"/"+sdef;
		} else {
			return name+": "+atk+"/"+def;
		}
	}
	/**
	 * Compares species ID to the id of the specbon
	 * This implementation assumes the replacement of the default
	 * value by the specbon value
	 */
	public int getAtkBonus (int sid){
		if (checkBonusSpecies(sid)){
			return satk;
		} else {
			return atk;
		}
	}
	/**
	 * Compares species ID to the id of the specbon
	 */
	public int getDefBonus (int sid){
		if (checkBonusSpecies(sid)){
			return sdef;
		} else {
			return def;
		}
	}
	/**
	 * Return the id of the first listed bonus species (the one that gains extra stats)
	 */
	public int getBonusSpecies(){
		if (bonusSpecies.length>0){
			return bonusSpecies[0];			
		} else {
			return -1;
		}
	}
}
